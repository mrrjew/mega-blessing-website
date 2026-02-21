import Link from "next/link";
import { AirtableService } from "@/lib/airtable";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(`[EventDetailPage] Requested ID: ${id}`);

    const events = await AirtableService.getEvents();
    const event = events?.find((e: any) => e.id === id);

    if (!event) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-outfit">Event not found</h2>
                <p className="text-gray-500 mb-8">The event you are looking for may have been moved or is no longer available.</p>
                <Link href="/events" className="px-8 py-3 bg-gold-600 text-white font-bold rounded-xl hover:bg-gold-500 transition-all shadow-lg shadow-gold-200">
                    Back to Events
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-20 px-4 md:px-0">
            {/* Back Button */}
            <Link href="/events" className="inline-flex items-center gap-2 text-gray-500 hover:text-gold-600 font-semibold mb-8 transition-colors group">
                <svg className="size-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Events
            </Link>

            {/* Event Hero */}
            <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl mb-12">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                    <span className="px-4 py-1.5 bg-gold-500 text-white text-xs font-bold rounded-full mb-4 inline-block tracking-widest uppercase">
                        {event.category}
                    </span>
                    <h1 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
                    <p className="text-gold-200 text-lg font-medium">{event.date}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="prose prose-lg max-w-none">
                        <h2 className="font-outfit text-3xl font-bold text-gray-900 mb-6">About the Event</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {event.description}
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {event.longDescription}
                        </p>
                    </div>

                    <div className="bg-gold-50/50 rounded-3xl p-8 border border-gold-100 mt-12">
                        <h3 className="font-outfit text-xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
                            <svg className="size-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Registration & Inquiry
                        </h3>
                        <p className="text-gray-600 mb-6 font-light">Interested in attending or volunteering for this event? Reach out to our hospitality team for more information or secure your spot today.</p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-3 bg-gold-600 text-white font-bold rounded-xl hover:bg-gold-500 transition-all shadow-lg shadow-gold-200 active:scale-95">Register Now</button>
                            <button className="px-8 py-3 bg-white text-gold-600 border border-gold-200 font-bold rounded-xl hover:bg-gold-50 transition-all active:scale-95">Inquire More</button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-md">
                        <h3 className="font-outfit text-xl font-bold text-gray-900 mb-6">Event Details</h3>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-gold-50 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="size-5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</p>
                                    <p className="text-gray-900 font-bold">{event.date}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-gold-50 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="size-5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time</p>
                                    <p className="text-gray-900 font-bold">{event.time}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-gold-50 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="size-5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
                                    <p className="text-gray-900 font-bold">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                            <p className="text-sm text-gray-400 mb-4 transition-all">Invite others to experience the blessing</p>
                            <div className="flex justify-center gap-4">
                                <button className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gold-600 hover:bg-gold-50 transition-all">
                                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </button>
                                <button className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gold-600 hover:bg-gold-50 transition-all">
                                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
