import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockCategories, mockRestaurants, mockFeatured, mockDrinks } from "../mocks/menuData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

function Menu() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // ── MOCK MODE ──
      if (USE_MOCK) {
        setCategories(mockCategories);
        setRestaurants(mockRestaurants);
        setFeatured(mockFeatured);
        setDrinks(mockDrinks);
        setLoading(false);
        return;
      }

      // ── REAL API ──
      try {
        const baseURL = import.meta.env.VITE_API_URL;

        if (!baseURL) {
          throw new Error("VITE_API_URL is not defined");
        }

        const [categoriesRes, restaurantsRes, featuredRes, drinksRes] = await Promise.all([
          fetch(`${baseURL}/categories`),
          fetch(`${baseURL}/restaurants`),
          fetch(`${baseURL}/featured-meals`),
          fetch(`${baseURL}/drinks`),
        ]);

        if (!categoriesRes.ok || !restaurantsRes.ok || !featuredRes.ok || !drinksRes.ok) {
          throw new Error("API request failed");
        }

        const categoriesData = await categoriesRes.json();
        const restaurantsData = await restaurantsRes.json();
        const featuredData = await featuredRes.json();
        const drinksData = await drinksRes.json();

        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setRestaurants(Array.isArray(restaurantsData) ? restaurantsData : []);
        setFeatured(Array.isArray(featuredData) ? featuredData : []);
        setDrinks(Array.isArray(drinksData) ? drinksData : []);
      } catch (err) {
        console.error("DATA LOAD ERROR:", err);
        setCategories([]);
        setRestaurants([]);
        setFeatured([]);
        setDrinks([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-3 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mt-12 mb-6">Menu</h1>

      {/* ================= CATEGORIES ================= */}
      <section className="mb-6">
        <h2 className="text-base font-bold mb-4">Browse Categories</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-4 gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(cat.path || "/")}
                className={`flex flex-col gap-1 py-3 p-3 rounded-md shadow-lg hover:shadow-md transition ${cat.color} ${cat.text} text-left`}
              >
                <p className="text-xs max-w-fit">{cat.icon}</p>
                <p className="text-xs font-medium -tracking-wide max-w-fit">{cat.name}</p>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ================= RESTAURANTS ================= */}
      <section className="mb-6">
        <h2 className="text-base font-semibold mb-2">Explore Restaurants</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
          {restaurants.map((res) => (
            <div
              key={res.id}
              onClick={() => navigate(`/category/restaurants/${res.id}`)}
              className="pt-1 flex-shrink-0 w-20 text-center cursor-pointer"
            >
              <img src={res.image} alt={res.name} loading="lazy" 
                className="w-14 h-14 rounded-full object-cover mx-auto"
              />
              <p className="text-xs mt-1 break-words">{res.name}</p>
              <p className="text-xs text-gray-500">📍 {res.location}</p>
            </div>
          ))}
        </div>
        )
        
        }
        
      </section>

      {/* ================= FEATURED ================= */}
      <section className="mb-6">
        <h2 className="text-base font-semibold mb-2">Featured Meals</h2>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pt-2 pb-2">
          {featured.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 h-32 w-32 bg-black rounded-lg p-3 flex flex-col items-center cursor-pointer hover:-translate-y-1 hover:scale-105 transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-10 w-10 object-cover rounded-full"
              />
              <div className="text-center">
                <h3 className="text-xs text-white/90 font-normal">{item.name}</h3>
                <p className="text-xs text-white/60">📍 {item.location}</p>
                <p className="text-orange-500 text-xs font-bold mt-1">₦{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DRINKS ================= */}
      <section className="mb-6">
        <h2 className="text-base font-semibold mb-2">Drinks</h2>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
          {drinks.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-36 bg-white rounded-lg p-3 flex flex-col items-center cursor-pointer hover:-translate-y-1 hover:scale-105 transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-16 w-16 object-cover rounded-full"
              />
              <div className="text-center mt-2">
                <h3 className="font-semibold text-sm">{item.name}</h3>
                <p className="text-xs text-gray-500">📍 {item.location}</p>
                <p className="text-orange-600 font-bold text-sm mt-1">₦{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Menu;