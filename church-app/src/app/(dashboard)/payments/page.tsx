"use client";

import { useState } from "react";
import Script from "next/script";

declare const PaystackPop: any;

export default function GivingPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setType(val);
        if (val === "welfare_dues") {
            setAmount("50");
        } else if (val === "youth_dues") {
            setAmount("10");
        } else {
            setAmount("");
        }
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;

        const handler = PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
            email: email,
            amount: parseFloat(amount) * 100, // Kobo
            currency: "GHS",
            ref: "CHURCH-" + Math.floor(Math.random() * 1000000000 + 1),
            metadata: {
                custom_fields: [
                    { display_name: "Full Name", variable_name: "full_name", value: name },
                    { display_name: "Phone Number", variable_name: "phone_number", value: phone },
                    { display_name: "Payment Type", variable_name: "payment_type", value: type },
                ],
            },
            callback: async function (response: any) {
                try {
                    const verifyRes = await fetch("/api/pay", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            reference: response.reference,
                            email,
                            name,
                            phone,
                            amount,
                            paymentType: type,
                        }),
                    });
                    if (verifyRes.ok) {
                        setSuccess(true);
                    } else {
                        setError("Payment recorded locally, but failed to sync reach server.");
                    }
                } catch (err) {
                    setError("Error verifying payment.");
                } finally {
                    setLoading(false);
                }
            },
            onClose: function () {
                setLoading(false);
            },
        });

        handler.openIframe();
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gold-50/30">
                    <h2 className="font-outfit text-3xl font-bold text-gray-900">Giving & Donations</h2>
                    <p className="text-gray-600 mt-2">Support the work of God through your tithes, offerings, and special seeds.</p>
                </div>

                <form onSubmit={handlePayment} className="p-8 space-y-6">
                    {success && (
                        <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 font-medium">
                            Thank you for your generous giving! May the Lord bless you abundantly.
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 font-medium font-outfit">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500" placeholder="Your name" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500" placeholder="email@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                                <input name="phone" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500" placeholder="024..." />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Payment For</label>
                                <select
                                    name="type"
                                    required
                                    value={type}
                                    onChange={handleTypeChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500 bg-white"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Tithes">Tithes</option>
                                    <option value="Offertory">Offertory</option>
                                    <option value="SeedSowing">Seed Sowing</option>
                                    <option value="welfare_dues">Welfare Dues (GHS 50)</option>
                                    <option value="youth_dues">Youth Dues (GHS 10)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (GHS)</label>
                                <input
                                    name="amount"
                                    type="number"
                                    required
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    disabled={type === "welfare_dues" || type === "youth_dues"}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500 disabled:bg-gray-50"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-[1.02] ${loading ? "bg-gold-400 cursor-not-allowed" : "bg-gold-600 hover:bg-gold-500 shadow-gold-200"}`}
                    >
                        {loading ? "Processing..." : `Pay GHS ${amount || "0.00"}`}
                    </button>
                </form>
            </div>
        </div>
    );
}
