import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Services } from "../models/service.model.js";
import { Store } from "../models/store.model.js";
import { Professional } from "../models/professional.model.js";
import { Customer } from "../models/customer.model.js";
import { ServiceBookings } from "../models/serviceBooking.model.js";
import sendEmail from "../services/mail.service.js";
import serviceBookingTemplate from "../template/booking.mail.template.js";

const createAppointment = asyncHandler(async (req, res) => {
  const { serviceId, customerId, storeId } = req.params;
  const { dateForBooking, modeOfPayment, bookingAmount, address } = req.body;
  if (!serviceId || !customerId || !dateForBooking || !modeOfPayment)
    throw new ApiError(400, "Something went wrong, please try again ");

  if (!address)
    throw new ApiError(400, "Please add an address first to proceed");

  const newService = await ServiceBookings.create({
    service: serviceId,
    customer: customerId,
    address: address,
    store: storeId,
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

  const service = await Services.findById(serviceId);
  const store = await Store.findById(storeId);
  function formatDate(mongoDate) {
    const date = new Date(mongoDate);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  }

  const formattedDate = formatDate(dateForBooking);

  await sendEmail({
    to: customer?.email,
    subject: "Appointment booking confirmation",
    html: serviceBookingTemplate(
      customer?.name,
      service?.name,
      formattedDate,
      store?.storeName,
      store?.storeContactNumber,
    ),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Appointment booked successfully !"));
});

export { createAppointment };
