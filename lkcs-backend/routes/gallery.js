// backend/routes/gallery.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import GalleryItem from "../models/GalleryItem.js";

const router = express.Router();

// ---------- ensure uploads dir exists ----------
const uploadDir = path.join(process.cwd(), "uploads", "images");
fs.mkdirSync(uploadDir, { recursive: true });

// ---------- multer setup ----------
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024  }, // 10MB
  fileFilter: (_req, file, cb) => {
    const ok = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (ok.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
});

// ---------- GET /api/gallery ----------
router.get("/", async (_req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    console.error("Gallery GET error:", e);
    res.status(500).json({ message: "Failed to fetch gallery items" });
  }
});

// ---------- POST /api/gallery ----------
// Handle both multipart file uploads and JSON data
router.post("/", (req, res) => {
  // Check content type first
  const contentType = req.headers['content-type'] || '';
  
  if (contentType.includes('multipart/form-data')) {
    // Handle file upload
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ message: err.message });
      }
      
      try {
        console.log("Content-Type:", contentType);
        console.log("File received:", !!req.file);
        console.log("Body:", req.body);
        
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
        
        const rel = `/uploads/images/${req.file.filename}`;
        const doc = await GalleryItem.create({
          type: "image",
          name: req.body?.name || req.file.originalname || "Image",
          src: rel,
        });
        
        res.status(201).json(doc);
      } catch (error) {
        console.error("File upload error:", error);
        res.status(500).json({ message: error.message || "Upload failed" });
      }
    });
  } else {
    // Handle JSON data (YouTube videos or base64 images)
    handleJSONUpload(req, res);
  }
});

async function handleJSONUpload(req, res) {
  try {
    const { type, ytId, name, url, src } = req.body || {};
    
    // Handle base64 images
    if (type === "image" && typeof src === "string" && src.startsWith("data:image/")) {
      const m = src.match(/^data:(image\/[\w.+-]+);base64,(.+)$/);
      if (!m) return res.status(400).json({ message: "Invalid image data" });

      const mime = m[1];
      const b64 = m[2];
      const ext = (mime.split("/")[1] || "bin").toLowerCase();
      const filename = `${Date.now()}-${(name || "upload").replace(/\s+/g, "-")}.${ext}`;
      const abs = path.join(uploadDir, filename);

      fs.writeFileSync(abs, Buffer.from(b64, "base64"));
      const rel = `/uploads/images/${filename}`;

      const doc = await GalleryItem.create({
        type: "image",
        name: name || filename,
        src: rel,
      });
      return res.status(201).json(doc);
    }

    // Handle YouTube videos
    if (type === "youtube" && ytId) {
      const doc = await GalleryItem.create({
        type: "youtube",
        ytId,
        name: name || `YouTube Video (${ytId})`,
        url: url || `https://www.youtube.com/watch?v=${ytId}`,
      });
      return res.status(201).json(doc);
    }

    return res.status(400).json({ message: "Invalid payload" });
  } catch (e) {
    console.error("JSON upload error:", e);
    res.status(500).json({ message: e.message || "Upload failed" });
  }
}

// ---------- DELETE /api/gallery/:id ----------
router.delete("/:id", async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });

    if (item.type === "image" && item.src?.startsWith("/uploads/")) {
      const abs = path.join(process.cwd(), item.src.replace(/^\//, ""));
      if (fs.existsSync(abs)) {
        try { fs.unlinkSync(abs); } catch (e) { console.warn("File unlink warn:", e.message); }
      }
    }

    await item.deleteOne();
    res.json({ ok: true });
  } catch (e) {
    console.error("Gallery DELETE error:", e);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
