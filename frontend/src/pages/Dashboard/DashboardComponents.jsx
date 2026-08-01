import React, { useEffect, useRef } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserEdit,
  FaCalendarCheck,
  FaHeart,
  FaHome,
  FaCrown,
  FaPlus,
  FaEdit,
  FaTrash,
  FaBriefcase,
  FaUniversity,
  FaCreditCard,
  FaMobileAlt,
  FaClock,
  FaUserTie,
  FaRupeeSign,
  FaEye,
  FaStar,
  FaTimesCircle,
  FaStore,
  FaFemale,
  FaCheckCircle,
  FaCalendarAlt,
  FaLocationArrow,
  FaUpload,
  FaBuilding,
  FaFilePdf,
  FaUser,
  FaDatabase,
  FaMale,
  FaMarsDouble,
  FaRegUser,
} from "react-icons/fa";
import { FaCloudUploadAlt, FaImage, FaCamera } from "react-icons/fa";
import { useState } from "react";
import { bookings, activeBookings } from "../../constants/constants";
import NonGenderSvg from "../../assets/non-gender-user.svg";
import { FetchData } from "../../utils/FetchFromApi";
import { useToast } from "../../components/hooks/ToastContext";
import InputBox from "../../components/Input";
import Button from "../../components/Button";
import Popup from "../../components/ui/Popup";
import { formatDateString } from "../../utils/utility-functions";
import AddressMap from "../../components/ui/AddressMap";
import { MdOutlineVerified } from "react-icons/md";
import StoreServiceCard from "../../components/ui/StoreServiceCard";

const Overview = ({ data, role, callData }) => {
  useEffect(() => {
    callData();
  }, []);
  const displayData =
    role === "Customer"
      ? data?.customer
      : role === "Store"
        ? data?.store
        : data?.professional;

  return (
    <div className="space-y-6 w-full">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Here's a quick overview of your account.
          </p>
        </div>
        <button className="flex justify-center items-center gap-2 bg-[#8B2954] text-white px-5 py-3 rounded-xl hover:bg-[#742247] transition duration-300">
          <FaUserEdit />
          Update Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white text-neutral-950 rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-36 h-36">
          <img
            src={displayData?.profileImage?.url || NonGenderSvg}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex items-center gap-3">
            <h2 className="capitalize text-xl flex justify-center items-center gap-2 font-semibold text-neutral-950 heading">
              {displayData?.name || displayData?.storeName || "NA"}{" "}
              <span className="bg-yellow-300 text-sm heading px-2 py-1 rounded-2xl">
                {displayData?.gender === "Prefer not to say"
                  ? ""
                  : displayData?.gender}
              </span>
            </h2>

            {/* {role === "user" || "USER" || "User" ? (
              <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                <FaCrown />
                Premium Member
              </span>
            ) : (
              ""
            )} */}
          </div>

          <p className="text-gray-500 mt-1 text-sm">
            Joined since {formatDateString(displayData?.createdAt)}
          </p>

          <div className="grid md:grid-cols-2 gap-2">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#8B2954]" />
              <span>
                {displayData?.email || displayData?.storeEmail || "Na"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#8B2954]" />
              <span>
                +91{" "}
                {displayData?.contactNumber ||
                  displayData?.storeContactNumber ||
                  "Na"}
              </span>
            </div>
            {displayData?.alternateContactNumber ? (
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#8B2954]" />
                <span>
                  +91 {displayData?.alternateContactNumber || "9876543210"}{" "}
                  <span className="bg-neutral-200 p-1 rounded-full font-semibold text-[13px]">
                    Alternate
                  </span>
                </span>
              </div>
            ) : (
              ""
            )}
            {data?.defaultAddress ? (
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#8B2954]" />
                <span>{displayData?.address || "Ranchi, Jharkhand"}</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}
      {role === "Customer" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>

                <h2 className="text-xl font-bold mt-2">
                  {displayData?.bookings?.length || "No bookings yet"}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-full bg-pink-100 flex justify-center items-center">
                <FaCalendarCheck className="text-[#8B2954] text-2xl" />
              </div>
            </div>
          </div>

          {data?.defaultAddress ? (
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Saved Addresses</p>

                  <h2 className="text-xl font-bold mt-2">
                    {displayData?.savedAddress || "No address added"}
                  </h2>
                </div>

                <div className="w-14 h-14 rounded-full bg-pink-100 flex justify-center items-center">
                  <FaHome className="text-[#8B2954] text-xl" />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {/* Recent Activity */}

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-5">Recent Activity</h2>

        <div className="space-y-5">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h3 className="font-medium">Bridal Makeup Appointment</h3>

              <p className="text-gray-500 text-sm">
                Urban Beauty Salon • 10 June 2025
              </p>
            </div>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Completed
            </span>
          </div>

          {/* <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h3 className="font-medium">Hair Spa Booking</h3>

              <p className="text-gray-500 text-sm">Glow Salon • 22 June 2025</p>
            </div>

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
              Upcoming
            </span>
          </div> */}

          {/* <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Saree Draping</h3>

              <p className="text-gray-500 text-sm">
                Elite Beauty Studio • 25 June 2025
              </p>
            </div>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              Confirmed
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const SavedAddress = ({ data, role, userId, handleReload, callData }) => {
  const formRef = useRef();
  const [showForm, setShowForm] = useState(false);
  const { alertInfo, alertSuccess, alertError } = useToast();
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    callData();
  }, []);

  const addNewAddress = async (e) => {
    e.preventDefault();
    if (!coordinates.longitude || !coordinates.latitude) {
      alertError("Unable to fetch location, please try again !");
      setShowForm(false);
      formRef.current.reset();
      setCoordinates({ latitude: null, longitude: null });
    }
    try {
      const formData = new FormData(formRef.current);
      const response = await FetchData(
        `${role}/update/add-address/${userId}`,
        "post",
        formData,
      );
      console.log(response);
      setShowForm(false);
      formRef.current.reset();
      alertSuccess(response.data.message);
      setCoordinates({ latitude: null, longitude: null });
      handleReload();
    } catch (err) {
      alertError(err.response.data);
    }
  };

  const deleteCurrentAddress = async ({ addressId }) => {
    try {
      const response = await FetchData(``, "delete");
      console.log(response);
      alertSuccess(response.data.message);
    } catch (err) {
      console.log(err.response);
      alertError(err.response.data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Saved Addresses</h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage your delivery and service locations.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#8B2954] text-white px-5 py-2 rounded-lg hover:bg-[#732247] transition"
        >
          <FaPlus />
          Add Address
        </button>
      </div>

      {Array.isArray(data) ? (
        <div>
          {data?.map((d, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-2">
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition w-fit">
                {/* Top */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex justify-center items-center text-[#8B2954] text-xl">
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
                <div className="mt-5 space-y-2">
                  <h3 className="font-semibold text-gray-800">
                    {d?.contactDetails?.name} | {d?.contactDetails?.contact}
                  </h3>
                  <p className="text-gray-500 heading">Your Address: </p>
                </div>
                <p className="text-gray-600 leading-6">
                  {d?.flatNumber} {d?.floor} {d?.block}, {d?.societyName} <br />{" "}
                  {d?.street1} {d?.street2 ? d?.street2 : ""} <br />
                  {d?.area}, near {d.locality} <br />{" "}
                  {d?.sector ? <span>Sector: {d?.sector}</span> : ""} <br />
                  {d?.city}, {d?.state}
                  <br />{" "}
                  <span className="heading">
                    {d?.country}
                    {d?.pincode ? -d?.pincode : ""}
                  </span>
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      <Popup isOpen={showForm} onClose={() => setShowForm(false)}>
        <form
          ref={formRef}
          onSubmit={addNewAddress}
          className="flex-col flex justify-start items-start w-full md:w-[90vw] md:h-[90vh] overflow-scroll"
        >
          <h1 className="heading text-3xl">Add address</h1>
          <div className="flex flex-col lg:flex-row justify-center items-start w-full h-full relative gap-5">
            <div className="w-full lg:w-1/2 h-[30vh] lg:h-full sticky top-0 left-0">
              <AddressMap setCoordinates={setCoordinates} />
            </div>
            <div className="w-full lg:w-1/2 h-full">
              <div className="grid md:grid-cols-2 gap-1 w-full">
                <InputBox label="Flat / House Number" name="flatNumber" />
                <InputBox label="floor" name="floor" required={false} />
                <InputBox label="block" name="block" required={false} />
                <InputBox
                  label="society name"
                  name="societyName"
                  required={false}
                />
                <InputBox label="street 1" name="street1" />
                <InputBox label="street 2" name="street2" required={false} />
                <InputBox label="area" name="area" />
                <InputBox label="landmark" name="locality" />
                <InputBox label="sector" name="sector" required={false} />
                <InputBox label="city" name="city" />
                <InputBox label="state" name="state" />
                <InputBox label="country" name="country" />
                <InputBox
                  label="country"
                  name="lng"
                  value={coordinates?.longitude}
                  className="hidden"
                  labelClassName="hidden"
                />
                <InputBox
                  label="country"
                  name="lat"
                  value={coordinates?.latitude}
                  className="hidden"
                  labelClassName="hidden"
                />
                <div
                  className={`w-full border h-0 col-span-2 border-neutral-200 ${role === "customer" || "Customer" ? "block" : "hidden"}`}
                />
                <InputBox
                  required={false}
                  label="name"
                  name="name"
                  labelClassName={`${role === "customer" || "Customer" ? "block" : "hidden"}`}
                  className={`${role === "customer" || "Customer" ? "block" : "hidden"}`}
                />
                <InputBox
                  required={false}
                  label="contact"
                  name="contact"
                  labelClassName={`${role === "customer" || "Customer" ? "block" : "hidden"}`}
                  className={`${role === "customer" || "Customer" ? "block" : "hidden"}`}
                />
                <div
                  className={`w-full py-3 ${role === "customer" || "Customer" ? "block" : "hidden"}`}
                >
                  <label
                    htmlFor={name}
                    className={`block text-sm font-medium text-gray-700 mb-2 capitalize`}
                  >
                    Address type<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="addressType"
                    // value={}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg bg-neutral-50 text-gray-700 outline-none focus:ring-1 focus:ring-[#8B2954] focus:border-[#8B2954] transition hover:shadow-md disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  >
                    <option value="">Select</option>
                    {["Home", "Friend's", "Others"].map((i, index) => (
                      <option key={index} value={i}>
                        {index + 1}. {i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center gap-10 ">
                <Button LabelName="Submit" type="submit" />
              </div>
            </div>
          </div>
        </form>
      </Popup>
    </div>
  );
};

const BankingDetails = ({ data, role, userId, handleReload, callData }) => {
  const [showForm, setShowForm] = useState(false);
  const { alertInfo, alertSuccess, alertError } = useToast();
  const formRef = useRef();
  const bankId = data?._id;

  useEffect(() => {
    callData();
  }, []);

  const addBank = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current);
      const response = await FetchData(
        `${role}/update/add-bank-details/${userId}`,
        "post",
        formData,
      );
      alertSuccess(response.data.message);
      setShowForm(false);
      formRef.current.reset();
      handleReload();
    } catch (err) {
      alertError(err.response.data);
    }
  };

  const deleteBankDetails = async () => {
    try {
      const response = await FetchData(
        `${role}/update/delete-bank-details/${bankId}/${userId}`,
        "delete",
      );
      alertSuccess(response.data.message);
      handleReload();
    } catch (err) {
      alertError(err.response.data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Banking Details</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your bank account and payment methods.
          </p>
        </div>

        {data ? (
          ""
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#8B2954] text-white px-5 py-2 rounded-lg hover:bg-[#742247] transition"
          >
            <FaPlus />
            Add Bank
          </button>
        )}
      </div>

      {data ? (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-[#8B2954]">
                <FaUniversity size={28} />
              </div>
              <div>
                <h2 className="text-xl font-semibold capitalize">
                  {data?.accountDetails?.bankName || "State Bank of India"}
                </h2>
                <p className="text-gray-500 capitalize">
                  {data?.accountDetails?.branchName ||
                    "Personal Banking Branch"}
                </p>
              </div>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Verified
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <p className="text-sm text-gray-500">Account Holder</p>
              <h3 className="font-semibold capitalize">
                {data?.accountDetails?.accountHolderName || "Na"}
              </h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Number</p>
              <h3 className="font-semibold capitalize">
                {data?.accountDetails?.accountNumber || "Na"}
              </h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">IFSC Code</p>
              <h3 className="font-semibold uppercase">
                {data?.accountDetails?.ifscCode || "Na"}
              </h3>
            </div>
          </div>

          {/* UPI */}
          <div className="mt-8 border-t pt-6">
            <div className="flex items-center gap-3 mb-2">
              <FaMobileAlt className="text-[#8B2954]" />

              <h3 className="font-semibold text-lg">UPI Details</h3>
            </div>

            <p className="text-gray-600">{data?.accountDetails?.upi || "Na"}</p>
          </div>
          {/* Actions */}
          <div className="flex justify-end ">
            <button
              onClick={() => deleteBankDetails()}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>No data found please add bank account</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#8B2954] text-white px-5 py-2 rounded-lg hover:bg-[#742247] transition"
          >
            <FaPlus />
            Add Bank
          </button>
        </div>
      )}
      <Popup isOpen={showForm} onClose={() => setShowForm(false)}>
        <form
          ref={formRef}
          onSubmit={addBank}
          className="flex-col flex justify-center items-center w-full md:w-[70vw]"
        >
          <h1 className="heading text-3xl">Add bank account</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <InputBox label="Bank name" name="bankName" />
            <InputBox label="Branch name" name="branchName" />
            <InputBox label="Account holder name" name="accountHolderName" />
            <InputBox label="Account number" name="accountNumber" />
            <InputBox
              label="confirm account number"
              name="confirmAccountNumber"
            />
            <InputBox label="ifsc code" name="ifscCode" />
            <InputBox label="UPI Id" name="upiID" />
          </div>
          <div className="flex justify-center items-center gap-10 ">
            <Button LabelName="Submit" type="submit" />
          </div>
        </form>
      </Popup>
      {/* {showForm && (
        <div>
          <form className="flex-col flex justify-center items-center w-full md:w-[70vw]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <InputBox label="Bank name" name="bankName" />
              <InputBox label="Branch name" name="branchName" />
              <InputBox label="Account holder name" name="accountHolderName" />
              <InputBox label="Account number" name="accountNumber" />
              <InputBox
                label="confirm account number"
                name="confirmAccountNumber"
              />
              <InputBox label="ifsc code" name="ifscCode" />
            </div>
            <div className="flex justify-center items-center gap-10 ">
              <Button LabelName="Cancel" variant="Secondary" />
              <Button LabelName="Submit" />
            </div>
          </form>
        </div>
      )} */}
    </div>
  );
};

const StoreStaffs = ({ data, role, userId, handleReload, callData }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const { alertInfo, alertSuccess, alertError } = useToast();
  const formRef = useRef();
  const bankId = data?._id;

  useEffect(() => {
    callData();
  }, []);

  const addBank = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current);
      const response = await FetchData(
        `${role}/update/add-store-staff/${userId}`,
        "post",
        formData,
        true,
      );
      alertSuccess(response.data.message);
      setShowForm(false);
      formRef.current.reset();
      handleReload();
    } catch (err) {
      alertError(err.response.data);
    }
  };

  const deleteBankDetails = async () => {
    try {
      const response = await FetchData(
        `${role}/update/delete-bank-details/${bankId}/${userId}`,
        "delete",
      );
      alertSuccess(response.data.message);
      handleReload();
    } catch (err) {
      alertError(err.response.data);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  console.log(data);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Store Staffs</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your Store Staffs here.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#8B2954] text-white px-5 py-2 rounded-lg hover:bg-[#742247] transition"
          >
            <FaPlus />
            Add Staff
          </button>
        </div>
      </div>

      {Array.isArray(data) ? (
        <div>
          {data?.map((data, index) => (
            <div className="w-full bg-white rounded-xl flex  md:flex-row flex-col justify-between items-center shadow-md md:px-6 py-4 border border-gray-200 ">
              <div className="md:w-[52vw] flex  md:flex-row md:justify-center md:items-center md:gap-8 gap-6">
                {/* images */}
                <div className="md:w-40 md:h-38 h-16 w-22 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={data?.profileImage?.url || NonGenderSvg}
                    alt={data?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Store staff details */}
                <div className="md:w-[40vw] w-full grid md:grid-cols-2 grid-cols-1 md:gap-20 gap-2 ">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">{data?.name || "Na"}</h2>

                    <p className="text-gray-500">{data?.role}</p>

                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-[#8B2954] " />
                      <span>{data?.email || "na"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMobileAlt className="text-[#8B2954]" />
                      <span>{data?.contactNumber || "na"}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <FaUserTie className="text-[#8B2954]" />
                      <span>{data?.designation || "na"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaStar className="text-[#8B2954]" />
                      <span>{data?.specialization || " na"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaBriefcase className="text-[#8B2954]" />
                      <span>{data?.experience || "na"}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* buttons status */}
              <div className="w-full h-full flex flex-col  items-center justify-center gap-4 mt-6 p-4 lg:mt-0">
                <button
                  className={` md:w-40 md:h-8 w-full h-full px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2
              ${data?.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  <MdOutlineVerified />
                  {data?.isActive ? "Active" : "Inactive"}
                </button>

                <button
                  className={`md:w-40 md:h-8 w-full h-full px-4 py-2 rounded-full text-sm font-medium
                ${data?.isVerified ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}
                >
                  {data?.isVerified ? "Verified" : "Not Verified"}
                </button>

                <button
                  className={`md:w-40 md:h-8 h-full w-full px-4 py-2 rounded-full text-sm font-medium
              ${
                data?.kycComplete
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
                >
                  {data?.kycComplete ? "KYC Complete" : "KYC Pending"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>No data found please add staffs</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#8B2954] text-white px-5 py-2 rounded-lg hover:bg-[#742247] transition"
          >
            <FaPlus />
            Add Staff
          </button>
        </div>
      )}
      <Popup isOpen={showForm} onClose={() => setShowForm(false)}>
        <div className="flex justify-start items-start h-screen w-full overflow-scroll">
          {" "}
          <form
            ref={formRef}
            onSubmit={addBank}
            className="flex-col flex justify-start items-start w-full md:w-[90vw] md:h-[90vh] overflow-scroll"
          >
            <h1 className="heading text-3xl">Add Store Staff</h1>
            <div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              <InputBox label="name" name="name" type="text" />
              <InputBox
                label="contact number"
                name="contactNumber"
                type="text"
              />
              <InputBox label="email" name="email" type="text" />
              <InputBox label="designation" name="designation" type="text" />
              <InputBox label="experience" name="experience" type="text" />
              <InputBox
                label="specialization"
                name="specialization"
                type="text"
                placeholder="Mention the best work of your staff."
              />
              <div className="col-span-2 w-full h-1 bg-neutral-200" />
              <InputBox
                label="Profile Picture"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg"
                />
              )}
              <div className="col-span-2 w-full h-1 bg-neutral-200" />
              <div className="col-span-2 lg:grid lg:grid-cols-4 gap-2">
                <h1 className="col-span-4 capitalize">address</h1>
                <InputBox label="Flat / House Number" name="flatNumber" />
                <InputBox label="floor" name="floor" required={false} />
                <InputBox label="block" name="block" required={false} />
                <InputBox
                  label="society name"
                  name="societyName"
                  required={false}
                />
                <InputBox label="street 1" name="street1" />
                <InputBox label="street 2" name="street2" required={false} />
                <InputBox label="area" name="area" />
                <InputBox label="landmark" name="locality" />
                <InputBox label="sector" name="sector" required={false} />
                <InputBox label="city" name="city" />
                <InputBox label="state" name="state" />
                <InputBox label="country" name="country" />
                <InputBox label="pincode" name="pincode" />
              </div>
            </div>
            <div className="flex justify-center items-center gap-10 ">
              <Button LabelName="Submit" type="submit" />
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
};

const Booking = ({ data, role, userId, handleReload, callData }) => {
  console.log(data);

  useEffect(() => {
    callData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>

        <p className="text-gray-500 mt-1">
          View and manage all your beauty service bookings.
        </p>
      </div>

      {/* Cards */}

      <div className="space-y-5">
        {data.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
          >
            {/* Top */}

            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">
                  {booking?.service?.name}
                </h2>

                <p className="text-gray-500">{booking.store}</p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium
                  ${
                    booking?.dateForBooking < Date.now()
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.dateForBooking === Date.now()
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-yellow-600"
                  }
                  `}
              >
                {booking?.dateForBooking > Date.now() ? "Today" : "Upcoming"}
              </span>
            </div>

            {/* Details */}
            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-[#8B2954]" />
                {formatDateString(booking?.dateForBooking)}
              </div>

              <div className="flex items-center gap-3">
                <FaClock className="text-[#8B2954]" />
                {booking?.service?.duration || "--"} min
              </div>

              {/* <div className="flex items-center gap-3">
                <FaUserTie className="text-[#8B2954]" />
                {booking.professional}
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#8B2954]" />
                {booking.location}
              </div> */}

              <div className="flex items-center gap-3">
                <FaRupeeSign className="text-[#8B2954]" />{" "}
                {booking?.bookingAmount || "--"}
              </div>
            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-3 mt-8">
              {booking.status === "Upcoming" && (
                <button className="flex items-center gap-2 bg-red-100 text-red-600 px-5 py-2 rounded-lg hover:bg-red-200">
                  <FaTimesCircle />
                  Cancel Booking
                </button>
              )}

              {booking.status === "Completed" && (
                <button className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-lg hover:bg-yellow-200">
                  <FaStar />
                  Rate & Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FavoriteStore = ({ data, role }) => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">Favourite Stores</h1>

        <p className="text-gray-500 mt-1">
          Your saved salons and beauty studios.
        </p>
      </div>

      {/* Store List */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
          {/* Image */}

          <img
            src={`https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500`}
            className="w-full h-52 object-cover"
          />

          {/* Content */}

          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  {data?.name || "Glow Beauty Studio"}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <FaStar className="text-yellow-400" />
                  <span>{data?.rating || "2.1k"}</span>
                  <span className="text-gray-500">
                    ({data?.reviews || "4.5"} Reviews)
                  </span>
                </div>
              </div>

              <button className="text-red-500 hover:text-red-600">
                <FaHeart size={22} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <FaMapMarkerAlt className="text-[#8B2954]" />
                {data?.location || "Ranchi"}
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FaClock className="text-[#8B2954]" />
                {data?.timing || "4:00"}
              </div>
            </div>

            {/* Buttons */}

            <div className="flex gap-3 mt-6">
              <button className="flex-1 flex items-center justify-center gap-2 border border-[#8B2954] text-[#8B2954] py-2 rounded-lg hover:bg-[#8B2954] hover:text-white transition">
                <FaEye />
                View
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 bg-[#8B2954] text-white py-2 rounded-lg hover:bg-[#742247] transition">
                <FaCalendarCheck />
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FavoriteProfessional = ({ data, role }) => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Favorite Professionals
        </h1>

        <p className="text-gray-500 mt-1">
          Your trusted beauty experts, all in one place.
        </p>
      </div>

      {/* Professional Cards */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
          <div className="flex gap-5">
            {/* Image */}

            <img
              src={
                data?.image ||
                `https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500`
              }
              className="w-28 h-28 rounded-full object-cover "
            />

            {/* Details */}

            <div className="flex-1">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">
                  {data?.name || "Prachi Sharma"}
                </h2>

                <button className="text-red-500 hover:text-red-600">
                  <FaHeart size={22} />
                </button>
              </div>

              <p className="text-[#8B2954] font-medium mt-1">
                {data?.specialization || "Bridal Makeup Artist"}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <FaStar className="text-yellow-400" />
                <span>{data?.rating || "4.9"}</span>

                <span className="text-gray-500">
                  ({data?.reviews || "1.8k"} Reviews)
                </span>
              </div>

              <div className="flex items-center gap-2 mt-3 text-gray-600">
                <FaBriefcase className="text-[#8B2954]" />
                {data?.experience || "7 years"} Experience
              </div>

              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <FaDatabase className="text-[#8B2954]" />
                {data?.store || "Glow Beauty Studio"}
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex gap-3 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 border border-[#8B2954] text-[#8B2954] py-2 rounded-lg hover:bg-[#8B2954] hover:text-white transition">
              <FaEye />
              View Profile
            </button>

            <button className="flex-1 flex items-center justify-center gap-2 bg-[#8B2954] text-white py-2 rounded-lg hover:bg-[#742247] transition">
              <FaCalendarCheck />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = ({ data, role, userId, handleReload, callData }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [storeStaffList, setStoreStaffList] = useState([]);
  const [products, setProducts] = useState([
    {
      productType: "",
      brand: "",
    },
  ]);
  const [serviceInclusion, setServiceInclusion] = useState([""]);
  const [serviceExclusion, setServiceExclusion] = useState([""]);
  const [serviceRequirements, setServiceRequirements] = useState([""]);
  const { alertInfo, alertSuccess, alertError } = useToast();
  const formRef = useRef();

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        productType: "",
        brand: "",
      },
    ]);
  };

  const removeProduct = (index) => {
    if (products.length === 1) return;

    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  useEffect(() => {
    callData();
  }, []);

  const addInclusion = () => {
    setServiceInclusion((prev) => [...prev, ""]);
  };

  const addExclusion = () => {
    setServiceExclusion((prev) => [...prev, ""]);
  };

  const addRequirement = () => {
    setServiceRequirements((prev) => [...prev, ""]);
  };

  const handleRequirement = (index, value) => {
    const updated = [...serviceRequirements];
    updated[index] = value;
    setServiceRequirements(updated);
  };

  const handleExclusion = (index, value) => {
    const updated = [...serviceExclusion];
    updated[index] = value;
    setServiceExclusion(updated);
  };

  const handleInclusion = (index, value) => {
    const updated = [...serviceInclusion];
    updated[index] = value;
    setServiceInclusion(updated);
  };

  const removeInclusion = (index) => {
    if (serviceInclusion.length === 1) return;

    setServiceInclusion((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExclusion = (index) => {
    if (serviceExclusion.length === 1) return;

    setServiceExclusion((prev) => prev.filter((_, i) => i !== index));
  };

  const removeRequirement = (index) => {
    if (serviceRequirements.length === 1) return;

    setServiceRequirements((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const getAllStoreStaff = async () => {
      try {
        const response = await FetchData(
          `${role}/get/staff-for-service/store-staff/${userId}`,
          "get",
        );
        setStoreStaffList(response.data.data);
      } catch (err) {
        // console.log(err.response.data);
      }
    };

    getAllStoreStaff();
  }, []);

  const addService = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current);
      formData.append(
        "serviceData",
        JSON.stringify({
          products,
          serviceInclusion: serviceInclusion.filter((i) => i.trim()),
          serviceExclusion: serviceExclusion.filter((i) => i.trim()),
          serviceRequirements: serviceRequirements.filter((i) => i.trim()),
        }),
      );
      const response = await FetchData(
        `services/add/service/${role}/${userId}`,
        "post",
        formData,
        true,
      );
      alertSuccess(response.data.message);
      setShowForm(false);
      formRef.current.reset();
      handleReload();
    } catch (err) {
      alertError(err.response);
    }
  };

  const deleteService = async ({ serviceId }) => {
    try {
      const response = await FetchData(
        `${role}/update/delete-bank-details/${serviceId}/${userId}`,
        "delete",
      );
      alertSuccess(response.data.message);
      handleReload();
    } catch (err) {
      alertError(err.response.data);
    }
  };

  const handleImage = (e) => {
    const file = Array.from(e.target.files);

    if (!file) return;
    if (file.length > 5) {
      alert("Maximum 5 images allowed");
      e.target.value = "";
      return;
    }

    setImage(file);
    setImagePreview(file?.map((f) => URL.createObjectURL(f)));
  };

  return (
    <div className="space-y-6 w-full h-full overflow-scroll relative">
      <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:items-center sticky top-0 left-0 z-10 bg-white">
        <h1 className="text-3xl font-bold">
          Services <span className="text-sm">({data?.length})</span>
        </h1>
        <Button LabelName="Add New Service" onClick={() => setShowForm(true)} />
        <input
          placeholder="Search Service..."
          className="border rounded-lg px-4 py-2"
        />
      </div>

      <div className="w-full">
        {Array.isArray(data) ? (
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2 w-full place-items-center">
            {data?.map((service) => (
              <StoreServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <span>No service listed kindly list service</span>
        )}
      </div>
      <Popup isOpen={showForm} onClose={() => setShowForm(false)}>
        <div className="flex justify-start items-start h-screen w-full overflow-scroll">
          {" "}
          <form
            ref={formRef}
            onSubmit={addService}
            className="flex-col flex justify-start items-start w-full md:w-[90vw] md:h-[90vh] overflow-scroll no-scrollbar"
          >
            <h1 className="heading text-3xl">Add Service</h1>
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h2 className="text-2xl font-semibold text-[#8B2954] mb-5">
                  Basic Details
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputBox label="Service Name" name="name" />

                  <InputBox
                    label="Charges (including tax)"
                    name="charges"
                    type="number"
                  />
                  <InputBox
                    label="category"
                    name="category"
                    type="text"
                    placeholder="Eg: Spa, Hair Cut etc."
                  />

                  <InputBox
                    label="Duration (Minutes)"
                    name="duration"
                    type="number"
                  />
                </div>
              </div>
              <div className="w-full col-span-2 bg-neutral-200 h-1 rounded-full" />
              {role === "store" ||
                ("Store" && (
                  <div>
                    <h2 className="text-2xl font-semibold text-[#8B2954] mb-5">
                      Service Provider
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 font-medium">
                          Executive
                        </label>

                        <select
                          name="executive"
                          className="w-full border rounded-lg px-4 py-2"
                          required
                        >
                          <option value="">Select Staff</option>
                          {storeStaffList?.map((item) => (
                            <option key={item._id} value={item._id}>
                              <>
                                Name: {item.name} ({item.designation})
                                (Specialization: {item.specialization})
                              </>
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="w-full col-span-2 bg-neutral-200 h-1 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold text-[#8B2954] mb-5">
                  Service Timing
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputBox
                    label="Preparation Time (Minutes)"
                    name="prepTime"
                    type="number"
                  />

                  <div className="flex flex-col justify-end gap-4">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" name="isPrepTime" defaultChecked />
                      Preparation Required
                    </label>

                    <label className="flex items-center gap-3">
                      <input type="checkbox" name="timeIncludingPrepTime" />
                      Duration Includes Preparation
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-2 bg-neutral-200 h-1 rounded-full" />
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-2xl font-semibold text-[#8B2954]">
                    Products Used
                  </h2>

                  <button
                    type="button"
                    onClick={addProduct}
                    className="px-4 py-2 rounded bg-[#8B2954] text-white"
                  >
                    Add Product
                  </button>
                </div>

                {products.map((item, index) => (
                  <div key={index} className="grid md:grid-cols-3 gap-4 mb-4">
                    <InputBox
                      label="Product"
                      name={`productType-${index}`}
                      value={item.productType}
                      onChange={(e) =>
                        handleProductChange(
                          index,
                          "productType",
                          e.target.value,
                        )
                      }
                    />

                    <InputBox
                      label="Brand"
                      name={`brand-${index}`}
                      value={item.brand}
                      onChange={(e) =>
                        handleProductChange(index, "brand", e.target.value)
                      }
                    />

                    <button
                      type="button"
                      disabled={products.length === 1}
                      onClick={() => removeProduct(index)}
                      className={`h-11 mt-9 rounded-lg text-white transition ${
                        products.length === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-full col-span-2 bg-neutral-200 h-1 rounded-full" />
              <div>
                <div className="flex justify-between mb-5">
                  <h2 className="text-2xl font-semibold text-[#8B2954]">
                    Service Inclusion
                  </h2>

                  <button
                    type="button"
                    onClick={addInclusion}
                    className="px-4 py-2 bg-[#8B2954] text-white rounded"
                  >
                    Add
                  </button>
                </div>

                {serviceInclusion.map((item, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <InputBox
                      label={`Point ${index + 1}`}
                      name={`serviceInclusion-${index}`}
                      value={item}
                      onChange={(e) => handleInclusion(index, e.target.value)}
                    />

                    <button
                      type="button"
                      disabled={serviceInclusion.length === 1}
                      onClick={() => removeInclusion(index)}
                      className={`h-11 mt-9 px-4 rounded text-white transition ${
                        serviceInclusion.length === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-full col-span-2 bg-neutral-200 h-1 rounded-full" />
              <div>
                <div className="flex justify-between mb-5">
                  <h2 className="text-2xl font-semibold text-[#8B2954]">
                    Service Exclusion
                  </h2>

                  <button
                    type="button"
                    onClick={addExclusion}
                    className="px-4 py-2 bg-[#8B2954] text-white rounded"
                  >
                    Add
                  </button>
                </div>

                {serviceExclusion.map((item, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <InputBox
                      label={`Point ${index + 1}`}
                      value={item}
                      onChange={(e) => handleExclusion(index, e.target.value)}
                    />

                    <button
                      type="button"
                      disabled={serviceExclusion.length === 1}
                      onClick={() => removeExclusion(index)}
                      className={`h-11 mt-9 px-4 rounded text-white transition ${
                        serviceExclusion.length === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-full col-span-2 bg-neutral-200 h-1 rounded-full" />
              <div>
                <div className="flex justify-between mb-5">
                  <h2 className="text-2xl font-semibold text-[#8B2954]">
                    Customer Requirements
                  </h2>

                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-4 py-2 bg-[#8B2954] text-white rounded"
                  >
                    Add
                  </button>
                </div>

                {serviceRequirements.map((item, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <InputBox
                      label={`Requirement ${index + 1}`}
                      value={item}
                      onChange={(e) => handleRequirement(index, e.target.value)}
                    />

                    <button
                      type="button"
                      disabled={serviceRequirements.length === 1}
                      onClick={() => removeRequirement(index)}
                      className={`h-11 mt-9 px-4 rounded text-white transition ${
                        serviceRequirements.length === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-full col-span-2 bg-neutral-200 h-1 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold text-[#8B2954] mb-5">
                  Booking
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Service For</label>

                    <select
                      name="serviceFor"
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Both</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2">Booking Day</label>

                    <select
                      name="bookingDays"
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      <option>Whole week</option>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </div>

                  <InputBox
                    label="Booking From"
                    type="time"
                    name="bookingFrom"
                  />

                  <InputBox
                    label="Booking Till"
                    type="time"
                    name="bookingTill"
                  />
                </div>
              </div>
              <div className="w-full col-span-2 bg-neutral-200 h-1 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold text-[#8B2954] mb-5">
                  Service Availability
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" name="onSite" defaultChecked />
                    On Site
                  </label>

                  <label className="flex items-center gap-3">
                    <input type="checkbox" name="inHouse" defaultChecked />
                    In House
                  </label>

                  <div>
                    <label className="block mb-2">Service Area</label>

                    <select
                      name="serviceArea"
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      <option>Inside city</option>
                      <option>Outside city</option>
                      <option>Both</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-2 bg-neutral-200 h-1 rounded-full" />

              <div>
                <h2 className="text-2xl font-semibold text-[#8B2954] mb-5">
                  Cover Images
                </h2>

                <input
                  type="file"
                  name="coverImage"
                  multiple
                  accept="image/*"
                  onChange={handleImage}
                  className="w-full"
                />

                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                    {imagePreview?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt=""
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center gap-10 ">
              <Button LabelName="Submit" type="submit" />
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
};

const IsProfileComplete = ({ data, role }) => {
  return (
    <div>
      <h1>Is Profile Complete componenet </h1>
    </div>
  );
};

const CurrentlyUnderBooking = ({ data, role }) => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Currently Under Booking
        </h1>

        <p className="text-gray-500 mt-1">
          Track your active and upcoming beauty appointments.
        </p>
      </div>

      {/* Booking Cards */}

      <div className="space-y-6">
        {activeBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Service Image */}

              <img
                src={booking.image}
                alt={booking.service}
                className="w-full lg:w-72 h-60 object-cover"
              />

              {/* Content */}

              <div className="flex-1 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{booking.service}</h2>

                    <p className="text-gray-500 mt-1">{booking.store}</p>
                  </div>

                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                    {booking.status}
                  </span>
                </div>

                {/* Details */}

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <FaStore className="text-[#8B2954]" />
                    {booking.store}
                  </div>

                  <div className="flex items-center gap-3">
                    <FaUserTie className="text-[#8B2954]" />
                    {booking.professional}
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-[#8B2954]" />
                    {booking.date}
                  </div>

                  <div className="flex items-center gap-3">
                    <FaClock className="text-[#8B2954]" />
                    {booking.time}
                  </div>

                  <div className="flex items-center gap-3 md:col-span-2">
                    <FaMapMarkerAlt className="text-[#8B2954]" />
                    {booking.location}
                  </div>
                </div>

                {/* Status Timeline */}

                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Booking Progress</h3>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <p className="text-xs mt-2">Booked</p>
                    </div>

                    <div className="flex-1 h-1 bg-green-500 mx-2"></div>

                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <p className="text-xs mt-2">Confirmed</p>
                    </div>

                    <div className="flex-1 h-1 bg-green-500 mx-2"></div>

                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <p className="text-xs mt-2">On The Way</p>
                    </div>

                    <div className="flex-1 h-1 bg-gray-300 mx-2"></div>

                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      <p className="text-xs mt-2">Completed</p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}

                <div className="flex flex-wrap gap-4 mt-8">
                  <button className="flex items-center gap-2 bg-[#8B2954] text-white px-5 py-3 rounded-lg hover:bg-[#742247] transition">
                    <FaPhoneAlt />
                    Call Professional
                  </button>

                  <button className="flex items-center gap-2 border border-[#8B2954] text-[#8B2954] px-5 py-3 rounded-lg hover:bg-[#8B2954] hover:text-white transition">
                    <FaLocationArrow />
                    Track Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Images = ({ data, role }) => {
  const [coverImage] = useState(
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200",
  );

  const [gallery] = useState([
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500",
    "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=500",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500",
  ]);

  return (
    <div className="space-y-6 w-full">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Images</h1>

          <p className="text-gray-500 mt-2">
            Manage your gallery and showcase your work.
          </p>
        </div>

        <button className="bg-[#8B2954] text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-[#742247] transition">
          <FaCloudUploadAlt />
          Upload Images
        </button>
      </div>

      {/* Cover Image */}

      <div className="bg-white rounded-2xl shadow">
        <div className="relative">
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-52 md:h-72 object-cover rounded-t-2xl"
          />

          <button className="absolute bottom-4 right-4 bg-white shadow px-4 py-2 rounded-lg flex items-center gap-2">
            <FaCamera />
            Change Cover
          </button>
        </div>
      </div>

      {/* Gallery Header */}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gallery</h2>

        <span className="bg-pink-100 text-[#8B2954] px-4 py-2 rounded-full text-sm">
          {gallery.length} Images
        </span>
      </div>

      {/* Gallery */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {gallery.map((image, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden bg-white shadow"
          >
            <img
              src={image}
              alt=""
              className="w-full h-48 object-cover group-hover:scale-105 duration-300"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex justify-center items-center">
              <button className="bg-red-500 text-white p-3 rounded-full">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {/* Upload Card */}

        <label className="border-2 border-dashed border-[#8B2954] rounded-xl h-48 flex flex-col justify-center items-center cursor-pointer hover:bg-pink-50 transition">
          <FaImage className="text-4xl text-[#8B2954]" />

          <p className="mt-3 font-medium">Add Images</p>

          <input type="file" multiple className="hidden" />
        </label>
      </div>
    </div>
  );
};

const KycDetails = ({ data, role }) => {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">KYC Details</h1>

          <p className="text-gray-500 mt-2">
            Manage your verification documents and business information.
          </p>
        </div>

        <button className="bg-[#8B2954] text-white px-5 py-3 rounded-xl hover:bg-[#742247] transition flex items-center gap-2">
          <FaUpload />
          Update Documents
        </button>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Verification Status</h2>

            <p className="text-gray-500 mt-1">
              Your account verification status.
            </p>
          </div>

          <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full flex items-center gap-2 w-fit">
            <FaCheckCircle />
            {data?.status || "Verified"}
          </span>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Details */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaBuilding className="text-[#8B2954] text-2xl" />
            <h2 className="text-xl font-semibold">Business Details</h2>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-500">Business Name</p>

              <h3 className="font-semibold">
                {data?.businessName || "Urban Beauty Salon"}
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">GST Number</p>

              <h3 className="font-semibold">
                {data?.gst || "20ABCDE1234F1Z5"}
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">Business License</p>

              <h3 className="font-semibold">
                {data?.businessLicense || "License #UBS-2025-001"}
              </h3>
            </div>
          </div>
        </div>

        {/* Owner Details */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaUserTie className="text-[#8B2954] text-2xl" />
            <h2 className="text-xl font-semibold">Owner Details</h2>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-500">Owner Name</p>

              <h3 className="font-semibold">
                {data?.ownerName || "Akanksha Sinha"}
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">Aadhaar Number</p>

              <h3 className="font-semibold">{data?.aadhaar || "123456789"}</h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">PAN Number</p>

              <h3 className="font-semibold">{data?.pan || "ABCDE1234F"}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Uploaded Documents</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            "Aadhaar Card",
            "PAN Card",
            "GST Certificate",
            "Business License",
          ].map((doc) => (
            <div
              key={doc}
              className="border rounded-xl p-5 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaFilePdf className="text-red-500 text-3xl" />

                <div>
                  <h3 className="font-semibold">{doc}</h3>

                  <p className="text-xs text-gray-500">PDF Uploaded</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 border border-[#8B2954] text-[#8B2954] py-2 rounded-lg hover:bg-pink-50 transition">
                  View
                </button>

                <button className="flex-1 bg-[#8B2954] text-white py-2 rounded-lg hover:bg-[#742247] transition">
                  Replace
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export {
  Overview, // in working condition
  SavedAddress,
  BankingDetails, // in working condition
  StoreStaffs,
  Booking,
  FavoriteStore,
  FavoriteProfessional,
  Services,
  IsProfileComplete,
  CurrentlyUnderBooking,
  Images,
  KycDetails,
};
