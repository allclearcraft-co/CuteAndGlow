import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    planName: {
      type: String,
      enum: ["platinum", "gold", "silver", "bronze", "basic"],
      default: "basic",
    },
    planFor: {
      type: String,
      enum: ["customer", "store", "professional", "custom"],
      default: "store",
    },
    customModelFor: String,
    customModel: { type: Boolean, default: false },
    tagline: String,
    price: {
      mrp: { type: Number, required: true },
      discount: Number,
      sellingPrice: Number,
    },
    features: [String],
    planPrice: String,
    validity: Number,
    faqs: [{ question: String, answer: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
