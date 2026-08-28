import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function normalize(text) {
  return text?.toString().toLowerCase().trim();
}

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVendors = async () => {
      setLoading(true);
      setError("");

      try {
        const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${baseURL}/vendors?includeProducts=true`);

        if (!res.ok) {
          throw new Error("Failed to fetch vendors");
        }

        const data = await res.json();
        setVendors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Search load error:", err);
        setError("Unable to load search data.");
      } finally {
        setLoading(false);
      }
    };

    loadVendors();
  }, []);

  const allShops = useMemo(
    () =>
      vendors.map((vendor) => ({
        ...vendor,
        category: vendor.Category?.slug || "",
        menu: Array.isArray(vendor.Products)
          ? vendor.Products.map((product) => ({
              ...product,
              price: product.price,
              description: product.description,
            }))
          : [],
      })),
    [vendors]
  );

  const searchResults = useMemo(() => {
    if (!query) return { shops: [], items: [] };

    const normalized = normalize(query);

    const shops = allShops.filter(
      (shop) =>
        normalize(shop.name).includes(normalized) ||
        normalize(shop.location).includes(normalized) ||
        normalize(shop.description).includes(normalized)
    );

    const items = allShops
      .flatMap((shop) =>
        (shop.menu || []).map((item) => ({
          ...item,
          shopName: shop.name,
          shopId: shop.id,
          shopType: shop.category,
        }))
      )
      .filter(
        (item) =>
          normalize(item.name).includes(normalized) ||
          normalize(item.description).includes(normalized) ||
          normalize(item.shopName).includes(normalized)
      );

    return { shops, items };
  }, [query, allShops]);

  const handleAdd = (item) => {
    addToCart({
      id: `${item.shopId}-${item.name}`,
      name: item.name,
      price: Number(item.price),
    });
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl text-whitetext-2xl text-white w-fit tracking-normal font-bold mb-10 border-b-4 pb-1i border-b-orange-400 rounded-br-xl">Search</h1>
          <p className="mt-2 text-sm text-gray-500">
            Search restaurants, foods, drinks, and services across Flashio.
          </p>
        </div>

        <div className="mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for food, restaurants or services..."
            className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-orange-500 focus:outline-none"
          />
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Loading search data...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        ) : !query ? (
          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Quick search</h2>
              <p className="mt-2 text-sm text-gray-500">
                Try popular queries like "Jollof", "Pizza", "Drinks", or "Grocery".
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {allShops.slice(0, 4).map((shop) => (
                <button
                  key={shop.id + shop.category}
                  onClick={() => navigate(`/category/${shop.category}/${shop.id}`)}
                  className="rounded-3xl border border-gray-200 bg-white p-4 text-left shadow-sm hover:border-orange-300"
                >
                  <p className="font-semibold text-gray-900">{shop.name}</p>
                  <p className="mt-1 text-xs text-gray-500">{shop.location}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Shop results</h2>
              {searchResults.shops.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">No shops found.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {searchResults.shops.map((shop) => (
                    <button
                      key={shop.id + shop.category}
                      onClick={() => navigate(`/category/${shop.category}/${shop.id}`)}
                      className="w-full rounded-3xl border border-gray-200 p-4 text-left hover:border-orange-300"
                    >
                      <p className="font-semibold text-gray-900">{shop.name}</p>
                      <p className="text-sm text-gray-500">{shop.location}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Menu results</h2>
              {searchResults.items.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">No menu items found.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {searchResults.items.map((item) => (
                    <div key={`${item.shopId}-${item.id}`} className="rounded-3xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.shopName}</p>
                        </div>
                        <span className="text-orange-600 font-semibold">₦{item.price}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                      <button
                        onClick={() => handleAdd(item)}
                        className="mt-4 rounded-3xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                      >
                        Add to cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
