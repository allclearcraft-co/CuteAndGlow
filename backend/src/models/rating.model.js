import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    ratings: {
      communicationAvg: { type: Number, default: 0 },
      knowledgeAvg: { type: Number, default: 0 },
      behaviorAvg: { type: Number, default: 0 },
      overallAvg: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },

    reviews: [
      {
        customerName: { type: String },
        customerPhone: { type: String },
        communication: { type: Number, min: 0, max: 5 },
        knowledge: { type: Number, min: 0, max: 5 },
        behavior: { type: Number, min: 0, max: 5 },
        comment: { type: String },
      },
    ],
  },
  { timestamps: true },
);

export const Ratings = mongoose.model("Ratings", ratingSchema);
