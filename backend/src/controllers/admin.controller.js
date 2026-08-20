import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validatePhone } from "../validators/contactNumber.validator.js";
import { Admin } from "../models/admin.model.js";
import { Customer } from "../models/customer.model.js";
import { Store } from "../models/store.model.js";
import { Services } from "../models/service.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ServiceBookings } from "../models/serviceBooking.model.js";
import jwt from "jsonwebtoken";

const createAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;

  const {
    name,
    contactNumber,
    email,
    password,
    employeeId,
    role,
    sectionList = [],
  } = req.body;

  console.log(
    name,
    contactNumber,
    email,
    password,
    employeeId,
    role,
    sectionList,
  );

  // // Verify creator admin exists
  // const creatorAdmin = await Admin.findById(adminId);
  // if (!creatorAdmin) throw new ApiError(404, "Admin not found.");

  // Required fields
  if (!name || !contactNumber || !email || !password || !employeeId || !role) {
    throw new ApiError(400, "Fill the required details.");
  }

  // Validations
  if (!validatePhone(contactNumber))
    throw new ApiError(400, "Invalid contact number.");

  if (name.length > 50) throw new ApiError(400, "Name is too long.");

  // Duplicate check
  const existingAdmin = await Admin.findOne({
    $or: [
      { contactNumber },
      { email: email.toLowerCase() },
      { employeeId: employeeId.toUpperCase() },
    ],
  });

  if (existingAdmin) {
    if (existingAdmin.contactNumber === contactNumber)
      throw new ApiError(400, "Contact number already exists.");

    if (existingAdmin.email === email.toLowerCase())
      throw new ApiError(400, "Email already exists.");

    if (existingAdmin.employeeId === employeeId.toUpperCase())
      throw new ApiError(400, "Employee ID already exists.");
  }

  const isAdmin = role.toLowerCase() === "admin";

  const newAdmin = await Admin.create({
    name,
    contactNumber,
    email: email.toLowerCase(),
    password,
    employeeId: employeeId.toUpperCase(),
    role,
    sectionList: isAdmin ? [] : sectionList, // Only restricted roles store permissions
    restrictedAccess: !isAdmin, // Admin = false, Others = true
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newAdmin, "Admin created successfully."));
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const isValid = await user.comparePassword(password);
  if (!isValid) throw new ApiError(401, "Invalid credentials");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, tokens: { accessToken, refreshToken } },
        "Logged in successful !",
      ),
    );
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

const reLoginToken = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken;
  if (!token) throw new ApiError(401, "Unauthorized request");

  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  const user = await Admin.findById(decoded._id);
  if (!user) throw new ApiError(401, "Invalid refresh token");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return res.status(200).json(
    new ApiResponse(200, {
      user,
      tokens: { accessToken, refreshToken },
    }),
  );
});

const dashboardData = asyncHandler(async (req, res) => {
  const { query } = req.params;
  // const { sanitizedQuery } = query.toLowercase();

  switch (query) {
    // case "overview": {
    //   const totalVisits = await Visitor.countDocuments();
    //   const today = new Date().toISOString().slice(0, 10);
    //   const todayVisits = await Visitor.countDocuments({
    //     visitDate: today,
    //   });
    //   const uniqueVisitors = await Visitor.aggregate([
    //     {
    //       $group: {
    //         _id: "$ip",
    //       },
    //     },
    //     {
    //       $count: "uniqueVisitors",
    //     },
    //   ]);
    //   const placeOverview = await Place.find().select("name category");
    //   return res.status(200).json(
    //     new ApiResponse(
    //       200,
    //       {
    //         totalVisits,
    //         todayVisits,
    //         uniqueVisitors: uniqueVisitors[0]?.uniqueVisitors || 0,
    //         placeOverview,
    //       },
    //       "Data fetched successfully",
    //     ),
    //   );
    // }

    case "customer": {
      const customer = await Customer.find()
        .select("name contactNumber email gender")
        .sort({
          createdAt: -1,
        });
      return res
        .status(200)
        .json(new ApiResponse(200, customer, "Data fetched successfully"));
    }

    case "store": {
      const store = await Store.find()
        .select("storeName storeContactNumber storeEmail")
        .sort({
          createdAt: -1,
        });
      return res
        .status(200)
        .json(new ApiResponse(200, store, "Data fetched successfully"));
    }

    case "inactive_services": {
      const services = await Services.find({ isActive: false })
        .select("category serviceFor inHouse")
        .populate({ path: "store", select: "name" })
        .sort({
          createdAt: -1,
        });
      return res
        .status(200)
        .json(new ApiResponse(200, services, "Data fetched successfully"));
    }

    case "active_services": {
      const services = await Services.find({ isActive: true })
        .populate({ path: "store", select: "storeName" })
        .select("category serviceFor inHouse")
        .sort({
          createdAt: -1,
        });
      return res
        .status(200)
        .json(new ApiResponse(200, services, "Data fetched successfully"));
    }

    case "subscription": {
      const subscription = await Subscription.find()
        .select("planName planFor customModelFor customModel price isActive")
        .sort({
          createdAt: -1,
        });
      return res
        .status(200)
        .json(new ApiResponse(200, subscription, "Data fetched successfully"));
    }

    case "bookings": {
      const bookings = await ServiceBookings.find()
        .select("dateForBooking payment bookingAmount")
        .populate({ path: "service", select: "name" })
        .populate({ path: "service", select: "name" })
        .sort({
          createdAt: -1,
        });
      return res
        .status(200)
        .json(new ApiResponse(200, bookings, "Data fetched successfully"));
    }

    case "adminsQuery": {
      const admin = await Admin.find()
        .populate("creatorAdmin")
        .sort({ createdAt: -1 });
      if (!admin) throw new ApiError(400, "No admins found");

      return res
        .status(200)
        .json(new ApiResponse(200, admin, "Data fetched successfully !"));
    }

    default:
      throw new ApiError(400, "Invalid session or query");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, employeeId, contactNumber, password, confirmPassword } =
    req.body;
  if (!email || !employeeId || !contactNumber || !password || !confirmPassword)
    throw new ApiError(400, "Fill all the details");

  const user = await Admin.findOne({
    email: email.toLowerCase(),
    employeeId: employeeId.toUpperCase(),
    contactNumber: contactNumber,
  });
  if (user) {
    user.password = confirmPassword;
    await user.save();
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "Otp has been sent to your contact number and email",
      ),
    );
});

const getCurrentRequestData = asyncHandler(async (req, res) => {
  const { query, keyId, adminId } = req.params;
  if (!query || !keyId || !adminId) throw new ApiError(400, "Invalid request");

  const admin = await Admin.findById(adminId);
  if (!admin) {
    throw new ApiError(400, "Invalid admin");
    return;
  }

  switch (query) {
    case "customer": {
      const customer = await Customer.findById(keyId).populate("address");
      if (!customer) throw new ApiError(400, "Unable to fetch data");

      return res
        .status(200)
        .json(new ApiResponse(200, customer, "Data fetched successfully !"));
    }

    case "store": {
      const store = await Store.findById(keyId).populate(
        "address storeStaffs services bookings",
      );
      if (!store) throw new ApiError(400, "Unable to fetch data");

      return res
        .status(200)
        .json(new ApiResponse(200, store, "Data fetched successfully !"));
    }

    case "service": {
      const service = await Services.findById(keyId)
        .populate({
          path: "store",
          select: "storeName storeContactNumber storeContactNumber owner",
        })
        .populate({
          path: "executive",
          select: "name contactNumber email specialization",
        })
        .populate({
          path: "professional",
          select: "name contactNumber email gender",
        });
      if (!service) throw new ApiError(400, "Unable to fetch data");

      return res
        .status(200)
        .json(new ApiResponse(200, service, "Data fetched successfully !"));
    }

    case "subscription": {
      const subscription = await Subscription.findById(keyId).populate("admin");
      if (!subscription) throw new ApiError(400, "Unable to fetch data");

      return res
        .status(200)
        .json(
          new ApiResponse(200, subscription, "Data fetched successfully !"),
        );
    }
    default:
      throw new ApiError(400, "Invalid session or query");
  }
});

export {
  createAdmin,
  getAllAdmins,
  getAdminById,
  markAsActiveVerified,
  reLoginToken,
  dashboardData,
  adminLogin,
  getCurrentRequestData,
};
