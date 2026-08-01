import React from "react";
import Landing from "./Landing";
import ServiceCard from "./ServiceCard";
import ChooseUs from "./ChooseUs";
import ServiceGrid from "../Services/components/ServiceGrid";
import { services } from "../../constants/service";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import BookingServiceCard from "../../components/ui/StoreServiceCard";
import { FetchData } from "../../utils/FetchFromApi";
import { useEffect } from "react";
import { useState } from "react";
import EmptyState from "../Services/components/EmptyState";
import LoadingSkeleton from "../Services/components/LoadingSkeleton";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    category: "",
    serviceFor: "",
    search: "",
    sortBy: "latest",
  });

  const getBookingServices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      const response = await FetchData(
        `services/get/service?${params.toString()}`,
        "get",
      );
      console.log(response);
      setData(response.data.data.services);
      // setPagination(response.data.data.pagination);
    } catch (err) {
      console.log(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingServices();
  }, [filters]);

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
        {loading ? (
          <LoadingSkeleton />
        ) : data.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ServiceGrid services={data} />
          </>
        )}
        {/* <ServiceGrid services={data} /> */}
        <Button
          LabelName="Explore More"
          onClick={() => navigate("/services/all")}
        />
      </div>
    </div>
  );
}

export default Home;
