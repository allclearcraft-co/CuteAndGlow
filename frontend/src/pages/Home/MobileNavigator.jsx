import React, { useEffect, useState } from "react";
import { GiBodyBalance, GiDress } from "react-icons/gi";
import { FaHandSparkles, FaPaintBrush, FaRegStar } from "react-icons/fa";
import { PiHairDryerFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/Input";
import { BsGeoAlt, BsSearch } from "react-icons/bs";
import {
  GiLipstick,
  GiHairStrands,
  GiNails,
  GiRazor,
  GiMeditation,
  GiMirrorMirror,
} from "react-icons/gi";
import { FaSpa, FaEye } from "react-icons/fa";

const serviceTags = [
  {
    id: 1,
    tagName: "Bridal & Event Makeup",
    query: "Hair",
    icon: GiLipstick,
    image:
      "https://ik.imagekit.io/cuteandglow/ChatGPT%20Image%20Aug%2019,%202026,%2012_34_09%20PM.png",
  },
  {
    id: 2,
    tagName: "Hair Styling & Treatments",
    query: "Hair",
    icon: GiHairStrands,
    image:
      "https://ik.imagekit.io/cuteandglow/ChatGPT%20Image%20Aug%2019,%202026,%2012_46_27%20PM.png",
  },
  {
    id: 3,
    tagName: "Skin Care & Facials",
    query: "Skin",
    icon: FaSpa,
    image:
      "https://ik.imagekit.io/cuteandglow/ChatGPT%20Image%20Aug%2019,%202026,%2012_24_29%20PM.png",
  },
  {
    id: 4,
    tagName: "Hand & Feet Care",
    query: "Body",
    icon: GiNails,
    image:
      "https://ik.imagekit.io/cuteandglow/ChatGPT%20Image%20Aug%2019,%202026,%2012_31_30%20PM.png",
  },
  {
    id: 5,
    tagName: "Waxing & Hair Removal",
    query: "Nails",
    icon: GiRazor,
    image: "https://ik.imagekit.io/cuteandglow/ChatGPT%20Image%20Aug%2019,%202026,%2001_05_29%20PM.png",
  },
  {
    id: 6,
    tagName: "Eye & Brow Enhancements",
    query: "Makeup",
    icon: FaEye,
    image:
      "https://ik.imagekit.io/cuteandglow/ChatGPT%20Image%20Aug%2019,%202026,%2012_40_22%20PM.png",
  },
  {
    id: 7,
    tagName: "Body Wellness",
    query: "Bride",
    icon: GiMeditation,
    image:
      "https://ik.imagekit.io/cuteandglow/ChatGPT%20Image%20Aug%2019,%202026,%2012_43_17%20PM.png",
  },
  {
    id: 8,
    tagName: "Pre-Grooming Packages",
    query: "Bride",
    icon: GiMirrorMirror,
    image:
      "https://ik.imagekit.io/cuteandglow/ChatGPT%20Image%20Aug%2019,%202026,%2012_46_27%20PM.png",
  },
];

const MobileServiceTags = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState(sessionStorage.getItem("userCity") || "");
  const [locationMessage, setLocationMessage] = useState(
    "Detecting location...",
  );
  const [showManualInput, setShowManualInput] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [manualCity, setManualCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const saveLocation = (cityName, lat, lng) => {
    sessionStorage.setItem("userCity", cityName);
    sessionStorage.setItem("userLat", lat);
    sessionStorage.setItem("userLng", lng);

    setCity(cityName);
    setManualCity("");
    setSuggestions([]);
    setShowManualInput(false);
    setShowCityPicker(false);
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      const data = await res.json();

      const cityName =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county;

      if (cityName) {
        saveLocation(cityName, lat, lng);
      } else {
        setLocationMessage("Couldn't detect city.");
        setShowManualInput(true);
      }
    } catch (err) {
      setLocationMessage("Couldn't fetch location.");
      setShowManualInput(true);
    }
  };

  const detectLocation = () => {
    if (sessionStorage.getItem("userCity")) return;

    if (!navigator.geolocation) {
      setLocationMessage("Your browser doesn't support location.");
      setShowManualInput(true);
      return;
    }

    setLocationMessage("Allow location access to detect your city.");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        reverseGeocode(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationMessage(
              "Location permission denied. Enter your city manually.",
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setLocationMessage("Turn on your device's location services.");
            break;

          case error.TIMEOUT:
            setLocationMessage("Location request timed out.");
            break;

          default:
            setLocationMessage("Couldn't detect location.");
        }

        setShowManualInput(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    if (!city) detectLocation();
  }, []);

  useEffect(() => {
    if (manualCity.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
            manualCity,
          )}`,
        );

        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [manualCity]);

  return (
    <div className="w-full h-full px-4 py-4">
      {/* Location */}
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BsGeoAlt className="text-[#8B2954]" />
            <span className="font-medium text-gray-800 text-xs">
              {city || locationMessage}
            </span>
          </div>

          <button
            onClick={() => {
              setShowCityPicker((prev) => !prev);
              setShowManualInput(true);
            }}
            className="text-sm text-[#8B2954] font-medium"
          >
            {city ? "Change" : "Select"}
          </button>
        </div>

        {!city && (
          <button
            onClick={detectLocation}
            className="text-xs text-[#8B2954] mt-1 underline"
          >
            Use Current Location
          </button>
        )}

        {(showManualInput || showCityPicker) && (
          <div className="mt-3 relative">
            <InputBox
              type="text"
              placeholder="Search by pincode, city..."
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
            />

            {suggestions.length > 0 && (
              <div className="absolute z-20 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-52 overflow-auto">
                {suggestions.map((item) => (
                  <button
                    key={item.place_id}
                    onClick={() =>
                      saveLocation(
                        item.address?.city ||
                          item.address?.town ||
                          item.address?.village ||
                          item.display_name.split(",")[0],
                        item.lat,
                        item.lon,
                      )
                    }
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    {item.display_name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="w-full relative">
        <InputBox placeholder="Search your desired service here" type="text" />
        <BsSearch className="absolute top-6 right-5 text-neutral-700" />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-4 gap-y-4 border py-5 rounded-xl shadow-md border-neutral-200">
        {serviceTags.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                onClick={() => {
                  localStorage.setItem("homeClickedCategory", item.query);
                  navigate("/services/all");
                }}
                className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-md"
              >
                {/* <Icon className="text-3xl text-[#8B2954]" /> */}
                <img
                  src={item.image}
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="text-gray-600 text-center leading-4 text-xs">
                {item.tagName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileServiceTags;
