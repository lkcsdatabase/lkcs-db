import { Router } from "express";
import mongoose from "mongoose";
import Enquiry from "../models/Enquiry.js";

const router = Router();

// --- Helpers
function validatePayload({ name, email, message }) {
  const errors = [];
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters");
  }
  if (
    !email ||
    typeof email !== "string" ||
    !/\S+@\S+\.\S+/.test(email) ||
    email.length > 255
  ) {
    errors.push("Valid email address is required");
  }
  if (!message || typeof message !== "string" || message.trim().length < 5) {
    errors.push("Message is required (at least 5 characters)");
  }
  if (message && message.length > 2000) {
    errors.push("Message cannot exceed 2000 characters");
  }
  return errors;
}

// --- GET /api/enquiries  (supports pagination)
router.get("/", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "50", 10), 1), 200);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Enquiry.find({}, null, { sort: { createdAt: -1 }, skip, limit }).lean(),
      Enquiry.countDocuments(),
    ]);

    res.json({
      success: true,
      data: items,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ success: false, error: "Failed to fetch enquiries" });
  }
});

// --- POST /api/enquiries
router.post("/", async (req, res) => {
  try {
    // Whitelist & normalize
    const payload = {
      name: (req.body?.name || "").toString().trim(),
      email: (req.body?.email || "").toString().trim().toLowerCase(),
      message: (req.body?.message || "").toString().trim(),
    };

    const errors = validatePayload(payload);
    if (errors.length) {
      return res.status(400).json({ success: false, error: "Validation failed", details: errors });
    }

    const created = await Enquiry.create(payload);
    res.status(201).json({ success: true, message: "Enquiry submitted", data: created });
  } catch (err) {
    console.error("Error creating enquiry:", err);
    res.status(500).json({ success: false, error: "Failed to submit enquiry" });
  }
});

// --- DELETE /api/enquiries/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, error: "Invalid enquiry ID" });
    }

    const doc = await Enquiry.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ success: false, error: "Enquiry not found" });
    }

    res.json({ success: true, message: "Enquiry deleted" });
  } catch (err) {
    console.error("Error deleting enquiry:", err);
    res.status(500).json({ success: false, error: "Failed to delete enquiry" });
  }
});

export default router;
