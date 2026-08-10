import React from "react";
import { useEffect, useState, useMemo, useRef } from "react";
import Button from "../../components/Button";
import InputBox from "../../components/Input";
import { FetchData } from "../../utils/FetchFromApi";
import { parseErrorMessage } from "../../utils/parseErrorMessage";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { truncateString } from "../../utils/utility-functions";

const customerHeaders = [{
  text: "Customer",
  header: ["Name", "Contact Number", "Email", "Actions"],
}]
const professionalHeaders = [
  {
    text: "Professional",
    header: ["Name", "Contact Number", "Email", "Actions"],
  },
];
const storeHeaders = [
  {
    text: "Store",
    header: ["Name", "Contact Number", "Email", "Actions", "Store name"],
  },
];
console.log(customerHeaders)

const DashboardTables = ({ TableData, userRole = "Customer", Text }) => {
  const role = userRole.toLowerCase();

  const TableHeader =
    role === "customer"
      ? customerHeaders
      : role === "professional"
        ? professionalHeaders
        : role === "store"
          ? storeHeaders
          : "";

  const [search, setSearch] = useState("");

  const filterData = useMemo(() => {
    if (!search.trim()) return TableData;

    const q = search.toLowerCase();
    return TableData.filter((c) =>
      `${c?.name}${c?.contactNumber}${c?.email}`.toLowerCase().includes(q),
    );
  }, [search, TableData]);

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold">
          {TableHeader.text} (<span className="text-sm">{filterData?.length}</span>)
        </h2>

        <div className="w-96">
          <InputBox
            Type="text"
            Placeholder="Search state..."
            Value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white"
          />
        </div>
      </div>

      <div className="w-full mt-1 h-[500px] overflow-scroll">
        <table className="w-full text-sm text-left bg-white rounded-xl shadow-sm overflow-hidden">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              {TableHeader[0].header?.map((header, index) => (
                <th key={index} className="px-5 py-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filterData?.length > 0 ? (
              filterData?.map((data) => (
                <tr key={data._id} className="hover:bg-gray-50 border-b">
                  <td className="px-5 py-3">{data?.name}</td>
                  <td className="px-5 py-3">{data?.state?.name}</td>
                  <td className="px-5 py-3">{data?.state?.code}</td>
                  <td className="px-5 py-3">
                    Long: {data?.location?.coordinates[0]} | Lat:{" "}
                    {data?.location?.coordinates[1]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No Data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTables;
