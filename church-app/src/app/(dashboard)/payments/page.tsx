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
    const [customRecurring, setCustomRecurring] = useState(false);
    const [consent, setConsent] = useState(false);

    const PLAN_MAPPING: Record<string, string> = {
        // TEST plans (active during development)
        "youth_dues": "PLN_xqgayymm4zzh473",
        "welfare_dues": "PLN_fkvaiyp8dktyhz2",
        // LIVE plans (uncomment when switching to live key: pk_live_...)
        // "youth_dues": "PLN_lbb3kiwp55dbmtb",
        // "welfare_dues": "PLN_4zpsse91k75t686",
    };

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

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;

        // Basic validation
        if (!email || !name || !phone || !amount || !type) {
            setError("Please fill in all required fields before proceeding.");
            return;
        }

        if (customRecurring && !consent) {
            setError("Please accept the recurring payment authorization to proceed.");
            setLoading(false);
            return;
        }

        if (parseFloat(amount) <= 0) {
            setError("Please enter a valid amount greater than zero.");
            return;
        }

        setLoading(true);
        setError("");

        if (typeof PaystackPop === 'undefined') {
            setError("Payment system is still loading. Please wait a moment and try again.");
            setLoading(false);
            return;
        }

        try {
            const planCode = customRecurring ? PLAN_MAPPING[type] : undefined;
            const paystackConfig: any = {
                key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
                email: email,
                ref: "CHURCH-" + Math.floor(Math.random() * 1000000000 + 1),
                metadata: {
                    custom_fields: [
                        { display_name: "Full Name", variable_name: "full_name", value: name },
                        { display_name: "Phone Number", variable_name: "phone_number", value: phone },
                        { display_name: "Payment Type", variable_name: "payment_type", value: type },
                    ],
                },
                callback: function (response: any) {
                    // Paystack requires a plain (non-async) callback. Async logic is wrapped in an IIFE.
                    (async () => {
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
                                    isRecurring: customRecurring || type === "welfare_dues" || type === "youth_dues"
                                }),
                            });

                            const result = await verifyRes.json();

                            if (verifyRes.ok && result.success) {
                                setSuccess(true);
                                setError("");
                            } else {
                                setError(result.error || "Payment was successful, but we encountered an error syncing with the church records. Please screenshot your receipt and contact administration.");
                            }
                        } catch (err) {
                            setError("Network error verifying your payment. Please keep your transaction reference.");
                        } finally {
                            setLoading(false);
                        }
                    })();
                },
                onClose: function () {
                    setLoading(false);
                    setError("Transaction cancelled.");
                },
            };

            // Only set plan OR amount+currency, never both
            if (planCode) {
                paystackConfig.plan = planCode;
            } else {
                paystackConfig.amount = Math.round(parseFloat(amount) * 100);
                paystackConfig.currency = "GHS";
            }

            console.log("[Paystack] Initializing with config:", { ...paystackConfig, key: "***" });
            const handler = PaystackPop.setup(paystackConfig);
            handler.openIframe();
        } catch (err: any) {
            console.error("[Paystack] Failed to initialize:", err);
            setError(`Could not initialize payment system: ${err?.message || "Unknown error"}. Please try again.`);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gold-50/30">
                    <h2 className="font-outfit text-3xl font-bold text-gray-900">Giving & Donations</h2>
                    <p className="text-gray-600 mt-2">Support the work of God through your tithes, offerings, and special seeds.</p>
                </div>

                <form onSubmit={handlePayment} className="p-8 space-y-6">
                    <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
                    {success ? (
                        <div className="p-10 text-center animate-in fade-in zoom-in duration-500 bg-green-50 rounded-2xl border border-green-100">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold border-4 border-white shadow-lg">✓</div>
                            <h4 className="font-outfit text-3xl font-bold text-gray-900 mb-2">Thank You!</h4>
                            <p className="text-gray-600 max-w-md mx-auto">Your generous gift has been recorded. May the Lord bless you abundantly for your support of the ministry.</p>
                            <button
                                type="button"
                                onClick={() => { setSuccess(false); setAmount(""); setType(""); }}
                                className="mt-8 px-8 py-3 bg-gold-600 text-white font-bold rounded-xl hover:bg-gold-500 transition-all shadow-lg shadow-gold-200"
                            >
                                Make Another Giving
                            </button>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 font-medium font-outfit flex items-center gap-3">
                                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                    <input name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500 transition-all" placeholder="Your name" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                        <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500 transition-all" placeholder="email@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                                        <input name="phone" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500 transition-all" placeholder="024..." />
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
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500 bg-white transition-all"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Tithes">Tithes</option>
                                            <option value="offering">Offertory/Offering</option>
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
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold-500 disabled:bg-gray-50 transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {(type === "welfare_dues" || type === "youth_dues") ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gold-50 rounded-xl border border-gold-100 flex items-start gap-3">
                                            <div className="p-2 bg-white rounded-lg text-gold-600">
                                                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-bold text-gold-900">Automatic Monthly Payment</p>
                                                    <input
                                                        type="checkbox"
                                                        checked={customRecurring}
                                                        onChange={(e) => {
                                                            setCustomRecurring(e.target.checked);
                                                            if (!e.target.checked) setConsent(false);
                                                        }}
                                                        className="size-5 rounded border-gold-300 text-gold-600 focus:ring-gold-500"
                                                    />
                                                </div>
                                                <p className="text-xs text-gold-700/70 mt-1">Welfare and Youth dues are monthly commitments. Enrolling will automatically charge your card every month.</p>
                                            </div>
                                        </div>

                                        {customRecurring && (
                                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 animate-in slide-in-from-top-2 duration-300">
                                                <label className="flex items-start gap-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        required
                                                        checked={consent}
                                                        onChange={(e) => setConsent(e.target.checked)}
                                                        className="mt-1 size-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <p className="text-xs text-blue-800 leading-relaxed font-medium">
                                                        I authorize Mega Blessing Chapel to charge my card automatically every month for this amount. I understand I can cancel this at any time.
                                                    </p>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 italic text-xs text-gray-500 text-center">
                                        Tithe and general seeds are currently manual giving only.
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !amount}
                                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${loading || !amount ? "bg-gray-400 cursor-not-allowed" : "bg-gold-600 hover:bg-gold-500 shadow-gold-200"}`}
                            >
                                {loading ? "Securely Processing..." : `Give GHS ${amount || "0.00"}`}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
