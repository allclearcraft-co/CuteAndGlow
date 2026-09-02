import { Router } from "express";

import { createAppointment } from "../controllers/serviceBooking.controller.js";

const router = Router();

router
  .route("/add/create/new-appointment/:customerId/:serviceId/:storeId")
  .post(createAppointment);

export default router;
