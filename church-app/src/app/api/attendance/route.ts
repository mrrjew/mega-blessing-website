import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const N8N_ATTENDANCE_URL =
            process.env.N8N_ATTENDANCE_WEBHOOK_URL ||
            "https://n8n.gklive.online/webhook/church-retention/attendance";

        const payload = await request.json();

        // Validation
        if (!payload.fullName || !payload.phoneNumber || !payload.serviceType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const n8nResponse = await fetch(N8N_ATTENDANCE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!n8nResponse.ok) {
            console.error("n8n attendance webhook failed:", n8nResponse.statusText);
            return NextResponse.json({ error: "Failed to record attendance" }, { status: 500 });
        }

        const data = await n8nResponse.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Attendance proxy error:", error);
        return NextResponse.json({ error: "Server error processing attendance" }, { status: 500 });
    }
}
