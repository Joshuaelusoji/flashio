import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Home, Search, ClipboardList, Phone, UserCircle } from "lucide-react";
import { BinocularsIcon } from "../assets/icons/icon";

const navItems = [
  { label: "Home",    icon: Home,          to: "/menu" },
  { label: "Search",  icon: BinocularsIcon,        to: "/search" },
  { label: "Orders",  icon: ClipboardList, to: "/orders" },
  { label: "Contact", icon: Phone,         to: "/contact" },
  { label: "Profile", icon: UserCircle,    to: "/profile" },
];

export default function BottomNav() {
  const { cartCount } = useCart();

  return (
    <nav className="fixed bottom-1 left-0 right-0 mx-4 p-1 rounded-full bg-white border-2 border-double border-x-lime-500 flex items-center justify-around z-[900] shadow-[0_-4px_20px_rgba(0,0,0,0.07)]">
      {navItems.map(({ label, icon: Icon, to }) => (
        <NavLink
          key={to}
          to={to}
          className="flex flex-col items-center justify-center gap-[1px] flex-1 h-full text-black font-bold no-underline relative transition-colors"
        >
          {({ isActive }) => (
            <>
              <span className="relative flex items-center justify-center">
                <Icon size={22} strokeWidth={1.8} />
                {label === "Orders" && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center px-[5px]">
                    {cartCount}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                )}
              </span>
              <span className="text-[10px] font-semibold tracking-wide font-nunito">
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}