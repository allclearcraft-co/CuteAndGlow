import { Router } from "express";
import {
  createPayment,
  getPaymentTransaction,
  verifyPayment,
  paymentWebhook,
  retryPayment,
} from "../controllers/payment.controller.js";
import { VerifyStore } from "../middlewares/store.middleware.js";

const router = Router();

router.post("/create", VerifyStore, createPayment);
router.get("/transaction/:transactionId", getPaymentTransaction);
router.post("/verify", VerifyStore, verifyPayment);
router.post("/webhook", paymentWebhook);
router.post("/retry/:transactionId", retryPayment);

export default router;
