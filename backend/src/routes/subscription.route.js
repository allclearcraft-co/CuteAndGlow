import { Router } from "express";
import {
  createSubscription,
  getSubscriptionByMadeFor,
  getSubscriptionById,
  updateSubscription,
} from "../controllers/subscription.controller.js";

const router = Router();

router.route("/create/new-model/:adminId").post(createSubscription);
router.route("/get/subscription/:query").get(getSubscriptionByMadeFor);
router
  .route("/get/subscription/details/by-id/:subscriptionId")
  .get(getSubscriptionById);
router.route("/update/:subscriptionId").post(updateSubscription);

export default router;
