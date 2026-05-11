import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../pages/Menu";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 961) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "🏠 Home", path: "/home" },
    { label: "🍽️ Browse", path: "/browse" },
    { label: "🥤 Popular", path: "/popular" },
    { label: "🔥 Offers", path: "/offers" }
  ];

  return (
    <>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
          padding: 16px 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s;
        }

        .navbar-brand:hover {
          transform: scale(1.02);
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .brand-tag {
          font-size: 10px;
          font-weight: 700;
          color: #f59e0b;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0;
        }

        .navbar-center {
          flex: 1;
          display: flex;
          gap: 32px;
          justify-content: center;
        }

        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #666;
          transition: color 0.2s;
          padding: 8px 0;
          position: relative;
        }

        .nav-link:hover {
          color: #f59e0b;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #f59e0b;
          transition: width 0.3s;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f5f5f5;
          border: 1px solid #e0e0e0;
          border-radius: 20px;
          padding: 8px 14px;
          transition: all 0.2s;
        }

        .search-box:focus-within {
          background: #fff;
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        .search-box input {
          background: none;
          border: none;
          outline: none;
          font-size: 13px;
          width: 120px;
          color: #1a1a1a;
        }

        .search-box input::placeholder {
          color: #999;
        }

        .search-icon {
          font-size: 14px;
          color: #666;
        }

        .cart-btn {
          position: relative;
          background: #f5f5f5;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 20px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-btn:hover {
          background: #f59e0b;
          color: #fff;
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #dc2626;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
        }

        .menu-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          display: none;
          color: #1a1a1a;
          padding: 8px;
        }

        .menu-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 199;
        }

        .menu-overlay.active {
          display: block;
        }

        .mobile-menu {
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 280px;
          background: #fff;
          z-index: 200;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.3s;
          box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
        }

        .mobile-menu.active {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
        }

        .mobile-menu-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #1a1a1a;
          padding: 8px;
        }

        .mobile-menu-items {
          padding: 16px 0;
        }

        .mobile-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: none;
          border: none;
          width: 100%;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          color: #666;
          transition: all 0.2s;
        }

        .mobile-menu-item:hover {
          background: #f5f5f5;
          color: #f59e0b;
        }

        .mobile-menu-icon {
          font-size: 18px;
          min-width: 24px;
        }

        @media (min-width: 961px) {
            .mobile-menu {
              display: none !important;
            }
            .menu-overlay {
              display: none !important;
            }
          }

        @media (max-width: 960px) {
          .navbar-center {
            display: none;
          }

          .search-box {
            display: none;
          }

          .menu-btn {
            display: block;
          }
        }

        @media (max-width: 640px) {
          .navbar-container {
            padding: 0;
          }

          .navbar {
            padding: 12px 16px;
          }

          .brand-name {
            font-size: 18px;
          }

          .cart-btn {
            width: 36px;
            height: 36px;
            font-size: 18px;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-brand" onClick={() => navigate("/home")}>
            <div className="brand-icon">F</div>
            <div className="brand-text">
              <h1 className="brand-name">Flashio</h1>
              <p className="brand-tag">Delivery</p>
            </div>
          </div>

          {/* Center Menu */}
          <div className="navbar-center">
            <button className="nav-link" onClick={() => navigate("/home")}>
              🏠 Home
            </button>
            <button className="nav-link" onClick={() => navigate("/browse")}>
              🍽️ Browse
            </button>
            <button className="nav-link" onClick={() => navigate("/popular")}>
              🥤 Popular
            </button>
            
            <button className="nav-link" onClick={() => navigate("/offers")}>
            🔥 Offers
            </button>
          </div>

          

          {/* Right Section */}
          <div className="navbar-right">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input placeholder="Search restaurants or food..." />
            </div>
            <button className="cart-btn" onClick={() => navigate("/cart")}>
              🛒
              <span className="cart-badge">3</span>
            </button>
            <button className="menu-btn" onClick={() => setIsOpen(true)}>
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`menu-overlay ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(false)} />
      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <span style={{ fontSize: "16px", fontWeight: "700" }}>Menu</span>
          <button className="mobile-menu-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <div className="mobile-menu-items flex flex-col justify-between flex-1">
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <button
                key={item.path}
                className="mobile-menu-item"
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
              >
                <span className="mobile-menu-icon">{item.icon}</span>
                {item.label}
              </button>

            ))};
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition">
              Signup
            </button>
          </div>
          
          
        </div>
      </div>
    </>
  );
}
