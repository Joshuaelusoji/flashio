// src/services/api.js

const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


/* =========================
   REGISTER USER
========================= */
export async function registerUser(userData) {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return { success: true, data };
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return { success: false, message: error.message };
  }
}

/* =========================
   LOGIN USER
========================= */
export async function loginUser(credentials) {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return { success: true, data };
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return { success: false, message: error.message };
  }
}

/* =========================
   GET CURRENT USER (ME)
   Called on app load to
   rehydrate session from
   the httpOnly cookie.
========================= */
export async function getUser() {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Not authenticated");
    }

    return { success: true, data };
  } catch (error) {
    console.error("GET ME ERROR:", error);
    return { success: false, message: error.message };
  }
}

/* =========================
   LOGOUT USER
   Clears the httpOnly cookie
   on the server.
========================= */
export async function logoutUser() {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Logout failed");
    }

    return { success: true, data };
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return { success: false, message: error.message };
  }
}

/* =========================
   GET RIDER ORDERS
========================= */
export async function getRiderOrders() {
  try {
    const res = await fetch(`${BASE_API_URL}/riders/my-orders`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch rider orders");
    }

    return data;
  } catch (error) {
    console.error("RIDER ORDERS ERROR:", error);
    return { orders: [] };
  }
}

/* =========================
   VERIFY DELIVERY CODE (RIDER)
========================= */
export async function verifyDeliveryCode(orderId, code) {
  try {
    const res = await fetch(`${BASE_API_URL}/riders/verify-delivery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ orderId, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Verification failed");
    }

    return { success: true, data };
  } catch (error) {
    console.error("VERIFY DELIVERY ERROR:", error);
    return { success: false, message: error.message };
  }
}

/* =========================
   PROCESS PAYMENT
========================= */
export async function initializePayment(orderId, location) {
  try {
    const res = await fetch(`${BASE_API_URL}/payments/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ orderId, location }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Payment failed");
    }

    return {
      success: true,
      url: data.url,
      reference: data.reference,
    };
  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    return { success: false, message: error.message };
  }
}