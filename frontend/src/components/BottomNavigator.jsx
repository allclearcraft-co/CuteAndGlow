import { FaMagic } from "react-icons/fa";
import { IoIosCart, IoMdHome } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSolidShoppingBagAlt } from "react-icons/bi";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cartCount = useSelector((state) =>
    state.shopping.cartItems.reduce(
      (count, item) =>
        count + (item.itemType === "product" ? item.quantity || 1 : 1),
      0,
    ),
  );

  const items = [
    {
      label: "Cute & Glow",
      image:
        "https://ik.imagekit.io/cuteandglow/WhatsApp%20Image%202026-09-11%20at%208.26.34%20AM.jpeg",
      link: "https://cuteandglow.com",
      target: "blank",
    },
    {
      label: "Home",
      icon: <IoMdHome />,
      url: "/",
    },
    { label: "Services", icon: <FaMagic />, url: "/services/all" },
    {
      label: "E-Com",
      icon: <BiSolidShoppingBagAlt />,
      url: "/e-commerce",
    },
    { label: "Favorite", icon: <MdFavorite />, url: "/customer/favorite" },
    { label: "Cart", icon: <IoIosCart />, url: "/cart" },
  ];

  return (
    <div className="w-full lg:hidden fixed bottom-0 left-0 h-16 bg-neutral-100 grid grid-cols-6 place-items-center border-[0.1px] border-neutral-400">
      {items.map((item, index) => (
        <a
          href={item.link}
          target={item.target}
          key={item.label}
          type="button"
          aria-label={item.label}
          onClick={() => navigate(item.url)}
          className={`relative flex flex-col items-center justify-center w-full h-full text-sm ${index < items.length - 1 ? "border-r" : ""} ${pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url)) ? "bg-[#8B2954] text-white" : "bg-neutral-100"}`}
        >
          <span className="text-lg">{item.icon}</span>
          <img className="w-10" src={item.image} />
          {item.label}
          {item.label === "Cart" && cartCount > 0 && (
            <span className="absolute top-1 right-1/4 min-w-4 h-4 px-1 rounded-full bg-red-600 text-white text-[10px] leading-4">
              {cartCount}
            </span>
          )}
        </a>
      ))}
    </div>
  );
};

export default BottomNavigation;
