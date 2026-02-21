const fs = require('fs');
const path = require('path');

// Simple .env parser to avoid 'dotenv' dependency
function loadEnv() {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf-8");
        content.split("\n").forEach(line => {
            const [key, ...valueParts] = line.split("=");
            if (key && valueParts.length > 0) {
                process.env[key.trim()] = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
            }
        });
    }
}

loadEnv();

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

async function listTable(tableName) {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.error("Missing AIRTABLE credentials in .env.local");
        return;
    }

    console.log(`\n--- Live Data: ${tableName} ---`);
    try {
        const response = await fetch(`${BASE_URL}/${tableName}?maxRecords=5`, {
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
        });

        if (!response.ok) {
            const err = await response.json();
            console.error(`Error:`, JSON.stringify(err, null, 2));
            return;
        }

        const data = await response.json();
        const records = data.records;
        if (records.length === 0) {
            console.log("No records found.");
        } else {
            console.log(JSON.stringify(records.map((r) => ({ id: r.id, ...r.fields })), null, 2));
        }
    } catch (error) {
        console.error(`Network Error:`, error.message);
    }
}

async function testWebhooks() {
    const webhooks = [
        { name: "Registration", url: process.env.N8N_WEBHOOK_URL },
        { name: "Attendance", url: process.env.N8N_ATTENDANCE_WEBHOOK_URL },
        { name: "Payments", url: process.env.N8N_PAYMENT_WEBHOOK_URL }
    ];

    console.log("\n--- Webhook Status Check ---");
    for (const hook of webhooks) {
        if (!hook.url) {
            console.log(`[?] ${hook.name}: URL not defined in .env.local`);
            continue;
        }
        try {
            console.log(`[*] ${hook.name}: Testing ${hook.url}...`);
            const response = await fetch(hook.url);
            console.log(`[+] ${hook.name}: Server reachable (Status: ${response.status})`);
        } catch (error) {
            console.log(`[-] ${hook.name}: Connection failed: ${error.message}`);
        }
    }
}

const args = process.argv.slice(2);
const command = args[0];
const param = args[1];

if (command === "--table" && param) {
    listTable(param);
} else if (command === "--webhooks") {
    testWebhooks();
} else {
    console.log("Usage:");
    console.log("  node scripts/inspect.js --table <TableName>");
    console.log("  node scripts/inspect.js --webhooks");
}
