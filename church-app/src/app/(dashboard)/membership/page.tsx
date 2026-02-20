"use client";

import { useState, useEffect } from "react";

const STEPS = [
    { id: 1, name: "Personal" },
    { id: 2, name: "Contact & Work" },
    { id: 3, name: "Family" },
    { id: 4, name: "Church" },
];

export default function MembershipPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        dob: "",
        gender: "",
        placeOfBirth: "",
        hometown: "",
        nationality: "",
        maritalStatus: "Single",
        contactCountryCode: "+233",
        contactNumber: "",
        whatsappCountryCode: "+233",
        whatsappNumber: "",
        occupation: "",
        placeOfWorkSchool: "",
        residentialAddress: "",
        motherName: "",
        motherCondition: "",
        fatherName: "",
        fatherCondition: "",
        spouseName: "",
        spouseCountryCode: "+233",
        spouseContact: "",
        numberOfChildren: "",
        nextOfKin: "",
        nextOfKinCountryCode: "+233",
        nextOfKinContact: "",
        baptized: "",
        introducedBy: "",
        ministries: [] as string[],
    });

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("churchMembershipFormData");
        if (saved) {
            try {
                setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
            } catch (e) {
                console.error("Failed to parse saved form data", e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem("churchMembershipFormData", JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({ ...prev, ministries: values }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (currentStep < STEPS.length) {
            nextStep();
            return;
        }

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    submittedAt: new Date().toISOString(),
                    submissionId: `SUB-${Date.now()}`
                }),
            });

            if (!response.ok) throw new Error("Failed to submit registration");

            setSuccess(true);
            localStorage.removeItem("churchMembershipFormData");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="p-8 border-b border-gray-50 bg-gold-50/20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="font-outfit text-4xl font-bold text-gray-900">Church Membership</h2>
                            <p className="text-gray-600 mt-2">Join our family of believers. Every detail helps us serve you better.</p>
                        </div>
                        {/* Progress indicator */}
                        <div className="flex items-center gap-2">
                            {STEPS.map((step) => (
                                <div
                                    key={step.id}
                                    className={`h-2.5 w-12 rounded-full transition-all duration-500 ${currentStep >= step.id ? "bg-gold-600" : "bg-gray-200"}`}
                                    title={step.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-10">
                    {success ? (
                        <div className="p-10 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold">✓</div>
                            <h4 className="font-outfit text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h4>
                            <p className="text-gray-600 max-w-md mx-auto">Welcome to Mega Blessing Chapel International. We are glad to have you as part of our glorious family.</p>
                            <button type="button" onClick={() => { setSuccess(false); setCurrentStep(1); }} className="mt-8 px-8 py-3 bg-gold-600 text-white font-bold rounded-xl hover:bg-gold-500 transition-all">Register Another</button>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 font-medium font-outfit">
                                    {error}
                                </div>
                            )}

                            {/* Step Title Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-600 text-white font-bold text-lg">
                                    {currentStep}
                                </span>
                                <h3 className="text-2xl font-bold font-outfit text-gray-900">{STEPS[currentStep - 1].name} Details</h3>
                            </div>

                            {/* STEP 1: Personal Details */}
                            {currentStep === 1 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                        <input name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Enter your full name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                                        <input name="dob" type="date" value={formData.dob} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white transition-all">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Place of Birth</label>
                                        <input name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="City/Town" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Hometown</label>
                                        <input name="hometown" value={formData.hometown} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Your hometown" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nationality</label>
                                        <input name="nationality" value={formData.nationality} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Ghanaian, etc." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Marital Status</label>
                                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white transition-all">
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Widowed">Widowed</option>
                                            <option value="Divorced">Divorced</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Contact & Work */}
                            {currentStep === 2 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
                                        <div className="flex gap-2">
                                            <input name="contactCountryCode" value={formData.contactCountryCode} onChange={handleChange} className="w-20 px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center font-bold" />
                                            <input name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} required className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Phone number" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number</label>
                                        <div className="flex gap-2">
                                            <input name="whatsappCountryCode" value={formData.whatsappCountryCode} onChange={handleChange} className="w-20 px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center font-bold" />
                                            <input name="whatsappNumber" type="tel" value={formData.whatsappNumber} onChange={handleChange} required className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="WhatsApp number" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Occupation</label>
                                        <input name="occupation" value={formData.occupation} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Software Engineer, Trading, etc." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Place of Work/School</label>
                                        <input name="placeOfWorkSchool" value={formData.placeOfWorkSchool} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Company or Institution" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Residential Address</label>
                                        <textarea name="residentialAddress" rows={3} value={formData.residentialAddress} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Describe your residential location (House number, Street, Landmark)"></textarea>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Family Details */}
                            {currentStep === 3 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Name</label>
                                        <input name="motherName" value={formData.motherName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Full name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Condition</label>
                                        <select name="motherCondition" value={formData.motherCondition} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white transition-all">
                                            <option value="">Select...</option>
                                            <option value="Alive">Alive</option>
                                            <option value="Dead">Dead</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
                                        <input name="fatherName" value={formData.fatherName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Full name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Condition</label>
                                        <select name="fatherCondition" value={formData.fatherCondition} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white transition-all">
                                            <option value="">Select...</option>
                                            <option value="Alive">Alive</option>
                                            <option value="Dead">Dead</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2">
                                        <h4 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4">Immediate Family (Optional)</h4>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Spouse Name</label>
                                        <input name="spouseName" value={formData.spouseName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="If married" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Spouse Contact</label>
                                        <div className="flex gap-2">
                                            <input name="spouseCountryCode" value={formData.spouseCountryCode} onChange={handleChange} className="w-16 px-2 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center text-xs font-bold" />
                                            <input name="spouseContact" type="tel" value={formData.spouseContact} onChange={handleChange} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Contact number" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Children</label>
                                        <input name="numberOfChildren" type="number" value={formData.numberOfChildren} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="0" />
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: Church Details */}
                            {currentStep === 4 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Next of Kin</label>
                                        <input name="nextOfKin" value={formData.nextOfKin} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Full name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Next of Kin Contact</label>
                                        <div className="flex gap-2">
                                            <input name="nextOfKinCountryCode" value={formData.nextOfKinCountryCode} onChange={handleChange} className="w-20 px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center font-bold" />
                                            <input name="nextOfKinContact" type="tel" value={formData.nextOfKinContact} onChange={handleChange} required className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Contact number" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Have you been baptized?</label>
                                        <select name="baptized" value={formData.baptized} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white transition-all">
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Who introduced you?</label>
                                        <input name="introducedBy" value={formData.introducedBy} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Name of person" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Ministries / Departments</label>
                                        <select
                                            name="ministries"
                                            multiple
                                            required
                                            value={formData.ministries}
                                            onChange={handleMultiSelect}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 outline-none bg-white transition-all h-40 scrollbar-thin scrollbar-thumb-gold-200"
                                        >
                                            <option value="Youth Ministry">Youth Ministry</option>
                                            <option value="Music">Music</option>
                                            <option value="Media">Media</option>
                                            <option value="Ushering">Ushering</option>
                                            <option value="Choir">Choir</option>
                                            <option value="Prayer">Prayer</option>
                                            <option value="Evangelism">Evangelism</option>
                                            <option value="Technical">Technical</option>
                                            <option value="Children Ministry">Children Ministry</option>
                                        </select>
                                        <p className="mt-2 text-xs text-gray-400 font-medium">Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</p>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between pt-10 border-t border-gray-50">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={currentStep === 1 || loading}
                                    className={`px-8 py-4 rounded-xl font-bold transition-all ${currentStep === 1 ? "opacity-0 invisible" : "text-gray-600 hover:bg-gray-100"}`}
                                >
                                    Previous Step
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-10 py-4 rounded-xl font-bold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${loading ? "bg-gold-400 cursor-not-allowed" : "bg-gold-600 hover:bg-gold-500 shadow-gold-200"}`}
                                >
                                    {loading ? "Processing..." : currentStep === STEPS.length ? "Complete Registration" : "Next Step →"}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
