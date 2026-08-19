import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";
import { Customer } from "../models/customer.model.js";
import { Store } from "../models/store.model.js";
import { Professional } from "../models/professional.model.js";
import { Admin } from "../models/admin.model.js";

const createSubscription = asyncHandler(async (req, res) => {
  const { adminId } = req.params;

  const admin = await Admin.findById(adminId);
  if (!admin) throw new ApiError(404, "Admin not found.");

  const {
    planName,
    planFor,
    customModel,
    customModelFor,
    tagline,

    validity,
    renewalType,

    mrp,
    discount,
    sellingPrice,
    planPrice,

    support,

    photos,
    videos,
    unlimitedPhotos,
    unlimitedVideos,

    bookingEnabled,
    advancedBooking,

    featured,
    verifiedBadge,

    franchiseEnabled,
    enquiryButton,

    staffAttendance,
    inventory,
    commissionTracking,
    analytics,

    socialPromotion,
    couponManager,
    smsWhatsapp,
    reviews,
  } = req.body;

  if (!planName || !planFor || !mrp || !sellingPrice || !validity) {
    throw new ApiError(400, "Required fields are missing.");
  }

  let features = [];
  let faqs = [];

  if (req.body.parsingData) {
    const parsed = JSON.parse(req.body.parsingData);
    features = parsed.features || [];
    faqs = parsed.faqs || [];
  }

  const newSubscription = await Subscription.create({
    admin: adminId,

    planName,
    planFor,

    customModel:
      customModel === "true" || planFor === "custom" || !!customModelFor,

    customModelFor,

    tagline,
    planPrice,

    validity: {
      months: Number(validity),
      renewalType: renewalType || "yearly",
    },

    price: {
      mrp: Number(mrp),
      discount: Number(discount || 0),
      sellingPrice: Number(sellingPrice),
    },

    support: support || "basic",

    mediaLimit: {
      photos: Number(photos || 0),
      videos: Number(videos || 0),
      unlimitedPhotos: unlimitedPhotos === "true",
      unlimitedVideos: unlimitedVideos === "true",
    },

    booking: {
      enabled: bookingEnabled === "true",
      advancedBooking: advancedBooking === "true",
    },

    visibility: {
      featured: featured === "true",
      verifiedBadge: verifiedBadge === "true",
    },

    franchise: {
      enabled: franchiseEnabled === "true",
      enquiryButton: enquiryButton === "true",
    },

    managementTools: {
      staffAttendance: staffAttendance === "true",
      inventory: inventory === "true",
      commissionTracking: commissionTracking === "true",
      analytics: analytics === "true",
    },

    marketing: {
      socialPromotion: socialPromotion === "true",
      couponManager: couponManager === "true",
      smsWhatsapp: smsWhatsapp === "true",
      reviews: reviews === "true",
    },

    features,
    faqs,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newSubscription,
        "Subscription created successfully.",
      ),
    );
});

const getSubscriptionByMadeFor = asyncHandler(async (req, res) => {
  const { query } = req.params;
  if (!query) throw new ApiError(400, "Invalid request");

  const subscription = await Subscription.find({
    planFor: query.toLowerCase(),
    isActive: true,
  }).select("-admin");
  if (!subscription) throw new ApiError(400, "No subscriptions found !");

  return res
    .status(200)
    .json(new ApiResponse(200, subscription, "Fetched successfully !"));
});

const getAllSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.find();
  if (!subscription) throw new ApiError(400, "No subscription found");

  return res
    .status(200)
    .json(new ApiResponse(400, subscription, "Data fetched successfully !"));
});

const purchaseSubscription = asyncHandler(async (req, res) => {
  const { subscriptionId, userId } = req.params;
  if (!subscriptionId || !userId) throw new ApiError(400, "Invalid request");

  const subscription = await Subscription.findById(subscriptionId);
  if (!subscription) throw new ApiError(400, "Subscription not available");

  switch (subscription.planFor) {
    case "customer": {
      const customer = await Customer.findByIdAndUpdate(userId, {
        subscription: {
          subscriptionModel: subscriptionId,
          subscriptionPurchased: true,
          subscriptionValidity: Date.now() * 100,
        },
      });
      if (!customer) throw new ApiError(400, "Unable to process request");

      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Subscription purchase confirmed"));
    }
    case "store": {
      const store = await Store.findByIdAndUpdate(userId, {
        subscription: {
          subscriptionModel: subscriptionId,
          subscriptionPurchased: true,
          subscriptionValidity: Date.now() * 100,
        },
      });
      if (!store) throw new ApiError(400, "Unable to process request");

      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Subscription purchase confirmed"));
    }
    case "professional": {
      const professional = await Professional.findByIdAndUpdate(userId, {
        subscription: {
          subscriptionModel: subscriptionId,
          subscriptionPurchased: true,
          subscriptionValidity: Date.now() * 100,
        },
      });
      if (!professional) throw new ApiError(400, "Unable to process request");

      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Subscription purchase confirmed"));
    }
    default:
      throw new ApiError(400, "Invalid session or query");
  }
});

export {
  createSubscription,
  getSubscriptionByMadeFor,
  getAllSubscription,
  purchaseSubscription,
};
