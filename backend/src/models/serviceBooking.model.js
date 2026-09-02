import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Services" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    professional: { type: mongoose.Schema.Types.ObjectId, ref: "Professional" },

    dateOfBooking: { type: Date, required: true },
    dateForBooking: { type: Date, required: true },
    payment: { service: String, afterCoupon: String },
    bookingAmount: Number,

    modeOfPayment: { type: String, enum: ["Online Payment", "Cash Payment"] },
  },
  { timestamps: true },
);

export const ServiceBookings = mongoose.model("ServiceBookings", bookingSchema);
