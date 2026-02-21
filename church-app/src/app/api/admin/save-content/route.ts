import { NextRequest, NextResponse } from "next/server";
import { AirtableService } from "@/lib/airtable";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { target, imageUrl, ...fields } = body;

        if (!imageUrl) {
            return NextResponse.json({ error: "Image URL is required." }, { status: 400 });
        }

        let result;

        switch (target) {
            case "gallery": {
                result = await AirtableService.createGalleryItem({
                    title: fields.title || "Untitled",
                    imageUrl,
                    category: fields.category || "General",
                    date: fields.date || new Date().toISOString().split("T")[0],
                });
                break;
            }

            case "leadership": {
                result = await AirtableService.createLeader({
                    name: fields.name,
                    role: fields.role,
                    department: fields.department || "",
                    imageUrl,
                });
                break;
            }

            case "events": {
                result = await AirtableService.createEvent({
                    title: fields.title,
                    date: fields.date,
                    description: fields.description || "",
                    imageUrl,
                });
                break;
            }

            case "site": {
                result = await AirtableService.updateSiteContent({
                    section: fields.section,
                    imageUrl,
                    note: fields.note || "",
                });
                break;
            }

            default:
                return NextResponse.json({ error: "Invalid target section." }, { status: 400 });
        }

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error("[Admin] save-content error:", error);
        return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
    }
}
