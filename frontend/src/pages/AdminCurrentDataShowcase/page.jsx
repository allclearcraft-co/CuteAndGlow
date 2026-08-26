import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FetchData } from "../../utils/FetchFromApi";
import { useToast } from "../../components/hooks/ToastContext";
import ServiceDetailsSkeleton from "../CurrentService/CurrentServiceSkeleton";

import CurrentCustomer from "./CurrentCustomer";
import CurrentStore from "./CurrentStore";
import CurrentProfessional from "./CurrentProfessional";
import CurrentService from "./CurrentServices";
import CurrentSubscription from "./CurrentSubscription";
import CurrentAdmin from "./CurrentAdmin";
import CurrentBooking from "./CurrentBooking"
import { useSelector } from "react-redux";

const componentMap = {
  customer: CurrentCustomer,
  store: CurrentStore,
  professional: CurrentProfessional,
  service: CurrentService,
  subscription: CurrentSubscription,
  admin: CurrentAdmin,
  booking:CurrentBooking
};

const CurrentDataShowcase = () => {
  const { keyId, currentDataQuery } = useParams();
  const { alertError } = useToast();
  const user = useSelector((state) => state.auth.user);
  const adminId = user?._id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const CurrentComponent = componentMap[currentDataQuery];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await FetchData(
          `admin/get/data/current/${currentDataQuery}/${keyId}/${adminId}`,
          "get",
        );
        setData(response.data.data);
      } catch (err) {
        // alertError(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, keyId, adminId, currentDataQuery]);

  if (loading) return <ServiceDetailsSkeleton />;

  if (!CurrentComponent) return <div>Invalid page</div>;

  return <CurrentComponent data={data} onSaved={setData} />;
};

export default CurrentDataShowcase;
