import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { FetchData } from "../../utils/FetchFromApi";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCampground,
  FaCaretLeft,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMarsStroke,
  FaServicestack,
  FaTimesCircle,
} from "react-icons/fa";
import {
  FaFemale,
  FaClock,
  FaTag,
  FaHome,
  FaUser,
  FaMapMarkerAlt,
  FaStopwatch,
} from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const CurrentService = () => {
  const { serviceId } = useParams();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState();
  const [selectedImage, setSelectedImage] = useState(0);

  const ServiceInfo = [
    {
      title: "Category",
      value: services?.category,
      icon: <FaTag />,
    },
    {
      title: "Booking Day",
      value: services?.bookingDays,
      icon: <FaCalendarAlt />,
    },
    {
      title: "Booking Time",
      value: `${services?.bookingAcceptingHours?.from} - ${services?.bookingAcceptingHours?.till}`,
      icon: <FaClock />,
    },

    {
      title: "Prep Time Included",
      value: services?.timeIncludingPrepTime ? "Yes" : "No",
      icon: <FaStopwatch />,
    },
  ];
  const sections = [
    {
      title: "Service Inclusion",
      icon: <FaCheckCircle />,
      data: services?.serviceInclusion || [],
      bg: "bg-green-50",
      border: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      textColor: "text-green-700",
    },
    {
      title: "Service Exclusion",
      icon: <FaTimesCircle />,
      data: services?.serviceExclusion || [],
      bg: "bg-red-50",
      border: "border-red-200",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      textColor: "text-red-700",
    },
    {
      title: "Customer Requirements",
      icon: <FaExclamationTriangle />,
      data: services?.serviceRequirements || [],
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-700",
    },
  ];

  const getServiceById = async () => {
    try {
      setLoading(true);
      const response = await FetchData(
        `services/get/service/by-id/${serviceId}`,
        "get",
      );
      console.log(response.data.data);
      setServices(response.data.data);
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServiceById();
  }, [serviceId]);

  return (
    <div className="space-y-6">
      <h1></h1>
      {/* {loading ? (
        <LoadingSkeleton />
      ) : services.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div></div>
        </>
      )} */}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden space-y-4">
        <div className="grid lg:grid-cols-2 gap-6 p-6">
          <div>
            {/* Main Image */}
            <div className="relative group overflow-hidden rounded-xl">
              <img
                src={services?.coverImage?.[selectedImage]?.url}
                alt={services?.name}
                className="w-full h-[50vh] object-cover duration-500 group-hover:scale-110"
              />

              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}

              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold">
                {services?.coverImage?.length} Photos
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex  gap-4  overflow-x-auto pb-2">
              {services?.coverImage?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-xl transition-all duration-300
            ${
              selectedImage === index
                ? "ring-1 ring-purple-500 scale-105"
                : "opacity-70 hover:opacity-100"
            }`}
                >
                  <img
                    src={image.url}
                    alt=""
                    className="w-28 h-28 object-cover"
                  />
                </button>
              ))}
            </div>
            <div className=" flex flex-col items gap-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 mt-3">
                  {services?.name}
                </h1>

                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-900">
                    ₹{services?.charges}
                  </h2>
                </div>
              </div>

              {/* Badges */}

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white border rounded-xl px-2 py-1 shadow-sm">
                  <FaMarsStroke className="text-[#8B2954]" />
                  <span className="">{services?.category}</span>
                </div>
                <div className="flex items-center gap-2 bg-white border rounded-xl px-2 py-1 shadow-sm">
                  <FaFemale className="text-[#8B2954]" />
                  <span>{services?.serviceFor}</span>
                </div>

                <div className="flex items-center gap-2 bg-white border rounded-xl px-2 py-1 shadow-sm">
                  <FaClock className="text-[#8B2954]" />
                  <span>{services?.duration} min</span>
                </div>

                {services?.isPrepTime && (
                  <div className="flex items-center gap-2 bg-white border rounded-xl px-2 py-1 shadow-sm">
                    <MdOutlineAccessTime className="text-[#8B2954]" />
                    <span>Prep : {services?.prepTime} min</span>
                  </div>
                )}
              </div>

              {/* Service Highlights */}

              <div className="grid md:grid-cols-4 grid-cols-2  gap-2">
                <div className="bg-white w-28 h-fit rounded-2xl   flex flex-col items-center ">
                  <HiOutlineOfficeBuilding className="text-xl text-[#8B2954]" />
                  <p className="text-gray-500 text-sm mt-2">In House</p>
                  <span className="font-semibold text-green-600">
                    {services?.inHouse ? "Yes" : "No"}
                  </span>
                </div>

                <div className="bg-white w-28 h-fit rounded-2xl   flex flex-col items-center ">
                  <FaHome className="text-xl text-[#8B2954]" />
                  <p className="text-gray-500 text-sm mt-2">On Site</p>
                  <span className="font-semibold text-[#8B2954]">
                    {services?.onSite ? "Yes" : "No"}
                  </span>
                </div>

                <div className="bg-white rounded-2xl w-28 h-fit   flex flex-col items-center ">
                  <FaMapMarkerAlt className="text-xl text-[#8B2954]" />
                  <p className="text-gray-500 text-sm mt-2">Service Area</p>
                  <span className="font-semibold">{services?.serviceArea}</span>
                </div>

                <div className="bg-white rounded-2xl w-28 h-fit   flex flex-col items-center ">
                  <FaTag className="text-xl text-[#8B2954]" />
                  <p className="text-gray-500 text-sm mt-2">Sponsor</p>
                  <span className="font-semibold capitalize">
                    {services?.sponsor}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className="px-8 py-6 space-y-4 mx-8 rounded-lg border-neutral-400 border shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">
            Service Information
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 w-full justify-center items-center">
            {ServiceInfo.map((item, index) => (
              <div
                key={index}
                className=" flex justify-center items-start gap-6 py-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center text-xl">
                  {item.icon}
                </div>

                <div className="flex-col flex ">
                  <p className="text-gray-500 text-sm">{item.title}</p>

                  <h3 className="text-lg font-semibold text-gray-800 ">
                    {item.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Service Inclusion, exclusion and requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`${section.bg} ${section.border} border rounded-3xl p-6 shadow-sm`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${section.iconBg} ${section.iconColor}`}
                >
                  {section.icon}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {section.title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {section.data.length} Items
                  </p>
                </div>
              </div>

              {/* List */}
              <div className="space-y-4">
                {section.data.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`mt-1 ${section.iconColor}`}>
                      {section.icon}
                    </span>

                    <p className="text-gray-700 leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* service store and executive details */}
        <div className="border grid-cols-1 md:grid-cols-2 p-4 ">
          {/* Store Details */}
          <div className="flex justify-center items-center">
            
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CurrentService;
