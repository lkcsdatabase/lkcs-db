import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: { type: String, enum: ["image", "youtube"], required: true },
    name: { type: String, default: "Untitled" },
    src: { type: String },    // for images (relative path like /uploads/images/xxx)
    ytId: { type: String },   // for youtube
    url: { type: String },    // optional full youtube URL
  },
  { timestamps: true }
);

export default mongoose.model("GalleryItem", schema);
