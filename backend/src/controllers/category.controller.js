import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";
import { DeleteImage, UploadImages } from "../utils/imageKit.io.js";
import { Category } from "../models/category.model.js";

const createCategory = asyncHandler(async (req, res) => {
  const admin = req.user;

  if (!admin) {
    throw new ApiError(401, "Unauthorized");
  }
  const { title, description, displayOrder } = req.body;
  if (!title?.trim()) {
    throw new ApiError(400, "Category title is required");
  }
  if (!req.file) {
    throw new ApiError(400, "Category image is required");
  }

  let uploadedImage = null;
  uploadedImage = await UploadImages(
    req.file.filename,
    {
      folderStructure: "/categories",
    },
    ["category"],
  );
  const isAdmin = admin.role === "admin";
  const category = await Category.create({
    createdBy: admin._id,
    title: title.trim(),
    description: description?.trim() || "",
    image: {
      url: uploadedImage.url,
      fileId: uploadedImage.fileId,
    },
    status: isAdmin ? "Verified" : "Under-review",
    isActive: isAdmin,
    displayOrder: Number(displayOrder) || 0,
    subcategories: [],
  });

  if (uploadedImage?.fileId) {
    await DeleteImage(uploadedImage.fileId);
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        category,
        isAdmin
          ? "Category created successfully"
          : "Category submitted for admin approval",
      ),
    );
});

const createSubCategory = asyncHandler(async (req, res) => {
  const admin = req.user;

  if (!admin) {
    throw new ApiError(401, "Unauthorized");
  }
  const { categoryId } = req.params;
  const { title, description, displayOrder } = req.body;

  if (!title?.trim()) {
    throw new ApiError(400, "Subcategory title is required");
  }
  if (!req.file) {
    throw new ApiError(400, "Subcategory image is required");
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  let uploadedImage = null;
  uploadedImage = await UploadImages(
    req.file.filename,
    {
      folderStructure: `/categories/${category._id}/subcategories`,
    },
    ["subcategory"],
  );
  const isAdmin = admin.role === "admin";
  const subCategory = {
    createdBy: admin._id,
    title: title.trim(),
    description: description?.trim() || "",
    image: {
      url: uploadedImage.url,
      fileId: uploadedImage.fileId,
    },
    status: isAdmin ? "Verified" : "Under-review",
    isActive: isAdmin,
    displayOrder: Number(displayOrder) || 0,
  };

  category.subcategories.push(subCategory);
  await category.save();

  const createdSubCategory =
    category.subcategories[category.subcategories.length - 1];

  if (uploadedImage?.fileId) {
    await DeleteImage(uploadedImage.fileId);
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdSubCategory,
        isAdmin
          ? "Subcategory created successfully"
          : "Subcategory submitted for admin approval",
      ),
    );
});

const approveCategory = asyncHandler(async (req, res) => {
  const admin = req.user;

  if (admin.role !== "admin") {
    throw new ApiError(403, "Only admin can approve categories");
  }

  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  category.status = "Verified";
  category.isActive = true;

  await category.save();

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category approved successfully"));
});

const rejectCategory = asyncHandler(async (req, res) => {
  const admin = req.user;

  if (admin.role !== "admin") {
    throw new ApiError(403, "Only admin can reject categories");
  }

  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  category.status = "Inactive";
  category.isActive = false;

  await category.save();

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category rejected successfully"));
});

export { createCategory, createSubCategory, approveCategory, rejectCategory };
