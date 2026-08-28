import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getUserOrders } from "../services/api";
import PageHeader from "../components/PageHeader";

const tabs = [
  { id: "cart", label: "MyCart" },
  { id: "ongoing", label: "Ongoing" },
  { id: "completed", label: "Completed" },
];

export default function UserOrders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("cart");
  const { cartItems, total, addToCart, removeFromCart, decreaseQty } = useCart();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const ongoingOrders = orders.filter((order) => order.status === "PENDING" || order.status === "IN_PROGRESS");
  const completedOrders = orders.filter((order) => order.status === "DELIVERED");

  const getOrderSummary = (order) => {
    const items = order.OrderItems || order.orderItems || [];
    const itemCount = items.length;
    const formattedTotal = new Intl.NumberFormat("en-NG").format(order.total_amount);
    return `${itemCount} item${itemCount === 1 ? "" : "s"} • ₦${formattedTotal}`;
  };

  const getCompletionDate = (order) => {
    if (!order.updatedAt) return "";
    return new Date(order.updatedAt).toLocaleDateString();
  };

  useEffect(() => {
    const loadOrders = async () => {
      setLoadingOrders(true);
      const result = await getUserOrders();
      setOrders(result.orders || []);
      setLoadingOrders(false);
    };

    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="max-w-xl mx-auto px-4 py-8">
        <PageHeader
          title="Orders"
          subtitle="MyCart, Ongoing and Completed orders in one place"
        />

        <div className="flex gap-2 overflow-x-auto rounded-3xl bg-white p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-[90px] rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          {activeTab === "cart" && (
            <>
              <h2 className="text-lg font-semibold text-gray-900">MyCart</h2>
              <p className="mt-2 text-sm text-gray-500">
                Review the items ready for checkout.
              </p>

              {cartItems.length === 0 ? (
                <div className="mt-8 rounded-3xl border border-dashed border-gray-200 p-8 text-center">
                  <p className="text-xl font-semibold text-gray-900">Cart is empty</p>
                  <p className="mt-2 text-sm text-gray-500">Add items to cart to start your order.</p>
                  <button
                    onClick={() => navigate("/menu")}
                    className="mt-6 rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    Add items to cart
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-gray-200 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="mt-1 text-sm text-gray-500">₦{item.price} each</p>
                        </div>
                        <p className="font-semibold text-gray-900">₦{item.price * item.qty}</p>
                      </div>
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="px-4 text-sm font-semibold text-gray-900">{item.qty}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-3xl border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between rounded-3xl bg-gray-50 p-4 text-sm font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₦{total}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (user) {
                        navigate("/checkout");
                      } else {
                        navigate("/login", { state: { from: "/checkout" } });
                      }
                    }}
                    className="w-full rounded-3xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    {user ? "Proceed to checkout" : "Login to checkout"}
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "ongoing" && (
            <>
              <h2 className="text-lg font-semibold text-gray-900">Ongoing</h2>
              <p className="mt-2 text-sm text-gray-500">
                Review orders that are currently in progress.
              </p>

              {loadingOrders ? (
                <div className="mt-8 rounded-3xl border border-gray-200 p-8 text-center text-sm text-gray-500">
                  Loading orders...
                </div>
              ) : ongoingOrders.length === 0 ? (
                <div className="mt-8 rounded-3xl border border-dashed border-gray-200 p-8 text-center">
                  <p className="text-xl font-semibold text-gray-900">Make your first order</p>
                  <p className="mt-2 text-sm text-gray-500">No active orders yet.</p>
                  <button
                    onClick={() => navigate("/menu")}
                    className="mt-6 rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    Order now
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {ongoingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-3xl border border-gray-200 p-4"
                    >
                      <p className="font-semibold text-gray-900">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{getOrderSummary(order)}</p>
                      <p className="mt-2 text-sm text-orange-600">{order.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "completed" && (
            <>
              <h2 className="text-lg font-semibold text-gray-900">Completed</h2>
              <p className="mt-2 text-sm text-gray-500">
                View the orders you have completed.
              </p>

              {loadingOrders ? (
                <div className="mt-8 rounded-3xl border border-gray-200 p-8 text-center text-sm text-gray-500">
                  Loading orders...
                </div>
              ) : completedOrders.length === 0 ? (
                <div className="mt-8 rounded-3xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
                  History empty
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {completedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-3xl border border-gray-200 p-4"
                    >
                      <p className="font-semibold text-gray-900">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{getOrderSummary(order)}</p>
                      <p className="mt-2 text-sm text-gray-600">Completed on {getCompletionDate(order)}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
