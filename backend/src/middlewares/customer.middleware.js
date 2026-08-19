import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { Customer } from "../models/customer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const VerifyCustomer = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.AccessToken ||
    req.header("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }
  console.log(token);
  console.log("ACCESS TOKEN SECRET EXISTS:", !!process.env.ACCESS_TOKEN_SECRET);

  console.log(
    "ACCESS TOKEN SECRET LENGTH:",
    process.env.ACCESS_TOKEN_SECRET?.length,
  );
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decodedToken);
  const user = await Customer.findById(decodedToken._id);

  console.log(user);
  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }
  req.user = user;
  next();
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTY4NzE1OThiYjBmYmZjYmRiOTUzZmQiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE3ODYzNDM0NzAsImV4cCI6MTc4NjM0NDY3MH0.36QSAxV3pIO2W8sgpr5QShH757IykvDlPdu-XHMTo_E

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGEzMTQ4ODJmNzU1MDU1MGE3ZDFkZWYiLCJlbWFpbCI6ImtzaGl0aWpzYXhlbmE5QGdtYWlsLmNvbSIsIm5hbWUiOiJLc2hpdGlqIFNheGVuYSIsImlhdCI6MTc4Mzc3MjgxNiwiZXhwIjoxNzg0NjM2ODE2fQ.Qent8x5x-yBu7FlxkzH4elSq08Vjbrv5fFDC1cNZ_FY
