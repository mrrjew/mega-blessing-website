import { NextResponse } from "next/server";
import { AirtableService } from "@/lib/airtable";

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        // 1. Validation
        if (!payload.fullName || !payload.phoneNumber || !payload.serviceType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 2. Record in Airtable
        const airtableResult = await AirtableService.createAttendance(payload);

        if (!airtableResult || airtableResult.error) {
            console.error("Airtable attendance recording failed:", airtableResult?.error);
            return NextResponse.json({ error: airtableResult?.error || "Attendance recording failed" }, { status: airtableResult?.status || 500 });
        }


        return NextResponse.json({
            success: true,
            message: "Attendance recorded",
            id: airtableResult?.id
        });

    } catch (error) {
        console.error("Attendance route error:", error);
        return NextResponse.json({ error: "Server error processing attendance" }, { status: 500 });
    }
}
