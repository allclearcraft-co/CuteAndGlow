import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Services } from "../models/service.model.js";
import { Store } from "../models/store.model.js";
import { Professional } from "../models/professional.model.js";
import { Customer } from "../models/customer.model.js";
import { ServiceBookings } from "../models/serviceBooking.model.js";

const createAppointment = asyncHandler(async (req, res) => {
  const { serviceId, customerId } = req.params;
  const { dateForBooking, modeOfPayment, bookingAmount, address } = req.body;
  if (!serviceId || !customerId || !dateForBooking || !modeOfPayment)
    throw new ApiError(400, "Something went wrong, please try again ");

  const newService = await ServiceBookings.create({
    service: serviceId,
    customer: customerId,
    address: address,
    dateOfBooking: new Date(),
    dateForBooking: dateForBooking,
    modeOfPayment: modeOfPayment,
    bookingAmount: bookingAmount,
  });
  if (!newService)
    throw new ApiError(400, "Unable to book appointment, please retry !");

  const customerExists = await Customer.exists({
    _id: customerId,
  });

  if (!customerExists) {
    throw new ApiError(404, "Customer not found");
  }

  const customer = await Customer.findByIdAndUpdate(customerId, {
    $push: {
      bookings: newService._id,
    },
  });
  if (!customer) throw new ApiError(400, "Something went wrong");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Appointment booked successfully !"));
});

export { createAppointment };
