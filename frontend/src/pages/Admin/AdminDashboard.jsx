import React, { useEffect, useRef } from "react";
import { adminDashboardSection } from "../../constants/constants";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import DashboardTable from "./DashboardTables";
import { FetchData } from "../../utils/FetchFromApi";
import Button from "../../components/Button";
import InputBox from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AdminAuth from "../Auth/AdminAuth";
import SubscriptionModelForm from "./SubscriptionForm";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slice/authSlice";
import { useToast } from "../../components/hooks/ToastContext";

function AdminDashboard() {
  const user = useSelector((state) => state.auth.user);
  const adminRole = ["admin", "subAdmin", "sales", "marketing"];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState(
    () => localStorage.getItem("adminDashboardQuery") || "customer",
  );
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { alertInfo } = useToast();

  const fetchDashboard = async ({ query }) => {
    if (!query) return;
    try {
      const res = await FetchData(
        `admin/get/data/dashboard-data/${query}`,
        "get",
      );
      setData(res.data.data);
      // console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard({
      query: localStorage.getItem("adminDashboardQuery") || "customer",
    });
  }, []);

  const logout = () => {
    localStorage.clear();
    dispatch(clearUser());
    alertInfo("You are logged out successfully");
    navigate("/");
  };

  console.log(user);

  const filteredSections =
    user?.restrictedAccess === true
      ? adminDashboardSection.filter((section) =>
          user?.sectionList?.includes(section.label),
        )
      : adminDashboardSection;

  if (!adminRole.includes(user?.role)) {
    return (
      <div className="flex justify-center items-center w-full h-[70vh]">
        <h2 className="text-2xl font-bold text-center">
          <p className="text-5xl ">⚠️</p>
          Restricted Access !!
        </h2>
      </div>
    );
  } else {
    return (
      <div className="relative p-2 flex w-full items-start h-[90vh]">
        <aside className="hidden md:flex sticky w-[20vw] h-full bg-[#8B2954] rounded-xl flex-col items-start justify-between text-white py-6 px-5">
          <div className="w-full h-full flex flex-col justify-between">
            <ul className="flex flex-col gap-2 w-full">
              {filteredSections.map((data, index) => (
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
            <Button
              variant="secondary"
              LabelName="Log out"
              onClick={() => logout()}
            />
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
            <DashboardTable tableRole="inactive_services" TableData={data} />
          )}
          {activeSection === "pricing" && (
            <div className="w-full">
              {/* popup for adding pricing model  */}
              <div className="border px-4 rounded-xl border-[#8B2954]">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className=" flex items-center justify-between px-6 py-5 heading"
                >
                  Add new subscription model
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <SubscriptionModelForm onClose={() => setIsOpen(!isOpen)} />
                  )}
                </AnimatePresence>
              </div>
              <DashboardTable tableRole="pricing" TableData={data} />
            </div>
          )}
          {activeSection === "bookings" && (
            <DashboardTable tableRole="booking" TableData={data} />
          )}
          {activeSection === "adminsQuery" && (
            <div className="w-full">
              <div className="border-[0.1px] px-4 py-3 rounded-xl border-[#8B2954]">
                <button
                  onClick={() => setIsOpen1(!isOpen1)}
                  className=" flex items-center justify-between px-6 py-5 heading"
                >
                  Add admin
                  {isOpen1 ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen1 && <AdminAuth login={false} />}
                </AnimatePresence>
              </div>

              <DashboardTable tableRole="adminsQuery" TableData={data} />
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default AdminDashboard;
