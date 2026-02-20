import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const N8N_WEBHOOK_URL =
            process.env.N8N_WEBHOOK_URL ||
            "https://n8n.gklive.online/webhook/smart-arena/init";

        const payload = await request.json();

        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!n8nResponse.ok) {
            console.error("n8n registration webhook failed:", n8nResponse.statusText);
            return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
        }

        const data = await n8nResponse.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Registration proxy error:", error);
        return NextResponse.json({ error: "Server error during registration" }, { status: 500 });
    }
}
