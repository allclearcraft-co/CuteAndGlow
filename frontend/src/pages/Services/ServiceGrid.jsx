import { useState } from "react";
import CustomerServiceCard from "../../components/ui/CustomerServiceCard";

const ServiceGrid = ({ services, cssDisplay }) => {
  const homeClassName = "grid grid-cols-1 lg:grid-cols-2 gap-5";

  return (
    <div className={`${cssDisplay === "hero" ? homeClassName : ""}`}>
      {services.map((service) => (
        <CustomerServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceGrid;
