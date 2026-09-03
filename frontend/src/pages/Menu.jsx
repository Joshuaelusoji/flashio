import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── Skeletons ──────────────────────────────────────────
function CategorySkeleton() {
  return (
    <div className="grid grid-cols-4 gap-1">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1 py-3 p-3 rounded-md bg-gray-300 animate-pulse h-16" />
      ))}
    </div>
  );
}

function RestaurantSkeleton() {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-20 flex flex-col items-center gap-1">
          <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />
          <div className="w-14 h-2 rounded bg-gray-300 animate-pulse" />
          <div className="w-10 h-2 rounded bg-gray-300 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pt-2 pb-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 h-32 w-32 bg-gray-300 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}

function DrinkSkeleton() {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-36 h-36 bg-gray-300 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────
function Menu() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL;

        if (!baseURL) throw new Error("VITE_API_URL is not defined");

        const [categoriesRes, vendorsRes, featuredRes, drinksRes] = await Promise.all([
          fetch(`${baseURL}/categories`),
          fetch(`${baseURL}/vendors`),
          fetch(`${baseURL}/featured-meals`),
          fetch(`${baseURL}/drinks`),
        ]);

        if (!categoriesRes.ok || !vendorsRes.ok || !featuredRes.ok || !drinksRes.ok) {
          throw new Error("API request failed");
        }

        const [categoriesData, vendorsData, featuredData, drinksData] = await Promise.all([
          categoriesRes.json(),
          vendorsRes.json(),
          featuredRes.json(),
          drinksRes.json(),
        ]);

        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setVendors(Array.isArray(vendorsData) ? vendorsData : []);
        setFeatured(Array.isArray(featuredData) ? featuredData : []);
        setDrinks(Array.isArray(drinksData) ? drinksData : []);
      } catch (err) {
        console.error("DATA LOAD ERROR:", err);
        setCategories([]);
        setVendors([]);
        setFeatured([]);
        setDrinks([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-3 bg-[#F8F8F5] font-Manrope min-h-screen">
      <div className="w-16 mb-10">
        <h1 className="text-2xl text-black w-fit tracking-normal font-bold pb-1 rounded-br-xl">Menu</h1>
        {/* <div className="border-b-2 border-orange-500 w-100% rounded-xl rounded-br-full"></div> */}
      </div>
      

      {/* ================= CATEGORIES ================= */}
      <section className="mb-6">
        <h2 className="text-base text-black tracking-wide font-extrabold mb-1">Shop by Category</h2>
        {loading ? (
          <CategorySkeleton />
        ) : (
          <div className="rounded-md grid grid-cols-4 md:grid-cols-4 gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className={` gap-1 py-3 pl-2 rounded-md shadow-[0_4px_5px_hsl(60_5%_80%_/100%)] hover:shadow-md transition ${cat.color} ${cat.textColor}`}
              >
                <p className="text-xl max-w-fit">{cat.icon}</p>
                <p className="text-xs font-bold max-w-fit">{cat.name}</p>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ================= EXPLORE MORE ================= */}
      <section className="mb-3">
        <h2 className="text-base text-black tracking-wide font-extrabold">Explore More</h2>
        {loading ? (
          <RestaurantSkeleton />
        ) : (
          <div className="flex gap-5 overflow-x-auto scrollbar-hide py-2">
            {vendors.map((vendor) => (
              <div key={vendor.id} onClick={() => navigate(`/category/restaurants/${vendor.id}`)}
                className="px-3 flex flex-col flex-wrap flex-shrink-0 justify-center items-center cursor-pointer hover:-translate-y-1 hover:scale-105 transition duration-300 text-center"
              >
                <img src={vendor.imageId} alt={vendor.name} loading="lazy" className="w-12 h-12 border-2 border-orange-500 rounded-full object-cover mx-auto"/>
                <p className="text-[12px] text-black font-bold mt-1 break-words">{vendor.name}</p>
                <p className="text-[10px] text-gray-500 font-semibold ">{vendor.location}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= FEATURED ================= */}
      <section className="mb-6">
        <h2 className="text-base text-black tracking-wide font-extrabold">Featured</h2>
        {loading ? (
          <FeaturedSkeleton />
        ) : (
          <div className=" flex gap-2 overflow-x-auto rounded-md scrollbar-hide pt-3">
            {featured.map((item) => (
              <div key={item.id} onClick={() => navigate()}
                className="flex-shrink-0 h-32 w-32 bg-black border-t-2 border-orange-500 shadow-[0_4px_5px_hsl(60_5%_80%_/100%)] rounded-lg flex flex-wrap justify-center cursor-pointer hover:-translate-y-1 hover:scale-105 transition duration-300"
              >
                <img src={item.imageId} alt={item.name} loading="lazy" className="mt-2 h-12 w-full object-cover"
                />
                <div className="text-center text-[10px] w-full">
                  <h3 className=" text-white/90 font-bold break-words">{item.name}</h3>
                  <p className=" text-white/60 font-medium">{item.location}</p>
                  <p className="text-orange-500 text-xs font-bold ">₦{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= FAVOURITE ================= */}
      <section className="mb-6">
        <h2 className="text-base text-black font-bold tracking-wide mb-2">Favorite</h2>
        {loading ? (
          <DrinkSkeleton />
        ) : (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
            {drinks.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-36 bg-red-100 rounded-lg p-3 flex flex-col items-center cursor-pointer hover:-translate-y-1 hover:scale-105 transition duration-300"
              >
                <img
                  src={item.imageId}
                  alt={item.name}
                  loading="lazy"
                  className="h-16 w-16 object-cover rounded-full"
                />
                <div className="text-center mt-2">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <p className="text-orange-600 font-bold text-sm mt-1">₦{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Menu;