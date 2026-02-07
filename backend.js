const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3001;

// Environment variables
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://n8n.gklive.online/webhook/church-retention/register";

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://127.0.0.1:5500",
      "https://church-retention-administration.vercel.app",
    ],
  }),
);
app.use(express.json());

// Register endpoint for church retention form
app.post("/api/register", async (req, res) => {
  try {
    if (!N8N_WEBHOOK_URL || !/^https?:\/\//.test(N8N_WEBHOOK_URL)) {
      return res.status(500).json({
        error: "N8N_WEBHOOK_URL is not set or is not a valid absolute URL",
      });
    }
    const formData = req.body;

    // Validate required fields (e.g., FULL NAME, CONTACT NUMBER, etc.)
    if (!formData["FULL NAME"] || !formData["CONTACT NUMBER"]) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Call n8n webhook (no CORS issues since it's backend-to-backend)
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!n8nResponse.ok) {
      console.error("n8n webhook failed:", n8nResponse.statusText);
      return res.status(500).json({ error: "Failed to process request" });
    }

    const n8nData = await n8nResponse.json();
    res.json(n8nData);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
