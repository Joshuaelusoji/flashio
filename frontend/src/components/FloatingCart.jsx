import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingCart() {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const btnRef = useRef(null);
  const hasDragged = useRef(false);

  const onMouseDown = (e) => {
    dragging.current = true;
    hasDragged.current = false;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const onTouchStart = (e) => {
    dragging.current = true;
    hasDragged.current = false;
    const touch = e.touches[0];
    offset.current = {
      x: touch.clientX - pos.x,
      y: touch.clientY - pos.y,
    };
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
    if (!hasDragged.current) navigate("/cart");
  };

  return (
    <button
      ref={btnRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onClick={handleClick}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #f59e0b, #ea580c)",
        border: "none",
        cursor: "grab",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(245, 158, 11, 0.45)",
        zIndex: 999,
        userSelect: "none",
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
        3
      </span>
    </button>
  );
}