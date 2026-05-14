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
        const [categoriesRes, restaurantsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/categories`),
          fetch(`${import.meta.env.VITE_API_URL}/restaurants`),
        ]);

        const [categoriesData, restaurantsData] = await Promise.all([
          categoriesRes.json(),
          restaurantsRes.json(),
        ]);

        setCategories(categoriesData || []);
        setRestaurants(restaurantsData || []);
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

  /* ================= FEATURED MEALS ================= */
  const featured = [
    {
      id: 1,
      name: "Jollof Rice & Chicken",
      price: 2500,
      location: "Surulere",
      image:
        "https://images.unsplash.com/photo-1603496987674-79600a000f55?q=80&w=985&auto=format&fit=crop",
    },

    {
      id: 2,
      name: "Burger & Fries",
      price: 3000,
      location: "Lekki",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: 3,
      name: "Shawarma & Sides",
      price: 2500,
      location: "Yaba",
      image:
        "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=1470&auto=format&fit=crop",
    },

    {
      id: 4,
      name: "Pizza",
      price: 4000,
      location: "Lekki Phase 1",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1470&auto=format&fit=crop",
    },
  ];

  /* ================= DRINKS ================= */
  const drinks = [
    {
      id: 1,
      name: "Coca Cola",
      price: 500,
      location: "Everywhere",
      image:
        "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 2,
      name: "Zobo Drink",
      price: 700,
      location: "Lagos",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 3,
      name: "Orange Juice",
      price: 1200,
      location: "Ikeja",
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 4,
      name: "Milkshake",
      price: 1800,
      location: "Victoria Island",
      image:
        "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1200&auto=format&fit=crop",
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
          <p className="text-sm text-gray-500">
            Loading categories...
          </p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-gray-500">
            No categories found
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const theme =
                categoryTheme[cat.theme] || categoryTheme.orange;

              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(cat.path)}
                  className={`p-4 rounded-lg shadow hover:shadow-md transition ${theme.bg} ${theme.text} text-left`}
                >
                  <p className="text-2xl">{cat.icon}</p>

                  <p className="mt-2 font-medium">
                    {cat.name}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= RESTAURANTS ================= */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-4">
          Explore Restaurants
        </h2>

        <div className="flex md:grid gap-2 md:grid-cols-4 overflow-x-auto scrollbar-hide pb-4">
          {restaurants.map((res) => (
            <div
              key={res.id}
              className="rounded-lg flex flex-col items-center cursor-pointer flex-shrink-0 w-24 h-24 md:w-auto"
            >
              <img
                src={res.image}
                alt={res.name}
                loading="lazy"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="text-center">
                <h3 className="font-semibold text-xs">
                  {res.name}
                </h3>

                <p className="text-xs text-gray-500">
                  📍 {res.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED MEALS ================= */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Featured Meals
        </h2>

        <div className="flex md:grid gap-2 md:grid-cols-4 overflow-x-auto scrollbar-hide pb-2">
          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-black rounded-lg flex flex-col items-center shadow cursor-pointer transition hover:-translate-y-1 hover:scale-105 hover:shadow-xl duration-300 flex-shrink-0 w-32 h-36 md:w-auto p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-16 w-16 object-cover rounded-full"
              />

              <div className="text-center mt-2">
                <h3 className="text-xs text-white/90 font-medium">
                  {item.name}
                </h3>

                <p className="text-xs text-white/60">
                  📍 {item.location}
                </p>

                <p className="text-orange-500 text-xs font-bold mt-1">
                  ₦{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DRINKS ================= */}
      <section>
        <h2 className="text-lg font-semibold mb-2">
          Drinks
        </h2>

        <div className="flex md:grid gap-2 md:grid-cols-4 overflow-x-auto scrollbar-hide pb-2">
          {drinks.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg flex flex-col items-center shadow cursor-pointer transition hover:-translate-y-1 hover:scale-105 hover:shadow-xl duration-300 flex-shrink-0 w-36 h-40 md:w-auto p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-16 w-16 object-cover rounded-full"
              />

              <div className="text-center mt-2">
                <h3 className="font-semibold text-sm">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500">
                  📍 {item.location}
                </p>

                <p className="text-orange-600 font-bold text-sm mt-1">
                  ₦{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Menu;