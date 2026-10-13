import { useState, useEffect, useRef } from "react";
import InputBox from "../../components/Input";
import Button from "../../components/Button";
import { FetchData } from "../../utils/FetchFromApi";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { useToast } from "../../components/hooks/ToastContext";

const AddNewFranchiseForm = ({ onClose }) => {
  const formRef = useRef(null);
  const [store, setStore] = useState({});
  const [storeId, setStoreId] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const adminId = user?._id;
  const { alertInfo, alertSuccess, alertError } = useToast();

  const getStoreForFranchise = async () => {
    try {
      //   setLoading(true);
      const response = await FetchData(`store/get/store-for-franchise`, "post");
      console.log(response);
      setStore(response.data.data);
    } catch (err) {
      console.log(err.response.data);
      alertInfo("Something went wrong !");
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    getStoreForFranchise();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData(formRef.current);
      const response = await FetchData(
        `franchise/update/create/new-franchise/${adminId}`,
        "post",
        formData,
      );
      console.log(response);
      alertSuccess(response.data.message);
      onClose();
    } catch (err) {
      console.log(err.response.data);
      alertError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  const formInputs = [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
      placeholder: "Enter franchise name",
    },
    {
      label: "Subtitle name",
      name: "subtitle",
      type: "text",
      required: true,
      placeholder: "Eg: Efficient & Compact",
    },
    {
      label: "Total budget",
      name: "budget",
      type: "text",
      required: true,
      placeholder: "Eg: ₹10 Lakhs - ₹15 Lakhs",
    },
    {
      label: "Franchise fee",
      name: "franchiseFee",
      type: "text",
      required: true,
      placeholder: "Eg: ₹2L - ₹3L",
    },
    {
      label: "interior cost",
      name: "interior",
      type: "text",
      required: true,
      placeholder: "Eg: ₹4L - ₹5L",
    },
    {
      label: "equipment provided",
      name: "equipment",
      type: "text",
      required: true,
      placeholder: "Eg: ₹2.5L - ₹3L",
    },
    {
      label: "stock provided",
      name: "stock",
      type: "text",
      required: true,
      placeholder: "Eg: ₹1L - ₹1.5L",
    },
    {
      label: "marketing expenses",
      name: "marketing",
      type: "text",
      required: true,
      placeholder: "Eg: ₹50,000",
    },
    {
      label: "working Capital",
      name: "workingCapital",
      type: "text",
      required: true,
      placeholder: "Eg: ₹1,00,000",
    },
    {
      label: "space required",
      name: "space",
      type: "text",
      required: true,
      placeholder: "Eg: 300-500 Sq Ft",
    },
    {
      label: "staff requirement",
      name: "staff",
      type: "text",
      required: true,
      placeholder: "Eg: 2-3",
    },
    {
      label: "ROI",
      name: "roi",
      type: "text",
      required: true,
      placeholder: "Eg: 14-18 Months",
    },
    {
      label: "location ",
      name: "location",
      type: "text",
      required: true,
      placeholder:
        "Eg: Semi-urban areas, small towns (Tier-2/3 cities), or residential societies.",
    },
    {
      label: "services provided",
      name: "services",
      type: "text",
      required: true,
      placeholder:
        "Eg: Basic hair styling, threading, waxing, standard facials, manicures and pedicures.",
    },
    {
      label: "advantage",
      name: "advantage",
      type: "text",
      required: true,
      placeholder: "Explain all the advantage you are providing",
    },
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
      <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Franchise
            </h2>
          </div>
          <Button
            LabelName={<FaTimes size={18} />}
            onClick={onClose}
            variant="secondary"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="px-6 py-6 grid-cols-2 grid gap-4"
        >
          {formInputs.map((i, index) => (
            <div key={index}>
              <InputBox
                label={i.label}
                name={i.name}
                placeholder={i.placeholder}
                required={i.required}
              />
            </div>
          ))}
          <div className="w-full py-3">
            <label
              htmlFor="parentCategory"
              className="mb-2 block text-sm font-medium capitalize text-gray-700"
            >
              Select Store
              <span className="text-red-500">*</span>
            </label>

            <select
              name="store"
              id="parentCategory"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-neutral-50 px-4 py-2 text-gray-700 outline-none transition hover:shadow-md focus:border-[#8B2954] focus:ring-1 focus:ring-[#8B2954]"
            >
              <option value="">Select a store</option>

              {/* {store?.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.storeName}, {s.storeContactNumber}
                </option>
              ))} */}
            </select>
          </div>

          {/* Buttons */}
          <div className="col-span-2 mt-6 flex justify-end gap-3 border-t border-gray-200 pt-5">
            <Button LabelName="Cancel" type="button" onClick={onClose} />

            <Button
              LabelName={loading ? "Please wait..." : "Submit"}
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewFranchiseForm;
