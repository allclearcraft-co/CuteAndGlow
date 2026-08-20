import React from 'react'

const CurrentBooking = ({data}) => {
     const TableData = [
       {
         id: 1,
         label: "Service",
         value: data?.service,
       },
       {
         id: 2,
         label: "Customer",
         value: data?.customer,
       },
       {
         id: 3,
         label: "Address ",
         value: data?.address,
       },
       {
         id: 4,
         label: "Date Of Bookings",
         value: data?.dateOfBooking,
       },
       {
         id: 5,
         label: "Date For Booking",
         value: data?.dateForBooking,
       },
       {
         id: 6,
         label: "Payment ",
         value: data?.payment,
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
                  {item.label}
                </td>

                {/* Value */}
                <td className="w-1/2 px-5 py-4 text-sm font-semibold text-gray-800">
                  {item.value || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CurrentBooking
