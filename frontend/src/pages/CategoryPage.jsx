import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CategoryPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      setError("");

      try {
        const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${baseURL}/vendors?category=${encodeURIComponent(type)}`);

        if (!res.ok) {
          throw new Error("Failed to load category items");
        }

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Category load error:", err);
        setError("Unable to load items. Please try again.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [type]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-sm">←</button>
        <h1 className="text-2xl font-bold capitalize">{type}</h1>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading items...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 text-sm">No items found for this category.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/category/${type}/${item.id}`)}
              className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition"
            >
              <img
                src={item.imageUrl || item.image || "https://placehold.co/320x240"}
                alt={item.name}
                className="w-full h-24 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs text-gray-500">📍 {item.location}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">⭐ {item.rating}</span>
                <span className="text-xs text-gray-400">🕐 {item.deliveryTime}</span>
              </div>
              <p className="text-xs text-orange-500 mt-1">Delivery: ₦{item.deliveryFee}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
