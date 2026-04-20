import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/${orderId}`, // ✅ no extra /api
          {
            withCredentials: true,
          }
        );

        setOrder(res.data.order);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center mt-8">Loading order...</p>;
  if (!order) return <p className="text-center mt-8">Order not found</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Order Confirmed ✅
      </h2>

      <p className="mb-2">
        <strong>Order ID:</strong> {order.id}
      </p>

      <p className="mb-2">
        <strong>Amount Paid:</strong> ${order.total}
      </p>

      <p className="mb-2">
        <strong>Delivery Location:</strong> {order.deliveryAddress}
      </p>

      <p className="mb-4">
        <strong>Status:</strong> {order.status}
      </p>

      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full block text-center"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default OrderConfirmation;