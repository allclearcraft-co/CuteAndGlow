import React from "react";
import { adminDashboardSection } from "../../constants/constants";
import { useState } from "react";

function AdminDashboard() {
  // const [activeSection, setActiveSection] = useState(
  //   () => localStorage.getItem("activeSection") || "customer",
  // );
  // const bottomNavItems = adminDashboardSection.slice(0, 4);
  // const moreMenuItems = adminDashboardSection.slice(4);
  //   return (
  //     <div className="relative p-2 flex w-full items-start h-screen ">
  //       <aside className="hidden md:flex sticky w-[20vw] h-full bg-[#8B2954] rounded-xl flex-col items-start justify-between text-white py-6 px-5">
  //         <div className="flex flex-col gap-2">
  //           {adminDashboardSection.map((data, index) => (
  //             <ul key={index} className="w-full">
  //               <li
  //                 className={`cursor-pointer h-fit hover:bg-white/50 duration-300 ease-in-out hover:text-black rounded-lg px-3 py-2 w-full ${activeSection === data.query ? "bg-white text-black hover:bg-white" : ""}`}
  //               >
  //                 <div className="flex gap-2 justify-start items-center">
  //                   <span>{data.icon}</span>
  //                   <span>{data.label}</span>
  //                 </div>
  //               </li>
  //             </ul>
  //           ))}
  //         </div>
  //       </aside>
  //       {/* Mobile navigation */}
  //       <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg lg:hidden">
  //         <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg lg:hidden">
  //           <div className="flex justify-around items-center h-16">
  //             {bottomNavItems.map((item) => (
  //               <button
  //                 key={item.query}
  //                 onClick={() => setActiveSection(item.query)}
  //                 className={`flex flex-col items-center text-xs transition
  // ${activeSection === item.query ? "text-[#8B2954]" : "text-gray-500"}
  // `}
  //               >
  //                 <div className="text-xl">{item.icon}</div>
  //                 <p>{item.label}</p>
  //               </button>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //       <main className="flex-1 overflow-y-auto p-5">Main Content</main>
  //     </div>
  //   );
}

export default AdminDashboard;
