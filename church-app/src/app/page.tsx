import Link from "next/link";
import Navbar from "@/components/Navbar";
import { AirtableService } from "@/lib/airtable";

export default async function Home() {
  const content = await AirtableService.getSiteContent();
  const heroTitle = content?.hero_title || "Where Blessings Overflow & Souls Find Rest";
  const heroSubtext = content?.hero_subtext || "Experience a vibrant community dedicated to worship, growth, and spreading the unconditional love of Christ.";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Church Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-gold-400 uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              ESTABLISHED IN FAITH
            </span>
            <h1 className="font-outfit text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              {heroTitle}
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              {heroSubtext}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/membership"
                className="w-full sm:w-auto px-10 py-4 bg-gold-600 text-white font-bold rounded-2xl hover:bg-gold-500 transition-all hover:scale-105 shadow-2xl shadow-gold-600/30 active:scale-95"
              >
                Get Started
              </Link>
              <a
                href="#service-times"
                className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/30 active:scale-95"
              >
                View Service Times
              </a>
            </div>
          </div>
        </section>

        {/* Quick Access Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/membership" className="group p-8 rounded-[32px] bg-gold-50/50 border border-gold-100 hover:bg-gold-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-200">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="size-8 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">Membership</h3>
                <p className="text-gray-600 mb-6 group-hover:text-white/80 transition-colors">Become a part of our growing family. Register today and stay connected with our community.</p>
                <span className="inline-flex items-center text-gold-600 font-bold group-hover:text-white group-hover:gap-2 transition-all">
                  Register Now <span className="ml-1">→</span>
                </span>
              </Link>

              <Link href="/payments" className="group p-8 rounded-[32px] bg-gray-50 border border-gray-100 hover:bg-gold-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-200">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="size-8 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">Giving</h3>
                <p className="text-gray-600 mb-6 group-hover:text-white/80 transition-colors">Support the work of God through your tithes, offerings, and donations. Secure and simple.</p>
                <span className="inline-flex items-center text-gold-600 font-bold group-hover:text-white group-hover:gap-2 transition-all">
                  Give Online <span className="ml-1">→</span>
                </span>
              </Link>

              <Link href="/attendance" className="group p-8 rounded-[32px] bg-gray-50 border border-gray-100 hover:bg-gold-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-200">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="size-8 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">Attendance</h3>
                <p className="text-gray-600 mb-6 group-hover:text-white/80 transition-colors">Checking in for services? Use our digital attendance card for quick and easy check-in.</p>
                <span className="inline-flex items-center text-gold-600 font-bold group-hover:text-white group-hover:gap-2 transition-all">
                  Check In <span className="ml-1">→</span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Pastor's Section (New) */}
        <section className="py-24 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1665495005618-6f55e5f77a07?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Head Pastor"
                    className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-10">
                    <p className="text-white font-bold text-2xl font-outfit">Resident Pastor</p>
                    <p className="text-gold-400 font-semibold">MBCI Head Office</p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="font-outfit text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Meet Our <br /><span className="text-gold-600 underline underline-offset-8 decoration-gold-200">Spiritual Counselor</span></h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Greetings in the name of our Lord Jesus Christ! I am honored to welcome you to Mega Blessing Chapel International, where we believe every life is a masterpiece in the making.
                  </p>
                  <p>
                    Our mission is to empower individuals through the profound teachings of the Word, vibrant worship, and a community that truly feels like family. Whether you are seeking spiritual growth, healing, or a place to belong, our doors and hearts are open to you.
                  </p>
                  <p className="font-medium text-gray-900 italic border-l-4 border-gold-600 pl-6 py-2">
                    "I look forward to meeting you in person at one of our services as we experience the overflowing blessings of God together."
                  </p>
                </div>
                <div className="mt-10 flex items-center gap-6">
                  <Link href="/about" className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all">Read More About Us</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Temples Section */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-gold-600 font-bold uppercase tracking-widest text-sm mb-4 block">Branches</span>
              <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4">Our Temples</h2>
              <p className="text-gray-600 max-w-xl mx-auto">One Church, Multiple Locations. Experience the presence of God at any of our branches.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group relative rounded-[40px] overflow-hidden shadow-2xl shadow-gold-50 border border-gray-100 bg-gray-50 p-4 transition-all hover:scale-[1.01]">
                <div className="relative h-[350px] rounded-[32px] overflow-hidden mb-8">
                  <img src="https://plus.unsplash.com/premium_photo-1678233035754-8ea508fb30b5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="The Throne of Grace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-gold-600 font-bold text-sm border border-white/40">HEADQUARTERS</div>
                </div>
                <div className="px-6 pb-8">
                  <h3 className="font-outfit text-3xl font-bold text-gray-900 mb-4 tracking-tight">The Throne of Grace</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">Our flagship branch where it all began. A place of deep worship, profound teachings, and an undeniable atmosphere of divine mercy.</p>
                  <div className="flex items-center gap-2 text-gold-600 font-bold">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" /></svg>
                    <span>Branch Location 1, Accra</span>
                  </div>
                </div>
              </div>

              <div className="group relative rounded-[40px] overflow-hidden shadow-2xl shadow-gold-50 border border-gray-100 bg-gray-50 p-4 transition-all hover:scale-[1.01]">
                <div className="relative h-[350px] rounded-[32px] overflow-hidden mb-8">
                  <img src="https://plus.unsplash.com/premium_photo-1669223464455-26df96c59901?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNodXJjaHxlbnwwfHwwfHx8MA%3D%3D" alt="Recovery Temple" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-gold-600 font-bold text-sm border border-white/40">RESTORATION CENTER</div>
                </div>
                <div className="px-6 pb-8">
                  <h3 className="font-outfit text-3xl font-bold text-gray-900 mb-4 tracking-tight">Recovery Temple</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">A sanctuary dedicated to spiritual restoration and emotional healing. Experience a new beginning in Christ’s unfailing embrace.</p>
                  <div className="flex items-center gap-2 text-gold-600 font-bold">
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" /></svg>
                    <span>Branch Location 2, Kumasi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Times Section */}
        <section id="service-times" className="py-24 bg-gray-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-outfit text-4xl md:text-5xl font-bold mb-4 tracking-tight">Worship With Us</h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">We invite you to join us in person or online for any of our weekly services.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all hover:-translate-y-2 group">
                <span className="block text-gold-400 font-bold mb-3 uppercase tracking-widest text-xs">SUNDAY</span>
                <h4 className="text-2xl font-bold mb-3 group-hover:text-gold-400 transition-colors">Main Worship</h4>
                <p className="text-gray-400 italic">8:30 AM - 11:30 AM</p>
              </div>
              <div className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all hover:-translate-y-2 group">
                <span className="block text-gold-400 font-bold mb-3 uppercase tracking-widest text-xs">WEDNESDAY</span>
                <h4 className="text-2xl font-bold mb-3 group-hover:text-gold-400 transition-colors">Prophetic Service</h4>
                <p className="text-gray-400 italic">6:00 PM - 8:00 PM</p>
              </div>
              <div className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all hover:-translate-y-2 group">
                <span className="block text-gold-400 font-bold mb-3 uppercase tracking-widest text-xs">SATURDAY</span>
                <h4 className="text-2xl font-bold mb-3 group-hover:text-gold-400 transition-colors">Youth Meeting</h4>
                <p className="text-gray-400 italic">4:00 PM - 6:00 PM</p>
              </div>
              <div className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all hover:-translate-y-2 group">
                <span className="block text-gold-400 font-bold mb-3 uppercase tracking-widest text-xs">MONTHLY</span>
                <h4 className="text-2xl font-bold mb-3 group-hover:text-gold-400 transition-colors">Men's Ministry</h4>
                <p className="text-gray-400 italic">Last Sat: 7:00 AM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ministries Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
              <div className="max-w-xl text-left">
                <h2 className="font-outfit text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Ministries</h2>
                <p className="text-gray-600 text-lg">Discover where you fit in. We have a place for everyone to serve and grow.</p>
              </div>
              <Link href="/membership" className="group text-gold-600 font-bold flex items-center gap-2 hover:gap-4 transition-all underline decoration-2 underline-offset-8 decoration-gold-200">
                Join a Department <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-lg shadow-gray-200">
                <img src="https://images.unsplash.com/photo-1697490251825-0d6f7f3f7254?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Music Ministry" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent pt-32 px-10 flex flex-col justify-end pb-12">
                  <h4 className="text-3xl font-bold text-white mb-4">Music Ministry</h4>
                  <p className="text-gray-200 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 font-light leading-relaxed">
                    Elevating souls through heavenly worship and praise. Join our choir or instrumental team.
                  </p>
                </div>
              </div>

              <div className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-lg shadow-gray-200">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" alt="Youth Ministry" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent pt-32 px-10 flex flex-col justify-end pb-12">
                  <h4 className="text-3xl font-bold text-white mb-4">The Youth Hive</h4>
                  <p className="text-gray-200 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 font-light leading-relaxed">
                    Empowering the next generation for Christ's mission. A place for fun, faith, and fellowship.
                  </p>
                </div>
              </div>

              <div className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-lg shadow-gray-200">
                <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800" alt="Prayer Ministry" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent pt-32 px-10 flex flex-col justify-end pb-12">
                  <h4 className="text-3xl font-bold text-white mb-4">Prayer Warriors</h4>
                  <p className="text-gray-200 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 font-light leading-relaxed">
                    Standing in the gap for the church and the nations. Experience the power of intercession.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-gradient bg-gray-900 text-white border-t border-white/5 py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-3">
              <img src="/church logo.png" alt="MBCI Logo" className="h-12 w-auto" />
              <span className="font-outfit text-2xl font-bold tracking-tight">Mega Blessing Chapel</span>
            </div>
            <p className="text-gray-400 font-light leading-relaxed">
              Serving our community through faith, hope, and love since the establishment of our glorious mission.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-gold-400 uppercase tracking-widest text-sm">Navigation</h5>
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/membership" className="text-gray-300 hover:text-white transition-colors">Membership</Link>
              <Link href="/events" className="text-gray-300 hover:text-white transition-colors">Upcoming Events</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-gold-400 uppercase tracking-widest text-sm">Action</h5>
              <Link href="/payments" className="text-gray-300 hover:text-white transition-colors">Give Online</Link>
              <Link href="/attendance" className="text-gray-300 hover:text-white transition-colors">Service Check-in</Link>
              <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">Media Gallery</Link>
            </div>
          </div>

          <div className="w-full md:w-auto pt-8 md:pt-0 border-t md:border-t-0 border-white/10">
            <p className="text-sm text-gray-500 font-medium tracking-tight whitespace-nowrap">&copy; 2026 Mega Blessing Chapel International. <br className="md:hidden" /> All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
