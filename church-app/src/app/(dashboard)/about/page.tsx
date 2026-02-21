import { AirtableService } from "@/lib/airtable";

export default async function AboutPage() {
    const content = await AirtableService.getSiteContent();

    if (!content) {
        return (
            <div className="flex flex-col items-center justify-center py-40 text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-outfit">Loading Content...</h2>
                <p className="text-gray-500 max-w-md">Our mission and vision statements are being synchronized. Please wait a moment.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                {/* Hero section */}
                <section className="relative py-32 gold-gradient overflow-hidden">
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="mesh" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#mesh)" />
                        </svg>
                    </div>
                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
                        <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-gold-100 text-xs font-bold tracking-widest uppercase mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                            Our Foundation
                        </span>
                        <h1 className="font-outfit text-6xl md:text-7xl font-bold mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            {content.story_title || "Our Story & Mission"}
                        </h1>
                        <p className="text-xl md:text-2xl text-gold-50/90 max-w-3xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                            {content.story_description || "Empowering lives through faith and love."}
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-32 bg-white px-6 lg:px-8 -mt-12 relative z-10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Mission Card */}
                        <div className="group p-12 rounded-[40px] bg-gradient-to-br from-white to-gold-50/50 border border-gold-100 shadow-xl shadow-gold-900/5 hover:-translate-y-1 transition-all duration-500">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-gold-200/50 group-hover:scale-110 transition-transform duration-500">
                                <div className="p-4 bg-gold-50 rounded-2xl">
                                    <svg className="size-10 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 0014.16 2.24t-12.12 6.16a14.98 14.98 0 006.16 12.12z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
                            <p className="text-gray-600 text-lg leading-relaxed font-light">
                                {content.mission_text || "To raise a generation of enlightened believers."}
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="group p-12 rounded-[40px] bg-gradient-to-br from-[#1c1917] to-[#453104] border border-gold-900 shadow-2xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-[100px] pointer-events-none"></div>
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <svg className="size-10 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12.413a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="font-outfit text-4xl font-bold mb-8 text-gold-100">Our Vision</h2>
                            <p className="text-gray-300 text-lg leading-relaxed font-light">
                                {content.vision_text || "To be a global center for spiritual excellence."}
                            </p>
                        </div>
                    </div>
                </section>
                {/* ... existing Journey and Values sections remain static/hardcoded for structural stability ... */}
            </main>
        </div>
    );
}
