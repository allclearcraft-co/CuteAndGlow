import React from "react";
import { useEffect, useState, useMemo, useRef } from "react";
import Button from "../../components/Button";
import InputBox from "../../components/Input";
import { FetchData } from "../../utils/FetchFromApi";
import { parseErrorMessage } from "../../utils/parseErrorMessage";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { truncateString } from "../../utils/utility-functions";

const TABLE_CONFIG = {
  customer: {
    text: "Customer",
    columns: [
      { header: "Name", key: "name" },
      { header: "Contact Number", key: "contactNumber" },
      { header: "Email", key: "email" },
      { header: "Actions", key: "actions" },
    ],
  },

  professional: {
    text: "Professional",
    columns: [
      { header: "Name", key: "name" },
      { header: "Contact Number", key: "contactNumber" },
      { header: "Email", key: "email" },
      { header: "Actions", key: "actions" },
    ],
  },

  store: {
    text: "Store",
    columns: [
      { header: "Store Name", key: "storeName" },
      { header: "Contact Number", key: "storeContactNumber" },
      { header: "Email", key: "storeEmail" },
      { header: "Actions", key: "actions" },
    ],
  },

  activeService: {
    text: "Active Services",
    columns: [
      { header: "Category", key: "category" },
      { header: "Service For", key: "serviceFor" },
      { header: "In House", key: "inHouse" },
      { header: "Store", key: "store.name" },
    ],
  },

  inActiveService: {
    text: "Inactive Services",
    columns: [
      { header: "Category", key: "category" },
      { header: "Service For", key: "serviceFor" },
      { header: "In House", key: "inHouse" },
      { header: "Store", key: "store.name" },
    ],
  },

  pricing: {
    text: "Subscriptions",
    columns: [
      { header: "Plan", key: "planName" },
      { header: "For", key: "planFor" },
      { header: "Price", key: "price" },
      { header: "Status", key: "isActive" },
    ],
  },

  booking: {
    text: "Bookings",
    columns: [
      { header: "Service", key: "service.name" },
      { header: "Date", key: "dateForBooking" },
      { header: "Payment", key: "payment" },
      { header: "Amount", key: "bookingAmount" },
    ],
  },
};

const DashboardTable = ({ TableData, tableRole = "", Text }) => {
  const TableHeader = TABLE_CONFIG[tableRole];

  const [search, setSearch] = useState("");

  const filterData = useMemo(() => {
    if (!search.trim()) return TableData;

    const q = search.toLowerCase();
    return TableData.filter((c) =>
      `${c?.name}${c?.contactNumber}${c?.email}`.toLowerCase().includes(q),
    );
  }, [search, TableData]);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold">
          {TableHeader.text} (
          <span className="text-sm">{filterData?.length}</span>)
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

      <div className="w-full mt-1 h-[70vh] overflow-scroll">
        <table className="w-full text-sm text-left bg-white rounded-xl shadow-sm overflow-hidden">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              {TableHeader?.columns.map((col) => (
                <th key={col.header} className="px-5 py-3 font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filterData?.length ? (
              filterData.map((row) => (
                <tr key={row._id} className="hover:bg-gray-50 border-b">
                  {TableHeader.columns.map((col) => (
                    <td key={col.header} className="px-5 py-3">
                      {col.key === "actions" ? (
                        <button className="text-blue-600">View</button>
                      ) : (
                        (col.key
                          .split(".")
                          .reduce((obj, key) => obj?.[key], row) ?? "-")
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={TableHeader?.columns.length}
                  className="text-center py-6 text-gray-500"
                >
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

export default DashboardTable;
