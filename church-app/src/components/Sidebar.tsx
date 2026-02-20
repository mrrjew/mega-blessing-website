"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    {
        name: "Home", href: "/", icon: (active: boolean) => (
            <svg className={`size-6 shrink-0 ${active ? "text-gold-600" : "text-gray-400 group-hover:text-gold-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        name: "About Us", href: "/about", icon: (active: boolean) => (
            <svg className={`size-6 shrink-0 ${active ? "text-gold-600" : "text-gray-400 group-hover:text-gold-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        name: "Leadership", href: "/leadership", icon: (active: boolean) => (
            <svg className={`size-6 shrink-0 ${active ? "text-gold-600" : "text-gray-400 group-hover:text-gold-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0Zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        name: "Membership", href: "/membership", icon: (active: boolean) => (
            <svg className={`size-6 shrink-0 ${active ? "text-gold-600" : "text-gray-400 group-hover:text-gold-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        name: "Events", href: "/events", icon: (active: boolean) => (
            <svg className={`size-6 shrink-0 ${active ? "text-gold-600" : "text-gray-400 group-hover:text-gold-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        name: "Gallery", href: "/gallery", icon: (active: boolean) => (
            <svg className={`size-6 shrink-0 ${active ? "text-gold-600" : "text-gray-400 group-hover:text-gold-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        name: "Payments", href: "/payments", icon: (active: boolean) => (
            <svg className={`size-6 shrink-0 ${active ? "text-gold-600" : "text-gray-400 group-hover:text-gold-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        name: "Attendance", href: "/attendance", icon: (active: boolean) => (
            <svg className={`size-6 shrink-0 ${active ? "text-gold-600" : "text-gray-400 group-hover:text-gold-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                    <Link href="/">
                        <img src="/church logo.png" alt="MBCI Logo" className="h-12 w-auto" />
                    </Link>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => {
                                    const active = pathname === item.href;
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={`
                          group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold
                          ${active ? "bg-gold-50 text-gold-600" : "text-gray-700 hover:bg-gold-50 hover:text-gold-600"}
                        `}
                                            >
                                                {item.icon(active)}
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
