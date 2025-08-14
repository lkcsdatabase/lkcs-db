import { Router } from "express";
import Event from "../models/Event.js";
const router = Router();

router.get("/", async (_req, res) => {
  const list = await Event.find().sort({ createdAt: -1 });
  res.json(list);
});

router.post("/", async (req, res) => {
  const ev = await Event.create(req.body);
  res.status(201).json(ev);
});

router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});
router.put("/:id", async (req, res) => {
  const { title, desc, date } = req.body;
  const ev = await Event.findByIdAndUpdate(
    req.params.id,
    { title, desc, date },
    { new: true }
  );
  if (!ev) return res.status(404).json({ error: "Not found" });
  res.json(ev);
});


export default router;
