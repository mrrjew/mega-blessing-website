import fs from "fs";
import path from "path";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;
const CACHE_FILE = path.join(process.cwd(), "airtable-cache.json");

// Helper to read from local file cache
function getCache(key: string) {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
            return cache[key] || null;
        }
    } catch (e) {
        console.error(`[AirtableCache] Read error for ${key}:`, e);
    }
    return null;
}

// Helper to write to local file cache
function updateCache(key: string, data: any) {
    try {
        let cache: any = {};
        if (fs.existsSync(CACHE_FILE)) {
            cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
        }
        cache[key] = data;
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    } catch (e) {
        console.error(`[AirtableCache] Write error for ${key}:`, e);
    }
}

async function fetchAirtable(table: string, options: any = {}) {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.warn(`[AirtableService] Missing API Key or Base ID. Fetch for ${table} skipped.`);
        return null;
    }

    try {
        const url = `${BASE_URL}/${table}${options.filterByFormula ? `?filterByFormula=${encodeURIComponent(options.filterByFormula)}` : ""}`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                "Content-Type": "application/json",
            },
            ...options,
            next: { revalidate: options.method === 'POST' ? 0 : 60 },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const message = errorData.error?.message || `Airtable error ${response.status}`;
            console.error(`[AirtableService] API error (${response.status}): ${JSON.stringify(errorData)}`);
            return { error: message, status: response.status };
        }

        const data = await response.json();
        const records = data.records;

        // Update persistent cache on success for GET requests
        if (options.method !== 'POST' && records && records.length > 0) {
            updateCache(table, records);
        }

        return data;
    } catch (error: any) {
        console.error(`[AirtableService] Network error fetching ${table}:`, error);
        return { error: error.message || "Network error", status: 500 };
    }
}

export const AirtableService = {
    async getLeadership() {
        console.log("[AirtableService] Fetching Leadership...");
        const data = await fetchAirtable("Leadership");
        let records = data?.records;

        if (!records) {
            console.log("[AirtableService] Leadership fetch failed. Checking local cache...");
            records = getCache("Leadership");
        }

        if (!records) return null;

        return records.map((record: any) => ({
            id: record.id,
            name: record.fields.Name,
            role: record.fields.Role,
            image: typeof record.fields.Photo === 'string' ? record.fields.Photo : record.fields.Photo?.[0]?.url,
            bio: record.fields.Bio,
            department: record.fields.Department?.[0] || null,
        }));
    },

    async getDepartments() {
        console.log("[AirtableService] Fetching Departments...");
        const data = await fetchAirtable("Departments");
        let records = data?.records;

        if (!records) {
            console.log("[AirtableService] Departments fetch failed. Checking local cache...");
            records = getCache("Departments");
        }

        if (!records) return null;

        return records.map((record: any) => ({
            id: record.id,
            name: record.fields.Department_Name,
            head: record.fields.Head_of_Department?.[0] || null,
            members: record.fields.Member_Names
                ? (typeof record.fields.Member_Names === 'string' ? record.fields.Member_Names.split(",").map((m: string) => m.trim()) : record.fields.Member_Names)
                : [],
        }));
    },

    async getEvents() {
        console.log("[AirtableService] Fetching Events...");
        const data = await fetchAirtable("Events");
        let records = data?.records;

        if (!records) {
            console.log("[AirtableService] Events fetch failed. Checking local cache...");
            records = getCache("Events");
        }

        if (!records) return null;

        return records.map((record: any) => ({
            id: record.id,
            title: record.fields.Title,
            date: record.fields.Date,
            time: record.fields.Time_Range,
            location: record.fields.Location,
            category: record.fields.Category,
            description: record.fields.Short_Description,
            longDescription: record.fields.Long_Description,
            image: typeof record.fields.Image_URL === 'string' ? record.fields.Image_URL : record.fields.Image_URL?.[0]?.url,
        }));
    },

    async getGallery() {
        console.log("[AirtableService] Fetching Gallery...");
        const data = await fetchAirtable("Gallery");
        let records = data?.records;

        if (!records) {
            console.log("[AirtableService] Gallery fetch failed. Checking local cache...");
            records = getCache("Gallery");
        }

        if (!records) return null;

        return records.map((record: any) => ({
            id: record.id,
            title: record.fields.Title,
            description: record.fields.Description,
            image: typeof record.fields.Image_URL === 'string' ? record.fields.Image_URL : record.fields.Image_URL?.[0]?.url,
        }));
    },

    async getSiteContent() {
        console.log("[AirtableService] Fetching Site_Content...");
        const data = await fetchAirtable("Site_Content");
        let records = data?.records;

        if (!records) {
            console.log("[AirtableService] Site_Content fetch failed. Checking local cache...");
            records = getCache("Site_Content");
        }

        if (!records) return null;

        const content: Record<string, string> = {};
        records.forEach((record: any) => {
            if (record.fields.Key && record.fields.Content) {
                content[record.fields.Key] = record.fields.Content;
            }
        });
        return content;
    },

    // Mutation Methods
    async createMembership(data: any) {
        console.log("[AirtableService] Checking for duplicate membership...");
        const phone = data.contactCountryCode + data.contactNumber;
        // Use EXACT Airtable field name for filter
        const existing = await fetchAirtable("Membership", {
            filterByFormula: `{CONTACT NUMBER} = '${phone}'`
        });

        if (existing?.error) {
            console.error(`[AirtableService] Error during duplicate check: ${existing.error}`);
            return existing;
        }

        if (existing?.records?.length > 0) {
            console.warn(`[AirtableService] Duplicate membership found for phone: ${phone}`);
            return { error: "Phone number already registered", duplicate: true };
        }

        console.log("[AirtableService] Creating new Membership record in live table...");
        const fields = {
            "FULL NAME": data.fullName,
            "DATE OF BIRTH": data.dob,
            "GENDER": data.gender,
            "PLACE OF BIRTH": data.placeOfBirth,
            "HOMETOWN": data.hometown,
            "NATIONALITY": data.nationality,
            "MARITAL STATUS": data.maritalStatus,
            "CONTACT NUMBER": phone,
            "WHATSAPP NUMBER": data.whatsappCountryCode + data.whatsappNumber,
            "YOUR OCCUPATION": data.occupation,
            "PLACE OF WORK/SCHOOL": data.placeOfWorkSchool,
            "RESIDENTIAL ADDRESS": data.residentialAddress,
            "MOTHER'S NAME": data.motherName,
            "MOTHER'S CONDITION": data.motherCondition,
            "FATHER'S NAME": data.fatherName,
            "FATHER'S CONDITION": data.fatherCondition,
            "NAME OF SPOUSE IF MARRIED": data.spouseName,
            "SPOUSE CONTACT": data.spouseCountryCode + data.spouseContact,
            "NUMBER OF CHILDREN IF ANY": data.numberOfChildren?.toString() || "0",
            "NEXT OF KIN": data.nextOfKin,
            "CONTACT": data.nextOfKinCountryCode + data.nextOfKinContact,
            "HAVE YOU BEEN BAPTIZED": (data.baptized?.toUpperCase() === "YES") ? "YES" : "NO",
            "NAME OF PERSON WHO INTRODUCED YOU TO THE CHURCH": data.introducedBy,
            "THE MINISTRIES / DEPARTMENTS OF THE CHRUCH": data.ministries,
            "Submission ID": data.submissionId,
        };

        const result = await fetchAirtable("Membership", {
            method: "POST",
            body: JSON.stringify({ fields }),
        });
        return result?.records?.[0] || result;
    },

    async createPayment(data: any) {
        console.log("[AirtableService] Creating Payment record...");
        const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
        const isRecurring = !!data.isRecurring;
        console.log(`[AirtableService] createPayment - isRecurring: ${isRecurring}, paymentType: ${data.paymentType}`);

        const fields: Record<string, any> = {
            "Reference": data.reference,
            "Full Name": data.name,
            "Email": data.email,
            "Phone Number": data.phone,
            "Amount": parseFloat(data.amount),
            "Payment Type": data.paymentType,
            "Payment Status": "success",
            "Intent": isRecurring ? `Automatic Plan (${data.paymentType})` : "One-Time Giving",
            "Month Paid (Single Select)": currentMonth,
            // Is_Recurring: "Yes"/"No" matches Airtable Single Select field options exactly
            "Is_Recurring": isRecurring ? "Yes" : "No",
            "Frequency": isRecurring ? "Monthly" : "One-Time"
        };

        const result = await fetchAirtable("Payments", {
            method: "POST",
            body: JSON.stringify({ fields }),
        });
        return result?.records?.[0] || result;
    },

    async createAttendance(data: any) {
        console.log("[AirtableService] Creating Attendance record...");
        const serviceMappings: Record<string, string> = {
            "SUNDAY_SERVICE": "Sunday Service",
            "WEDNESDAY_SERVICE": "Wednesday Prophetic Service",
            "YOUTH_MEETING": "Youth Meeting",
            "MEN_MEETING": "Men's Meeting",
            "WOMEN_MEETING": "Women's Meeting",
            "SPECIAL_PROGRAM": "Special Program"
        };

        const now = new Date();
        const checkInTime = now.toISOString();
        const serviceDate = now.toISOString().split("T")[0]; // YYYY-MM-DD

        const fields = {
            "Full Name": data.fullName,
            "Phone Number": data.phoneNumber,
            "Service Type": serviceMappings[data.serviceType] || data.serviceType,
            "Members Count": parseInt(data.membersCount) || 1,
            "Check-In Time": checkInTime,
            "Service Date": serviceDate,
        };

        const result = await fetchAirtable("Attendance", {
            method: "POST",
            body: JSON.stringify({ fields }),
        });
        return result?.records?.[0] || result;
    },

    // ── Admin Content Management ──────────────────────────────────────────

    async createGalleryItem(data: { title: string; imageUrl: string; category: string; date: string }) {
        console.log("[AirtableService] Creating Gallery item...");
        const fields = {
            "Title": data.title,
            "Image": data.imageUrl,
            "Category": data.category,
            "Date": data.date,
        };
        const result = await fetchAirtable("Gallery", { method: "POST", body: JSON.stringify({ fields }) });
        return result?.records?.[0] || result;
    },

    async createLeader(data: { name: string; role: string; department: string; imageUrl: string }) {
        console.log("[AirtableService] Creating Leader record...");
        const fields = {
            "Name": data.name,
            "Role": data.role,
            "Department": data.department,
            "Image": data.imageUrl,
        };
        const result = await fetchAirtable("Leadership", { method: "POST", body: JSON.stringify({ fields }) });
        return result?.records?.[0] || result;
    },

    async createEvent(data: { title: string; date: string; description: string; imageUrl: string }) {
        console.log("[AirtableService] Creating Event record...");
        const fields = {
            "Title": data.title,
            "Date": data.date,
            "Description": data.description,
            "Image": data.imageUrl,
        };
        const result = await fetchAirtable("Events", { method: "POST", body: JSON.stringify({ fields }) });
        return result?.records?.[0] || result;
    },

    async updateSiteContent(data: { section: string; imageUrl: string; note: string }) {
        console.log("[AirtableService] Updating Site Content record...");
        const fields = {
            "Section": data.section,
            "Image URL": data.imageUrl,
            "Note": data.note,
            "Updated At": new Date().toISOString(),
        };
        const result = await fetchAirtable("Site Content", { method: "POST", body: JSON.stringify({ fields }) });
        return result?.records?.[0] || result;
    },
};
