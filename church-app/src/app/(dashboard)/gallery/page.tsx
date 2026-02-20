"use client";

import { useState } from "react";

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<null | { id: number, title: string, description: string, src: string }>(null);

    const images = [
        { id: 1, title: "Sunday Worship", description: "Our congregation gathering for a powerful time of praise and word.", src: "https://images.unsplash.com/photo-1544427920-c49ccfb8da39?auto=format&fit=crop&q=80&w=800" },
        { id: 2, title: "Music Ministry", description: "The Voices of Blessing leading us into the presence of God.", src: "https://images.unsplash.com/photo-1511000192946-7f41932c6018?auto=format&fit=crop&q=80&w=800" },
        { id: 3, title: "Choir Performance", description: "Special musical presentation during our annual convention.", src: "https://images.unsplash.com/photo-1445445290250-18a3ef046ce1?auto=format&fit=crop&q=80&w=800" },
        { id: 4, title: "Community Outreach", description: "Sharing the love of Christ through local community support programs.", src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800" },
        { id: 5, title: "Youth Gathering", description: "The Youth Hive coming together for fellowship and spiritual growth.", src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" },
        { id: 6, title: "Bible Study", description: "Deep diving into the Word of God during our weekly mid-week service.", src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" },
        { id: 7, title: "Sanctuary View", description: "A peaceful moment in our headquarters, The Throne of Grace.", src: "https://images.unsplash.com/photo-1438032005730-c77e094df11b?auto=format&fit=crop&q=80&w=800" },
        { id: 8, title: "Special Celebration", description: "Celebrating the goodness of God during our anniversary service.", src: "https://images.unsplash.com/photo-1543196614-e046c7d3d82e?auto=format&fit=crop&q=80&w=800" },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
                <p className="text-gray-600 max-w-xl mx-auto">Capturing moments of worship, service, and community growth at Mega Blessing Chapel.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                    <div
                        key={image.id}
                        onClick={() => setSelectedImage(image)}
                        className="relative aspect-square overflow-hidden rounded-3xl group shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                    >
                        <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gold-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                            <div className="text-center">
                                <span className="text-white font-bold block font-outfit text-lg mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.title}</span>
                                <span className="text-gold-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">View Larger</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 md:p-8 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-gold-400 transition-colors z-70"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
                        <div className="relative group w-full flex justify-center">
                            <img
                                src={selectedImage.src.replace("&w=800", "&w=1600")}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl shadow-gold-900/20 animate-in zoom-in-95 duration-500"
                            />
                        </div>
                        <div className="text-center max-w-2xl px-4 animate-in slide-in-from-bottom-4 duration-700 delay-200">
                            <h3 className="text-white font-outfit text-2xl font-bold mb-3">{selectedImage.title}</h3>
                            <p className="text-gray-300 font-light leading-relaxed mb-6">{selectedImage.description}</p>
                            <div className="w-12 h-1 bg-gold-500 mx-auto rounded-full"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
