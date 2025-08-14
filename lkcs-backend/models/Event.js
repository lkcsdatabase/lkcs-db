import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date: String,   // keep string for simplicity (e.g., "2025-08-15")
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Event", EventSchema);
