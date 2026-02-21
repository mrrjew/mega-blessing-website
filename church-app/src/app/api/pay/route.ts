import { NextResponse } from "next/server";
import { AirtableService } from "@/lib/airtable";

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        // 1. Core Validation
        if (!payload.amount || !payload.reference || !payload.paymentType) {
            return NextResponse.json({ error: "Missing required payment fields" }, { status: 400 });
        }

        // 2. Trust the isRecurring flag from the frontend (which includes Plan Consent)
        const isRecurring = !!payload.isRecurring;

        // 3. Record in Airtable
        const airtableResult = await AirtableService.createPayment({
            ...payload,
            isRecurring
        });

        if (!airtableResult || airtableResult.error) {
            console.error("Airtable payment recording failed:", airtableResult?.error);
            // We proceed but inform the frontend that sync failed
            return NextResponse.json({
                success: true,
                warning: "Payment verified but server sync delayed",
                error: airtableResult?.error
            });
        }


        return NextResponse.json({
            success: true,
            message: "Payment recorded successfully",
            id: airtableResult?.id
        });

    } catch (error) {
        console.error("Payment route error:", error);
        return NextResponse.json({ error: "Internal server error during payment processing" }, { status: 500 });
    }
}
