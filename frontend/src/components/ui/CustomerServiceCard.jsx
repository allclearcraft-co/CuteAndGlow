import React from "react";
import { FaStar, FaClock } from "react-icons/fa";
import Button from "../Button";
import { truncateString } from "../../utils/utility-functions";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CustomerServiceCard = ({ service }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col justify-between items-start h-[60vh] md:h-fit lg:h-fit group w-full md:w-[60vw] lg:w-[35vw]  border-[0.1px] rounded-lg border-neutral-100 shadow">
      <div className="flex justify-center items-center flex-col rounded-t-lg overflow-hidden h-1/2 lg:h-[30vh] bg-red-400 w-full">
        <img
          src={service?.coverImage[0]?.url}
          alt={service?.name}
          className="group-hover:scale-105 duration-500 ease-in-out h-full w-full object-cover"
        />
      </div>
      <div className="h-1/2 flex flex-col justify-between items-start w-full px-5 py-5">
        <div className="w-full flex flex-row justify-between items-start border-b border-neutral-300 pt-5 border-dashed">
          <div className="flex flex-col justify-start items-start">
            <h2 className="heading text-2xl leading-10">{service?.name}</h2>
            <div className="flex justify-center items-center w-fit gap-2 paragraph text-xs border-b border-dashed z-0">
              <FaStar className="text-[#d65f92] drop-shadow-2xl" />
              <span>{service.rating || "4.8"}</span>
              <span>({service.reviews || "500+"} Reviews)</span>
            </div>
            <div className="flex justify-center items-center w-fit gap-5 py-2">
              <span className="heading">
                Starts at{" "}
                <span className="text-2xl">
                  ₹ {Number(service.charges || 0).toLocaleString()}
                </span>
              </span>{" "}
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="flex justify-center items-center gap-2">
                <FaClock />
                <span>{service.duration}</span>
              </span>
            </div>
          </div>
          <Button LabelName="Book now" variant="secondary" />
        </div>
        <div className="flex flex-row w-full justify-between items-start">
          <div>
            <h1 className="heading">Service Inclusions</h1>
            {service?.serviceInclusion
              ?.slice(
                service.serviceInclusion.length - 2,
                service.serviceInclusion.length,
              )
              .map((item, index) => (
                <ul key={index}>
                  <li>
                    {index + 1}. {truncateString(item, 20)}
                  </li>
                </ul>
              ))}
          </div>
          <div>
            <h1 className="heading">Service Exclusions</h1>
            {service?.serviceExclusion
              ?.slice(
                service.serviceExclusion.length - 2,
                service.serviceExclusion.length,
              )
              .map((item, index) => (
                <ul key={index}>
                  <li>
                    {index + 1}. {truncateString(item, 20)}
                  </li>
                </ul>
              ))}
          </div>
        </div>
        <button
          onClick={() => setShowDetails(true)}
          className="heading hover:underline text-[#d65f92] duration-300 ease-in-out my-4"
        >
          View Details
        </button>
        <div className="w-full h-1 bg-neutral-100 rounded-full" />
      </div>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-screen bg-black/90 w-full flex justify-center items-end z-50"
          >
            <div className="bg-white flex justify-center items-start flex-col w-full lg:w-[70vw] rounded-xl px-2 py-10 md:p-5 gap-5">
              <Button
                variant="secondary"
                LabelName="Close"
                onClick={() => setShowDetails(false)}
              />
              <div className="w-full rounded-lg">
                <p className="heading text-lg">Gallery</p>
                <div className="h-[30vh] flex flex-row w-full overflow-scroll gap-3">
                  {service?.coverImage.map((i, index) => (
                    <img
                      src={i.url}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-5 w-full">
                <h2 className="heading text-2xl leading-10">{service?.name}</h2>
                <div className="flex justify-center items-center w-fit gap-5 py-2">
                  <span className="heading">
                    Starts at{" "}
                    <span className="text-2xl">
                      ₹ {Number(service.charges || 0).toLocaleString()}
                    </span>
                  </span>{" "}
                  <span className="w-2 h-2 rounded-full bg-black" />
                  <span className="flex justify-center items-center gap-2">
                    <FaClock />
                    <span>{service.duration}</span>
                  </span>
                </div>
                <div className="flex flex-col w-full justify-between items-start gap-4">
                  <div>
                    <h1 className="heading">Service Inclusions</h1>
                    {service?.serviceInclusion?.map((item, index) => (
                      <ul key={index}>
                        <li>
                          {index + 1}. {item}
                        </li>
                      </ul>
                    ))}
                  </div>
                  <div>
                    <h1 className="heading">Service Exclusions</h1>
                    {service?.serviceExclusion?.map((item, index) => (
                      <ul key={index}>
                        <li>
                          {index + 1}. {item}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
                <Button LabelName="Book Now" className="w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerServiceCard;
