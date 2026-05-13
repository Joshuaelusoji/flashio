import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  // Section 1: Categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Section 2: Restaurants
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/restaurants`)
      .then(res => res.json())
      .then(setRestaurants)
      .catch(console.error);
  }, []);

  // Section 3: Featured food
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
      location: "Surulere",
      image:
        "https://images.unsplash.com/photo-1719282431723-9d0f4370d4bc?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Grills & Plantain",
      price: 3000,
      location: "Yaba",
      image:
        "https://images.unsplash.com/photo-1507835418932-dfcc1a16d393?q=80&w=2074&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Pizza",
      price: 2500,
      location: "Lekki",
      image:
        "https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?q=80&w=1480&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Amala & Ewedu",
      price: 2200,
      location: "Ibadan",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "Pounded Yam & Egusi",
      price: 3500,
      location: "Ikeja",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 8,
      name: "Fried Rice & Turkey",
      price: 3200,
      location: "Maryland",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 9,
      name: "Pepper Soup",
      price: 2800,
      location: "Ojodu",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 10,
      name: "Ofada Rice & Sauce",
      price: 3000,
      location: "Abeokuta",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 11,
      name: "Suya Platter",
      price: 2700,
      location: "Abuja",
      image:
        "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 12,
      name: "Small Chops Combo",
      price: 2300,
      location: "Festac",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1481&auto=format&fit=crop",
    },
    {
      id: 13,
      name: "Bole & Fish",
      price: 4000,
      location: "Port Harcourt",
      image:
        "https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 14,
      name: "Spaghetti & Meatballs",
      price: 2600,
      location: "Lekki",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 15,
      name: "Chicken Alfredo Pasta",
      price: 4500,
      location: "Victoria Island",
      image:
        "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 16,
      name: "Beans & Plantain",
      price: 1800,
      location: "Akure",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 17,
      name: "Yam Porridge",
      price: 2200,
      location: "Oshodi",
      image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 18,
      name: "Catfish Barbecue",
      price: 5000,
      location: "Asaba",
      image:
        "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 19,
      name: "Rice & Stew",
      price: 2000,
      location: "Agege",
      image:
        "https://images.unsplash.com/photo-1534939561126-855b8675edd7?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 20,
      name: "Moi Moi & Pap",
      price: 1500,
      location: "Ilorin",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 21,
      name: "Seafood Okra",
      price: 4800,
      location: "Victoria Island",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 22,
      name: "Chicken Wings & Fries",
      price: 3500,
      location: "Lekki Phase 1",
      image:
        "https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 23,
      name: "Nkwobi",
      price: 3400,
      location: "Enugu",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 24,
      name: "Semo & Vegetable Soup",
      price: 2600,
      location: "Benin",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 25,
      name: "Coconut Rice & Chicken",
      price: 3700,
      location: "Ajah",
      image:
        "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=1470&auto=format&fit=crop",
    },
  ];
  const drinks = [
    {
      id: 1,
      name: "Coca-Cola",
      price: 500,
      location: "Everywhere",
      image:
        "https://images.unsplash.com/photo-1592892111425-15e04305f961?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Zobo Drink",
      price: 700,
      location: "Local Markets",
      image:
        "https://images.unsplash.com/photo-1624517286326-62fc932dffca?q=80&w=1057&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        name: "Fanta",
        price: 500,
        location: "Everywhere",
        image:
          "https://images.unsplash.com/photo-1624517452488-04869289c4ca?q=80&w=1403&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        name: "Maltina",
        price: 700,
        location: "Everywhere",
        image:
          "https://images.unsplash.com/photo-1624517452488-04869289c4ca?q=80&w=1403&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        name: "Sprite",
        price: 500,
        location: "Everywhere",
        image:
          "https://images.unsplash.com/photo-1690988109041-458628590a9e?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    },
    {
        id: 6,
        name: "Amstel Malta",
        price: 700,
        location: "Everywhere",
        image:
          "https://images.unsplash.com/photo-1624517452488-04869289c4ca?q=80&w=1403&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 7,
        name: "Pepsi",
        price: 500,
        location: "Everywhere",
        image:
          "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    },
    {
        id: 8,
        name: "7-Up",
        price: 700,
        location: "Everywhere",
        image:
          "https://images.unsplash.com/photo-1624517286326-62fc932dffca?q=80&w=1057&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  
    }
  ];    

  return (
    
    <div className="p-6 bg-gray-100 min-h-screen">
        
      <h1 className="text-2xl font-bold mb-6">Menu</h1>

      {/* Section 1: Categories */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Browse Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
            <button
                key={cat.name}
                onClick={() => navigate(cat.path)}
                className={`p-4 rounded-lg shadow hover:shadow-md transition ${cat.color} text-left`}
            >
                <p className="text-2xl">{cat.icon}</p>
                <p className="mt-2 font-medium">{cat.name}</p>
            </button>
        ))}
    </div>
    </section>

      {/* Section 2: Explore Restaurants */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-4">
          Explore Restaurants
        </h2>
        <div className="flex md:grid gap-2 md:grid-cols-4 overflow-x-auto scrollbar-hide pb-4">
          {restaurants.map((res) => (
            <div
              key={res.id}
              onClick={() => navigate(res.path)}
              className="rounded-lg justify-evenly flex flex-col items-center cursor-pointer transition flex-shrink-0 w-24 h-24 md:w-auto"
            >
              <img
                src={res.image}
                alt={res.name}
                className="w-12 h-12 rounded-full object-cover block flex-shrink-0"
              />

              <div className="text-center min-w-0">
                <h3 className="font-semibold text-xs break-words">{res.name}</h3>
                <p className="text-xs text-gray-500">📍 {res.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Featured Food */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Featured Meals
        </h2>

        <div className="flex md:grid gap-2 md:grid-cols-4 overflow-x-auto scrollbar-hide pb-2">
          {featured.map((item) => (
            <div
              key={item.id}
              className={`bg-black rounded-lg flex flex-col justify-evenly items-center shadow cursor-pointer hover:shadow-md transition flex-shrink-0 w-32 h-32 md:w-auto
                ${item.stock === 0 ? "opacity-60 cursor-not-allowed" : ""}
              `}
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 block object-cover rounded-full"
              />

              {/* Out of stock overlay */}
              {item.stock === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase shadow">
                    Out of Stock
                  </span>
                </div>
              )}

              <div className="">
                <h3 className="font-light text-xs text-white/80 w-30 tracking-tighter">{item.name}</h3>
            
                <p className="text-xs text-white/80">
                 {item.location}
                </p>
            
                <p className="text-orange-600 text-xs font-bold ">
                  ₦{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">
          Drinks
        </h2>
        <div className="flex md:grid gap-2 md:grid-cols-4 overflow-x-auto scrollbar-hide pb-2">
          {drinks.map((item) => (
            <div
              key={item.id}
              className="bg-white/0 rounded-lg flex flex-col justify-evenly items-center cursor-pointer transition flex-shrink-0 w-36 h-36 md:w-auto"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 block object-cover rounded-full"
              />
              <div className="">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  📍 {item.location}
                </p>
                <p className="text-orange-600 font-bold">
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