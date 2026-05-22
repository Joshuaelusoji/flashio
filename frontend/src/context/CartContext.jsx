import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === "undefined") return [];
    const stored = window.localStorage.getItem("flashio_cart");
    return stored ? JSON.parse(stored) : [];
  });

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return item;
        if (item.qty <= 1) return [];
        return { ...item, qty: item.qty - 1 };
      })
    );
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  useEffect(() => {
    window.localStorage.setItem("flashio_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQty,
        clearCart,
        total,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}