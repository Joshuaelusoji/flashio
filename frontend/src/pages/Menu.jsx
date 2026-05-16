import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
          fetch(`${baseURL}/categories`),
          fetch(`${baseURL}/restaurants`),
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
    { id: 1, name: "Jollof Rice & Chicken", price: 2500, location: "Surulere", image: "https://images.unsplash.com/photo-1603496987674-79600a000f55?q=80&w=985&auto=format&fit=crop" },
    { id: 2, name: "Amala & Ewedu", price: 1800, location: "Yaba", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=987&auto=format&fit=crop" },
    { id: 3, name: "Pounded Yam & Egusi", price: 3200, location: "Lekki", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=987&auto=format&fit=crop" },
    { id: 4, name: "Fried Rice & Turkey", price: 3000, location: "Ikeja", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=987&auto=format&fit=crop" },
    { id: 5, name: "Ofada Rice & Sauce", price: 2800, location: "Ojodu", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=987&auto=format&fit=crop" },
    { id: 6, name: "Peppered Snail", price: 4000, location: "Victoria Island", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=987&auto=format&fit=crop" },
    { id: 7, name: "Suya Special", price: 2200, location: "Gbagada", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=987&auto=format&fit=crop" },
    { id: 8, name: "Beans & Plantain", price: 1500, location: "Akoka", image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=987&auto=format&fit=crop" },
    { id: 9, name: "Burger & Fries", price: 3500, location: "Ikoyi", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop" },
    { id: 10, name: "Shawarma Combo", price: 2700, location: "Festac", image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?q=80&w=987&auto=format&fit=crop" },
  ];

  const drinks = [
    { id: 1, name: "Coca Cola", price: 500, location: "Everywhere", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1200&auto=format&fit=crop" },
    { id: 2, name: "Zobo Drink", price: 700, location: "Lagos", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop" },
    { id: 3, name: "Orange Juice", price: 1200, location: "Ikeja", image: "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?q=80&w=1200&auto=format&fit=crop" },
    { id: 4, name: "Milkshake", price: 1800, location: "Victoria Island", image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1200&auto=format&fit=crop" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Menu</h1>

      {/* ================= CATEGORIES ================= */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Browse Categories</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(cat.path || "/")}
                className={`p-4 rounded-lg shadow hover:shadow-md transition ${cat.color} ${cat.text} text-left`}
              >
                <p className="text-2xl">{cat.icon}</p>
                <p className="mt-2 font-medium">{cat.name}</p>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ================= RESTAURANTS ================= */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Explore Restaurants</h2>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {restaurants.map((res) => (
            <div
              key={res.id}
              onClick={() => navigate(res.path)}
              className="flex-shrink-0 w-20 text-center cursor-pointer"
            >
              <img
                src={res.image}
                alt={res.name}
                loading="lazy"
                className="w-14 h-14 rounded-full object-cover mx-auto"
              />
              <p className="text-xs mt-1 break-words">{res.name}</p>
              <p className="text-xs text-gray-500">📍 {res.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Featured Meals</h2>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
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
              <div className="text-center mt-2">
                <h3 className="text-xs text-white/90 font-medium">{item.name}</h3>
                <p className="text-xs text-white/60">📍 {item.location}</p>
                <p className="text-orange-500 text-xs font-bold mt-1">₦{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DRINKS ================= */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Drinks</h2>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
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