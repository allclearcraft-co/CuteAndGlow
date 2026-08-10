import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    // initial details
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true, select: false },

    employeeId: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "subAdmin"],
      default: "subAdmin",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true },
);

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, role: "Admin" },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" },
  );
};

adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id, role: "Admin" },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
};

export const Admin = mongoose.model("Admin", adminSchema);
