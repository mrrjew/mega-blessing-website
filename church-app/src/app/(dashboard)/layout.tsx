"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const sidebarPaths = ["/membership", "/payments", "/attendance"];
    const showSidebar = sidebarPaths.includes(pathname);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {showSidebar && <Sidebar />}
            <div className={`flex flex-col flex-1 ${showSidebar ? "lg:pl-72" : ""}`}>
                <Navbar compact={showSidebar} />
                <main className="flex-1 py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
