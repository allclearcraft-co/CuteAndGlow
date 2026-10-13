import { Router } from "express";
import { createFranchise } from "../controllers/franchise.controller.js";
import { VerifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.get(
  "/update/create/new-franchise/:adminId",
  VerifyAdmin,
  createFranchise,
);

export default router;
