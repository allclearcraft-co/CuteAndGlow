import React from "react";
import Button from "../../components/Button";
import { FetchData } from "../../utils/FetchFromApi";

const CurrentServices = ({ data }) => {
  console.log(data);
  const TableData = [
    {
      id: 1,
      label: "Name",
      value: data?.name,
    },
    {
      id: 2,
      label: "Store",
      value: data?.store,
    },
    {
      id: 3,
      label: "Professional",
      value: data?.professional,
    },
    {
      id: 4,
      label: "Category",
      value: data?.category,
    },
    {
      id: 5,
      label: "Products",
      value: data?.products,
    },
    {
      id: 6,
      label: "Service Inclusion ",
      value: data?.serviceInclusion,
    },
    {
      id: 7,
      label: "Service Exclusion",
      value: data?.serviceExclusion,
    },
    {
      id: 8,
      label: "Duration ",
      value: data?.duration,
    },
    {
      id: 9,
      label: "Preparation Time",
      value: data?.prepTime,
    },
    {
      id: 10,
      label: "Is Preparation Time ",
      value: data?.isPrepTime,
    },
    {
      id: 11,
      label: "Time Including Preparation Time ",
      value: data?.timeIncludingPrepTime,
    },
    {
      id: 12,
      label: "Service Type",
      value: data?.serviceType,
    },
    {
      id: 13,
      label: "OnSite",
      value: data?.onSite,
    },
    {
      id: 14,
      label: "In House",
      value: data?.inHouse,
    },
    {
      id: 15,
      label: "Service For",
      value: data?.serviceFor,
    },
    {
      id: 16,
      label: "Charges",
      value: data?.charges,
    },
    {
      id: 17,
      label: "Booking Days",
      value: data?.bookingDays,
    },
    {
      id: 18,
      label: "Booking Accepting Hours",
      value: data?.bookingAcceptingHours,
    },
    {
      id: 19,
      label: "Service Area",
      value: data?.serviceArea,
    },
    {
      id: 20,
      label: "Service Requirements",
      value: data?.serviceRequirements,
    },
    {
      id: 21,
      label: "Service Active",
      value: data?.isActive,
    },
  ];

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "N/A";

    if (typeof value === "boolean") return value ? "Yes" : "No";

    if (typeof value === "string" || typeof value === "number") return value;

    if (Array.isArray(value)) {
  if (value.length === 0) return "N/A";

  return (
    <ul className="list-disc list-inside space-y-1">
      {value.map((item, index) => (
        <li key={item?._id || index}>
          {typeof item === "object" && item !== null
            ? item.productType && item.brand
              ? `${item.brand} - ${item.productType}`
              : item.name || item.storeName || JSON.stringify(item)
            : item}
        </li>
      ))}
    </ul>
  );
}

    if (typeof value === "object") {
      // Populated MongoDB documents
      if (value.storeName) return value.storeName;
      if (value.name) return value.name;

      return (
        <div className="space-y-1">
          {Object.entries(value).map(([key, val]) => (
            <div key={key}>
              <span className="font-medium capitalize">{key}: </span>
              <span>{String(val)}</span>
            </div>
          ))}
        </div>
      );
    }

    return String(value);
  };

  const markActiveInactive = async ({ action }) => {
    try {
      const serviceId = data?._id;
      const response = await FetchData(
        `services/update/service-status/${action}/${serviceId}`,
        "post",
      );
      console.log(response);
      window.location.reload();
      alertSuccess(response.data.message);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="space-y-6  h-full w-full p-10 mb-20">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl heading">Current Service</h1>
        {data?.isActive === true ? (
          <Button
            LabelName="mark as inactive"
            onClick={() => markActiveInactive({ action: "inactive" })}
          />
        ) : (
          <Button
            LabelName="mark as active"
            onClick={() => markActiveInactive({ action: "active" })}
          />
        )}
      </div>

      <div className="w-full h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <tbody>
            {TableData.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* Label */}
                <td className="w-1/2 px-5 py-4 text-sm font-medium text-gray-500">
                  {item.label}
                </td>

                {/* Value */}
                <td className="w-1/2 px-5 py-4 text-sm font-semibold text-gray-800">
                  {formatValue(item.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentServices;
