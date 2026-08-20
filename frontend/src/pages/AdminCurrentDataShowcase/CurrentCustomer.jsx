import React from "react";
import Button from "../../components/Button";
import { FaUser, FaStar, FaPlus } from "react-icons/fa";

const CurrentCustomer = ({ data }) => {
  const TableData = [
    {
      id: 1,
      Label: "Name",
      Value: data?.name,
    },
    {
      id: 2,
      Label: "Contact Number",
      Value: data?.contactNumber,
    },
    {
      id: 3,
      Label: "Alternate Contact Number",
      Value: (
        <div>
          {data?.alternateContactNumber ? data?.alternateContactNumber : "NA"}
        </div>
      ),
    },
    {
      id: 4,
      Label: "Email",
      Value: data?.email,
    },

    {
      id: 5,
      Label: "Profile Image",
      Value: data?.profileImage,
    },

    {
      id: 6,
      Label: "IsActive",
      Value: (
        <div>
          {data?.isActive ? (
            <div className="w-fit h-4 bg-green-300 p-4 text-center rounded-full flex items-center justify-center">
              <p className="text-sm">Active</p>
            </div>
          ) : (
            <div className="w-fit h-4 py-4 px-4 rounded-full bg-red-300 flex items-center justify-center">
              <p className="text-sm">In Active</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 6,
      Label: "Gender",
      Value: data?.gender
    },
    {
      id: 7,
      Label: "Profile Image",
      Value: (
        <div className="h-36 w-36  rounded-full ">
          <img
            src={data?.profileImage?.url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6  h-full w-full p-10 mb-20">
      <div className="w-full h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <tbody>
            {TableData.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* Label */}
                <td className="w-1/2 px-5 py-4 text-sm font-medium text-gray-500">
                  {item.Label}
                </td>

                {/* Value */}
                <td className="w-1/2 px-5 py-4 text-sm font-semibold text-gray-800">
                  {item.Value || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Saved Addresses
            </h1>
          </div>
        </div>

        {Array.isArray(data) ? (
          <div>
            {data?.map((d, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-2">
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition w-fit">
                  {/* Top */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-pink-100 flex justify-center items-center text-[#8B2954] text-xl">
                        {d?.icon || <FaUser />}
                      </div>
                      <div>
                        <h2 className="font-semibold text-lg">
                          {d?.addressType || "Na"}
                        </h2>
                        {d?.defaultAddress && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                    <FaMapMarkerAlt className="text-[#8B2954] text-xl" />
                  </div>
                  {/* Details */}
                  <div className="mt-5 space-y-2">
                    <h3 className="font-semibold text-gray-800">
                      {d?.contactDetails?.name} | {d?.contactDetails?.contact}
                    </h3>
                    <p className="text-gray-500 heading">Your Address: </p>
                  </div>
                  <p className="text-gray-600 leading-6">
                    {d?.flatNumber} {d?.floor} {d?.block}, {d?.societyName}{" "}
                    <br /> {d?.street1} {d?.street2 ? d?.street2 : ""} <br />
                    {d?.area}, near {d.locality} <br />{" "}
                    {d?.sector ? <span>Sector: {d?.sector}</span> : ""} <br />
                    {d?.city}, {d?.state}
                    <br />{" "}
                    <span className="heading">
                      {d?.country}
                      {d?.pincode ? -d?.pincode : ""}
                    </span>
                  </p>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 mt-6">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CurrentCustomer;
