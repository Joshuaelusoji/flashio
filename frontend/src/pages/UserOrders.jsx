import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

// ─────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const OPTS = { credentials: "include" };

const formatNGN = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);

// ─────────────────────────────────────────────
//  HOOKS
// ─────────────────────────────────────────────
function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/products`, OPTS)
      .then((r) => { if (!r.ok) throw new Error("Failed to load menu"); return r.json(); })
      .then((data) => setProducts(data.products || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

function useCart() {
  const [cart, setCart] = useState([]);

  const add = useCallback((product) => {
    setCart((prev) => {
      const hit = prev.find((i) => i.id === product.id);
      return hit
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id) => {
    setCart((prev) => {
      const hit = prev.find((i) => i.id === id);
      if (!hit) return prev;
      return hit.qty === 1 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i));
    });
  }, []);

  const clear = useCallback(() => setCart([]), []);
  const qty = (id) => cart.find((i) => i.id === id)?.qty || 0;
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalAmount = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return { cart, add, remove, clear, qty, totalItems, totalAmount };
}

// ─────────────────────────────────────────────
//  STATUS BADGE
// ─────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    PENDING:     "status-pending",
    IN_PROGRESS: "status-progress",
    DELIVERED:   "status-delivered",
    CANCELLED:   "status-cancelled",
  };
  return (
    <span className={`status-badge ${map[status] || "status-default"}`}>
      {status.replace("_", " ")}
    </span>
  );
}

// ─────────────────────────────────────────────
//  QTY CONTROL
// ─────────────────────────────────────────────
function QtyControl({ qty, onAdd, onRemove, product }) {
  if (qty === 0)
    return (
      <button onClick={() => onAdd(product)} className="add-btn">
        <span>+</span> Add
      </button>
    );
  return (
    <div className="qty-control">
      <button onClick={() => onRemove(product.id)} className="qty-btn">−</button>
      <span className="qty-num">{qty}</span>
      <button onClick={() => onAdd(product)} className="qty-btn">+</button>
    </div>
  );
}

// ─────────────────────────────────────────────
//  PRODUCT CARD
// ─────────────────────────────────────────────
function ProductCard({ product, qty, onAdd, onRemove, index }) {
  const [loaded, setLoaded] = useState(false);
  const unavailable = !product.isAvailable || product.stock === 0;

  return (
    <div className="product-card" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="card-image">
        {!loaded && <div className="img-skeleton" />}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onLoad={() => setLoaded(true)}
            className={`card-img ${loaded ? "loaded" : ""}`}
          />
        ) : (
          <div className="img-placeholder">🍽️</div>
        )}
        {unavailable && (
          <div className="sold-out-overlay">
            <span className="sold-out-tag">Sold Out</span>
          </div>
        )}
        {!unavailable && product.stock > 0 && product.stock <= 5 && (
          <div className="stock-badge low">Only {product.stock} left</div>
        )}
        {!unavailable && product.stock > 5 && (
          <div className="stock-badge avail">Available</div>
        )}
        <div className="card-gradient" />
      </div>

      <div className="card-body">
        <h3 className="card-name">{product.name}</h3>
        <p className="card-desc">{product.description || "Freshly prepared."}</p>
        <div className="card-footer">
          <span className="card-price">{formatNGN(product.price)}</span>
          {!unavailable && <QtyControl qty={qty} onAdd={onAdd} onRemove={onRemove} product={product} />}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skel-img" />
      <div className="skel-body">
        <div className="skel-line w75" />
        <div className="skel-line w100" />
        <div className="skel-line w50" />
        <div className="skel-footer">
          <div className="skel-line w40" />
          <div className="skel-btn-placeholder" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  CART DRAWER
// ─────────────────────────────────────────────
function CartDrawer({ cart, totalAmount, onAdd, onRemove, onClose, onCheckout, placing }) {
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="cart-drawer">
        <div className="drawer-header">
          <div>
            <h2 className="drawer-title">Your Order</h2>
            <p className="drawer-sub">{cart.length} item{cart.length !== 1 ? "s" : ""} in cart</p>
          </div>
          <button onClick={onClose} className="drawer-close">✕</button>
        </div>

        <div className="drawer-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <p className="empty-title">Cart is empty</p>
              <p className="empty-sub">Add some delicious items!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                {item.imageUrl
                  ? <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                  : <div className="cart-item-img placeholder">🍽️</div>
                }
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">{formatNGN(item.price * item.qty)}</p>
                </div>
                <div className="cart-item-qty">
                  <button onClick={() => onRemove(item.id)} className="ciq-btn">−</button>
                  <span className="ciq-num">{item.qty}</span>
                  <button onClick={() => onAdd(item)} className="ciq-btn">+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-total">
              <span className="total-label">Total</span>
              <span className="total-amount">{formatNGN(totalAmount)}</span>
            </div>
            <button onClick={onCheckout} disabled={placing} className="checkout-btn">
              {placing ? "Placing order…" : "Checkout →"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

// ─────────────────────────────────────────────
//  ORDERS TAB
// ─────────────────────────────────────────────
function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/orders/my-orders`, OPTS)
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="orders-skeletons">
        {[...Array(3)].map((_, i) => <div key={i} className="order-skeleton" />)}
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="empty-orders">
        <div className="empty-orders-icon">📦</div>
        <p className="empty-orders-title">No orders yet</p>
        <p className="empty-orders-sub">Start ordering your favourite dishes!</p>
      </div>
    );

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-top">
            <div>
              <p className="order-id">#{order.id.slice(-8).toUpperCase()}</p>
              <p className="order-date">
                {new Date(order.createdAt).toLocaleDateString("en-NG", {
                  day: "numeric", month: "short", year: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })}
              </p>
            </div>
            <StatusBadge status={order.status} />
          </div>
          <div className="order-bottom">
            <span className="order-items-count">{order.OrderItems?.length || 0} item{order.OrderItems?.length !== 1 ? "s" : ""}</span>
            <span className="order-total">{formatNGN(order.total_amount)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  CONTACT TAB
// ─────────────────────────────────────────────
function ContactTab() {
  return (
    <div className="contact-tab">
      <div className="contact-hero">
        <div className="contact-icon-wrap">📞</div>
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-sub">We're here to help you 24/7</p>
      </div>
      <div className="contact-cards">
        {[
          { icon: "📍", label: "Address", value: "12 Marina Road, Lagos Island, Lagos" },
          { icon: "📱", label: "Phone", value: "+234 800 123 4567" },
          { icon: "✉️", label: "Email", value: "support@flashio.ng" },
          { icon: "⏰", label: "Hours", value: "Mon–Sun: 8:00am – 11:00pm" },
        ].map((c) => (
          <div key={c.label} className="contact-card">
            <span className="contact-card-icon">{c.icon}</span>
            <div>
              <p className="contact-card-label">{c.label}</p>
              <p className="contact-card-value">{c.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  PROFILE TAB
// ─────────────────────────────────────────────
function ProfileTab({ onLogout }) {
  return (
    <div className="profile-tab">
      <div className="profile-hero">
        <div className="avatar">
          <span className="avatar-text">U</span>
          <div className="avatar-ring" />
        </div>
        <h2 className="profile-name">User</h2>
        <p className="profile-email">user@flashio.ng</p>
        <div className="profile-badge">⭐ Regular Customer</div>
      </div>

      <div className="profile-menu">
        {[
          { icon: "🧾", label: "Order History", sub: "View all past orders" },
          { icon: "📍", label: "Saved Addresses", sub: "Manage delivery addresses" },
          { icon: "💳", label: "Payment Methods", sub: "Cards & wallets" },
          { icon: "🔔", label: "Notifications", sub: "Manage preferences" },
          { icon: "🔒", label: "Privacy & Security", sub: "Password and security" },
          { icon: "❓", label: "Help & Support", sub: "FAQs and chat support" },
        ].map((item) => (
          <button key={item.label} className="profile-menu-item">
            <span className="pmi-icon">{item.icon}</span>
            <div className="pmi-text">
              <span className="pmi-label">{item.label}</span>
              <span className="pmi-sub">{item.sub}</span>
            </div>
            <span className="pmi-arrow">›</span>
          </button>
        ))}
      </div>

      <button onClick={onLogout} className="logout-btn">
        <span>Sign Out</span>
        <span>→</span>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SEARCH TAB
// ─────────────────────────────────────────────
function SearchTab({ products, onAdd, onRemove, qty }) {
  const [query, setQuery] = useState("");
  const results = query.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase()) ||
        p.category?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="search-tab">
      <div className="search-box-wrap">
        <span className="search-icon-static">🔍</span>
        <input
          type="text"
          autoFocus
          placeholder="Search dishes, categories…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input-lg"
        />
        {query && <button onClick={() => setQuery("")} className="search-clear">✕</button>}
      </div>

      {query.length <= 1 && (
        <div className="search-hints">
          <p className="hints-label">Popular Searches</p>
          <div className="hints-chips">
            {["Rice", "Chicken", "Soup", "Dessert", "Drinks", "Pasta"].map((h) => (
              <button key={h} onClick={() => setQuery(h)} className="hint-chip">{h}</button>
            ))}
          </div>
        </div>
      )}

      {query.length > 1 && results.length === 0 && (
        <div className="search-empty">
          <div className="se-icon">🍽️</div>
          <p className="se-title">No results for "{query}"</p>
          <p className="se-sub">Try a different keyword</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="search-results">
          <p className="sr-count">{results.length} result{results.length !== 1 ? "s" : ""}</p>
          <div className="product-grid">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} qty={qty(p.id)} onAdd={onAdd} onRemove={onRemove} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────
export default function UserOrders() {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const { cart, add, remove, clear, qty, totalItems, totalAmount } = useCart();

  const [tab, setTab] = useState("home");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setPlacing(true);
    try {
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: cart.map((i) => ({ productId: i.id, quantity: i.qty, price: i.price })),
          total: totalAmount,
        }),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || "Order failed"); }
      const data = await res.json();
      clear();
      setCartOpen(false);
      navigate(`/checkout`, { state: { orderId: data.order.id, deliveryCode: data.deliveryCode, total: totalAmount } });
    } catch (e) {
      showToast(e.message || "Could not place order", "error");
    } finally {
      setPlacing(false);
    }
  };

  const handleLogout = async () => {
    await fetch(`${API}/api/auth/logout`, { method: "POST", credentials: "include" });
    navigate("/login");
  };

  return (
    <div className="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Nunito:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #0F0D0B;
          --surface:   #1A1612;
          --surface2:  #231E19;
          --surface3:  #2C2520;
          --amber:     #F59E0B;
          --amber2:    #D97706;
          --amber-dim: rgba(245,158,11,0.15);
          --orange:    #EA580C;
          --green:     #22C55E;
          --red:       #EF4444;
          --blue:      #3B82F6;
          --text:      #F5F0EB;
          --text2:     #A89880;
          --text3:     #6B5B4D;
          --border:    rgba(245,158,11,0.12);
          --border2:   rgba(255,255,255,0.06);
          --radius:    16px;
          --radius-sm: 10px;
          --shadow:    0 8px 32px rgba(0,0,0,0.5);
          --font-head: 'Syne', sans-serif;
          --font-body: 'Nunito', sans-serif;
        }

        .app-root {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ─── TOP NAVBAR ─── */
        .top-nav {
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(15,13,11,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          padding: 0 20px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          text-decoration: none;
        }
        .logo-icon {
          width: 38px; height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--amber), var(--amber2));
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-head);
          font-weight: 800; font-size: 18px; color: #0F0D0B;
          box-shadow: 0 4px 16px rgba(245,158,11,0.35);
          flex-shrink: 0;
        }
        .logo-text { display: flex; flex-direction: column; line-height: 1; }
        .logo-brand {
          font-family: var(--font-head);
          font-weight: 800; font-size: 17px; color: var(--text);
          letter-spacing: -0.02em;
        }
        .logo-tag {
          font-size: 9px; font-weight: 700;
          color: var(--amber);
          letter-spacing: 0.15em; text-transform: uppercase;
        }

        .nav-right { display: flex; align-items: center; gap: 8px; }

        .nav-delivery-info {
          display: flex; align-items: center; gap: 8px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 6px 14px;
          cursor: pointer;
        }
        .nav-delivery-info span:first-child { font-size: 14px; }
        .nav-delivery-text { display: flex; flex-direction: column; line-height: 1.1; }
        .nav-delivery-label { font-size: 9px; color: var(--text3); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
        .nav-delivery-city { font-size: 12px; color: var(--text); font-weight: 700; }

        .nav-cart-btn {
          position: relative;
          width: 42px; height: 42px;
          border-radius: 12px;
          background: var(--surface2);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--text2);
          cursor: pointer; transition: all 0.2s;
          font-size: 0;
        }
        .nav-cart-btn:hover { background: var(--amber-dim); border-color: var(--amber); color: var(--amber); }
        .nav-cart-btn.has-items { background: var(--amber-dim); border-color: var(--amber); color: var(--amber); }
        .cart-count {
          position: absolute;
          top: -5px; right: -5px;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: var(--amber);
          color: #0F0D0B;
          font-size: 10px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid var(--bg);
          animation: pop 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes pop { from { transform: scale(0); } to { transform: scale(1); } }

        .nav-promo-bar {
          background: linear-gradient(90deg, var(--amber2), var(--amber), var(--orange));
          padding: 6px 20px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-size: 11px; font-weight: 700; color: #0F0D0B;
          letter-spacing: 0.04em;
        }
        .promo-pill {
          background: rgba(0,0,0,0.2);
          border-radius: 50px;
          padding: 2px 10px;
          font-size: 10px;
        }

        /* ─── MAIN CONTENT ─── */
        .main-content {
          flex: 1;
          overflow-y: auto;
          padding: 0 0 80px;
        }

        /* ─── HOME / MENU ─── */
        .home-tab {
          animation: fadeUp 0.35s ease both;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }

        .hero-section {
          padding: 28px 20px 0;
          position: relative;
        }
        .hero-greeting { font-size: 13px; color: var(--amber); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
        .hero-heading {
          font-family: var(--font-head);
          font-size: clamp(26px, 6vw, 36px);
          font-weight: 800;
          line-height: 1.1;
          color: var(--text);
          margin-bottom: 4px;
        }
        .hero-heading em { color: var(--amber); font-style: normal; }
        .hero-sub { font-size: 13px; color: var(--text2); font-weight: 500; margin-bottom: 20px; }

        .hero-stats {
          display: flex; gap: 12px; margin-bottom: 24px;
        }
        .stat-chip {
          display: flex; align-items: center; gap: 6px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 6px 12px;
          font-size: 12px; font-weight: 700; color: var(--text2);
        }
        .stat-chip span:first-child { font-size: 14px; }

        /* ─── FEATURED BANNER ─── */
        .featured-banner {
          margin: 0 20px 24px;
          border-radius: 20px;
          background: linear-gradient(135deg, #1A0F00, #2D1A00);
          border: 1px solid rgba(245,158,11,0.25);
          padding: 20px;
          display: flex; align-items: center; justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .featured-banner::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 80% 50%, rgba(245,158,11,0.12) 0%, transparent 70%);
        }
        .fb-text { position: relative; z-index: 1; }
        .fb-tag { font-size: 10px; font-weight: 800; color: var(--amber); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px; }
        .fb-heading { font-family: var(--font-head); font-size: 20px; font-weight: 800; color: var(--text); line-height: 1.2; margin-bottom: 8px; }
        .fb-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--amber);
          color: #0F0D0B;
          font-size: 12px; font-weight: 800;
          padding: 7px 16px; border-radius: 50px;
          border: none; cursor: pointer; transition: all 0.2s;
        }
        .fb-btn:hover { background: var(--amber2); transform: translateX(2px); }
        .fb-emoji { font-size: 52px; position: relative; z-index: 1; }

        /* ─── CATEGORIES ─── */
        .section-pad { padding: 0 20px; }
        .section-label {
          font-family: var(--font-head);
          font-size: 16px; font-weight: 700; color: var(--text);
          margin-bottom: 14px;
        }
        .cats-scroll {
          display: flex; gap: 10px;
          overflow-x: auto;
          padding: 2px 20px 8px;
          margin: 0 -20px;
          scrollbar-width: none;
        }
        .cats-scroll::-webkit-scrollbar { display: none; }
        .cat-chip {
          flex-shrink: 0;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 10px 16px;
          border-radius: var(--radius);
          background: var(--surface2);
          border: 1.5px solid var(--border2);
          color: var(--text2);
          font-size: 11px; font-weight: 700;
          cursor: pointer; transition: all 0.2s;
          min-width: 64px;
        }
        .cat-chip .cat-emoji { font-size: 20px; }
        .cat-chip:hover { border-color: var(--amber); color: var(--amber); background: var(--amber-dim); }
        .cat-chip.active {
          background: var(--amber);
          border-color: var(--amber);
          color: #0F0D0B;
          box-shadow: 0 4px 16px rgba(245,158,11,0.3);
        }

        /* ─── SEARCH BAR (inline in menu) ─── */
        .menu-search {
          display: flex; align-items: center; gap: 10px;
          background: var(--surface2);
          border: 1.5px solid var(--border2);
          border-radius: 14px;
          padding: 11px 16px;
          margin: 0 20px 20px;
          transition: border-color 0.2s;
        }
        .menu-search:focus-within { border-color: var(--amber); }
        .ms-icon { font-size: 16px; flex-shrink: 0; }
        .menu-search input {
          flex: 1; background: none; border: none; outline: none;
          color: var(--text); font-family: var(--font-body);
          font-size: 13px; font-weight: 500;
        }
        .menu-search input::placeholder { color: var(--text3); }

        /* ─── PRODUCT GRID ─── */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 14px;
          padding: 0 20px 16px;
        }

        .product-card {
          background: var(--surface);
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--border2);
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          animation: fadeUp 0.4s ease both;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-6px);
          border-color: rgba(245,158,11,0.3);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.15);
        }
        .card-image {
          position: relative; height: 150px;
          background: var(--surface2); overflow: hidden;
        }
        .card-img { width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.3s, transform 0.5s; }
        .card-img.loaded { opacity: 1; }
        .product-card:hover .card-img { transform: scale(1.07); }
        .img-skeleton { position: absolute; inset: 0; background: linear-gradient(90deg, var(--surface2) 25%, var(--surface3) 50%, var(--surface2) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
        @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        .img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 44px; }
        .card-gradient { position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(transparent, rgba(15,13,11,0.7)); }
        .sold-out-overlay { position: absolute; inset: 0; background: rgba(15,13,11,0.75); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; }
        .sold-out-tag { background: var(--surface3); color: var(--text2); font-size: 10px; font-weight: 800; padding: 5px 12px; border-radius: 50px; letter-spacing: 0.1em; text-transform: uppercase; }
        .stock-badge { position: absolute; top: 8px; right: 8px; font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 50px; letter-spacing: 0.06em; text-transform: uppercase; }
        .stock-badge.low { background: rgba(239,68,68,0.9); color: #fff; }
        .stock-badge.avail { background: rgba(34,197,94,0.85); color: #fff; }
        .card-body { padding: 12px; }
        .card-name { font-family: var(--font-head); font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .card-desc { font-size: 11px; color: var(--text3); line-height: 1.5; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 33px; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border2); padding-top: 10px; }
        .card-price { font-family: var(--font-head); font-size: 14px; font-weight: 800; color: var(--amber); }

        .add-btn {
          display: flex; align-items: center; gap: 4px;
          background: var(--amber);
          color: #0F0D0B;
          font-size: 11px; font-weight: 800;
          padding: 5px 11px; border-radius: 8px;
          border: none; cursor: pointer; transition: all 0.15s;
        }
        .add-btn:hover { background: var(--amber2); transform: scale(1.05); }
        .qty-control { display: flex; align-items: center; gap: 6px; background: var(--amber-dim); border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; padding: 4px 8px; }
        .qty-btn { background: none; border: none; color: var(--amber); font-size: 15px; font-weight: 800; cursor: pointer; width: 18px; display: flex; align-items: center; justify-content: center; }
        .qty-num { font-size: 12px; font-weight: 800; color: var(--amber); min-width: 14px; text-align: center; }

        /* ─── SKELETON ─── */
        .skeleton-card { background: var(--surface); border-radius: 18px; overflow: hidden; border: 1px solid var(--border2); }
        .skel-img { height: 150px; background: linear-gradient(90deg, var(--surface2) 25%, var(--surface3) 50%, var(--surface2) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
        .skel-body { padding: 12px; }
        .skel-line { height: 10px; border-radius: 6px; background: var(--surface3); margin-bottom: 8px; animation: shimmer 1.4s infinite; background-size: 200% 100%; }
        .w100 { width: 100%; } .w75 { width: 75%; } .w50 { width: 50%; } .w40 { width: 40%; }
        .skel-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 8px; border-top: 1px solid var(--border2); }
        .skel-btn-placeholder { width: 56px; height: 26px; background: var(--surface3); border-radius: 8px; animation: shimmer 1.4s infinite; background-size: 200% 100%; }

        /* ─── GRID META ─── */
        .grid-meta { display: flex; align-items: center; justify-content: space-between; padding: 0 20px 12px; }
        .grid-count { font-size: 12px; color: var(--text2); font-weight: 600; }

        /* ─── EMPTY / ERROR ─── */
        .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 24px; text-align: center; }
        .empty-state-icon { font-size: 56px; margin-bottom: 16px; }
        .empty-state-title { font-family: var(--font-head); font-size: 20px; font-weight: 800; color: var(--text); margin-bottom: 6px; }
        .empty-state-sub { font-size: 13px; color: var(--text2); margin-bottom: 20px; }
        .clear-btn { background: var(--amber); color: #0F0D0B; font-weight: 800; font-size: 13px; padding: 10px 22px; border-radius: 12px; border: none; cursor: pointer; }
        .error-box { margin: 20px; padding: 16px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: var(--radius); text-align: center; }
        .error-text { color: #FCA5A5; font-size: 13px; font-weight: 600; }
        .retry-btn { color: var(--red); font-size: 12px; font-weight: 700; background: none; border: none; cursor: pointer; text-decoration: underline; margin-top: 8px; display: block; margin-left: auto; margin-right: auto; }

        /* ─── ORDERS ─── */
        .orders-tab { padding: 24px 20px; animation: fadeUp 0.35s ease both; }
        .tab-heading { font-family: var(--font-head); font-size: 24px; font-weight: 800; color: var(--text); margin-bottom: 4px; }
        .tab-sub { font-size: 13px; color: var(--text2); margin-bottom: 24px; }
        .orders-list { display: flex; flex-direction: column; gap: 12px; }
        .order-card {
          background: var(--surface);
          border: 1px solid var(--border2);
          border-radius: var(--radius);
          padding: 16px;
          transition: all 0.2s;
          animation: fadeUp 0.4s ease both;
        }
        .order-card:hover { border-color: rgba(245,158,11,0.25); transform: translateX(4px); }
        .order-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
        .order-id { font-family: var(--font-head); font-size: 14px; font-weight: 800; color: var(--text); }
        .order-date { font-size: 11px; color: var(--text3); margin-top: 3px; font-weight: 600; }
        .order-bottom { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--border2); }
        .order-items-count { font-size: 12px; color: var(--text2); font-weight: 600; }
        .order-total { font-family: var(--font-head); font-size: 15px; font-weight: 800; color: var(--amber); }
        .orders-skeletons { display: flex; flex-direction: column; gap: 12px; }
        .order-skeleton { height: 96px; background: linear-gradient(90deg, var(--surface) 25%, var(--surface2) 50%, var(--surface) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: var(--radius); }
        .empty-orders { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; text-align: center; }
        .empty-orders-icon { font-size: 52px; margin-bottom: 16px; }
        .empty-orders-title { font-family: var(--font-head); font-size: 20px; font-weight: 800; color: var(--text); margin-bottom: 6px; }
        .empty-orders-sub { font-size: 13px; color: var(--text2); }

        /* STATUS BADGES */
        .status-badge { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 50px; letter-spacing: 0.06em; text-transform: uppercase; flex-shrink: 0; }
        .status-pending  { background: rgba(245,158,11,0.15); color: var(--amber); border: 1px solid rgba(245,158,11,0.3); }
        .status-progress { background: rgba(59,130,246,0.15); color: #93C5FD; border: 1px solid rgba(59,130,246,0.3); }
        .status-delivered{ background: rgba(34,197,94,0.15); color: #86EFAC; border: 1px solid rgba(34,197,94,0.3); }
        .status-cancelled{ background: rgba(239,68,68,0.15); color: #FCA5A5; border: 1px solid rgba(239,68,68,0.3); }
        .status-default  { background: var(--surface2); color: var(--text2); border: 1px solid var(--border); }

        /* ─── SEARCH TAB ─── */
        .search-tab { padding: 20px; animation: fadeUp 0.3s ease both; }
        .search-box-wrap { display: flex; align-items: center; gap: 10px; background: var(--surface2); border: 1.5px solid var(--amber); border-radius: 14px; padding: 12px 16px; margin-bottom: 24px; }
        .search-icon-static { font-size: 16px; }
        .search-input-lg { flex: 1; background: none; border: none; outline: none; color: var(--text); font-family: var(--font-body); font-size: 15px; font-weight: 500; }
        .search-input-lg::placeholder { color: var(--text3); }
        .search-clear { background: none; border: none; color: var(--text2); cursor: pointer; font-size: 14px; }
        .search-hints {}
        .hints-label { font-size: 11px; font-weight: 800; color: var(--text3); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; }
        .hints-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .hint-chip { background: var(--surface2); border: 1px solid var(--border2); border-radius: 50px; padding: 7px 16px; font-size: 13px; font-weight: 700; color: var(--text2); cursor: pointer; transition: all 0.2s; }
        .hint-chip:hover { border-color: var(--amber); color: var(--amber); background: var(--amber-dim); }
        .search-results .sr-count { font-size: 12px; color: var(--text2); font-weight: 600; margin-bottom: 14px; padding: 0; }
        .search-results .product-grid { padding: 0; }
        .search-empty { display: flex; flex-direction: column; align-items: center; padding: 48px 0; text-align: center; }
        .se-icon { font-size: 48px; margin-bottom: 12px; }
        .se-title { font-family: var(--font-head); font-size: 17px; font-weight: 800; color: var(--text); margin-bottom: 4px; }
        .se-sub { font-size: 13px; color: var(--text2); }

        /* ─── CONTACT TAB ─── */
        .contact-tab { padding: 24px 20px; animation: fadeUp 0.35s ease both; }
        .contact-hero { display: flex; flex-direction: column; align-items: center; text-align: center; padding-bottom: 28px; border-bottom: 1px solid var(--border2); margin-bottom: 24px; }
        .contact-icon-wrap { font-size: 48px; margin-bottom: 12px; }
        .contact-title { font-family: var(--font-head); font-size: 24px; font-weight: 800; color: var(--text); margin-bottom: 6px; }
        .contact-sub { font-size: 13px; color: var(--text2); }
        .contact-cards { display: flex; flex-direction: column; gap: 12px; }
        .contact-card { display: flex; align-items: center; gap: 14px; background: var(--surface); border: 1px solid var(--border2); border-radius: var(--radius); padding: 16px; transition: all 0.2s; }
        .contact-card:hover { border-color: rgba(245,158,11,0.25); }
        .contact-card-icon { font-size: 26px; flex-shrink: 0; }
        .contact-card-label { font-size: 10px; font-weight: 800; color: var(--text3); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 3px; }
        .contact-card-value { font-size: 14px; font-weight: 700; color: var(--text); }

        /* ─── PROFILE TAB ─── */
        .profile-tab { padding: 24px 20px; animation: fadeUp 0.35s ease both; }
        .profile-hero { display: flex; flex-direction: column; align-items: center; text-align: center; padding-bottom: 28px; border-bottom: 1px solid var(--border2); margin-bottom: 24px; }
        .avatar { position: relative; width: 80px; height: 80px; margin-bottom: 14px; }
        .avatar-text { width: 80px; height: 80px; border-radius: 24px; background: linear-gradient(135deg, var(--amber), var(--amber2)); display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-size: 32px; font-weight: 800; color: #0F0D0B; position: relative; z-index: 1; }
        .avatar-ring { position: absolute; inset: -4px; border-radius: 28px; border: 2px dashed rgba(245,158,11,0.4); animation: spin 12s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .profile-name { font-family: var(--font-head); font-size: 22px; font-weight: 800; color: var(--text); margin-bottom: 4px; }
        .profile-email { font-size: 13px; color: var(--text2); margin-bottom: 12px; }
        .profile-badge { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.3); border-radius: 50px; padding: 5px 14px; font-size: 12px; font-weight: 700; color: var(--amber); }
        .profile-menu { display: flex; flex-direction: column; gap: 2px; margin-bottom: 24px; }
        .profile-menu-item { display: flex; align-items: center; gap: 14px; background: none; border: none; border-radius: var(--radius-sm); padding: 14px 12px; cursor: pointer; transition: background 0.15s; width: 100%; text-align: left; }
        .profile-menu-item:hover { background: var(--surface); }
        .pmi-icon { font-size: 22px; flex-shrink: 0; width: 36px; text-align: center; }
        .pmi-text { flex: 1; }
        .pmi-label { font-size: 14px; font-weight: 700; color: var(--text); display: block; }
        .pmi-sub { font-size: 11px; color: var(--text3); display: block; margin-top: 1px; }
        .pmi-arrow { font-size: 20px; color: var(--text3); }
        .logout-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: var(--radius); color: #FCA5A5; font-size: 14px; font-weight: 800; cursor: pointer; transition: all 0.2s; }
        .logout-btn:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.4); }

        /* ─── CART DRAWER ─── */
        .drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(6px); z-index: 50; }
        .cart-drawer {
          position: fixed; right: 0; top: 0; bottom: 0; width: min(380px, 100vw);
          background: var(--surface);
          border-left: 1px solid var(--border);
          z-index: 51;
          display: flex; flex-direction: column;
          animation: slideIn 0.28s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 20px; border-bottom: 1px solid var(--border2); }
        .drawer-title { font-family: var(--font-head); font-size: 18px; font-weight: 800; color: var(--text); }
        .drawer-sub { font-size: 12px; color: var(--text2); margin-top: 2px; }
        .drawer-close { width: 36px; height: 36px; border-radius: 10px; background: var(--surface2); border: 1px solid var(--border2); color: var(--text2); cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .drawer-close:hover { color: var(--text); background: var(--surface3); }
        .drawer-items { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
        .empty-cart { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; gap: 8px; }
        .empty-icon { font-size: 48px; }
        .empty-title { font-family: var(--font-head); font-size: 16px; font-weight: 800; color: var(--text); }
        .empty-sub { font-size: 13px; color: var(--text2); }
        .cart-item { display: flex; align-items: center; gap: 12px; background: var(--surface2); border: 1px solid var(--border2); border-radius: 14px; padding: 12px; transition: border-color 0.15s; }
        .cart-item:hover { border-color: rgba(245,158,11,0.2); }
        .cart-item-img { width: 52px; height: 52px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
        .cart-item-img.placeholder { background: var(--surface3); display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .cart-item-info { flex: 1; min-width: 0; }
        .cart-item-name { font-size: 13px; font-weight: 700; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cart-item-price { font-size: 12px; font-weight: 800; color: var(--amber); margin-top: 3px; }
        .cart-item-qty { display: flex; align-items: center; gap: 8px; background: var(--surface3); border-radius: 10px; padding: 5px 8px; }
        .ciq-btn { background: none; border: none; color: var(--text2); font-size: 16px; font-weight: 800; cursor: pointer; width: 18px; display: flex; align-items: center; justify-content: center; transition: color 0.15s; }
        .ciq-btn:hover { color: var(--amber); }
        .ciq-num { font-size: 13px; font-weight: 800; color: var(--text); min-width: 14px; text-align: center; }
        .drawer-footer { padding: 16px; border-top: 1px solid var(--border2); }
        .drawer-total { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .total-label { font-size: 13px; font-weight: 600; color: var(--text2); }
        .total-amount { font-family: var(--font-head); font-size: 22px; font-weight: 800; color: var(--amber); }
        .checkout-btn { width: 100%; background: linear-gradient(135deg, var(--amber), var(--amber2)); color: #0F0D0B; font-family: var(--font-head); font-size: 15px; font-weight: 800; padding: 15px; border-radius: var(--radius); border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 6px 24px rgba(245,158,11,0.3); }
        .checkout-btn:hover { box-shadow: 0 8px 32px rgba(245,158,11,0.45); transform: translateY(-1px); }
        .checkout-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        /* ─── STICKY CART BAR ─── */
        .sticky-cart { position: fixed; bottom: 72px; left: 16px; right: 16px; z-index: 30; }
        .sticky-cart-btn { width: 100%; background: linear-gradient(135deg, var(--amber), var(--amber2)); color: #0F0D0B; font-family: var(--font-head); font-size: 14px; font-weight: 800; padding: 14px 20px; border-radius: 16px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 8px 32px rgba(245,158,11,0.4); transition: all 0.2s; }
        .sticky-cart-btn:hover { transform: translateY(-2px); }
        .scb-count { background: rgba(0,0,0,0.25); border-radius: 8px; padding: 3px 8px; font-size: 12px; }

        /* ─── TOAST ─── */
        .toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); z-index: 60; padding: 12px 20px; border-radius: 14px; font-size: 13px; font-weight: 700; white-space: nowrap; box-shadow: var(--shadow); animation: toastIn 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(12px) scale(0.95); } to { opacity:1; transform: translateX(-50%) translateY(0) scale(1); } }
        .toast-success { background: var(--surface2); border: 1px solid var(--amber); color: var(--amber); }
        .toast-error { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); color: #FCA5A5; }

        @media (min-width: 640px) {
          .bottom-nav { display: none; }
          .sticky-cart { bottom: 20px; max-width: 420px; left: 50%; transform: translateX(-50%); }
        }
        @media (min-width: 640px) {
          .desktop-nav-tabs { display: flex; }
          .top-nav { padding: 0 32px; }
          .product-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
        }

        /* Desktop sidebar tabs */
        .desktop-nav-tabs {
          display: none;
          align-items: center;
          gap: 4px;
          background: var(--surface2);
          border: 1px solid var(--border2);
          border-radius: 14px;
          padding: 4px;
        }
        .dnt-item {
          display: flex; align-items: center; gap: 7px;
          background: none; border: none; cursor: pointer;
          padding: 7px 14px; border-radius: 10px;
          color: var(--text2); font-size: 12px; font-weight: 700;
          transition: all 0.2s;
        }
        .dnt-item:hover { color: var(--text); }
        .dnt-item.active { background: var(--amber); color: #0F0D0B; }
        .dnt-item svg { width: 14px; height: 14px; flex-shrink: 0; }
      `}</style>

      {/* ── PROMO BAR ── */}
      <div className="nav-promo-bar">
        <span>🚀</span>
        <span>Free delivery on orders above ₦5,000</span>
        <span className="promo-pill">Today only</span>
      </div>

      {/* ── TOP NAVBAR ── */}
      <header className="top-nav">
        <div className="nav-logo">
          <div className="logo-icon">F</div>
          <div className="logo-text">
            <span className="logo-brand">Flashio</span>
            <span className="logo-tag">Food Delivery</span>
          </div>
        </div>

        {/* Desktop tabs — mirrors BottomNav items */}
        <nav className="desktop-nav-tabs">
          {[
            { id: "home",    label: "🏠 Home"    },
            { id: "search",  label: "🔍 Search"  },
            { id: "orders",  label: "🗒 Orders"  },
            { id: "contact", label: "📞 Contact" },
            { id: "profile", label: "👤 Profile" },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)} className={`dnt-item ${tab === id ? "active" : ""}`}>
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-right">
          <div className="nav-delivery-info">
            <span>📍</span>
            <div className="nav-delivery-text">
              <span className="nav-delivery-label">Deliver to</span>
              <span className="nav-delivery-city">Lagos Island</span>
            </div>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className={`nav-cart-btn ${totalItems > 0 ? "has-items" : ""}`}
            title="View cart"
          >
            <CartIcon />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="main-content">

        {/* HOME / MENU */}
        {tab === "home" && (
          <div className="home-tab">
            {/* Hero */}
            <div className="hero-section">
              <p className="hero-greeting">Good day! 👋</p>
              <h1 className="hero-heading">What are you <em>craving</em> today?</h1>
              <p className="hero-sub">Hot, fresh, and delivered fast to your door</p>
              <div className="hero-stats">
                <div className="stat-chip"><span>⚡</span> 15–30 min</div>
                <div className="stat-chip"><span>⭐</span> 4.9 Rating</div>
                <div className="stat-chip"><span>🏪</span> 50+ Items</div>
              </div>
            </div>

            {/* Featured banner */}
            <div className="featured-banner">
              <div className="fb-text">
                <p className="fb-tag">🔥 Deal of the day</p>
                <p className="fb-heading">Jollof Rice<br />Special Combo</p>
                <button className="fb-btn" onClick={() => { setSearch("Rice"); setActiveCategory("Rice"); }}>
                  Order Now <span>→</span>
                </button>
              </div>
              <div className="fb-emoji">🍛</div>
            </div>

            {/* Categories */}
            <div className="section-pad">
              <p className="section-label">Browse Categories</p>
            </div>
            <div className="cats-scroll">
              {categories.map((cat) => {
                const catMap = { All:"🌟", Rice:"🍚", Soup:"🍲", Meat:"🍖", Chicken:"🍗", Fish:"🐟", Seafood:"🦞", Vegetables:"🥬", Salad:"🥗", Pasta:"🍝", Pizza:"🍕", Burger:"🍔", Sandwich:"🥪", Beverage:"🥤", Drinks:"🥤", Dessert:"🍰", Breakfast:"🍳" };
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`cat-chip ${activeCategory === cat ? "active" : ""}`}>
                    <span className="cat-emoji">{catMap[cat] || "📦"}</span>
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Inline search */}
            <div className="menu-search">
              <span className="ms-icon">🔍</span>
              <input
                type="text"
                placeholder="Search dishes…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="error-box">
                <p className="error-text">⚠️ {error}</p>
                <button onClick={() => window.location.reload()} className="retry-btn">Try Again</button>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="product-grid">
                {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Empty */}
            {!loading && !error && filtered.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <p className="empty-state-title">Nothing found</p>
                <p className="empty-state-sub">Try a different dish or category</p>
                <button className="clear-btn" onClick={() => { setSearch(""); setActiveCategory("All"); }}>Clear Filters</button>
              </div>
            )}

            {/* Grid */}
            {!loading && !error && filtered.length > 0 && (
              <>
                <div className="grid-meta">
                  <span className="grid-count">{filtered.length} dish{filtered.length !== 1 ? "es" : ""} available</span>
                </div>
                <div className="product-grid">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} qty={qty(p.id)} onAdd={add} onRemove={remove} index={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* SEARCH */}
        {tab === "search" && (
          <SearchTab products={products} onAdd={add} onRemove={remove} qty={qty} />
        )}

        {/* ORDERS */}
        {tab === "orders" && (
          <div className="orders-tab">
            <h2 className="tab-heading">Your Orders</h2>
            <p className="tab-sub">Track and review your past orders</p>
            <OrdersTab />
          </div>
        )}

        {/* CONTACT */}
        {tab === "contact" && <ContactTab />}

        {/* PROFILE */}
        {tab === "profile" && <ProfileTab onLogout={handleLogout} />}
      </main>

      {/* ── STICKY MOBILE CART BAR ── */}
      {totalItems > 0 && !cartOpen && (
        <div className="sticky-cart">
          <button onClick={() => setCartOpen(true)} className="sticky-cart-btn">
            <span className="scb-count">{totalItems} items</span>
            <span>View Cart</span>
            <span>{formatNGN(totalAmount)}</span>
          </button>
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <BottomNav
        activeTab={tab}
        onTabChange={setTab}
        cartCount={totalItems}
      />

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <CartDrawer
          cart={cart} totalAmount={totalAmount}
          onAdd={add} onRemove={remove}
          onClose={() => setCartOpen(false)}
          onCheckout={handleCheckout}
          placing={placing}
        />
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`toast ${toast.type === "error" ? "toast-error" : "toast-success"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ─── ICON COMPONENTS ───────────────────────────────────────────────────────
// (Nav icons live in BottomNav.jsx — only CartIcon is needed here)
function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}