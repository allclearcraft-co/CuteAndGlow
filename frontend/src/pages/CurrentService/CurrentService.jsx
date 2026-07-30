import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../../utils/FetchFromApi";

const CurrentService = () => {
  const { serviceId } = useParams();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState();

  const getServiceById = async () => {
    try {
      setLoading(true);
      const response = await FetchData(
        `services/get/service/by-id/${serviceId}`,
        "get",
      );
      console.log(response.data.data);
      setService(response.data.data);
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServiceById();
  }, [serviceId]);

  return (
    <div>
      <h1>{serviceId}</h1>
      {/* {loading ? (
        <LoadingSkeleton />
      ) : services.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div></div>
        </>
      )} */}
    </div>
  );
};

export default CurrentService;
