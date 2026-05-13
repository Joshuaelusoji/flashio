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
        const [categoriesRes, restaurantsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/categories`),
          fetch(`${import.meta.env.VITE_API_URL}/restaurants`),
        ]);

        const [categoriesData, restaurantsData] = await Promise.all([
          categoriesRes.json(),
          restaurantsRes.json(),
        ]);

        setCategories(categoriesData);
        setRestaurants(restaurantsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const featured = [/* unchanged */];
  const drinks = [/* unchanged */];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Menu</h1>

      {/* Categories */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Browse Categories</h2>

        {!loading && categories.length === 0 ? (
          <p className="text-sm text-gray-500">No categories found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id || cat.name}
                onClick={() => navigate(cat.path)}
                className={`p-4 rounded-lg shadow hover:shadow-md transition ${cat.color} text-left`}
              >
                <p className="text-2xl">{cat.icon}</p>
                <p className="mt-2 font-medium">{cat.name}</p>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Restaurants */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-4">Explore Restaurants</h2>

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
                <h3 className="font-semibold text-xs">{res.name}</h3>
                <p className="text-xs text-gray-500">📍 {res.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Meals */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Featured Meals</h2>

        <div className="flex md:grid gap-2 md:grid-cols-4 overflow-x-auto scrollbar-hide pb-2">
          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-black rounded-lg flex flex-col items-center shadow cursor-pointer transition flex-shrink-0 w-32 h-32 md:w-auto"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-16 w-16 object-cover rounded-full"
              />

              <div>
                <h3 className="text-xs text-white/80">{item.name}</h3>
                <p className="text-xs text-white/60">{item.location}</p>
                <p className="text-orange-600 text-xs font-bold">
                  ₦{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Drinks */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Drinks</h2>

        <div className="flex md:grid gap-2 md:grid-cols-4 overflow-x-auto scrollbar-hide pb-2">
          {drinks.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center flex-shrink-0 w-36 md:w-auto"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-16 w-16 object-cover rounded-full"
              />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.location}</p>
              <p className="text-orange-600 font-bold">₦{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Menu;