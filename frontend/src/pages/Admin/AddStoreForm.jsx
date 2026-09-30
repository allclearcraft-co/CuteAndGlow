import { useEffect, useState } from "react";
import { FetchData } from "../../utils/FetchFromApi";
import { useToast } from "../../components/hooks/ToastContext";

const initialService = () => ({
  name: "",
  category: "",
  subcategory: "",
  duration: "30",
  serviceFor: "Both",
  mrp: "",
  discount: "0",
  sellingPrice: "",
  description: "",
  bookingDays: "Whole week",
  bookingFrom: "",
  bookingTill: "",
  onSite: true,
  inHouse: true,
  serviceArea: "Inside city",
});

const initialForm = () => ({
  store: {
    storeName: "",
    storeContactNumber: "",
    storeEmail: "",
    password: "",
  },
  address: {
    flatNumber: "",
    floor: "",
    street1: "",
    street2: "",
    area: "",
    locality: "",
    pincode: "",
    city: "",
    state: "",
    country: "India",
  },
  services: [initialService(), initialService()],
});

const inputClass =
  "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#8B2954] focus:ring-1 focus:ring-[#8B2954]";

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = true,
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      <span className="mb-1 block">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        className={inputClass}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={type === "number" ? 0 : undefined}
      />
    </label>
  );
}

function AddStoreForm({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { alertSuccess, alertError } = useToast();

  useEffect(() => {
    if (!isOpen) return;

    const loadCategories = async () => {
      try {
        const response = await FetchData(
          "category-subcategory/get/categories/all",
          "get",
        );
        setCategories(response.data.data || []);
      } catch (error) {
        alertError(
          error?.response?.data?.message ||
            "Unable to load service categories.",
        );
      }
    };

    loadCategories();
  }, [isOpen, alertError]);

  if (!isOpen) return null;

  const updateStore = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      store: { ...current.store, [name]: value },
    }));
  };

  const updateAddress = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      address: { ...current.address, [name]: value },
    }));
  };

  const updateService = (index, event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      services: current.services.map((service, serviceIndex) =>
        serviceIndex === index
          ? {
              ...service,
              [name]: type === "checkbox" ? checked : value,
              ...(name === "category" ? { subcategory: "" } : {}),
              ...(name === "mrp" && !service.discount
                ? { sellingPrice: value }
                : {}),
            }
          : service,
      ),
    }));
  };

  const updateServicePrice = (index, event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      services: current.services.map((service, serviceIndex) => {
        if (serviceIndex !== index) return service;
        const updated = { ...service, [name]: value };
        const mrp = Number(name === "mrp" ? value : updated.mrp) || 0;
        const discount =
          Number(name === "discount" ? value : updated.discount) || 0;
        updated.sellingPrice = (mrp - (mrp * discount) / 100).toFixed(2);
        return updated;
      }),
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await FetchData(
        "admin/store/create-with-services",
        "post",
        form,
      );
      alertSuccess(response.data.message);
      setForm(initialForm());
      onSuccess();
    } catch (error) {
      alertError(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    if (!loading) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3"
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-store-title"
        className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-5 shadow-xl md:p-8"
      >
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div>
            <h2
              id="add-store-title"
              className="text-2xl font-semibold text-gray-900"
            >
              Add Store
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              The complimentary basic plan will be assigned automatically.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={loading}
            aria-label="Close dialog"
            className="px-3 py-2 text-2xl leading-none text-gray-500 hover:text-gray-900"
          >
            ×
          </button>
        </div>

        <form onSubmit={submit} className="space-y-8">
          <section>
            <h3 className="mb-3 text-lg font-semibold">Store details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Store name"
                name="storeName"
                value={form.store.storeName}
                onChange={updateStore}
              />
              <Field
                label="Contact number"
                name="storeContactNumber"
                value={form.store.storeContactNumber}
                onChange={updateStore}
                type="tel"
              />
              <Field
                label="Email"
                name="storeEmail"
                value={form.store.storeEmail}
                onChange={updateStore}
                type="email"
              />
              <Field
                label="Password"
                name="password"
                value={form.store.password}
                onChange={updateStore}
                type="password"
              />
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">Store address</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Street address"
                name="street1"
                value={form.address.street1}
                onChange={updateAddress}
              />
              <Field
                label="Area"
                name="area"
                value={form.address.area}
                onChange={updateAddress}
              />
              <Field
                label="Pincode"
                name="pincode"
                value={form.address.pincode}
                onChange={updateAddress}
              />
              <Field
                label="City"
                name="city"
                value={form.address.city}
                onChange={updateAddress}
              />
              <Field
                label="State"
                name="state"
                value={form.address.state}
                onChange={updateAddress}
              />
              <Field
                label="Country"
                name="country"
                value={form.address.country}
                onChange={updateAddress}
              />
              <Field
                label="Flat / unit"
                name="flatNumber"
                value={form.address.flatNumber}
                onChange={updateAddress}
                required={false}
              />
              <Field
                label="Floor"
                name="floor"
                value={form.address.floor}
                onChange={updateAddress}
                required={false}
              />
              <Field
                label="Street address 2"
                name="street2"
                value={form.address.street2}
                onChange={updateAddress}
                required={false}
              />
              <Field
                label="Locality"
                name="locality"
                value={form.address.locality}
                onChange={updateAddress}
                required={false}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">Services</h3>
            <div className="space-y-6">
              {form.services.map((service, index) => {
                const subcategories =
                  categories.find(
                    (category) => category._id === service.category,
                  )?.subcategories || [];
                return (
                  <fieldset
                    key={index}
                    className="grid gap-4 border-t pt-5 md:grid-cols-2 lg:grid-cols-3"
                  >
                    <legend className="px-2 font-semibold">
                      Service {index + 1}
                    </legend>
                    <Field
                      label="Service name"
                      name="name"
                      value={service.name}
                      onChange={(event) => updateService(index, event)}
                    />
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="mb-1 block">
                        Category <span className="text-red-500">*</span>
                      </span>
                      <select
                        className={inputClass}
                        name="category"
                        value={service.category}
                        onChange={(event) => updateService(index, event)}
                        required
                      >
                        <option value="">Select category</option>
                        {categories
                          .filter(
                            (category) =>
                              category.status === "Verified" &&
                              category.isActive,
                          )
                          .map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.title}
                            </option>
                          ))}
                      </select>
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="mb-1 block">
                        Subcategory <span className="text-red-500">*</span>
                      </span>
                      <select
                        className={inputClass}
                        name="subcategory"
                        value={service.subcategory}
                        onChange={(event) => updateService(index, event)}
                        required
                        disabled={!service.category}
                      >
                        <option value="">Select subcategory</option>
                        {subcategories
                          .filter(
                            (subcategory) =>
                              subcategory.status === "Verified" &&
                              subcategory.isActive,
                          )
                          .map((subcategory) => (
                            <option
                              key={subcategory._id}
                              value={subcategory._id}
                            >
                              {subcategory.title}
                            </option>
                          ))}
                      </select>
                    </label>
                    <Field
                      label="Duration (minutes)"
                      name="duration"
                      value={service.duration}
                      onChange={(event) => updateService(index, event)}
                      type="number"
                    />
                    <Field
                      label="Price"
                      name="mrp"
                      value={service.mrp}
                      onChange={(event) => updateServicePrice(index, event)}
                      type="number"
                    />
                    <Field
                      label="Discount (%)"
                      name="discount"
                      value={service.discount}
                      onChange={(event) => updateServicePrice(index, event)}
                      type="number"
                      required={false}
                    />
                    <Field
                      label="Selling price"
                      name="sellingPrice"
                      value={service.sellingPrice}
                      onChange={(event) => updateService(index, event)}
                      type="number"
                    />
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="mb-1 block">Service for</span>
                      <select
                        className={inputClass}
                        name="serviceFor"
                        value={service.serviceFor}
                        onChange={(event) => updateService(index, event)}
                      >
                        <option>Both</option>
                        <option>Female</option>
                        <option>Male</option>
                      </select>
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="mb-1 block">Service area</span>
                      <select
                        className={inputClass}
                        name="serviceArea"
                        value={service.serviceArea}
                        onChange={(event) => updateService(index, event)}
                      >
                        <option>Inside city</option>
                        <option>Outside city</option>
                        <option>Both</option>
                      </select>
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="mb-1 block">Booking days</span>
                      <select
                        className={inputClass}
                        name="bookingDays"
                        value={service.bookingDays}
                        onChange={(event) => updateService(index, event)}
                      >
                        <option>Whole week</option>
                        <option>Monday to Friday</option>
                        <option>Monday to Saturday</option>
                        <option>Whole week (All 7 days)</option>
                      </select>
                    </label>
                    <Field
                      label="Booking from"
                      name="bookingFrom"
                      value={service.bookingFrom}
                      onChange={(event) => updateService(index, event)}
                      type="time"
                      required={false}
                    />
                    <Field
                      label="Booking until"
                      name="bookingTill"
                      value={service.bookingTill}
                      onChange={(event) => updateService(index, event)}
                      type="time"
                      required={false}
                    />
                    <label className="md:col-span-2 lg:col-span-3">
                      <span className="mb-1 block text-sm font-medium text-gray-700">
                        Description
                      </span>
                      <textarea
                        className={inputClass}
                        name="description"
                        value={service.description}
                        onChange={(event) => updateService(index, event)}
                        rows={2}
                      />
                    </label>
                    <div className="flex gap-6 text-sm md:col-span-2 lg:col-span-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="inHouse"
                          checked={service.inHouse}
                          onChange={(event) => updateService(index, event)}
                        />
                        In-house
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="onSite"
                          checked={service.onSite}
                          onChange={(event) => updateService(index, event)}
                        />
                        On-site
                      </label>
                    </div>
                  </fieldset>
                );
              })}
            </div>
          </section>

          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={close}
              disabled={loading}
              className="rounded border border-gray-300 px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-[#8B2954] px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create store"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddStoreForm;
