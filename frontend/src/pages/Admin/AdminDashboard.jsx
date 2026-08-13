import React, { useEffect } from "react";
import { adminDashboardSection } from "../../constants/constants";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import DashboardTable from "./DashboardTables";
import { FetchData } from "../../utils/FetchFromApi";

function AdminDashboard() {
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

      <main className="flex-1 overflow-y-auto p-5">
        {activeSection === "customer" && (
          <DashboardTable tableRole="customer" TableData={data} />
        )}

        {activeSection === "store" && (
          <DashboardTable tableRole="store" TableData={data} />
        )}

        {activeSection === "active_services" && (
          <DashboardTable tableRole="activeService" TableData={data} />
        )}

        {activeSection === "inactive_services" && (
          <DashboardTable tableRole="inActiveService" TableData={data} />
        )}

        {activeSection === "pricing" && (
          <DashboardTable tableRole="Pricing" TableData={data} />
        )}

        {activeSection === "bookings" && (
          <DashboardTable tableRole="booking" TableData={data} />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
