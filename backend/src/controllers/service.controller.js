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

  const sanitize = (str = "") =>
    str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-_]/g, "")
      .replace(/\s+/g, "-");
  const safeName = sanitize(store.name);

  const images = req.files || [];
  const uploadedImages = [];

  for (const img of images) {
    const uploaded = await UploadImages(img.filename, {
      folderStructure: `store/${safeName
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase()}/serviceCoverImage`,
    });

    uploadedImages.push({
      url: uploaded.url,
      fileId: uploaded.fileId,
      altText: name,
    });
  }

  const sanitizePrepTime = isPrepTime === "on" ? true : false;
  const sanitizeTimeIncludingPrepTime =
    timeIncludingPrepTime === "on" ? true : false;
  const sanitizeOnSite = onSite === "on" ? true : false;
  const sanitizeInHouse = inHouse === "on" ? true : false;

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
    isPrepTime: sanitizePrepTime,
    timeIncludingPrepTime: sanitizeTimeIncludingPrepTime,
    onSite: sanitizeOnSite,
    inHouse: sanitizeInHouse,
    serviceFor,
    charges,
    bookingDays,
    bookingAcceptingHours: { from: bookingFrom, till: bookingTill },
    coverImage: uploadedImages,
    serviceArea,
    serviceRequirements,
  });
  if (!service)
    throw new ApiError(403, "Something went wrong please try again later");

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Added successfully !"));
});

export { createStoreService };
