
import { useState } from "react";
import { Heart, Star, Clock, MapPin, ShoppingBag } from "lucide-react";

const featuredMeals = [
  {
    id: 1,
    name: "Jollof Rice & Grilled Chicken",
    restaurant: "Mama's Kitchen",
    price: 4500,
    rating: 4.8,
    deliveryTime: "25–35 min",
    location: "Ikeja",
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80",
    category: "Popular",
  },
  {
    id: 2,
    name: "Spicy Chicken Burger",
    restaurant: "Burger House",
    price: 5500,
    rating: 4.7,
    deliveryTime: "20–30 min",
    location: "Yaba",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    category: "Trending",
  },
  {
    id: 3,
    name: "Creamy Chicken Pasta",
    restaurant: "The Pasta Spot",
    price: 6000,
    rating: 4.9,
    deliveryTime: "30–40 min",
    location: "Lekki",
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80",
    category: "Chef's Pick",
  },
  {
    id: 4,
    name: "Beef Suya & Fries",
    restaurant: "Suya Central",
    price: 5000,
    rating: 4.6,
    deliveryTime: "20–30 min",
    location: "Surulere",
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80",
    category: "Popular",
  },
  {
    id: 5,
    name: "Fried Rice & Chicken",
    restaurant: "Food Palace",
    price: 4200,
    rating: 4.7,
    deliveryTime: "25–35 min",
    location: "Victoria Island",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    category: "Popular",
  },
  {
    id: 6,
    name: "Loaded Chicken Shawarma",
    restaurant: "Shawarma Spot",
    price: 3500,
    rating: 4.8,
    deliveryTime: "15–25 min",
    location: "Maryland",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80",
    category: "Trending",
  },
];

const filters = ["All", "Popular", "Trending", "Chef's Pick"];

function FeaturedMeals() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const filteredMeals =
    activeFilter === "All"
      ? featuredMeals
      : featuredMeals.filter((meal) => meal.category === activeFilter);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#F8F8F5]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-950">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -bottom-40 left-20 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
              ✦ Handpicked for you
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Featured
              <span className="text-amber-400"> Meals</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
              Discover delicious meals from some of the best restaurants around
              you. Fresh food, great prices, and fast delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              Today's selection
            </p>

            <h2 className="mt-1 text-2xl font-bold text-neutral-900 sm:text-3xl">
              Meals you should try
            </h2>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? "bg-neutral-900 text-white"
                    : "bg-white text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Meals */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMeals.map((meal) => (
            <article
              key={meal.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-neutral-800 shadow-sm">
                  {meal.category}
                </span>

                {/* Favorite */}
                <button
                  onClick={() => toggleFavorite(meal.id)}
                  aria-label={`Favorite ${meal.name}`}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-neutral-700 shadow-sm transition hover:scale-105"
                >
                  <Heart
                    size={19}
                    className={
                      favorites.includes(meal.id)
                        ? "fill-red-500 text-red-500"
                        : ""
                    }
                  />
                </button>
              </div>

              {/* Details */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-neutral-900">
                      {meal.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {meal.restaurant}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-neutral-800">
                    <Star
                      size={15}
                      className="fill-amber-400 text-amber-400"
                    />
                    {meal.rating}
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {meal.deliveryTime}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {meal.location}
                  </span>
                </div>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                  <div>
                    <span className="text-xs text-neutral-400">From</span>
                    <p className="text-lg font-extrabold text-neutral-900">
                      ₦{meal.price.toLocaleString()}
                    </p>
                  </div>

                  <button className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-neutral-950 transition hover:bg-amber-300 active:scale-95">
                    <ShoppingBag size={16} />
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredMeals.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg font-semibold text-neutral-800">
              No meals found
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Try selecting another category.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default FeaturedMeals;
