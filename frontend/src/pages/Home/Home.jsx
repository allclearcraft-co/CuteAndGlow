import React from "react";
import Landing from "./Landing";
import ServiceCard from "./ServiceCard";
import ChooseUs from "./ChooseUs";
import ServiceGrid from "../Services/ServiceGrid";
import { services } from "../../constants/service";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import BookingServiceCard from "../../components/ui/StoreServiceCard";
import { FetchData } from "../../utils/FetchFromApi";
import { useEffect } from "react";
import { useState } from "react";

function Home() {
  const demoService = services.slice(2, services.length);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getBookingServices = async () => {
    try {
      const response = await FetchData(
        `services/get/service/all-service/${"heroSection"}/${6}`,
        "get",
      );
      console.log(response);
      setData(response.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getBookingServices();
  }, []);

  return (
    <div className="h-full pb-10 flex flex-col gap-10 relative">
      <Landing />
      <ServiceCard />
      <ChooseUs />
      {/* remove this below section when not needed */}
      <div className="flex flex-col justify-center items-center gap-5 px-2 w-full">
        <h1 className="font-medium text-3xl w-full text-center heading">
          Explore Our Services
        </h1>
        <ServiceGrid services={data} cssDisplay="hero" />
        <Button
          LabelName="Explore More"
          onClick={() => navigate("/services/all")}
        />
      </div>
    </div>
  );
}

export default Home;
