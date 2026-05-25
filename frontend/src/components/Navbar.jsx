import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/menu");
  };

  const menuItems = [
    { label: "Menu", path: "/menu", icon: "🍽️" },
    { label: "Search", path: "/search", icon: "🔎" },
    { label: "Orders", path: "/orders", icon: "📦" },
    { label: "Contact", path: "/contact", icon: "☎️" },
  ];

  return (
    <nav className="sticky w-full top-0 z-[100] bg-[#605c5c] px-5 py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">

        {/* Right Section */}
        <div className="flex gap-4">

          {/* Search Box — hidden on mobile/tablet */}
          <div className=" md:flex items-center gap-2 bg-[#f5f5f5] rounded-[20px] px-[14px] py-2 focus-within:bg-white transition-colors">
            <span className="text-sm text-[#666]">🔍</span>
            <input
              className="bg-transparent border-none outline-none text-[13px] w-[120px] text-[#1a1a1a] placeholder:text-[#999]"
              placeholder="Search food or restaurants..."
            />
          </div>

          {/* Desktop auth — hidden on mobile */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-[13px] font-semibold text-[#1a1a1a]">
                  Hi, <span className="text-green-500">{user.firstName}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-transparent border-2 border-[#e0e0e0] text-[#666] text-[13px] font-bold px-4 py-[7px] rounded-[10px] cursor-pointer transition-all hover:border-red-600 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-transparent border-2 border-amber-400 text-amber-400 text-[13px] font-bold px-4 py-[7px] rounded-[10px] cursor-pointer transition-all hover:bg-amber-400 hover:text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-amber-400 border-2 border-amber-400 text-white text-[13px] font-bold px-4 py-[7px] rounded-[10px] cursor-pointer transition-all hover:bg-orange-600 hover:border-orange-600"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}