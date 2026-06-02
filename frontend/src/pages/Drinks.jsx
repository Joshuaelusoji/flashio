import { useState, useEffect } from "react";
import { mockDrinks } from "../mocks/menuData";

function DrinkSkeleton() {
	return (
		<div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="flex-shrink-0 w-36 h-36 bg-gray-300 animate-pulse rounded-lg" />
			))}
		</div>
	);
}

function Drinks() {
	const [drinks, setDrinks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			try {
				const baseURL = import.meta.env.VITE_API_URL;

				if (baseURL) {
					const res = await fetch(`${baseURL}/drinks`);
					if (!res.ok) throw new Error("drinks fetch failed");
					const data = await res.json();
					setDrinks(Array.isArray(data) ? data : mockDrinks);
				} else {
					setDrinks(mockDrinks);
				}
			} catch (err) {
				console.error("Drinks load error:", err);
				setDrinks(mockDrinks);
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	return (
		<div className="p-3 bg-gray-200 min-h-screen">
			<h1 className="text-2xl font-bold mt-12 mb-6">Drinks</h1>

			<section className="mb-6">
				<h2 className="text-base font-semibold mb-2">Drinks</h2>
				{loading ? (
					<DrinkSkeleton />
				) : (
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
									{item.location && <p className="text-xs text-gray-500">📍 {item.location}</p>}
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

export default Drinks;

