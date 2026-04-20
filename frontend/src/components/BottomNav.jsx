// ─────────────────────────────────────────────────────────────────────────────
//  BottomNav — Reusable bottom navigation bar
//
//  Props:
//    activeTab   {string}          — currently active tab id
//    onTabChange {(id: string) => void} — called when a tab is tapped
//    cartCount   {number}          — badge count shown on the Orders tab
//                                    (pass 0 or omit to hide the dot)
//
//  Usage:
//    import BottomNav from "@/components/BottomNav";
//
//    <BottomNav
//      activeTab={tab}
//      onTabChange={setTab}
//      cartCount={totalItems}
//    />
//
//  The component is self-contained: it ships its own <style> block so it
//  works without any global stylesheet.  Override variables or add a wrapper
//  class if you need to tweak colours per-page.
// ─────────────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "home",    label: "Home",    icon: HomeIcon    },
  { id: "search",  label: "Search",  icon: SearchIcon  },
  { id: "orders",  label: "Orders",  icon: OrdersIcon  },
  { id: "contact", label: "Contact", icon: ContactIcon },
  { id: "profile", label: "Profile", icon: ProfileIcon },
];

export default function BottomNav({ activeTab, onTabChange, cartCount = 0 }) {
  return (
    <>
      <style>{STYLES}</style>
      <nav className="bn-root" role="navigation" aria-label="Main navigation">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          const showDot  = id === "orders" && cartCount > 0 && !isActive;

          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`bn-item${isActive ? " bn-item--active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
            >
              {showDot && <span className="bn-dot" aria-hidden="true" />}

              <span className="bn-icon" aria-hidden="true">
                <Icon />
              </span>

              <span className="bn-label">{label}</span>

              {isActive && <span className="bn-indicator" aria-hidden="true" />}
            </button>
          );
        })}
      </nav>
    </>
  );
}

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
         width="20" height="20" aria-hidden="true">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
         width="20" height="20" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
         width="20" height="20" aria-hidden="true">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
         width="20" height="20" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12 19.79 19.79 0 01.14 3.4 2 2 0 012.12 1.26h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
         width="20" height="20" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// ─── SCOPED STYLES ────────────────────────────────────────────────────────────
const STYLES = `
  .bn-root {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 8px;
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background: rgba(26, 22, 18, 0.97);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(245, 158, 11, 0.12);
  }

  /* Hide on desktop — show the top-nav tabs instead */
  @media (min-width: 640px) {
    .bn-root { display: none; }
  }

  .bn-item {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 8px 4px;
    border: none;
    background: none;
    border-radius: 12px;
    color: #6B5B4D;
    cursor: pointer;
    transition: color 0.2s ease, background 0.15s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .bn-item:hover {
    color: #A89880;
    background: rgba(245, 158, 11, 0.05);
  }

  .bn-item--active {
    color: #F59E0B;
  }

  /* Icon lifts slightly on active */
  .bn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .bn-item--active .bn-icon {
    transform: translateY(-3px);
  }

  .bn-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.03em;
    font-family: 'Nunito', sans-serif;
    line-height: 1;
  }

  /* Animated underline indicator */
  .bn-indicator {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 3px;
    border-radius: 99px;
    background: #F59E0B;
    animation: bn-grow 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  @keyframes bn-grow {
    from { width: 0; opacity: 0; }
    to   { width: 20px; opacity: 1; }
  }

  /* Notification dot (e.g. cart has items but orders tab not active) */
  .bn-dot {
    position: absolute;
    top: 6px;
    right: calc(50% - 16px);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #F59E0B;
    border: 2px solid #0F0D0B;
    animation: bn-pop 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  @keyframes bn-pop {
    from { transform: scale(0); }
    to   { transform: scale(1); }
  }
`;