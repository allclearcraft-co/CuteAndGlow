import React from "react";
import Button from "../../components/Button";
import { FaUser, FaStar, FaPlus } from "react-icons/fa";

const CurrentStore = ({ data }) => {
  const TableData = [
    {
      id: 1,
      Label: "Store Name",
      value: data?.storeName,
    },
    {
      id: 2,
      Label: "Store Contact Number",
      value: data?.storeContactNumber,
    },
    {
      id: 3,
      Label: "Store Email",
      value: data?.storeEmail,
    },
    {
      id: 4,
      Label: "Store Address",
      // data.address.ref
      value: data?.address,
    },
    {
      id: 5,
      Label: "Bank",
      value: data?.bank,
    },
    {
      id: 6,
      Label: "Staff ",
      value: data?.storeStaff,
    },
    {
      id: 7,
      Label: "Services ",
      value: data?.Services,
    },
    {
      id: 8,
      Label: "Bookings ",
      value: data?.bookings,
    },
    {
      id: 9,
      Label: "Service Type ",
      value: data?.serviceType,
    },
    {
      id: 10,
      Label: "Service Type ",
      value: data?.serviceType,
    },
    {
      id: 11,
      Label: " Payment Option InHouse ",
      value: data?.inStore,
    },
    {
      id: 12,
      Label: " Payment Option OnSite ",
      value: data?.onSite,
    },
    {
      id: 13,
      Label: " Payment Option In House ",
      value: data?.inStore,
    },
    {
      id: 14,
      Label: " Owner Name ",
      value: data?.ownerName,
    },
    {
      id: 15,
      Label: "Owner Contact Number",
      value: data?.OwnerContact,
    },
    {
      id: 16,
      Label: "Owner Email",
      value: data?.ownerEmail,
    },
    {
      id: 17,
      Label: "Owner Address",
      value: data?.ownerAddress,
    },
    {
      id: 18,
      Label: "Owner KYC Submitted",
      value: (
        <div>
          {data?.ownerKycSubmitted ? (
            <div className="flex flex-col ">
              <div>
                <h1>AAdhar Details</h1>
                <p>{data.ownerKycSubmitted?.aadhar?.number}</p>
                <div className="">
                  <img
                    src={data.ownerKycSubmitted?.aadhar?.image?.front}
                    alt=""
                  />
                  <img
                    src={data.ownerKycSubmitted?.aadhar?.image?.back}
                    alt=""
                  />
                </div>
              </div>
              <div>
                <h1>PAN Details</h1>
                <div className="flex flex-row">
                  <p>{data.ownerKycSubmitted?.pan?.number}</p>
                  <div>
                    <img src={data.ownerKycSubmitted?.pan?.image} alt="" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "NA"
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6  h-full w-full p-10 mb-20">
      <h1 className="text-2xl heading">Current store</h1>
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
                  {item.Label}
                </td>

                {/* Value */}
                <td className="w-1/2 px-5 py-4 text-sm font-semibold text-gray-800">
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

export default CurrentStore;
