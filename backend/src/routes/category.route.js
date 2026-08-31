import { Router } from "express";
import { VerifyAdmin } from "../middlewares/admin.middleware.js";
import {
  createCategory,
  createSubCategory,
  approveCategory,
  rejectCategory,
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/update/add-new/category")
  .post(VerifyAdmin, upload.single("image"), createCategory);
router.route("/update/approve/category").post(VerifyAdmin, approveCategory);
router.route("/update/reject/category").post(VerifyAdmin, rejectCategory);

router
  .route("/update/add-new/subcategory/:categoryId")
  .post(VerifyAdmin, upload.single("image"), createSubCategory);

export default router;
