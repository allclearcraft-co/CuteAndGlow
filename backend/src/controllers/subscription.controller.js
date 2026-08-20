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

  const { planName, planFor, customModel, customModelFor, tagline, isActive } =
    req.body;

  if (!req.body.parsingData) {
    throw new ApiError(400, "Subscription data is missing.");
  }

  const parsed = JSON.parse(req.body.parsingData);

  const {
    validity = {},
    price = {},
    support = "basic",
    mediaLimit = {},
    booking = {},
    visibility = {},
    franchise = {},
    managementTools = {},
    marketing = {},
    features = [],
    faqs = [],
  } = parsed;

  if (
    !planName ||
    !planFor ||
    !price.mrp ||
    !price.sellingPrice ||
    !validity.months
  ) {
    throw new ApiError(400, "Required fields are missing.");
  }

  const newSubscription = await Subscription.create({
    admin: adminId,

    planName,
    planFor,

    customModel:
      customModel === "true" || planFor === "custom" || Boolean(customModelFor),

    customModelFor,
    tagline,

    validity: {
      months: Number(validity.months),
      renewalType: validity.renewalType || "yearly",
    },

    price: {
      mrp: Number(price.mrp),
      discount: Number(price.discount || 0),
      sellingPrice: Number(price.sellingPrice),
    },

    support,

    mediaLimit: {
      photos: Number(mediaLimit.photos || 0),
      videos: Number(mediaLimit.videos || 0),
      unlimitedPhotos: Boolean(mediaLimit.unlimitedPhotos),
      unlimitedVideos: Boolean(mediaLimit.unlimitedVideos),
    },

    booking: {
      enabled: Boolean(booking.enabled),
      advancedBooking: Boolean(booking.advancedBooking),
    },

    visibility: {
      featured: Boolean(visibility.featured),
      verifiedBadge: Boolean(visibility.verifiedBadge),
    },

    franchise: {
      enabled: Boolean(franchise.enabled),
      enquiryButton: Boolean(franchise.enquiryButton),
    },

    managementTools: {
      staffAttendance: Boolean(managementTools.staffAttendance),
      inventory: Boolean(managementTools.inventory),
      commissionTracking: Boolean(managementTools.commissionTracking),
      analytics: Boolean(managementTools.analytics),
    },

    marketing: {
      socialPromotion: Boolean(marketing.socialPromotion),
      couponManager: Boolean(marketing.couponManager),
      smsWhatsapp: Boolean(marketing.smsWhatsapp),
      reviews: Boolean(marketing.reviews),
    },

    features,
    faqs,

    isActive: isActive === "true",
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
