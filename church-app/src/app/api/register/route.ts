import { NextResponse } from "next/server";
import { AirtableService } from "@/lib/airtable";

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        // 1. Create in Airtable (includes duplicate check)
        const airtableResult = await AirtableService.createMembership(payload);

        if (!airtableResult || airtableResult.error) {
            const status = airtableResult?.duplicate ? 409 : (airtableResult?.status || 500);
            return NextResponse.json({ error: airtableResult?.error || "Airtable recording failed" }, { status });
        }


        return NextResponse.json({
            success: true,
            message: "Registration successful",
            id: airtableResult?.id
        });

    } catch (error) {
        console.error("Registration route error:", error);
        return NextResponse.json({ error: "Server error during registration" }, { status: 500 });
    }
}
