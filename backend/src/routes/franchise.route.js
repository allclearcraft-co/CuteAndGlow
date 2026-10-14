import { Router } from "express";
import {
  createFranchise,
  getAllFranchise,
} from "../controllers/franchise.controller.js";
import { VerifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.post(
  "/update/create/new-franchise/:adminId",
  VerifyAdmin,
  createFranchise,
);
router.get("/get/all-models/all-franchise-model", getAllFranchise);

export default router;
