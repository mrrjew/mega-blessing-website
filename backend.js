const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || "https://n8n.gklive.online/webhook/smart-arena/init";

// Middleware
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || "https://smart-arena-automation.vercel.app",
  }),
);
app.use(express.json());

// Register endpoint
app.post("/api/register", async (req, res) => {
  try {
    if (!N8N_WEBHOOK_URL || !/^https?:\/\//.test(N8N_WEBHOOK_URL)) {
      return res.status(500).json({ error: "N8N_WEBHOOK_URL is not set or is not a valid absolute URL" });
    }
    const {
      full_name,
      email,
      phone_number,
      level,
      program,
      course,
      amount,
      class_type,
      location,
      payment_status,
      reference,
    } = req.body;

    // Validate required fields
    if (!full_name || !email || !course) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prepare payload for n8n
    const payload = {
      full_name,
      email,
      phone_number,
      level,
      program,
      course,
      amount,
      class_type,
      location,
      payment_status,
      reference,
      timestamp: new Date().toISOString(),
    };

    // Call n8n webhook (no CORS issues since it's backend-to-backend)
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!n8nResponse.ok) {
      console.error("n8n webhook failed:", n8nResponse.statusText);
      return res.status(500).json({ error: "Failed to process registration" });
    }

    res.json({ success: true, message: "Registration processed successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
