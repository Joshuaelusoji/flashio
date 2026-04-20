import { useState } from "react";

const BASE_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function PaymentForm({ orderId, amount }) {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!location) {
      alert("Delivery location is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_API_URL}/payments/initialize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ orderId, location }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Payment failed");
      }

      // 👉 Redirect to Paystack checkout
      window.location.href = data.url;

    } catch (err) {
      console.error("Payment error:", err);
      alert(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Payment & Delivery
      </h2>

      <input
        type="text"
        placeholder="Delivery Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="border p-3 mb-6 w-full rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-red-500 text-white p-3 w-full rounded"
      >
        {loading ? "Redirecting..." : `Pay ₦${amount}`}
      </button>
    </form>
  );
}

export default PaymentForm;