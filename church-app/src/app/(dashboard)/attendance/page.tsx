"use client";

import { useState } from "react";

export default function AttendancePage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
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
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gold-50/30">
                    <h2 className="font-outfit text-3xl font-bold text-gray-900">Service Attendance</h2>
                    <p className="text-gray-600 mt-2">Checking in for today's glorious service.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {success && (
                        <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 font-medium animate-in fade-in slide-in-from-top-4">
                            Thank you! Your attendance has been recorded successfully.
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
                                    <option value="Sunday Service">Sunday Service</option>
                                    <option value="Wednesday Prophetic Service">Wednesday Prophetic Service</option>
                                    <option value="Youth Meeting">Youth Meeting</option>
                                    <option value="Men's Meeting">Men's Meeting</option>
                                    <option value="Special Program">Special Program</option>
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
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${loading ? "bg-gold-400 cursor-not-allowed" : "bg-gold-600 hover:bg-gold-500 shadow-gold-200"}`}
                    >
                        {loading ? "Recording..." : "Check In Now"}
                    </button>
                </form>
            </div>
        </div>
    );
}
