"use client";

import { useState, useEffect } from "react";

// Church Location (Example: Throne of Grace, Accra)
const CHURCH_COORDS = {
    lat: 5.6037,
    lng: -0.1870
};
const MAX_DISTANCE_METERS = 200; // 200 meters tolerance

export default function AttendancePage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [locError, setLocError] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [distance, setDistance] = useState<number | null>(null);

    // --- LOCATION VERIFICATION (commented out for testing) ---
    // useEffect(() => {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const userLat = position.coords.latitude;
    //                 const userLng = position.coords.longitude;
    //                 setLocation({ lat: userLat, lng: userLng });
    //                 const dist = calculateDistance(userLat, userLng, CHURCH_COORDS.lat, CHURCH_COORDS.lng);
    //                 setDistance(Math.round(dist));
    //                 if (dist <= MAX_DISTANCE_METERS) {
    //                     setIsVerified(true); setLocError("");
    //                 } else {
    //                     setIsVerified(false);
    //                     setLocError(`You are ${Math.round(dist)}m away from the temple.`);
    //                 }
    //             },
    //             (err) => { setLocError("Location access is required."); }
    //         );
    //     } else { setLocError("Browser does not support geolocation."); }
    // }, []);

    function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371e3; // Earth radius in meters
        const phi1 = lat1 * Math.PI / 180;
        const phi2 = lat2 * Math.PI / 180;
        const dPhi = (lat2 - lat1) * Math.PI / 180;
        const dLambda = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(dLambda / 2) * Math.sin(dLambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // in meters
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // --- LOCATION GUARD (commented out for testing) ---
        // if (!isVerified) {
        //     setError("Attendance cannot be recorded remotely. Please ensure you are at the church premises.");
        //     return;
        // }

        setLoading(true);
        setError("");
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const payload = {
            fullName: formData.get("fullName"),
            phoneNumber: formData.get("phoneNumber"),
            serviceType: formData.get("serviceType"),
            membersCount: formData.get("membersCount") || "1",
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch("/api/attendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to record attendance");

            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gold-50/30">
                    <h2 className="font-outfit text-3xl font-bold text-gray-900">Service Attendance</h2>
                    <p className="text-gray-600 mt-2">Checking in for today's glorious service.</p>
                </div>

                {/* LOCATION UI - commented out for testing. Re-enable by wrapping with: 
                    <div className="px-8 pt-6"> ... </div>
                    and restoring the geolocation useEffect + isVerified guard.
                */}

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {success && (
                        <div className="p-6 bg-green-100 text-green-800 rounded-2xl border border-green-200 font-bold text-center animate-in fade-in zoom-in duration-500">
                            Check-in Successful! Welcome to Service.
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all outline-none"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all outline-none"
                                placeholder="Phone number"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-1">Service Type</label>
                                <select
                                    name="serviceType"
                                    id="serviceType"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all outline-none bg-white"
                                >
                                    <option value="">Select Service</option>
                                    <option value="SUNDAY_SERVICE">Sunday Service</option>
                                    <option value="WEDNESDAY_SERVICE">Wednesday Prophetic Service</option>
                                    <option value="YOUTH_MEETING">Youth Meeting</option>
                                    <option value="MEN_MEETING">Men's Meeting</option>
                                    <option value="WOMEN_MEETING">Women's Meeting</option>
                                    <option value="SPECIAL_PROGRAM">Special Program</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="membersCount" className="block text-sm font-semibold text-gray-700 mb-1">Count (Family/Group)</label>
                                <input
                                    type="number"
                                    name="membersCount"
                                    id="membersCount"
                                    min="1"
                                    defaultValue="1"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gold-600 hover:bg-gold-500 shadow-gold-200"}`}
                    >
                        {loading ? "Recording..." : "Check In Now"}
                    </button>
                </form>
            </div>
        </div>
    );
}
