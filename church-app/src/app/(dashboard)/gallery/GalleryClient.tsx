"use client";

import { useState } from "react";

export default function GalleryClient({ initialImages }: { initialImages: any[] }) {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {initialImages.map((image) => (
                    <div
                        key={image.id}
                        className="group relative h-80 rounded-[40px] overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        onClick={() => setSelectedImage(image)}
                    >
                        <img src={image.url || image.image} alt={image.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                            <svg className="size-12 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button className="absolute top-10 right-10 text-white hover:text-gold-500 transition-colors z-[110]">
                        <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div
                        className="max-w-6xl w-full h-full flex flex-col items-center justify-center gap-8 animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
                            <img
                                src={selectedImage.url || selectedImage.image}
                                alt={selectedImage.title}
                                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10"
                            />
                        </div>
                        <div className="text-center max-w-2xl px-4">
                            <h3 className="text-white text-3xl font-bold mb-3 font-outfit">{selectedImage.title}</h3>
                            <p className="text-gold-200/80 text-lg leading-relaxed font-light">{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
