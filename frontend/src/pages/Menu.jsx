import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categoryTheme } from "../design/categoryTheme";

function Menu() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL;

        if (!baseURL) {
          throw new Error("VITE_API_URL is not defined");
        }

        const [categoriesRes, restaurantsRes] = await Promise.all([
          fetch(`${baseURL}/api/categories`),
          fetch(`${baseURL}/api/restaurants`),
        ]);

        if (!categoriesRes.ok || !restaurantsRes.ok) {
          throw new Error("API request failed");
        }

        const categoriesData = await categoriesRes.json();
        const restaurantsData = await restaurantsRes.json();

        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setRestaurants(Array.isArray(restaurantsData) ? restaurantsData : []);
      } catch (err) {
        console.error("DATA LOAD ERROR:", err);
        setCategories([]);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const featured = [
    {
      id: 1,
      name: "Jollof Rice & Chicken",
      price: 2500,
      location: "Surulere",
      image:
        "https://images.unsplash.com/photo-1603496987674-79600a000f55?q=80&w=985&auto=format&fit=crop",
    },
  ];

  const drinks = [
    {
      id: 1,
      name: "Coca Cola",
      price: 500,
      location: "Everywhere",
      image:
        "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Menu</h1>

      {/* ================= CATEGORIES ================= */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">
          Browse Categories
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const theme =
                categoryTheme?.[cat.theme] || categoryTheme?.orange || {
                  bg: "bg-gray-200",
                  text: "text-black",
                };

              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(cat.path || "/")}
                  className={`p-4 rounded-lg shadow ${theme.bg} ${theme.text}`}
                >
                  <p className="text-2xl">{cat.icon}</p>
                  <p className="mt-2 font-medium">{cat.name}</p>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= RESTAURANTS ================= */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Explore Restaurants
        </h2>

        <div className="flex gap-3 overflow-x-auto">
          {restaurants.map((res) => (
            <div key={res.id} className="text-center">
              <img
                src={res.image}
                alt={res.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <p className="text-xs">{res.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Featured</h2>

        <div className="flex gap-3 overflow-x-auto">
          {featured.map((item) => (
            <div key={item.id} className="p-3 bg-black text-white rounded">
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DRINKS ================= */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Drinks</h2>

        <div className="flex gap-3 overflow-x-auto">
          {drinks.map((item) => (
            <div key={item.id} className="p-3 bg-white rounded">
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Menu;