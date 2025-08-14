import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
      maxlength: [255, "Email cannot exceed 255 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [5, "Message must be at least 5 characters"],
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
  },
  {
    timestamps: true, // provides createdAt & updatedAt
  }
);

// Helpful indexes for admin queries
EnquirySchema.index({ createdAt: -1 });
EnquirySchema.index({ email: 1 });

export default mongoose.model("Enquiry", EnquirySchema);
