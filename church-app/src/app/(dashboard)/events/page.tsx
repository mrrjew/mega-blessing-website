import Link from "next/link";
import { AirtableService } from "@/lib/airtable";

export default async function EventsPage() {
    const events = await AirtableService.getEvents();

    if (!events) {
        return (
            <div className="flex flex-col items-center justify-center py-40 text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-outfit">Loading Events...</h2>
                <p className="text-gray-500 max-w-md">Our upcoming services and community programs are being synchronized. Please stay tuned.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="py-20 bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-gray-900">
                        <h1 className="font-outfit text-5xl font-bold mb-4">Upcoming Events</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Join us in our upcoming services and community programs.
                        </p>
                    </div>
                </section>

                <section className="py-24 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events.map((event: any) => (
                            <div key={event.id} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                <div className="h-64 relative">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-1.5 bg-gold-500 text-white text-[10px] font-bold rounded-full tracking-widest uppercase shadow-lg">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-10 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-gold-600 text-xs font-bold uppercase tracking-widest mb-3">
                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {event.date}
                                    </div>
                                    <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                                    <p className="text-gray-500 text-base mb-8 line-clamp-2 leading-relaxed flex-1">
                                        {event.description}
                                    </p>
                                    <Link
                                        href={`/events/${event.id}`}
                                        className="text-gold-600 font-bold text-sm hover:gap-2 transition-all inline-flex items-center group"
                                    >
                                        Event Details
                                        <svg className="size-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
