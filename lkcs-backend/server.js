import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import enquiries from "./routes/enquiries.js";
import applications from "./routes/applications.js"; // <-- plural
import gallery from "./routes/gallery.js";
import events from "./routes/events.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "lkcs-alpha.vercel.app ";

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}
if (!CLIENT_ORIGIN) {
  console.error("❌ CLIENT_ORIGIN is missing in .env");
  process.exit(1);
}

app.set("trust proxy", 1);

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS (supports comma-separated origins)
const allowedOrigins = CLIENT_ORIGIN.split(",").map((s) => s.trim());
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Core parsing + static
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static("uploads")); // serves /uploads/** (resumes in /uploads/resumes)

// Rate limit
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Health
app.get("/health", async (_req, res) => {
  try {
    const state = mongoose.connection.readyState;
    res.json({
      ok: state === 1,
      mongoState: state,
      uptime: process.uptime(),
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Routes
app.use("/api/enquiries", enquiries);
app.use("/api/applications", applications);
app.use("/api/gallery", gallery);
app.use("/api/events", events);

async function start() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);

    app.listen(PORT, () => {
      console.log(`🚀 API running at http://localhost:${PORT}`);
      console.log(`🩺 Health: http://localhost:${PORT}/health`);
      console.log(`🌐 CORS origins: ${allowedOrigins.join(", ")}`);
    });
  } catch (err) {
    console.error("❌ DB error:", err.message);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("\n🔻 Shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});
process.on("unhandledRejection", (r) => console.error("UnhandledRejection:", r));
process.on("uncaughtException", (e) => {
  console.error("UncaughtException:", e);
  process.exit(1);
});

start();
