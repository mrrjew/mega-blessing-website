

const leaders = [
    {
        name: "Senior Pastor",
        role: "Head of Ministry",
        image: "https://images.unsplash.com/photo-1544717297-fa95b3496730?auto=format&fit=crop&q=80&w=800",
        bio: "Visionary leader dedicated to spiritual growth and community empowerment."
    },
    {
        name: "Deaconess Sarah Mensah",
        role: "Head of Music Ministry",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        bio: "Passionate about heavenly worship and musical excellence."
    },
    {
        name: "Elder Joseph Quansah",
        role: "Head of Media & Publicity",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
        bio: "Driving the message of the church through modern digital platforms."
    },
    {
        name: "Mrs. Abigail Boateng",
        role: "Head of Ushering & Protocol",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
        bio: "Ensuring every visitor feels welcomed and the house of God is in order."
    }
];

const departments = [
    {
        name: "Music Ministry (The Voices of Blessing)",
        head: "Deaconess Sarah Mensah",
        members: ["Emmanuel Okai", "Grace Amankwah", "Seth Appiah", "Doris Mensah", "Samuel Boateng", "Lydia Owusu", "Francis Addo", "Esther Tetteh"]
    },
    {
        name: "Media & Technical Team",
        head: "Elder Joseph Quansah",
        members: ["Kofi Amoah", "Yaw Preko", "Ama Serwaa", "Bright Kumah", "Jennifer Osei"]
    },
    {
        name: "Ushering & Protocol",
        head: "Mrs. Abigail Boateng",
        members: ["Rita Mensah", "David Oppong", "Victoria Ansah", "Charles Boakye"]
    },
    {
        name: "The Youth Hive (Leadership)",
        head: "Bro. Kelvin Osei",
        members: ["Jessica Addo", "Prince Boateng", "Sandra Mensah"]
    }
];

export default function LeadershipPage() {
    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-1">
                {/* Header Section */}
                <section className="py-20 bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-gray-900">
                        <h1 className="font-outfit text-5xl font-bold mb-4">Our Leadership</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Meet the dedicated men and women driving the vision of Mega Blessing Chapel International.
                        </p>
                    </div>
                </section>

                {/* Department Heads */}
                <section className="py-24 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-outfit text-3xl font-bold text-gray-900 mb-12 border-l-4 border-gold-600 pl-4">Departmental Heads</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {leaders.map((leader) => (
                                <div key={leader.name} className="group bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
                                    <div className="relative h-64">
                                        <img src={leader.image} alt={leader.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <p className="font-bold text-lg font-outfit">{leader.name}</p>
                                            <p className="text-gold-300 text-sm font-medium">{leader.role}</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 text-sm italic">"{leader.bio}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Departments & Members */}
                <section className="py-24 bg-white px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-outfit text-3xl font-bold text-gray-900 mb-12 border-l-4 border-gold-600 pl-4">Departments & Members</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {departments.map((dept) => (
                                <div key={dept.name} className="p-10 rounded-[40px] bg-gray-50 border border-gray-100 h-full">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-outfit">{dept.name}</h3>
                                    <div className="mb-6">
                                        <p className="text-gold-600 font-bold text-sm uppercase tracking-widest mb-1">HEAD OF DEPARTMENT</p>
                                        <p className="text-gray-900 font-bold">{dept.head}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-4">MEMBERS</p>
                                        <div className="flex flex-wrap gap-3">
                                            {dept.members.map((member) => (
                                                <span key={member} className="px-4 py-2 bg-white rounded-full text-gray-700 text-sm border border-gray-200 shadow-sm font-medium">
                                                    {member}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
}
