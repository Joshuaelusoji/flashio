import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Home, Search, ClipboardList, Phone, UserCircle } from "lucide-react";
import { BinocularsIcon, FaTags, IoTelescope, HeadsetIcon, IoHomeSharp, UserIcon, FaUser } from "../assets/icons/icon";

const DEFAULT_COLOR = "text-white"

const navItems = [
  { label: "Home",    icon: IoHomeSharp,          to: "/menu", color: DEFAULT_COLOR },
  { label: "Search",  icon: IoTelescope,        to: "/search", color: DEFAULT_COLOR },
  { label: "Orders",  icon: FaTags,             to: "/orders", color: DEFAULT_COLOR },
  { label: "Support", icon: HeadsetIcon,       to: "/contact", color: DEFAULT_COLOR },
  { label: "Profile", icon: FaUser,            to: "/profile", color: DEFAULT_COLOR }
];

export default function BottomNav() {
  const { cartCount } = useCart();

  return (
    <nav className="fixed bottom-1 left-0 right-0 mx-2 py-2 rounded-full shadow-[0_0_5px_hsl(20_50%_50%_/100%)] bg-black flex items-center justify-around z-[900]">
      {navItems.map(({ label, icon: Icon, to, color }) => (
        <NavLink
          key={to}
          to={to}
          className={`flex flex-col items-center justify-center gap-[1px] flex-1 h-full font-bold no-underline relative transition-colors`}
        >
          {({ isActive }) => (
            <>
              <span className="relative flex items-center justify-center">
                <Icon size={20} className={`${color}`} weight="fill" strokeWidth={1.8} />
                {label === "Orders" && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center px-[5px]">
                    {cartCount}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                )}
              </span>
              <span className={`text-[10px] ${DEFAULT_COLOR} font-semibold tracking-wide font-nunito`}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}