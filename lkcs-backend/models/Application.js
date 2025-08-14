import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
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
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
      maxlength: [255, "Email cannot exceed 255 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      minlength: [10, "Phone number must be at least 10 digits"],
      maxlength: [15, "Phone number cannot exceed 15 digits"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      minlength: [2, "Position must be at least 2 characters"],
      maxlength: [100, "Position cannot exceed 100 characters"],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
      default: "",
    },
    resumeOriginalName: {
      type: String,
      required: [true, "Resume original filename is required"],
      trim: true,
    },
    resumePath: {
      type: String,
      required: [true, "Resume file path is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // manages createdAt & updatedAt
  }
);

// Indexes
ApplicationSchema.index({ createdAt: -1 });
ApplicationSchema.index({ email: 1 }, { unique: true });
ApplicationSchema.index({ status: 1 });

// Instance method
ApplicationSchema.methods.getFormattedDate = function () {
  return this.createdAt.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Statics
ApplicationSchema.statics.findByStatus = function (status) {
  return this.find({ status }).sort({ createdAt: -1 });
};
ApplicationSchema.statics.findRecent = function (limit = 10) {
  return this.find().sort({ createdAt: -1 }).limit(limit);
};

export default mongoose.model("Application", ApplicationSchema);
