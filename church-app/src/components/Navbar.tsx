"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Leadership", href: "/leadership" },
    { name: "Membership", href: "/membership" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Giving", href: "/payments" },
];

export default function Navbar({ compact = false }: { compact?: boolean }) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center justify-between lg:px-12">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <img src="/church logo.png" alt="MBCI Logo" className="h-10 w-auto" />
                        </Link>
                        <h1 className="font-outfit text-xl font-bold text-gold-600 tracking-tight hidden sm:block">Mega Blessing Chapel</h1>
                    </div>
                </div>

                {!compact && (
                    <nav className="hidden lg:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-semibold transition-colors ${pathname === item.href ? "text-gold-600" : "text-gray-600 hover:text-gold-600"}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                )}

                <div className="flex items-center gap-4">
                    {!compact ? (
                        <Link href="/membership" className="inline-flex items-center rounded-full bg-gold-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-gold-500 transition-all">Join Us</Link>
                    ) : (
                        <div className="hidden lg:block text-xs font-bold text-gray-400 uppercase tracking-widest">Dashboard View</div>
                    )}
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-900/80 transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className="fixed inset-0 flex">
                        <div className="relative mr-16 flex w-full max-w-xs flex-1 transition-transform">
                            {/* Sidebar content (Simplified version of Sidebar component) */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center justify-between">
                                    <img src="/church logo.png" alt="MBCI Logo" className="h-12 w-auto" />
                                    <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname === item.href ? "bg-gray-50 text-gold-600" : "text-gray-700 hover:bg-gray-50 hover:text-gold-600"}`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
