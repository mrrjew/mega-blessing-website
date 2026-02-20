

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-1">
                {/* Hero section */}
                <section className="relative py-24 bg-gold-600 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img
                            src="https://images.unsplash.com/photo-1511100019294-7f41932c6018?auto=format&fit=crop&q=80&w=2000"
                            className="w-full h-full object-cover"
                            alt="Background Pattern"
                        />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
                        <h1 className="font-outfit text-5xl md:text-6xl font-bold mb-6">Our Story & Mission</h1>
                        <p className="text-xl text-gold-100 max-w-3xl mx-auto font-light leading-relaxed">
                            Mega Blessing Chapel International is more than a church; it is a family of believers dedicated to experiencing and sharing the transformative power of God's love.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-24 bg-white px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="p-12 rounded-[40px] bg-gold-50 border border-gold-100 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                                <svg className="size-8 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 0014.16 2.24t-12.12 6.16a14.98 14.98 0 006.16 12.12z" />
                                </svg>
                            </div>
                            <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To raise a generation of believers who are spiritually enlightened, socially responsible, and empowered by the Holy Spirit to impact their world with the Gospel of Jesus Christ. We strive to create an atmosphere where the presence of God is tangible and every soul finds rest and purpose.
                            </p>
                        </div>

                        <div className="p-12 rounded-[40px] bg-gold-900 border border-gold-800 text-white hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                                <svg className="size-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12.413a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
                                </svg>
                            </div>
                            <h2 className="font-outfit text-4xl font-bold mb-6 text-gold-100">Our Vision</h2>
                            <p className="text-gray-300 text-lg leading-relaxed font-light">
                                To be a global center for spiritual excellence, restoration, and holistic human development. We envision a world where the unconditional love of Christ reaches every home, bringing hope to the hopeless and strength to the weary.
                            </p>
                        </div>
                    </div>
                </section>

                {/* History Section */}
                <section className="py-24 bg-gray-50 px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-12">Our Journey</h2>
                        <div className="space-y-12">
                            <div className="relative pl-8 border-l-2 border-gold-200">
                                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gold-600 rounded-full border-4 border-white shadow-sm"></div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Humble Beginning</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Founded with a handful of dedicated souls in a small gathering, Mega Blessing Chapel International began with a singular focus: to preach the message of faith and reconciliation.
                                </p>
                            </div>
                            <div className="relative pl-8 border-l-2 border-gold-200">
                                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gold-600 rounded-full border-4 border-white shadow-sm"></div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Growth & Expansion</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Through the grace of God, our community grew exponentially, leading to the establishment of multiple branches including the Throne of Grace and Recovery Temple.
                                </p>
                            </div>
                            <div className="relative pl-8 border-l-2 border-gold-200">
                                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gold-600 rounded-full border-4 border-white shadow-sm"></div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Impact Today</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Today, we continue to be a beacon of hope, serving thousands across our locations through ministry, welfare, and community outreach programs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-24 bg-white px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center mb-16">
                        <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-gray-600">The pillars that define who we are and how we serve.</p>
                    </div>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Faith",
                                desc: "Unwavering belief in the power and promises of God.",
                                icon: (
                                    <svg className="size-8 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Love",
                                desc: "The foundational principle of our community and service.",
                                icon: (
                                    <svg className="size-8 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Excellence",
                                desc: "Doing all things to the highest standard for God's glory.",
                                icon: (
                                    <svg className="size-8 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Integrity",
                                desc: "Living a life that aligns with the Word of God.",
                                icon: (
                                    <svg className="size-8 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 5.714z" />
                                    </svg>
                                )
                            }
                        ].map((value) => (
                            <div key={value.title} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                                <p className="text-gray-600 font-light">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

        </div>
    );
}
