import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";
import { Customer } from "../models/customer.model.js";
import { Store } from "../models/store.model.js";
import { Professional } from "../models/professional.model.js";

const createSubscription = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const {
    planFor,
    planName,
    mrp,
    discount,
    sellingPrice,
    validity,
    customModelFor,
  } = req.body;

  if (!planFor || !planName || !mrp || !discount || !sellingPrice || !validity)
    throw new ApiError(400, "All fields are required !");

  const { features, faqs } = JSON.parse(req.body.parsingData);
  const newSubscription = await Subscription.create({
    admin,
    planName,
    planFor,
    customModelFor,
    customModel: customModelFor ? true : false,
    features,
    price: { mrp: mrp, discount: discount, sellingPrice: sellingPrice },
    validity,
    faqs: faqs,
  });
});

const getSubscriptionByMadeFor = asyncHandler(async (req, res) => {
  const { query } = req.params;
  if (!query) throw new ApiError(400, "Invalid request");

  const subscription = await Subscription.find({
    planFor: query,
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
