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
    searchKeys: ["name", "contactNumber", "email"],
    viewRoute: (id) => `/admin/current/${"customer"}/${id}`,
    columns: [
      { header: "Name", key: "name" },
      { header: "Contact Number", key: "contactNumber" },
      { header: "Email", key: "email" },
      { header: "Actions", key: "actions" },
    ],
  },

  store: {
    text: "Store",
    searchKeys: ["storeName", "storeContactNumber", "storeEmail"],
    viewRoute: (id) => `/admin/current/${"store"}/${id}`,
    columns: [
      { header: "Store Name", key: "storeName" },
      { header: "Contact Number", key: "storeContactNumber" },
      { header: "Email", key: "storeEmail" },
      { header: "Actions", key: "actions" },
    ],
  },

  activeService: {
    text: "Active Services",
    searchKeys: ["category", "serviceFor", "store.storeName"],
    viewRoute: (id) => `/admin/current/${"service"}/${id}`,
    columns: [
      { header: "Category", key: "category" },
      { header: "Service For", key: "serviceFor" },
      {
        header: "In House",
        key: "inHouse",
        render: (value) => (value ? "Yes" : "No"),
      },
      { header: "Store", key: "store.storeName" },
      { header: "Actions", key: "actions" },
    ],
  },

  inactive_services: {
    text: "Inactive Services",
    searchKeys: ["category", "serviceFor", "store.storeName"],
    viewRoute: (id) => `/admin/current/${"service"}/${id}`,
    columns: [
      { header: "Category", key: "category" },
      { header: "Service For", key: "serviceFor" },
      {
        header: "In House",
        key: "inHouse",
        render: (value) => (value ? "Yes" : "No"),
      },
      { header: "Store", key: "store.storeName" },
      { header: "Actions", key: "actions" },
    ],
  },

  pricing: {
    text: "Subscriptions",
    searchKeys: ["planName", "planFor"],
    viewRoute: (id) => `/admin/current/${"subscription"}/${id}`,
    columns: [
      { header: "Plan", key: "planName" },
      { header: "For", key: "planFor" },
      {
        header: "Price",
        key: "price.mrp",
        render: (value) => `₹${value}`,
      },
      {
        header: "Status",
        key: "isActive",
        render: (value) => (value ? "Active" : "Inactive"),
      },
      { header: "Actions", key: "actions" },
    ],
  },

  booking: {
    text: "Bookings",
    searchKeys: ["service.name", "bookingAmount"],
    viewRoute: (id) => `/admin/current/${"booking"}/${id}`,
    columns: [
      { header: "Service", key: "service.name" },
      {
        header: "Date",
        key: "dateForBooking",
        render: (value) => new Date(value).toLocaleDateString("en-IN"),
      },
      { header: "Payment", key: "payment" },
      {
        header: "Amount",
        key: "bookingAmount",
        render: (value) => `₹${value}`,
      },
      { header: "Actions", key: "actions" },
    ],
  },
  payments: {
    text: "Payment Details",
    searchKeys: [
      "transactionNumber",
      "module",
      "paymentStatus",
      "gatewayPaymentId",
    ],
    viewRoute: (id) => `#`,
    // viewRoute: (id) => `/admin/current/${"customer"}/${id}`,
    columns: [
      { header: "Transaction ID", key: "transactionNumber" },
      { header: "Module", key: "module" },
      {
        header: "Amount",
        key: "amount",
        render: (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`,
      },
      { header: "Status", key: "paymentStatus" },
      {
        header: "Date",
        key: "paymentDate",
        render: (value) =>
          value ? new Date(value).toLocaleString("en-IN") : "-",
      },
      { header: "Actions", key: "actions" },
    ],
  },
  adminsQuery: {
    text: "Admins",
    searchKeys: ["name", "contactNumber", "employeeId"],
    viewRoute: (id) => `/admin/current/${"admin"}/${id}`,
    columns: [
      { header: "Name", key: "name" },
      { header: "Contact number", key: "contactNumber" },
      { header: "Employee ID", key: "employeeId" },
      { header: "Actions", key: "actions" },
    ],
  },
};

const DashboardTable = ({ TableData, tableRole = "", Text }) => {
  const TableHeader = TABLE_CONFIG[tableRole];

  const [search, setSearch] = useState("");

  const getNestedValue = (obj, path) =>
    path.split(".").reduce((acc, key) => acc?.[key], obj);

  const filterData = useMemo(() => {
    if (!search.trim()) return TableData;

    const q = search.toLowerCase();

    return TableData.filter((row) =>
      TableHeader.searchKeys.some((key) =>
        String(getNestedValue(row, key) ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [search, TableData, TableHeader]);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold">
          {TableHeader?.text} (
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
                  {TableHeader?.columns.map((col) => {
                    if (col.key === "actions") {
                      return (
                        <td key={col.header} className="px-5 py-3">
                          <Link
                            to={TableHeader.viewRoute(row._id)}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            View
                          </Link>
                        </td>
                      );
                    }

                    const value = getNestedValue(row, col.key);

                    return (
                      <td key={col.header} className="px-5 py-3 capitalize">
                        {col.render ? col.render(value, row) : (value ?? "-")}
                      </td>
                    );
                  })}
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
