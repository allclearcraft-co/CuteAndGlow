import { Router } from "express";
import {
  createSubscription,
  getSubscriptionByMadeFor,
  getSubscriptionById,
} from "../controllers/subscription.controller.js";

const router = Router();

router.route("/create/new-model/:adminId").post(createSubscription);
router.route("/get/subscription/:query").get(getSubscriptionByMadeFor);
router
  .route("/get/subscription/details/by-id/:subscriptionId")
  .get(getSubscriptionById);

export default router;
