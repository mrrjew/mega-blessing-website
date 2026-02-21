import { AirtableService } from "@/lib/airtable";
import GalleryClient from "./GalleryClient";

export default async function GalleryPage() {
    const images = await AirtableService.getGallery();

    if (!images) {
        return (
            <div className="flex flex-col items-center justify-center py-40 text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-outfit">Loading Gallery...</h2>
                <p className="text-gray-500 max-w-md">Our collection of moments and miracles is being synchronized. Please wait a moment.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="py-20 bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-gray-900">
                        <h1 className="font-outfit text-5xl font-bold mb-4">Our Gallery</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Capturing moments of grace, worship, and community impact.
                        </p>
                    </div>
                </section>

                <section className="py-24 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <GalleryClient initialImages={images} />
                    </div>
                </section>
            </main>
        </div>
    );
}
