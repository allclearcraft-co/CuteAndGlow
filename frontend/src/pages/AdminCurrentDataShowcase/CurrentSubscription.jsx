import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import SubscriptionModelForm from "../Admin/SubscriptionForm";

const CurrentSubscription = ({ data, onSaved }) => {
  const [isEditing, setIsEditing] = useState(false);
  const statusBadge = (value) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {value ? "Enabled" : "Disabled"}
    </span>
  );

  const TableData = [
    {
      id: 1,
      label: "Admin",
      value: data?.admin?.name || data?.admin?._id || "N/A",
    },
    {
      id: 2,
      label: "Plan Name",
      value: data?.planName?.toUpperCase(),
    },
    {
      id: 3,
      label: "Plan For",
      value: data?.planFor,
    },
    {
      id: 4,
      label: "Custom Model",
      value: statusBadge(data?.customModel),
    },
    {
      id: 5,
      label: "Custom Model For",
      value: data?.customModelFor,
    },
    {
      id: 6,
      label: "Tagline",
      value: data?.tagline,
    },
    {
      id: 7,
      label: "Validity",
      value: `${data?.validity?.months || 0} Months (${data?.validity?.renewalType || "N/A"})`,
    },
    {
      id: 8,
      label: "Price",
      value: (
        <div className="space-y-1">
          <p>MRP: ₹{data?.price?.mrp ?? "N/A"}</p>
          <p>Discount: {data?.price?.discount ?? 0}%</p>
          <p className="font-bold text-[#8B2954]">
            Selling: ₹{data?.price?.sellingPrice ?? "N/A"}
          </p>
        </div>
      ),
    },
    {
      id: 9,
      label: "Support",
      value: data?.support,
    },
    {
      id: 10,
      label: "Media Limit",
      value: (
        <div className="space-y-1">
          <p>Photos: {data?.mediaLimit?.photos ?? 0}</p>
          <p>Videos: {data?.mediaLimit?.videos ?? 0}</p>
          <p>
            Unlimited Photos: {statusBadge(data?.mediaLimit?.unlimitedPhotos)}
          </p>
          <p>
            Unlimited Videos: {statusBadge(data?.mediaLimit?.unlimitedVideos)}
          </p>
        </div>
      ),
    },
    {
      id: 11,
      label: "Booking",
      value: (
        <div className="space-y-1">
          <p>Online Booking: {statusBadge(data?.booking?.enabled)}</p>
          <p>Advanced Booking: {statusBadge(data?.booking?.advancedBooking)}</p>
        </div>
      ),
    },
    {
      id: 12,
      label: "Visibility",
      value: (
        <div className="space-y-1">
          <p>Featured: {statusBadge(data?.visibility?.featured)}</p>
          <p>Verified Badge: {statusBadge(data?.visibility?.verifiedBadge)}</p>
        </div>
      ),
    },
    {
      id: 13,
      label: "Franchise",
      value: (
        <div className="space-y-1">
          <p>Enabled: {statusBadge(data?.franchise?.enabled)}</p>
          <p>Enquiry Button: {statusBadge(data?.franchise?.enquiryButton)}</p>
        </div>
      ),
    },
    {
      id: 14,
      label: "Management Tools",
      value: (
        <div className="space-y-1">
          <p>
            Staff Attendance:{" "}
            {statusBadge(data?.managementTools?.staffAttendance)}
          </p>
          <p>Inventory: {statusBadge(data?.managementTools?.inventory)}</p>
          <p>
            Commission Tracking:{" "}
            {statusBadge(data?.managementTools?.commissionTracking)}
          </p>
          <p>Analytics: {statusBadge(data?.managementTools?.analytics)}</p>
        </div>
      ),
    },
    {
      id: 15,
      label: "Marketing",
      value: (
        <div className="space-y-1">
          <p>
            Social Promotion: {statusBadge(data?.marketing?.socialPromotion)}
          </p>
          <p>Coupon Manager: {statusBadge(data?.marketing?.couponManager)}</p>
          <p>SMS / WhatsApp: {statusBadge(data?.marketing?.smsWhatsapp)}</p>
          <p>Reviews: {statusBadge(data?.marketing?.reviews)}</p>
        </div>
      ),
    },
    {
      id: 16,
      label: "Features",
      value: data?.features?.length ? (
        <ul className="list-disc list-inside space-y-1">
          {data.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      ) : (
        "N/A"
      ),
    },
    {
      id: 17,
      label: "FAQs",
      value: data?.faqs?.length ? (
        <div className="space-y-4">
          {data.faqs.map((faq, index) => (
            <div key={index} className="border-l-4 border-[#8B2954] pl-3">
              <h4 className="font-semibold">{faq.question}</h4>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        "N/A"
      ),
    },
    {
      id: 18,
      label: "Plan Status",
      value: statusBadge(data?.isActive),
    },
  ];

  return (
    <div className="space-y-6 h-full w-full p-10 mb-20">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl heading">Current Subscription</h1>
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 rounded-lg bg-[#8B2954] px-4 py-2 text-white hover:bg-[#742247]"
        >
          <FaEdit /> Edit Subscription
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-3 sm:p-6">
          <div className="mx-auto max-w-6xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-xl font-semibold">Edit Subscription</h2>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close editor"
              >
                <FaTimes />
              </button>
            </div>
            <SubscriptionModelForm
              initialData={data}
              onClose={() => setIsEditing(false)}
              onSaved={onSaved}
            />
          </div>
        </div>
      )}

      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <tbody>
            {TableData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
              >
                <td className="w-1/3 px-5 py-4 text-sm font-medium text-gray-500 align-top">
                  {item.label}
                </td>

                <td className="w-2/3 px-5 py-4 text-sm font-semibold text-gray-800">
                  {item.value || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentSubscription;
