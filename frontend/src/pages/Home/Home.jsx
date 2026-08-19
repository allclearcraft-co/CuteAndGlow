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
import MobileServiceTags from "./MobileNavigator";
import HomeServiceSection from "./HomeServiceSection";
import HomeBanner from "../../components/ui/HomeBanner";
import { homeBanners } from "../../constants/constants";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = [
    { label: "Hair Styling & Treatments", search: "Hair" },
    { label: "Bridal & Event Makeup", search: "Makeup" },
    { label: "Skin Care & Facials", search: "Skin" },
    { label: "Hand & Feet Care", search: "Nails" },
    { label: "Waxing & Hair Removal", search: "Skin" },
    { label: "Eye & Brow Enhancements", search: "Eye" },
    { label: "Body Wellness", search: "Spa" },
    { label: "Pre-Grooming Packages", search: "Makeup" },
  ];
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    category: "",
    serviceFor: "",
    search: "",
    sortBy: "latest",
  });

  const getHomeServices = async () => {
    try {
      setLoading(true);

      const responses = await Promise.all(
        categories.map(async (category) => {
          const res = await FetchData(
            `services/get/service?category=${encodeURIComponent(category.search)}&limit=6`,
            "get",
          );

          return {
            label: category.label,
            services: res.data.data.services,
          };
        }),
      );

      const grouped = {};
      responses.forEach((item) => {
        grouped[item.label] = item.services;
      });

      setServicesByCategory(grouped);
      setData(grouped);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHomeServices();
  }, []);

  return (
    <div className="h-full pb-10 gap-10 flex flex-col">
      <div className="hidden lg:block h-screen">
        <Landing />
      </div>
      <div className="lg:hidden">
        <MobileServiceTags />
      </div>
      <div className="px-3 lg:px-10">
        <HomeBanner banners={homeBanners} />
      </div>
      <div className="flex flex-col justify-center items-center gap-5 px-2 w-full mt-10">
        <h1 className="font-medium text-3xl w-full text-center heading">
          Featured Services
        </h1>
        {loading ? (
          <LoadingSkeleton />
        ) : Object.keys(servicesByCategory).length === 0 ? (
          <EmptyState />
        ) : (
          <div className="px-4 lg:px-10 mt-10 flex flex-col gap-12 w-full">
            {categories.map((category) => (
              <HomeServiceSection
                key={category.label}
                title={category.label}
                services={servicesByCategory[category.label] || []}
              />
            ))}
          </div>
        )}
        <Button
          LabelName="Explore more services"
          onClick={() => navigate("/services/all")}
        />
      </div>
      {/* extras  */}
      <ServiceCard />
      <ChooseUs />
    </div>
  );
}

export default Home;
