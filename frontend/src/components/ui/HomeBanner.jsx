import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HomeBanner = ({ banners, autoPlay = true, interval = 4000 }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!autoPlay || banners.length <= 1) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length);
    }, interval);

    return () => clearInterval(timer);
  }, [active, banners.length, autoPlay, interval]);

  const next = () => setActive((prev) => (prev + 1) % banners.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + banners.length) % banners.length);

  if (!banners?.length) return null;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden group">
      <div className="relative aspect-[21/9] md:aspect-[3/1]">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={banners[active].image}
            alt={banners[active].title}
            onClick={() => navigate(banners[active].link)}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            initial={{ opacity: 0.4, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.4, scale: 1.05 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>

        <div
          className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent cursor-pointer"
          onClick={() => navigate(banners[active].link)}
        />

        <div
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white cursor-pointer"
          onClick={() => navigate(banners[active].link)}
        >
          <span className="text-xs md:text-sm uppercase tracking-widest opacity-90">
            {banners[active].subtitle}
          </span>

          <h2 className="heading text-2xl md:text-5xl max-w-xl mt-2">
            {banners[active].title}
          </h2>

          <p className="text-sm md:text-lg mt-3 max-w-lg opacity-90">
            {banners[active].description}
          </p>

          <button className="mt-5 bg-white text-[#8B2954] px-5 py-2 rounded-full w-fit font-semibold">
            Explore Now
          </button>
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={next}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
          >
            <FaChevronRight />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all ${
                  active === index ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeBanner;
