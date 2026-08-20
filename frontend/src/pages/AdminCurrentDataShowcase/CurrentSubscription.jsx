import React from "react";
import Button from "../../components/Button";
import { FaUser, FaStar, FaPlus } from "react-icons/fa";

const CurrentSubscription = ({ data }) => {
	const TableData = [
		{
			id: 1,
			label: "Admin",
			value: data?.admin,
		},
		{
			id: 2,
			label: " Plan Name",
			value: data?.planName,
		},
		{
			id: 3,
			label: "Plan For",
			value: data?.planFor,
		},
		{
			id: 4,
			label: "Custom Models",
			value: data?.customModel,
		},
		{
			id: 5,
			label: " Custom model For ",
			value: data?.customModelFor,
		},
		{
			id: 6,
			label: "About ",
			value: data?.about,
		},
		{
			id: 7,
			label: "Tag Line",
			value: data?.tagLine,
		},
		{
			id: 8,
			label: "Validity ",
			value: data?.validity?.months,
		},
		{
			id: 9,
			label: "Validity",
			value: data?.validity.renewalType,
		},
		{
			id: 10,
			label: "Price",
			value: (
				<div className="space-y-4">
					<p>{data?.price.mrp || "N/A"}</p>
					<p>{data?.price.discount || "N/A"}</p>
					<p>{data?.price.sellingPrice || "N/A"}</p>
				</div>
			),
		},
		{
			id: 11,
			label: "Media Limit",
			value: (
				<div className="space-y-4">
					<p>{data?.mediaLimit.photos || "N/A"}</p>
					<p>{data?.mediaLimit.videos || "N/A"}</p>
					<p>{data?.mediaLimit.unlimitedPhotos || "N/A"}</p>
					<p>{data?.mediaLimit.unlimitedVideos || "N/A"}</p>
				</div>
			),
		},
		{
			id: 12,
			label: "Booking ",
			value: (
				<div className="space-y-4">
					<p>{data?.booking.enabled || "N/A"}</p>
					<p>{data?.booking.advancedBooking || "N/A"}</p>
				</div>
			),
		},
		{
			id: 13,
			label: "Booking ",
			value: (
				<div className="space-y-4">
					<p>{data?.visibility.featured || "N/A"}</p>
					<p>{data?.visibility.verifyBadge || "N/A"}</p>
				</div>
			),
		},
		{
			id: 14,
			label: "Franchise",
			value: (
				<div className="space-y-4">
					<p>{data?.franchise.enabled || "N/A"}</p>
					<p>{data?.franchise.enquiryButton || "N/A"}</p>
				</div>
			),
		},
		{
			id: 14,
			label: "management Tools ",
			value: (
				<div className="space-y-4">
					<p>{data?.managementTools.staffAttendance || "N/A"}</p>
					<p>{data?.managementTools.inventory || "N/A"}</p>
					<p>{data?.managementTools.analytics || "N/A"}</p>
					<p>{data?.managementTools.commissionTracking || "N/A"}</p>
				</div>
			),
		},
		{
			id: 15,
			label: " Marketing ",
			value: (
				<div className="space-y-4">
					<p>{data?.marketing.socialPromotion || "N/A"}</p>
					<p>{data?.marketing.couponManager || "N/A"}</p>
					<p>{data?.marketing.smsWhatsapp || "N/A"}</p>
					<p>{data?.marketing.reviews || "N/A"}</p>
				</div>
			),
		},
		{
			id: 15,
			label: " FAQ ",
			value: (
				<div className="space-y-4">
					<p className="font-semibold text-lg">
						{data?.faqs.question || "N/A"}
					</p>
					<p>{data?.faqs.answer || "N/A"}</p>
				</div>
			),
		},
		{
			id: 16,
			label: "Is Active",
			value: (
				<div>
					{data?.isActive ? (
						<div className="w-fit h-4 bg-green-300 p-4 text-center rounded-full flex items-center justify-center">
							<button>IsActive</button>
						</div>
					) : (
						<div className="w-fit h-4 py-4 px-4 rounded-full bg-red-300 flex items-center justify-center">
							<button>InActive</button>
						</div>
					)}
				</div>
			),
		},
	];
	return (
		<div className="space-y-6  h-full w-full p-10 mb-20">
			<div className="w-full h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
				<table className="w-full border-collapse">
					<tbody>
						{TableData?.map((item, index) => (
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
};

export default CurrentSubscription;
