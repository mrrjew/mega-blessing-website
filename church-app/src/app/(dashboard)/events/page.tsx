import Link from "next/link";

export default function EventsPage() {
    const events = [
        {
            id: 1,
            title: "Anointing Service",
            date: "March 15, 2026",
            category: "SPECIAL SERVICE",
            description: "Join us for a powerful time of prophetic anointing and breakthrough. Come with expectations!",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
            linkText: "Event Details →"
        },
        {
            id: 2,
            title: "Youth Impact Summit",
            date: "April 05, 2026",
            category: "YOUTH",
            description: "Empowering the next generation to lead with faith and integrity in the modern world.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
            linkText: "Register Now →"
        },
        {
            id: 3,
            title: "Community Food Drive",
            date: "April 20, 2026",
            category: "OUTREACH",
            description: "Spreading Christ's love by providing for those in need within our local community.",
            image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800",
            linkText: "Volunteer →"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
                <p className="text-gray-600 max-w-xl mx-auto">Stay updated with our latest activities, special services, and community gatherings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <div key={event.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                        <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${event.category === "YOUTH" ? "bg-green-50 text-green-600" :
                                    event.category === "OUTREACH" ? "bg-amber-50 text-amber-600" :
                                        "bg-gold-50 text-gold-600"
                                    }`}>
                                    {event.category}
                                </span>
                                <span className="text-gray-400 text-sm">{event.date}</span>
                            </div>
                            <h3 className="font-outfit text-2xl font-bold mb-4">{event.title}</h3>
                            <p className="text-gray-600 mb-6 text-sm">{event.description}</p>
                            <Link href={`/events/${event.id}`} className="text-gold-600 font-bold text-sm hover:gap-2 transition-all inline-flex items-center">
                                {event.linkText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
