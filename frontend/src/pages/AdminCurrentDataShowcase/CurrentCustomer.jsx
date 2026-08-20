import React from "react";
import Button from "../../components/Button";
import { FaUser, FaStar, FaPlus } from "react-icons/fa";

const CurrentCustomer = ({ data }) => {
	const TableData = [
		{
			id: 1,
			Label: "Name",
			Value: data?.name || "N/A",
		},

		{
			id: 2,
			Label: "Contact Number",
			Value: data?.contactNumber || "N/A",
		},

		{
			id: 3,
			Label: "Email",
			Value: data?.email || "N/A",
		},

		{
			id: 4,
			Label: "Gender",
			Value: data?.gender || "N/A",
		},

		{
			id: 5,
			Label: "Role",
			Value: data?.role || "N/A",
		},

		{
			id: 6,
			Label: "Account Status",
			Value: (
				<span
					className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
						data?.isActive
							? "bg-green-100 text-green-700"
							: "bg-red-100 text-red-700"
					}`}
				>
					<span
						className={`w-2 h-2 rounded-full mr-2 ${
							data?.isActive ? "bg-green-500" : "bg-red-500"
						}`}
					/>

					{data?.isActive ? "Active" : "Inactive"}
				</span>
			),
		},

		{
			id: 7,
			Label: "Profile Status",
			Value: (
				<span
					className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
						data?.isProfileComplete
							? "bg-green-100 text-green-700"
							: "bg-yellow-100 text-yellow-700"
					}`}
				>
					{data?.isProfileComplete ? "Profile Completed" : "Profile Incomplete"}
				</span>
			),
		},

		{
			id: 8,
			Label: "Registration Status",
			Value: (
				<span
					className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
						data?.isTemporaryRegistered
							? "bg-blue-100 text-blue-700"
							: "bg-gray-100 text-gray-600"
					}`}
				>
					{data?.isTemporaryRegistered
						? "Temporary Registered"
						: "Regular Account"}
				</span>
			),
		},

		{
			id: 9,
			Label: "Subscription",
			Value: (
				<span
					className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
						data?.subscription?.subscriptionPurchased
							? "bg-purple-100 text-purple-700"
							: "bg-gray-100 text-gray-600"
					}`}
				>
					{data?.subscription?.subscriptionPurchased
						? "Subscribed"
						: "Not Subscribed"}
				</span>
			),
		},

		{
			id: 10,
			Label: "Currently Under Booking",
			Value: (
				<span
					className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
						data?.currentlyUnderBooking
							? "bg-orange-100 text-orange-700"
							: "bg-gray-100 text-gray-600"
					}`}
				>
					{data?.currentlyUnderBooking
						? "Currently Booking"
						: "No Active Booking"}
				</span>
			),
		},

		{
			id: 11,
			Label: "Total Bookings",
			Value: data?.bookings?.length || 0,
		},

		{
			id: 12,
			Label: "Favorite Stores",
			Value: data?.favStore?.length || 0,
		},

		{
			id: 13,
			Label: "Favorite Professionals",
			Value: data?.favProfessional?.length || 0,
		},

		{
			id: 14,
			Label: "Quick Services",
			Value: data?.quickServices?.length || 0,
		},

		{
			id: 15,
			Label: "Wishlist Services",
			Value: data?.wishListServices?.length || 0,
		},

		{
			id: 16,
			Label: "Banking Details",
			Value: data?.bankingDetails?.length
				? `${data.bankingDetails.length} Added`
				: "Not Added",
		},

		{
			id: 17,
			Label: "Address",
			Value: data?.address?.length ? (
				<div className="space-y-1">
					<p>{data.address[0]?.address || "N/A"}</p>
					<p className="text-xs text-gray-500">
						{data.address[0]?.city || ""}
						{data.address[0]?.state ? `, ${data.address[0].state}` : ""}
						{data.address[0]?.pincode ? ` - ${data.address[0].pincode}` : ""}
					</p>
				</div>
			) : (
				"No Address Added"
			),
		},

		{
			id: 18,
			Label: "Customer Since",
			Value: data?.createdAt
				? new Date(data.createdAt).toLocaleDateString("en-IN", {
						day: "2-digit",
						month: "short",
						year: "numeric",
					})
				: "N/A",
		},

		{
			id: 19,
			Label: "Last Updated",
			Value: data?.updatedAt
				? new Date(data.updatedAt).toLocaleDateString("en-IN", {
						day: "2-digit",
						month: "short",
						year: "numeric",
					})
				: "N/A",
		},
		{
			id: 20,
			Label: "Profile Image",
			Value: data?.profileImage?.url ? (
				<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
					<img
						src={data.profileImage.url}
						alt={data?.name || "Customer"}
						className="w-full h-full object-cover"
					/>
				</div>
			) : (
				<div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
					<span className="text-xl font-bold text-purple-600">
						{data?.name?.charAt(0)?.toUpperCase() || "U"}
					</span>
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
