import { Router } from "express";
import {
  createSubscription,
  getSubscriptionByMadeFor,
} from "../controllers/subscription.controller.js";

const router = Router();

router.route("/create/new-model/:adminId").post(createSubscription);
router.route("/get/subscription/:query").get(getSubscriptionByMadeFor);

export default router;
