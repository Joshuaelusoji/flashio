import { useParams, useNavigate } from "react-router-dom";
import { mockRestaurants, mockShops, mockMall, mockLocal, mockPharmacy, mockLaundromat } from "../mocks/menuData";

const dataMap = {
  restaurants: mockRestaurants,
  shops: mockShops,
  mall: mockMall,
  local: mockLocal,
  pharmacy: mockPharmacy,
  laundromat: mockLaundromat,
  
};

function CategoryPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const items = dataMap[type] || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-500 text-sm">←</button>
        <h1 className="text-2xl font-bold capitalize">{type}</h1>
      </div>

      {/* Items grid */}
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">No items found for this category.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id}onClick={() => navigate(`/category/${type}/${item.id}`)}
              className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition"
          >
              <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs text-gray-500">📍 {item.location}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">⭐ {item.rating}</span>
                <span className="text-xs text-gray-400">🕐 {item.deliveryTime}</span>
              </div>
              <p className="text-xs text-orange-500 mt-1">Delivery: ₦{item.deliveryFee}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;