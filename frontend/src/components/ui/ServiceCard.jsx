import {
  FaClock,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaUserTie,
  FaBoxOpen,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow hover:shadow-xl transition-all duration-300">
      {/* Cover Image */}
      <div className="relative h-52">
        <img
          src={
            service?.coverImage?.[0]?.url ||
            "https://placehold.co/600x400?text=Service"
          }
          alt={service?.name}
          className="w-full h-full object-cover"
        />

        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
            service?.isActive ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {service?.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{service?.name}</h2>

          <p className="text-sm text-[#8B2954] font-medium">
            {service?.category}
          </p>
        </div>

        {/* Price & Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Charges</p>
              <p className="font-semibold">₹ {service?.charges}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaClock className="text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-semibold">{service?.duration} mins</p>
            </div>
          </div>
        </div>

        {/* Prep Time */}

        {service?.isPrepTime && (
          <div className="bg-[#FFF6FA] rounded-lg p-3">
            <p className="font-medium text-[#8B2954]">Preparation Time</p>

            <p className="text-gray-600">{service?.prepTime} Minutes</p>

            <p className="text-xs text-gray-500 mt-1">
              {service?.timeIncludingPrepTime
                ? "Included in total duration"
                : "Additional to service duration"}
            </p>
          </div>
        )}

        {/* Service For */}

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm">
            {service?.serviceFor}
          </span>

          {service?.onSite && (
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              On Site
            </span>
          )}

          {service?.inHouse && (
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
              In House
            </span>
          )}
        </div>

        {/* Booking */}

        <div className="text-sm">
          <p>
            <span className="font-semibold">Booking:</span>{" "}
            {service?.bookingDays}
          </p>

          <p>
            <span className="font-semibold">Hours:</span>{" "}
            {service?.bookingAcceptingHours?.from} -{" "}
            {service?.bookingAcceptingHours?.till}
          </p>
        </div>

        {/* Executive */}

        {service?.executive && (
          <div className="flex items-center gap-2">
            <FaUserTie className="text-[#8B2954]" />

            <div>
              <p className="text-xs text-gray-500">Executive</p>

              <p className="font-medium">{service?.executive?.name}</p>
            </div>
          </div>
        )}

        {/* Service Area */}

        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />

          <span>{service?.serviceArea}</span>
        </div>

        {/* Products */}

        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaBoxOpen />

            <p className="font-semibold">Products Used</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {service?.products?.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
              >
                {item.productType} • {item.brand}
              </span>
            ))}
          </div>
        </div>

        {/* Inclusions */}

        {service?.serviceInclusion?.length > 0 && (
          <div>
            <p className="font-semibold mb-2">Includes</p>

            <ul className="space-y-1">
              {service.serviceInclusion.slice(0, 3).map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <FaCheckCircle className="text-green-600 text-xs" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}

        {service?.serviceExclusion?.length > 0 && (
          <div>
            <p className="font-semibold mb-2">Excludes</p>

            <ul className="space-y-1">
              {service.serviceExclusion.slice(0, 2).map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <FaTimesCircle className="text-red-500 text-xs" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}

        <div className="flex gap-3 pt-4">
          <button className="flex-1 flex justify-center items-center gap-2 bg-[#8B2954] hover:bg-[#702044] text-white py-2 rounded-lg transition">
            <FaEdit />
            Edit
          </button>

          <button className="flex-1 flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
