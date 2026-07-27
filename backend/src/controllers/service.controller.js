import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  UploadImages,
  DeleteBulkImage,
  DeleteImage,
} from "../utils/imageKit.io.js";
import { Services } from "../models/service.model.js";
import { Store } from "../models/store.model.js";
import { Professional } from "../models/professional.model.js";
import { Customer } from "../models/customer.model.js";

const createStoreService = asyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const {
    name,
    charges,
    category,
    duration,
    executive,
    prepTime,
    isPrepTime,
    timeIncludingPrepTime,
    serviceFor,
    bookingDays,
    bookingFrom,
    bookingTill,
    onSite,
    inHouse,
    serviceArea,
  } = req.body;
  const { products, serviceInclusion, serviceExclusion, serviceRequirements } =
    JSON.parse(req.body.serviceData);

  const store = await Store.findById(storeId);
  if (!store) throw new ApiError(400, "Invalid access !");

  const service = await Services.create({
    name,
    store: storeId,
    executive,
    category,
    products: products,
    serviceInclusion: serviceInclusion,
    serviceExclusion: serviceExclusion,
    duration,
    prepTime,
    isPrepTime,
    timeIncludingPrepTime,
    onSite,
    inHouse,
    serviceFor,
    charges,
    bookingDays,
    bookingAcceptingHours,
    // image
    serviceArea,
    serviceRequirements,
  });
});

export { createStoreService };
