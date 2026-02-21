"use client";

import { useState, useRef, useCallback } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

type UploadTarget = "gallery" | "leadership" | "events" | "site";

interface UploadedImage {
    url: string;
    publicId: string;
}

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Upload state
    const [activeTab, setActiveTab] = useState<UploadTarget>("gallery");
    const [uploading, setUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
    const [uploadError, setUploadError] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Form state
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Auth ---
    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (passwordInput === ADMIN_PASSWORD) {
            setAuthenticated(true);
            setPasswordError("");
        } else {
            setPasswordError("Incorrect password. Try again.");
        }
    }

    // --- Upload ---
    async function uploadToCloudinary(file: File): Promise<UploadedImage> {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            throw new Error("Cloudinary is not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to your .env.local file.");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", `mbci/${activeTab}`);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: "POST", body: formData }
        );

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || "Upload failed");
        }

        const data = await response.json();
        return { url: data.secure_url, publicId: data.public_id };
    }

    async function handleFile(file: File) {
        if (!file.type.startsWith("image/")) {
            setUploadError("Only image files are allowed.");
            return;
        }

        // Preview
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);

        setUploading(true);
        setUploadError("");
        setUploadedImage(null);
        setSaveSuccess(false);

        try {
            const result = await uploadToCloudinary(file);
            setUploadedImage(result);
        } catch (err: any) {
            setUploadError(err.message);
        } finally {
            setUploading(false);
        }
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [activeTab]);

    function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }

    async function copyUrl() {
        if (!uploadedImage) return;
        await navigator.clipboard.writeText(uploadedImage.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function resetUpload() {
        setUploadedImage(null);
        setPreview(null);
        setUploadError("");
        setSaveSuccess(false);
        setSaveError("");
        setFormData({});
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    // --- Save to Airtable ---
    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        if (!uploadedImage) return;

        setSaving(true);
        setSaveError("");
        setSaveSuccess(false);

        try {
            const res = await fetch("/api/admin/save-content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    target: activeTab,
                    imageUrl: uploadedImage.url,
                    ...formData,
                }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Save failed");
            setSaveSuccess(true);
            setTimeout(() => resetUpload(), 2000);
        } catch (err: any) {
            setSaveError(err.message);
        } finally {
            setSaving(false);
        }
    }

    // --- Tab form fields ---
    const tabConfig: Record<UploadTarget, { label: string; fields: { name: string; label: string; placeholder: string; required?: boolean }[] }> = {
        gallery: {
            label: "Gallery",
            fields: [
                { name: "title", label: "Photo Title", placeholder: "e.g. Sunday Service June 2025", required: true },
                { name: "category", label: "Category", placeholder: "e.g. Service, Youth, Choir" },
                { name: "date", label: "Date (optional)", placeholder: "e.g. 2025-06-01" },
            ]
        },
        leadership: {
            label: "Leadership",
            fields: [
                { name: "name", label: "Full Name", placeholder: "e.g. Elder John Mensah", required: true },
                { name: "role", label: "Role / Title", placeholder: "e.g. Head of Worship", required: true },
                { name: "department", label: "Department", placeholder: "e.g. Worship Department" },
            ]
        },
        events: {
            label: "Events",
            fields: [
                { name: "title", label: "Event Name", placeholder: "e.g. Annual Convention 2025", required: true },
                { name: "date", label: "Event Date", placeholder: "e.g. 2025-08-15", required: true },
                { name: "description", label: "Description", placeholder: "Brief event description" },
            ]
        },
        site: {
            label: "Site Content",
            fields: [
                { name: "section", label: "Section", placeholder: "e.g. Hero, About Banner, Pastor Photo", required: true },
                { name: "note", label: "Note", placeholder: "Any notes about this image" },
            ]
        },
    };

    // --- Password Screen ---
    if (!authenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <img src="/church logo.png" alt="MBCI" className="h-16 w-auto mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-white font-outfit">Admin Panel</h1>
                        <p className="text-gray-400 text-sm mt-1">Mega Blessing Chapel — Church Management</p>
                    </div>

                    <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Admin Password</label>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                                placeholder="Enter admin password"
                                autoFocus
                            />
                            {passwordError && <p className="text-red-400 text-sm mt-2">{passwordError}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold transition-all"
                        >
                            Access Panel
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-xs mt-6">
                        This page is restricted to church administrators only.
                    </p>
                </div>
            </div>
        );
    }

    const config = tabConfig[activeTab];

    // --- Admin Panel ---
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src="/church logo.png" alt="MBCI" className="h-10 w-auto" />
                    <div>
                        <h1 className="font-outfit font-bold text-gray-900">Admin Panel</h1>
                        <p className="text-xs text-gray-400">Content Management</p>
                    </div>
                </div>
                <button
                    onClick={() => setAuthenticated(false)}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors font-medium"
                >
                    Sign Out
                </button>
            </header>

            <div className="max-w-4xl mx-auto p-6">
                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-white rounded-2xl p-2 border border-gray-100 shadow-sm">
                    {(Object.keys(tabConfig) as UploadTarget[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); resetUpload(); }}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab
                                ? "bg-gold-600 text-white shadow-sm"
                                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
                        >
                            {tabConfig[tab].label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upload Zone */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-semibold text-gray-900 mb-4">Upload Image</h2>

                        {!uploadedImage ? (
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragOver ? "border-gold-500 bg-gold-50" : "border-gray-200 hover:border-gold-400 hover:bg-gray-50"}`}
                            >
                                {uploading ? (
                                    <div className="space-y-3">
                                        <div className="size-12 mx-auto rounded-full border-4 border-gold-200 border-t-gold-600 animate-spin" />
                                        <p className="text-sm text-gray-500 font-medium">Uploading to Cloudinary...</p>
                                    </div>
                                ) : preview ? (
                                    <div className="space-y-3">
                                        <img src={preview} className="w-full h-40 object-cover rounded-xl" alt="Preview" />
                                        <p className="text-xs text-gray-400">Uploading...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="size-14 mx-auto bg-gold-50 rounded-2xl flex items-center justify-center">
                                            <svg className="size-7 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700">Drop image here</p>
                                            <p className="text-xs text-gray-400 mt-1">or click to browse from your PC</p>
                                        </div>
                                        <p className="text-xs text-gray-300">PNG, JPG, WEBP — max 10MB</p>
                                    </div>
                                )}
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="relative rounded-2xl overflow-hidden">
                                    <img src={uploadedImage.url} className="w-full h-48 object-cover" alt="Uploaded" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-3 left-3">
                                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">✓ Uploaded to Cloudinary</span>
                                    </div>
                                </div>

                                {/* URL display */}
                                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                    <p className="text-xs text-gray-500 font-medium mb-1">Image URL</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-gray-700 flex-1 truncate font-mono">{uploadedImage.url}</p>
                                        <button
                                            onClick={copyUrl}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${copied ? "bg-green-500 text-white" : "bg-gold-100 text-gold-700 hover:bg-gold-200"}`}
                                        >
                                            {copied ? "Copied!" : "Copy"}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={resetUpload}
                                    className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Upload Different Image
                                </button>
                            </div>
                        )}

                        {uploadError && (
                            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                                {uploadError}
                            </div>
                        )}
                    </div>

                    {/* Metadata Form */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-semibold text-gray-900 mb-4">Save to Website</h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            {config.fields.map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        {field.label}
                                        {field.required && <span className="text-red-400 ml-1">*</span>}
                                    </label>
                                    <input
                                        type="text"
                                        required={field.required}
                                        placeholder={field.placeholder}
                                        value={formData[field.name] || ""}
                                        onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-sm transition-all"
                                    />
                                </div>
                            ))}

                            {saveSuccess && (
                                <div className="p-3 bg-green-50 text-green-700 text-sm rounded-xl border border-green-100 font-medium text-center">
                                    ✓ Saved to Airtable successfully!
                                </div>
                            )}
                            {saveError && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                                    {saveError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!uploadedImage || saving}
                                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all ${!uploadedImage || saving
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-gold-600 hover:bg-gold-500 hover:scale-[1.01] active:scale-[0.99]"}`}
                            >
                                {saving ? "Saving..." : `Save to ${config.label}`}
                            </button>
                            <p className="text-xs text-gray-400 text-center">
                                {!uploadedImage ? "Upload an image first before saving." : "This will add the entry to your Airtable and update the website."}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
