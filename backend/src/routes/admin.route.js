import { Router } from "express";
import {
  createAdmin,
  reLoginToken,
  getAllAdmins,
  getAdminById,
  markAsActiveVerified,
  dashboardData,
  adminLogin,
  getCurrentRequestData,
} from "../controllers/admin.controller.js";

import { VerifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

//public routes
router.route("/register/new").post(createAdmin);
router.route("/login").post(adminLogin);
// router.route("/login").post(loginCustomer);
router.route("/auth/re-login").post(reLoginToken);
router.route("/get/data/dashboard-data/:query").get(dashboardData);
router
  .route("/get/data/current/:query/:keyId/:adminId")
  .get(getCurrentRequestData);

//private routes
// router
//   .route("/otp/authentication/:verificationType/:customerId")
//   .post(otpVerification);

export default router;
