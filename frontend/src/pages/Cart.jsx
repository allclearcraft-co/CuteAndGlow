import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Button from "../components/Button";
import { removeFromCart } from "../redux/slice/shoppingSlice";

const Cart = () => {
  const items = useSelector((state) => state.shopping.cartItems);
  const { isAuthenticated, isAuthLoading, user } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canCheckout =
    isAuthenticated && user?.role?.toLowerCase() === "customer";

  const startCheckout = () => {
    if (!canCheckout) {
      navigate("/auth/login/customer", {
        state: { from: { pathname: "/cart" } },
      });
      return;
    }

    navigate("/cart/checkout");
  };

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 pb-24 lg:pb-10 min-h-[50vh]">
      <h1 className="heading text-3xl text-[#8B2954] mb-2">Your cart</h1>
      <p className="text-neutral-600 mb-8">
        {items.length
          ? `${items.length} service${items.length === 1 ? "" : "s"} saved`
          : "Your cart is empty. Add services to keep them here."}
      </p>

      {items.length ? (
        <>
          <div className="space-y-4">
            {items.map((service) => (
              <article
                key={service._id}
                className="flex flex-col sm:flex-row gap-4 border border-neutral-200 rounded-xl p-4"
              >
                <img
                  src={
                    service?.coverImage?.[0]?.url || "/images/placeholder.jpg"
                  }
                  alt={service.name}
                  className="w-full sm:w-36 h-36 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="heading text-xl">{service.name}</h2>
                  <p className="text-sm text-neutral-600">
                    {service?.store?.storeName || service?.professional?.name}
                  </p>
                  <p className="text-lg text-[#8B2954] mt-2">
                    ₹
                    {Number(
                      service?.charges || service?.price?.sellingPrice || 0,
                    ).toLocaleString("en-IN")}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button
                      LabelName="View service"
                      variant="secondary"
                      onClick={() =>
                        navigate(`/services/${service._id}/current-service`)
                      }
                    />
                    <Button
                      LabelName={
                        <span className="flex items-center gap-2">
                          <FaTrash /> Remove
                        </span>
                      }
                      variant="secondary"
                      onClick={() => dispatch(removeFromCart(service._id))}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 border-t border-neutral-200 pt-6">
            <p className="text-sm text-neutral-600 mb-4">
              Choose a date for each service and pay once for all services in
              your cart.
            </p>
            <Button
              LabelName={
                isAuthLoading ? "Checking sign-in..." : "Continue to booking"
              }
              className="w-full sm:w-auto"
              onClick={startCheckout}
              disabled={isAuthLoading}
            />
            {!canCheckout && (
              <p className="text-sm text-neutral-500 mt-3">
                You can add services without signing in. Customer login is
                required to continue to booking.
              </p>
            )}
          </div>
        </>
      ) : (
        <Button
          LabelName="Browse services"
          onClick={() => navigate("/services/all")}
        />
      )}
    </main>
  );
};

export default Cart;
