import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Home, Search, ClipboardList, Phone, UserCircle } from "lucide-react";

const navItems = [
  { label: "Home",    icon: Home,          to: "/menu" },
  { label: "Search",  icon: Search,        to: "/search" },
  { label: "Orders",  icon: ClipboardList, to: "/orders" },
  { label: "Contact", icon: Phone,         to: "/contact" },
  { label: "Profile", icon: UserCircle,    to: "/profile" },
];

export default function BottomNav() {
  const { cartCount } = useCart();

  return (
    <>
      <style>{`
        .bn-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: #ffffff;
          border-top: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 900;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.07);
        }

        .bn-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          flex: 1;
          height: 100%;
          text-decoration: none;
          color: #9ca3af;
          transition: color 0.2s;
          position: relative;
        }

        .bn-item:hover {
          color: #f59e0b;
        }

        .bn-item.active {
          color: #ea580c;
        }

        .bn-item.active .bn-icon-wrap::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ea580c;
        }

        .bn-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bn-badge {
          position: absolute;
          top: -6px;
          right: -10px;
          min-width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #f97316;
          color: white;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 5px;
        }

        .bn-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.02em;
          font-family: "Nunito", sans-serif;
        }
      `}</style>

      <nav className="bn-bar">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `bn-item${isActive ? " active" : ""}`}
          >
            <span className="bn-icon-wrap">
              <Icon size={22} strokeWidth={1.8} />
              {label === "Orders" && cartCount > 0 && (
                <span className="bn-badge">{cartCount}</span>
              )}
            </span>
            <span className="bn-label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}