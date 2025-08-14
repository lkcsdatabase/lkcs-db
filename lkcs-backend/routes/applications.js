import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Application from "../models/Application.js";

const router = Router();

// ---- Ensure resumes folder exists
const resumesDir = path.join(process.cwd(), "uploads", "resumes");
fs.mkdirSync(resumesDir, { recursive: true });

// ---- Multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, resumesDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

// ---- Multer upload (5MB, 1 file)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowedMime = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const allowedExt = /\.(pdf|doc|docx)$/i.test(path.extname(file.originalname));
    if (allowedMime.includes(file.mimetype) && allowedExt) return cb(null, true);
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
  },
});

// ---- GET /api/applications
router.get("/", async (_req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, error: "Failed to fetch applications" });
  }
});

// ---- POST /api/applications
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, position, message } = req.body;

    // basic validation (backend)
    const errors = [];
    if (!name || name.trim().length < 2) errors.push("Name is required and must be at least 2 characters");
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push("Valid email address is required");
    if (!phone || phone.trim().length < 10) errors.push("Phone number is required and must be at least 10 digits");
    if (!position || position.trim().length < 2) errors.push("Position is required");

    if (errors.length) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: "Validation failed", details: errors });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: "Resume file is required" });
    }

    const application = await Application.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      position: position.trim(),
      message: message ? message.trim() : "",
      resumeOriginalName: req.file.originalname,
      resumePath: req.file.path, // absolute path on disk
    });

    res.status(201).json({ success: true, message: "Application submitted successfully", data: application });
  } catch (error) {
    console.error("Error creating application:", error);

    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch {}
    }

    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(409).json({ success: false, error: "An application with this email already exists" });
    }

    res.status(500).json({ success: false, error: "Failed to submit application" });
  }
});

// ---- GET /api/applications/:id/resume
router.get("/:id/resume", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, error: "Invalid application ID format" });
    }
    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ success: false, error: "Application not found" });
    if (!application.resumePath) return res.status(404).json({ success: false, error: "Resume file not found" });
    if (!fs.existsSync(application.resumePath)) {
      return res.status(404).json({ success: false, error: "Resume file does not exist on server" });
    }
    const fileName = application.resumeOriginalName || "resume";
    res.download(application.resumePath, fileName);
  } catch (error) {
    console.error("Error downloading resume:", error);
    res.status(500).json({ success: false, error: "Failed to download resume" });
  }
});

// ---- DELETE /api/applications/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, error: "Invalid application ID format" });
    }
    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ success: false, error: "Application not found" });

    if (application.resumePath && fs.existsSync(application.resumePath)) {
      try { fs.unlinkSync(application.resumePath); } catch (e) { console.error("Resume delete error:", e); }
    }
    await Application.findByIdAndDelete(id);
    res.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ success: false, error: "Failed to delete application" });
  }
});

// ---- Multer error handler
router.use((error, _req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ success: false, error: "File too large", message: "Resume must be < 5MB" });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ success: false, error: "Only one resume file is allowed" });
    }
  }
  if (error.message?.includes("Only PDF, DOC, and DOCX")) {
    return res.status(400).json({ success: false, error: "Invalid file type", message: error.message });
  }
  next(error);
});

export default router;
