import React from "react";
import { adminDashboardSection } from "../../constants/constants";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import  Customer  from "./DashboardTables";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState(
    () => localStorage.getItem("activeSection") || "customer",
  );
  const bottomNavItems = adminDashboardSection.slice(0, 4);

  const moreMenuItems = adminDashboardSection.slice(4);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchDashboard = async ({query}) => {
    if(!query) return;
    try{
      const res = await FetchData(`admin/dashboard/data/${query}`, get);
      setData(res.data.data);
    } catch(err) {
      console.log(err);
    } 
  }

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
                  localStorage.setItem("activeSection", data.query);
                  setActiveSection(data.query);
                  fetchDashboard({ query: localStorage.getItem("query") });
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
        Main Content
        {activeSection === "customer" && <h1><Customer/></h1>}
        {activeSection === "store" && <h1><Customer/></h1>}
        {activeSection === "professional" && <h1>Professional</h1>}
        {activeSection === "activeService" && <h1>Active Service</h1>}
        {activeSection === "inActiveService" && <h1>In Active Service</h1>}
        {activeSection === "Pricing" && <h1>Price</h1>}
        {activeSection === "booking" && <h1>Booking</h1>}
        {activeSection === "registerAdmin" && <h1>Register admin</h1>}
      </main>
    </div>
  );
}

export default AdminDashboard;
