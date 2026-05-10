import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function RestaurantDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);

        // 👇 backend call (recommended)
        const res = await fetch(`${API}/restaurants/${slug}`);

        if (!res.ok) {
          throw new Error("Failed to fetch restaurant");
        }

        const data = await res.json();
        setRestaurant(data.restaurant || data);
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading restaurant...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate("/menu")}
          className="text-blue-600 mb-4"
        >
          ← Back
        </button>

        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="p-6">
        <button onClick={() => navigate("/menu")} className="text-blue-600">
          ← Back
        </button>
        <p>Restaurant not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-5">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-500 mt-1">📍 {restaurant.location}</p>
          <p className="text-sm text-gray-400 mt-2">
            {restaurant.description || "Great food, great experience."}
          </p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="mt-6 bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>

        {restaurant.menu?.length ? (
          <div className="grid md:grid-cols-2 gap-4">
            {restaurant.menu.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <p className="font-bold text-orange-600">
                  ₦{item.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No menu available yet.</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantDetails;