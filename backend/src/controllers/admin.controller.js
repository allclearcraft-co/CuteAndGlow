import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import validatePhone from "../validators/contactNumber.validator.js";
import { Admin } from "../models/admin.model";

const createAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const { name, contactNumber, email, password, employeeId, adminRole } =
    req.body;
  if (
    !name ||
    !contactNumber ||
    !email ||
    !password ||
    !employeeId ||
    !adminRole
  )
    throw new ApiError(400, "Fill the required details !");

  if (!validatePhone(contactNumber))
    throw new ApiError(400, "Invalid Contact number");
  if (name.length > 50)
    throw new ApiError(400, "Name length is too long, please try short forms");
  const existingAdmin = await Admin.find({
    contactNumber: contactNumber,
    email: email,
    employeeId: employeeId,
  });
  if (existingAdmin) {
    throw new ApiError(400, "Admin already exists.");
  }
  if (!existingAdmin) {
    const newAdmin = await Admin.create({
      name: name,
      contactNumber,
      email,
      password,
      employeeId,
      role: adminRole,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, newAdmin, "Created successfully !"));
  }
});

const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().select(
    "name contactNumber isVerified isActive role",
  );
  if (!admins) throw new ApiError(400, "Admins not found");

  return res
    .status(200)
    .json(new ApiResponse(200, admins, "Admins fetched successfully !"));
});

const getAdminById = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  if (!adminId) throw new ApiError(400, "Invalid request");

  const admin = await Admin.findById(adminId);
  if (!admin) throw new ApiError(400, "Admin not found");

  return res
    .status(200)
    .json(new ApiResponse(200, admin, "Data fetched successfully !"));
});

const markAsActiveVerified = asyncHandler(async (req, res) => {
  const { adminId, adminId2, operation } = req.params;
  if (!adminId2) throw new ApiError(400, "Invalid admin");
  if (!adminId) throw new ApiError(400, "Invalid request");

  const sourceAdmin = await Admin.findById(adminId2);
  if (!sourceAdmin) throw new ApiError(400, "Invalid admin request");
  if (sourceAdmin.role === "subAdmin") {
    const admin = await Admin.findByIdAndUpdate(adminId, { isActive: true });
    if (!admin) throw new ApiError(400, "Admin not found");
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Your request has been submitted successfully, will get reviewed.",
        ),
      );
  }
  if (sourceAdmin.role === "admin") {
    switch (operation) {
      case "active": {
        const admin = await Admin.findByIdAndUpdate(adminId, {
          isActive: true,
        });
        if (!admin) throw new ApiError(400, "Unable to find admin");

        return res
          .status(200)
          .json(new ApiResponse(200, {}, "Operation successful"));
      }
      case "verify": {
        const admin = await Admin.findByIdAndUpdate(adminId, {
          isVerified: true,
        });
        if (!admin) throw new ApiError(400, "Unable to find admin");

        return res
          .status(200)
          .json(new ApiResponse(200, {}, "Operation successful"));
      }
      case "activeAndVerify": {
        const admin = await Admin.findByIdAndUpdate(adminId, {
          isVerified: true,
          isActive: true,
        });
        if (!admin) throw new ApiError(400, "Unable to find admin");

        return res
          .status(200)
          .json(new ApiResponse(200, {}, "Operation successful"));
      }
      default:
        throw new ApiError(
          400,
          "Unable to resole request right now please try again later",
        );
    }
  }
});

export { createAdmin, getAllAdmins, getAdminById, markAsActiveVerified };
