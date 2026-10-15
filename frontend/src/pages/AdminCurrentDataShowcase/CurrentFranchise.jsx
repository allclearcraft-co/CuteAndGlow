import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import { FaUser, FaStar, FaPlus } from "react-icons/fa";
import { FetchData } from "../../utils/FetchFromApi";
import InputBox from "../../components/Input";
import { useToast } from "../../components/hooks/ToastContext";
import { useSelector } from "react-redux";

const CurrentFranchise = ({ data }) => {
  //   const user = useSelector((state) => state.auth.user);
  //   const [loading, setLoading] = useState(false);
  //   const { alertInfo, alertError } = useToast();
  //   const [showForm, setShowForm] = useState(false);
  //   const formRef = useRef();

  const TableData = [
    {
      id: 1,
      Label: "Franchise Name",
      Value: data?.name || "N/A",
    },
    {
      id: 2,
      Label: "Subtitle",
      Value: data?.subtitle || "N/A",
    },
    {
      id: 3,
      Label: "Budget",
      Value: data?.budget || "N/A",
    },
    {
      id: 4,
      Label: "Franchise fee",
      Value: data?.franchiseFee || "N/A",
    },
    {
      id: 5,
      Label: "Interior",
      Value: data?.interior || "N/A",
    },
    {
      id: 6,
      Label: "equipment",
      Value: data?.equipment || "N/A",
    },
    {
      id: 7,
      Label: "Stock",
      Value: data?.stock || "N/A",
    },
    {
      id: 8,
      Label: "Marketing",
      Value: data?.marketing || "N/A",
    },
    {
      id: 9,
      Label: "Working Capital",
      Value: data?.workingCapital || "N/A",
    },
    {
      id: 10,
      Label: "Space",
      Value: data?.space || "N/A",
    },
    {
      id: 11,
      Label: "Staff",
      Value: data?.staff || "N/A",
    },
    {
      id: 12,
      Label: "ROI",
      Value: data?.roi || "N/A",
    },
    {
      id: 13,
      Label: "Location",
      Value: data?.location || "N/A",
    },
    {
      id: 14,
      Label: "Services",
      Value: data?.services || "N/A",
    },
    {
      id: 15,
      Label: "Advantage",
      Value: data?.advantage || "N/A",
    },
    {
      id: 16,
      Label: "Store",
      Value: data?.store?.storeName || "N/A",
    },
    {
      id: 17,
      Label: "Franchise created by",
      Value: data?.admin?.name || "N/A",
    },
  ];

  return (
    <div className="space-y-6  h-full w-full p-10 mb-20">
      <h1 className="text-2xl heading">Current Franchise</h1>
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
                  {item.Value || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentFranchise;
