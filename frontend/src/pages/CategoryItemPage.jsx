import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function CategoryItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading } = useAuth();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [loadingItem, setLoadingItem] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItem = async () => {
      setLoadingItem(true);
      setError("");

      try {
        const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${baseURL}/vendors/${encodeURIComponent(id)}`);

        if (!res.ok) {
          throw new Error("Failed to load item details");
        }

        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error("Category item load error:", err);
        setError("Unable to load item details. Please try again.");
      } finally {
        setLoadingItem(false);
      }
    };

    loadItem();
  }, [id]);

  const handleAddToCart = (menuItem) => {
    if (loading) return;

    addToCart({
      id: `${menuItem.id}-${item?.id}`,
      name: menuItem.name,
      price: Number(menuItem.price),
    });
  };

  if (loadingItem) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading item...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="p-6">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-sm">
          ← Back
        </button>
        <p className="mt-4 text-red-500">{error || "Item not found."}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-sm">
          ← Back
        </button>
      </div>

      <div className="bg-white p-6 mb-4">
        <img
          src={item.imageUrl || item.image || "https://placehold.co/400x240"}
          alt={item.name}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />

        <h1 className="text-2xl font-bold">{item.name}</h1>
        <p className="text-gray-500 text-sm mt-1">📍 {item.location}</p>
        <p className="text-gray-400 text-sm mt-1">{item.description}</p>

        <div className="flex gap-4 mt-3">
          <span className="text-sm text-gray-500">⭐ {item.rating}</span>
          <span className="text-sm text-gray-500">🕐 {item.deliveryTime}</span>
          <span className="text-sm text-orange-500">Delivery: ₦{item.deliveryFee}</span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>

        <div className="flex flex-col gap-4">
          {(item.Products || []).map((menuItem) => (
            <div key={menuItem.id} className="bg-white rounded-xl p-4 flex gap-4 items-center">
              <img
                src={menuItem.imageUrl || "https://placehold.co/80x80"}
                alt={menuItem.name}
                className="w-16 h-16 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-sm">{menuItem.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{menuItem.description}</p>
                <p className="text-orange-500 font-bold text-sm mt-1">₦{menuItem.price}</p>
              </div>

              <button onClick={() => handleAddToCart(menuItem)} className="bg-orange-500 text-white text-xs px-3 py-2 rounded-lg">
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryItemPage;
