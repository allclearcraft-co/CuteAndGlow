import { Franchise } from "../models/franchise.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Store } from "../models/store.model.js";

const createFranchise = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const {
    name,
    subtitle,
    budget,
    franchiseFee,
    interior,
    equipment,
    stock,
    marketing,
    workingCapital,
    space,
    staff,
    roi,
    location,
    services,
    advantage,
    storeId,
  } = req.body;

  if (!name) throw new ApiError(400, "Invalid name");
  if (!adminId) throw new ApiError(400, "Invalid request");

  const store = await Store.findById(storeId);
  if (store.isActive === false)
    throw new ApiError(400, "The store is not active");

  const newFranchise = await Franchise.create({
    name,
    subtitle,
    budget,
    franchiseFee,
    interior,
    equipment,
    stock,
    marketing,
    workingCapital,
    space,
    staff,
    roi,
    location,
    services,
    advantage,
    store: store,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newFranchise, "Created successfully !"));
});

export { createFranchise };
