import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const N8N_PAYMENT_WEBHOOK_URL =
            process.env.N8N_PAYMENT_WEBHOOK_URL ||
            "https://n8n.gklive.online/webhook/church-retention/pay";

        const payload = await request.json();

        // Basic validation
        if (!payload.amount || !payload.reference || !payload.paymentType) {
            return NextResponse.json({ error: "Missing required payment fields" }, { status: 400 });
        }

        const n8nResponse = await fetch(N8N_PAYMENT_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!n8nResponse.ok) {
            console.error("n8n payment webhook failed:", n8nResponse.statusText);
            return NextResponse.json({ error: "Failed to record payment" }, { status: 500 });
        }

        const data = await n8nResponse.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Payment proxy error:", error);
        return NextResponse.json({ error: "Internal server error during payment processing" }, { status: 500 });
    }
}
