import { FetchData } from "../../utils/FetchFromApi";
import Button from "../../components/Button";
import InputBox from "../../components/Input";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingUI from "../../components/ui/LoadingUI";
import { useToast } from "../../components/hooks/ToastContext";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import CustomerProfileCard from "../../components/ui/CustomerProfileCard";

const ServiceBooking = ({ startLoading, stopLoading }) => {
  const { serviceName, serviceId, userId } = useParams();
  const { alertInfo, alertSuccess, alertError } = useToast();
  const [customer, setCustomer] = useState({});
  const [customerAddress, setCustomerAddress] = useState({});
  const [customerDefaultAddress, setCustomerDefaultAddress] = useState({});
  const [service, setService] = useState({});
  const formRef = useRef();
  const navigate = useNavigate();

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      const formData = new FormData(formRef.current);
      const response = await FetchData(
        `service-booking/add/create/new-appointment/${userId}/${serviceId}`,
        "post",
        formData,
      );
      console.log(response);
      navigate("/dashboard");
      alertSuccess("Appointment booked successfully !");
    } catch (err) {
      console.log(err.response.data);
      alertError(err.response.data);
    } finally {
      stopLoading();
    }
  };

  const getCustomerById = async () => {
    try {
      startLoading();
      const response = await FetchData(
        `customer/get/customer/data/${userId}`,
        "get",
      );
      setCustomer(response.data.data.customer);
      setCustomerDefaultAddress(response.data.data.customer.address);
      setCustomerAddress(response.data.data.address);
    } catch (err) {
    } finally {
      stopLoading();
    }
  };

  const getServiceById = async () => {
    try {
      startLoading();
      const response = await FetchData(
        `services/get/service/by-id/${serviceId}`,
        "get",
      );
      setService(response.data.data);
    } catch (err) {
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    getServiceById();
    getCustomerById();
  }, [userId, serviceId]);

  const handleMarkAddressAsDefault = async ({ addressId }) => {
    try {
      startLoading();
      console.log(addressId);
      const response = await FetchData(
        `customer/update/add-address/${userId}/${addressId}`,
        "post",
      );
      console.log(response);
      getServiceById();
      getCustomerById();
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  const displayServiceData = [
    { label: "name", value: service?.name },
    {
      label: "Booking",
      value: (
        <span>
          {" "}
          {service?.bookingAcceptingHours?.from} -
          {service?.bookingAcceptingHours?.till},
        </span>
      ),
    },
    { label: "Booking Day/s allowed", value: service?.bookingDays },
    { label: "Category", value: service?.category },
    { label: "Duration (mins)", value: service?.duration },
    {
      label: "Requirements from customer-end",
      value: (
        <span className="flex flex-col justify-start items-start">
          {service?.serviceRequirements?.map((i, index) => (
            <span>
              {index + 1}. {i}
            </span>
          ))}
        </span>
      ),
    },
    {
      label: "Service offered by",
      value: service?.store?.storeName || service?.professional?.name || "--",
    },
  ];
  const displayChargesData = [
    { label: "Amount", value: service?.charges },
    { label: "Surge Fee", value: 110 },
    { label: "Platform fee", value: 20 },
    // { label: "CGST", value: (service?.charges * 9) / 100 },
    // { label: "SGST", value: (service?.charges * 9) / 100 },
    {
      label: "Grand Total",
      value: 110 + 20 + service?.charges,
    },
  ];

  return (
    <div className="flex justify-center items-start w-full gap-10 px-5 py-2 lg:py-10 relative">
      <div className="w-[40%] bg-neutral-100 flex flex-col justify-center items-center rounded-xl py-5 gap-6 sticky top-24 left-0">
        <h1 className="heading text-3xl text-[#8B2954]">
          Service & Billing details
        </h1>
        <div className="flex justify-start items-start flex-col w-full px-5 gap-2">
          <h1 className="heading text-xl">Service Details</h1>
          <div className="flex justify-start items-start flex-col ">
            {displayServiceData?.map((i, index) => (
              <h1>
                <strong className="heading capitalize">{i.label}: </strong>
                {i.value}
              </h1>
            ))}
          </div>
        </div>
        <div className="w-[90%] border border-[#8B2954]" />
        <div className="flex justify-start items-start flex-col w-full px-5 gap-2">
          <h1 className="heading text-xl">Billing Details</h1>
          <div className="flex justify-start items-start flex-col w-full">
            {displayChargesData?.map((i, index) => (
              <h1 className="w-full flex justify-between items-center">
                <strong className="heading capitalize">{i.label}: </strong>
                <span className="underline decoration-dashed underline-offset-2">
                  {i.value}
                </span>
              </h1>
            ))}
          </div>
          <div className="w-full border-[0.5px] border-[#8B2954]" />
          <p className="text-xs flex justify-start items-center">
            <span className="heading">Platform fee:</span>
            This small fee helps us pay bills so that we can keep Cute & Glow
            running.
          </p>
        </div>
        <form
          onSubmit={handleBookAppointment}
          ref={formRef}
          className="flex flex-col justify-center items-center w-full px-5 gap-1"
        >
          <InputBox
            type="date"
            label="Date for booking"
            name="dateForBooking"
          />
          <InputBox
            type="text"
            label="Mode of payment"
            name="modeOfPayment"
            value={"Cash Payment"}
          />
          <InputBox
            type="number"
            name="bookingAmount"
            value={110 + 20 + service?.charges}
            className="hidden"
          />
          <Button
            className="w-full "
            LabelName="Book Appointment"
            type="submit"
          />

          {/* <label
            className={`block text-sm font-medium text-gray-700 mb-2 capitalize`}
          >
            Mode of payment<span className="text-red-500">*</span>
          </label>
          <select
            name="modeOfPayment"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg bg-neutral-50 text-gray-700 outline-none focus:ring-1 focus:ring-[#8B2954] focus:border-[#8B2954] transition hover:shadow-md disabled:bg-gray-100 disabled:cursor-not-allowed`}
          >
            <option value="">Select</option>
            {["Online Payment", "Cash Payment"].map((i, index) => (
              <option key={index} value={i}>
                {index + 1}. {i}
              </option>
            ))}
          </select> */}
        </form>
      </div>

      <div className="w-full lg:w-[60%] flex flex-col justify-start items-start gap-5">
        <h1 className="heading text-3xl text-[#8B2954]">Your details</h1>
        {/* address  */}
        <div className="w-full overflow-scroll flex">
          {/* default address  */}
          <div className="gap-1 mx-1 w-fit text-xs select-none cursor-pointer">
            <div className="bg-neutral-200 rounded-2xl shadow-md border border-gray-200 p-3 hover:shadow-lg transition w-64">
              {/* Top */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex justify-center items-center text-[#8B2954] text-xl">
                    {customerDefaultAddress?.[0]?.icon || <FaUser />}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">
                      {customerDefaultAddress?.[0]?.addressType || "Na"}
                    </h2>
                    {customerDefaultAddress?.[0]?.defaultAddress && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </div>
                <FaMapMarkerAlt className="text-xl" />
              </div>
              {/* Details */}
              <div className="mt-2 space-y-2">
                <h3 className="font-semibold">
                  {customerDefaultAddress?.[0]?.contactDetails?.name} |{" "}
                  {customerDefaultAddress?.[0]?.contactDetails?.contact}
                </h3>
                <p className="text-gray-500 heading">Your Address: </p>
              </div>
              <p className=" leading-4">
                {customerDefaultAddress?.[0]?.flatNumber}{" "}
                {customerDefaultAddress?.[0]?.floor}{" "}
                {customerDefaultAddress?.[0]?.block},{" "}
                {customerDefaultAddress?.[0]?.societyName} <br />{" "}
                {customerDefaultAddress?.[0]?.street1}{" "}
                {customerDefaultAddress?.[0]?.street2
                  ? customerDefaultAddress?.[0]?.street2
                  : ""}{" "}
                <br />
                {customerDefaultAddress?.[0]?.area}, near{" "}
                {customerDefaultAddress?.[0]?.locality} <br />{" "}
                {customerDefaultAddress?.[0]?.sector ? (
                  <span>Sector: {customerDefaultAddress?.[0]?.sector}</span>
                ) : (
                  ""
                )}{" "}
                <br />
                {customerDefaultAddress?.[0]?.city},{" "}
                {customerDefaultAddress?.[0]?.state}
                <br />{" "}
                <span className="heading">
                  {customerDefaultAddress?.[0]?.country}
                  {customerDefaultAddress?.[0]?.pincode
                    ? -customerDefaultAddress?.[0]?.pincode
                    : ""}
                </span>
              </p>
            </div>
          </div>

          {/* other address  */}
          {customer?.address?.length === 0 ? (
            "No address found"
          ) : Array.isArray(customer?.address) ? (
            <div className="flex text-xs select-none cursor-pointer">
              {customerAddress?.map((d, index) => (
                <div
                  onClick={() =>
                    handleMarkAddressAsDefault({
                      addressId: d?._id,
                    })
                  }
                  key={index}
                  className="gap-1 mx-1 w-fit"
                >
                  <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-3 hover:shadow-lg transition w-64">
                    {/* Top */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex justify-center items-center text-[#8B2954] text-xl">
                          {d?.icon || <FaUser />}
                        </div>
                        <div>
                          <h2 className="font-semibold text-lg">
                            {d?.addressType || "Na"}
                          </h2>
                          {d?.defaultAddress && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <FaMapMarkerAlt className="text-[#8B2954] text-xl" />
                    </div>
                    {/* Details */}
                    <div className="mt-2 space-y-2">
                      <h3 className="font-semibold text-gray-800">
                        {d?.contactDetails?.name} | {d?.contactDetails?.contact}
                      </h3>
                      <p className="text-gray-500 heading">Your Address: </p>
                    </div>
                    <p className="text-gray-600 leading-4">
                      {d?.flatNumber} {d?.floor} {d?.block}, {d?.societyName}{" "}
                      <br /> {d?.street1} {d?.street2 ? d?.street2 : ""} <br />
                      {d?.area}, near {d.locality} <br />{" "}
                      {d?.sector ? <span>Sector: {d?.sector}</span> : ""} <br />
                      {d?.city}, {d?.state}
                      <br />{" "}
                      <span className="heading">
                        {d?.country}
                        {d?.pincode ? -d?.pincode : ""}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <CustomerProfileCard
            customer={customer}
            customerId={customer?._id}
            reload={() => {
              getCustomerById();
              getServiceById();
            }}
          />
        </div>
      </div>
      <div className="h-full bg-neutral-900 w-[0.5px]" />
    </div>
  );
};

export default LoadingUI(ServiceBooking);
