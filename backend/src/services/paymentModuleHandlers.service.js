import { PAYMENT_MODULES } from "../constants/payment.constants.js";
import { Store } from "../models/store.model.js";

/**
 * CITY DARSHAN HANDLER
 * transaction.moduleId = CityDarshanBooking._id
 */
const cityDarshanHandler = {
  onPaymentSuccess: async (transaction) => {
    const booking = await CityDarshanBooking.findById(transaction.moduleId);

    if (!booking) {
      return false;
    }

    /**
     * Idempotency:
     * if already captured / confirmed, do nothing
     */
    if (
      booking.paymentStatus === "Captured" &&
      booking.bookingStatus === "Confirmed"
    ) {
      return true;
    }

    booking.paymentTransaction = transaction._id;
    booking.paymentStatus = "Captured";
    booking.bookingStatus = "Confirmed";
    booking.gatewayOrderId = transaction.gatewayOrderId || null;
    booking.gatewayPaymentId = transaction.gatewayPaymentId || null;
    booking.gatewaySignature = transaction.gatewaySignature || null;
    booking.paymentDate = transaction.paymentDate || new Date();
    booking.remarks = "Payment successful and booking confirmed";

    await booking.save();
    return true;
  },

  onPaymentFailed: async (transaction) => {
    const booking = await CityDarshanBooking.findById(transaction.moduleId);

    if (!booking) {
      return false;
    }

    booking.paymentTransaction = transaction._id;
    booking.paymentStatus = "Failed";
    booking.bookingStatus = "Pending";
    booking.remarks = transaction.remarks || "Payment failed";

    await booking.save();
    return true;
  },
};

const hotelHandler = {
  onPaymentSuccess: async () => true,
  onPaymentFailed: async () => true,
};

const travelPackageHandler = {
  onPaymentSuccess: async () => true,
  onPaymentFailed: async () => true,
};

const facilitatorHandler = {
  onPaymentSuccess: async () => true,
  onPaymentFailed: async () => true,
};

const clubHandler = {
  onPaymentSuccess: async () => true,
  onPaymentFailed: async () => true,
};

const promotionHandler = {
  onPaymentSuccess: async () => true,
  onPaymentFailed: async () => true,
};

const subscriptionHandler = {
  onPaymentSuccess: async () => true,
  onPaymentFailed: async () => true,
};

const registrationHandler = {
  onPaymentSuccess: async (transaction) => {
    const store = await Store.findById(transaction.user);

    if (!store) return false;

    if (store.registrationFeePaid) return true;

    store.registrationFeePaid = true;
    store.registrationFeePaidAt = new Date();
    store.registrationPaymentTransaction = transaction._id;

    await store.save();

    return true;
  },

  onPaymentFailed: async () => true,
};

const handlers = {
  [PAYMENT_MODULES.REGISTRATION_CHARGE]: registrationHandler,
};

export const getPaymentModuleHandler = (module) => {
  return handlers[module] || null;
};

export const runPaymentSuccessHandler = async (transaction) => {
  const handler = getPaymentModuleHandler(transaction.module);
  if (handler?.onPaymentSuccess) {
    return handler.onPaymentSuccess(transaction);
  }
  return null;
};

export const runPaymentFailedHandler = async (transaction) => {
  const handler = getPaymentModuleHandler(transaction.module);
  if (handler?.onPaymentFailed) {
    return handler.onPaymentFailed(transaction);
  }
  return null;
};
