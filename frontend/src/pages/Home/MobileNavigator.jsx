import React from "react";
import { GiHairStrands, GiBodyBalance, GiDress } from "react-icons/gi";
import { FaSpa, FaHandSparkles, FaPaintBrush, FaRegStar } from "react-icons/fa";
import { PiHairDryerFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const serviceTags = [
  {
    id: 1,
    tagName: "Hair & Styling",
    query: "Hair",
    icon: GiHairStrands,
  },
  {
    id: 2,
    tagName: "Hair Treatments",
    query: "Hair",
    icon: PiHairDryerFill,
  },
  {
    id: 3,
    tagName: "Skin & Facial",
    query: "Skin",
    icon: FaSpa,
  },
  {
    id: 4,
    tagName: "Body & Hair Removal",
    query: "Body",
    icon: GiBodyBalance,
  },
  {
    id: 5,
    tagName: "Nails",
    query: "Nails",
    icon: FaHandSparkles,
  },
  {
    id: 6,
    tagName: "Makeup",
    query: "Makeup",
    icon: FaPaintBrush,
  },
  {
    id: 7,
    tagName: "Beauty Enhancements",
    query: "Bride",
    icon: FaRegStar,
  },
  {
    id: 8,
    tagName: "Bridal Styling",
    query: "Bride",
    icon: GiDress,
  },
];

const MobileServiceTags = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[20vh] px-4 py-4">
      <div className=" sm:w-full md:w-96 h-28 grid grid-cols-4 justify-center items-center md:flex gap-3 md:overflow-x-auto md:scrollbar-thumb-red-200">
        {serviceTags.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className=" md:w-[82px] flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer"
            >
              {/* Icon */}
              <div
                onClick={() => {
                  localStorage.setItem("homeClickedCategory", item.query);
                  navigate("/services/all");
                }}
                className=" w-14 h-14 rounded-2xl  border-red-200 flex items-center justify-center shadow-md"
              >
                <Icon className="text-3xl text-[#8B2954]" />
              </div>

              {/* Tag Name */}
              <span className="font-medium text-gray-600 text-center leading-tight  max-w-[80px]">
                {item.tagName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileServiceTags;
