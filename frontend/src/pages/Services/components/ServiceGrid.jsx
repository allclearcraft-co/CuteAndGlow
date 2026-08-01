import { useLocation } from "react-router-dom";
import CustomerServiceCard from "../../../components/ui/CustomerServiceCard";

const ServiceGrid = ({ services }) => {
  const location = useLocation();
  const hide = location.pathname === "/";

  return (
    <section className="w-full">
      {/* Total Results */}

      {!hide && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="heading text-xl md:text-2xl">Available Services</h2>

          <span className="paragraph text-sm md:text-base text-neutral-500">
            {services.length} Service{services.length !== 1 && "s"} Found
          </span>
        </div>
      )}

      {/* Grid */}

      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 items-start">
        {services.map((service) => (
          <CustomerServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServiceGrid;
