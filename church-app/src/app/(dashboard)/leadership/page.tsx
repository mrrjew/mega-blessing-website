import { AirtableService } from "@/lib/airtable";

export default async function LeadershipPage() {
    const leaders = await AirtableService.getLeadership();
    const departments = await AirtableService.getDepartments();

    if (!leaders && !departments) {
        return (
            <div className="flex flex-col items-center justify-center py-40 text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-outfit">Loading Content...</h2>
                <p className="text-gray-500 max-w-md">The church leadership information is currently being synchronized. Please check back in a moment.</p>
            </div>
        );
    }

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
                {leaders && leaders.length > 0 && (
                    <section className="py-24 px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="font-outfit text-3xl font-bold text-gray-900 mb-12 border-l-4 border-gold-600 pl-4">Departmental Heads</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {leaders.map((leader: any, index: number) => (
                                    <div key={`${leader.name}-${index}`} className="group bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
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
                )}

                {/* Departments & Members */}
                {departments && departments.length > 0 && (
                    <section className="py-24 bg-white px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="font-outfit text-3xl font-bold text-gray-900 mb-12 border-l-4 border-gold-600 pl-4">Departments & Members</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {departments.map((dept: any, index: number) => (
                                    <div key={`${dept.name}-${index}`} className="p-10 rounded-[40px] bg-gray-50 border border-gray-100 h-full">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-outfit">{dept.name}</h3>
                                        <div className="mb-6">
                                            <p className="text-gold-600 font-bold text-sm uppercase tracking-widest mb-1">HEAD OF DEPARTMENT</p>
                                            <p className="text-gray-900 font-bold">{dept.head || "TBD"}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-4">MEMBERS</p>
                                            <div className="flex flex-wrap gap-3">
                                                {dept.members.map((member: string, mIndex: number) => (
                                                    <span key={`${member}-${mIndex}`} className="px-4 py-2 bg-white rounded-full text-gray-700 text-sm border border-gray-200 shadow-sm font-medium">
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
                )}
            </main>
        </div>
    );
}
