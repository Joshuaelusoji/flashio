import { useState, useEffect, useRef } from "react";

const cartItems = [
  { id: 1, name: "Jollof Rice & Chicken", qty: 2, price: 3500 },
  { id: 2, name: "Moi Moi (×2)", qty: 1, price: 800 },
  { id: 3, name: "Chapman Drink", qty: 1, price: 600 },
];

export default function FloatingCart() {
  const [pos, setPos] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
  const [open, setOpen] = useState(false);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const btnRef = useRef(null);
  const hasDragged = useRef(false);

  const onMouseDown = (e) => {
    dragging.current = true;
    hasDragged.current = false;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const onTouchStart = (e) => {
    dragging.current = true;
    hasDragged.current = false;
    const touch = e.touches[0];
    offset.current = { x: touch.clientX - pos.x, y: touch.clientY - pos.y };
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      hasDragged.current = true;
      setPos({
        x: Math.min(Math.max(e.clientX - offset.current.x, 0), window.innerWidth - 60),
        y: Math.min(Math.max(e.clientY - offset.current.y, 0), window.innerHeight - 60),
      });
    };
    const onTouchMove = (e) => {
      if (!dragging.current) return;
      hasDragged.current = true;
      const touch = e.touches[0];
      setPos({
        x: Math.min(Math.max(touch.clientX - offset.current.x, 0), window.innerWidth - 60),
        y: Math.min(Math.max(touch.clientY - offset.current.y, 0), window.innerHeight - 60),
      });
    };
    const onMouseUp = () => { dragging.current = false; };
    const onTouchEnd = () => { dragging.current = false; };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [pos]);

  const handleClick = () => {
    if (!hasDragged.current) setOpen((o) => !o);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Smart panel positioning: flip left/up if button is near edges
  const panelWidth = 300;
  const panelHeight = 360;
  const panelLeft = pos.x + 60 + panelWidth > window.innerWidth
    ? pos.x - panelWidth + 60
    : pos.x;
  const panelTop = pos.y + 60 + panelHeight > window.innerHeight
    ? pos.y - panelHeight
    : pos.y + 60;

  return (
    <>
      {/* Cart Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            left: panelLeft,
            top: panelTop,
            width: `${panelWidth}px`,
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            zIndex: 998,
            overflow: "hidden",
            animation: "cartPop 0.2s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <style>{`
            @keyframes cartPop {
              from { opacity: 0; transform: scale(0.85); }
              to   { opacity: 1; transform: scale(1); }
            }
          `}</style>

          {/* Header */}
          <div style={{
            padding: "14px 16px",
            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>
              🛒 Your Cart ({cartItems.length})
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer", lineHeight: 1 }}
            >
              ✕
            </button>
          </div>

          {/* Items */}
          <div style={{ padding: "8px 0", maxHeight: "220px", overflowY: "auto" }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 16px",
                borderBottom: "1px solid #f3f4f6",
              }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{item.name}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Qty: {item.qty}</div>
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#ea580c" }}>
                  ₦{(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid #f3f4f6" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: 700,
              color: "#111",
            }}>
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <button
              onClick={() => { /* navigate("/cart") or open checkout */ }}
              style={{
                width: "100%",
                padding: "11px",
                background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        ref={btnRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={handleClick}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: "53px",
          height: "53px",
          borderRadius: "50%",
          background: open
            ? "linear-gradient(135deg, #ea580c, #b45309)"
            : "linear-gradient(135deg, #f59e0b, #ea580c)",
          border: "none",
          cursor: "grab",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(245, 158, 11, 0.45)",
          zIndex: 999,
          userSelect: "none",
          transition: "background 0.2s",
        }}
      >
        🛒
        <span style={{
          position: "absolute",
          top: "-4px",
          right: "-4px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#dc2626",
          color: "#fff",
          fontSize: "10px",
          fontWeight: "800",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #fff",
        }}>
          {cartItems.length}
        </span>
      </button>
    </>
  );
}