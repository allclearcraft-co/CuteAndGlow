import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyStore } from "../middlewares/store.middleware.js";
import { VerifyProfessional } from "../middlewares/professional.middleware.js";
import { createStoreService } from "../controllers/service.controller.js";

const router = Router();

router
  .route("/add/service/store/:storeId")
  .post(VerifyStore, upload.array("images", 5), createStoreService);

export default router;
