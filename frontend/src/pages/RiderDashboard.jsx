// src/pages/RiderDashboard.jsx
import { useEffect, useState } from "react";
import { getRiderOrders } from "../services/api";

function RiderDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiderOrders = async () => {
      try {
        const res = await getRiderOrders();

        setOrders(res.orders || []);
      } catch (err) {
        console.error("Error fetching rider orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRiderOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading dashboard...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Rider Dashboard</h1>

      {orders.length === 0 ? (
        <p>No assigned orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 bg-white rounded shadow-md">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Delivery Address:</strong> {order.deliveryAddress}
              </p>
              <p>
                <strong>Total:</strong> ${order.total_amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RiderDashboard;