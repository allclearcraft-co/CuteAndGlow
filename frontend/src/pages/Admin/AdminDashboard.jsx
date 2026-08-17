import React, { useEffect } from "react";
import { adminDashboardSection } from "../../constants/constants";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import DashboardTable from "./DashboardTables";
import { FetchData } from "../../utils/FetchFromApi";
import Button from "../../components/Button";
import InputBox from "../../components/Input";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(
    () => localStorage.getItem("adminDashboardQuery") || "customer",
  );
  const [data, setData] = useState([]);
  const bottomNavItems = adminDashboardSection.slice(0, 4);

  const moreMenuItems = adminDashboardSection.slice(4);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchDashboard = async ({ query }) => {
    if (!query) return;
    try {
      const res = await FetchData(
        `admin/get/data/dashboard-data/${query}`,
        "get",
      );
      setData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard({
      query: localStorage.getItem("adminDashboardQuery") || "customer",
    });
  }, []);

  return (
    <div className="relative p-2 flex w-full items-start h-screen ">
      <aside className="hidden md:flex sticky w-[20vw] h-full bg-[#8B2954] rounded-xl flex-col items-start justify-between text-white py-6 px-5">
        <div className="">
          <ul className="flex flex-col gap-2">
            {adminDashboardSection.map((data, index) => (
              <li
                key={index}
                className={`cursor-pointer h-fit hover:bg-white/50 duration-300 ease-in-out hover:text-black rounded-lg px-3 py-2 w-full ${activeSection === data.query ? "bg-white text-black hover:" : "hover:bg-white text black"}`}
                onClick={() => {
                  localStorage.setItem("adminDashboardQuery", data.query);
                  setActiveSection(data.query);
                  fetchDashboard({
                    query: localStorage.getItem("adminDashboardQuery"),
                  });
                }}
              >
                <div className="flex gap-2 justify-start items-center">
                  {/* <span>{data.icon}</span> */}
                  <span>{data.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-5 h-full">
        {activeSection === "customer" && (
          <DashboardTable tableRole="customer" TableData={data} />
        )}

        {activeSection === "store" && (
          <div>
            <Button
              LabelName="Add new Store"
              onClick={() => navigate(`/auth/${"register"}/${"store"}`)}
            />
            <DashboardTable tableRole="store" TableData={data} />
          </div>
        )}

        {activeSection === "active_services" && (
          <DashboardTable tableRole="activeService" TableData={data} />
        )}

        {activeSection === "inactive_services" && (
          <DashboardTable tableRole="inActiveService" TableData={data} />
        )}

        {activeSection === "pricing" && (
          <div className="w-full">
            <div className="w-full bg-neutral-200 p-3 rounded-xl">
              <form className="grid grid-cols-3 place-items-center w-full gap-2">
                <div className={`w-full py-3 `}>
                  <label
                    htmlFor={name}
                    className={`block text-sm font-medium text-gray-700 mb-2 capitalize`}
                  >
                    Plan name<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="planName"
                    // value={}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg bg-neutral-50 text-gray-700 outline-none focus:ring-1 focus:ring-[#8B2954] focus:border-[#8B2954] transition hover:shadow-md disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  >
                    <option className="uppercase" value="">
                      Select
                    </option>
                    {["platinum", "gold", "silver", "bronze", "basic"].map(
                      (i, index) => (
                        <option className="uppercase" key={index} value={i}>
                          {index + 1}. {i}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div className={`w-full py-3 `}>
                  <label
                    htmlFor={name}
                    className={`block text-sm font-medium text-gray-700 mb-2 capitalize`}
                  >
                    Plan for<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="planFor"
                    // value={}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg bg-neutral-50 text-gray-700 outline-none focus:ring-1 focus:ring-[#8B2954] focus:border-[#8B2954] transition hover:shadow-md disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  >
                    <option className="uppercase" value="">
                      Select
                    </option>
                    {["customer", "store", "professional", "custom"].map(
                      (i, index) => (
                        <option className="uppercase" key={index} value={i}>
                          {index + 1}. {i}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <InputBox
                  name="tagline"
                  label="Tagline"
                  type="text"
                  placeholder="Tagline for this subscription"
                />
              </form>
              <Button LabelName="Add new" />
            </div>
            <DashboardTable tableRole="pricing" TableData={data} />
          </div>
        )}

        {activeSection === "bookings" && (
          <DashboardTable tableRole="booking" TableData={data} />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
