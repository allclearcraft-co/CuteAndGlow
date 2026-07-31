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
    // sponsor: "first",
  });
  if (!service)
    throw new ApiError(403, "Something went wrong please try again later");

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Added successfully !"));
});

const getServices = asyncHandler(async (req, res) => {
  let {
    page = 1,
    limit = 20,
    category,
    serviceFor,
    onSite,
    inHouse,
    search,
    store,
    professional,
    executive,
    sortBy = "latest",
  } = req.query;

  page = Number(page);
  limit = Number(limit);
  const skip = (page - 1) * limit;

  const filter = {
    isActive: true,
  };
  if (category) {
    filter.category = category;
  }
  if (serviceFor) {
    filter.serviceFor = serviceFor;
  }
  if (store) {
    filter.store = store;
  }
  if (professional) {
    filter.professional = professional;
  }
  if (executive) {
    filter.executive = executive;
  }
  if (onSite !== undefined) {
    filter.onSite = onSite === "true";
  }
  if (inHouse !== undefined) {
    filter.inHouse = inHouse === "true";
  }
  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  let sort = {};

  switch (sortBy) {
    case "priceLow":
      sort = {
        charges: 1,
      };
      break;

    case "priceHigh":
      sort = {
        charges: -1,
      };
      break;

    case "duration":
      sort = {
        duration: 1,
      };
      break;

    case "latest":
    default:
      sort = {
        "sponsor.priority": 1,
        createdAt: -1,
      };
  }

  const [services, total] = await Promise.all([
    Services.find(filter)
      .populate("store", "storeName")
      .populate("professional", "name")
      .populate("executive", "name")
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Services.countDocuments(filter),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        services,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      },
      "Services fetched successfully.",
    ),
  );
});

const getServiceById = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  if (!serviceId) throw new ApiError(400, "Invalid request");

  const service = await Services.findById(serviceId)
    .populate({
      path: "store",
      select: "storeName",
    })
    .populate({
      path: "executive",
      select: "name specialization profileImage designation experience",
    })
    .populate({
      path: "professional",
      select: "name images.profileImage gender specialization about",
    });
  if (!service) throw new ApiError(400, "Unable to process request !");


  return res
    .status(200)
    .json(new ApiResponse(200, service, "Data fetched successfully !"));
});

export { createStoreService, getServices, getServiceById };
