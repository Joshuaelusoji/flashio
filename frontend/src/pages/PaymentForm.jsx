import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { initializePayment } from "../services/api";

function PaymentForm({ orderId, amount }) {
  const { user, setPaymentMethod } = useAuth();
  const { total, clearCart } = useCart();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(
    user?.paymentMethod || "card"
  );
  const [loading, setLoading] = useState(false);
  const displayAmount = amount ?? total;

  useEffect(() => {
    if (user?.paymentMethod) {
      setSelectedMethod(user.paymentMethod);
    }
  }, [user?.paymentMethod]);

  useEffect(() => {
    if (displayAmount <= 0) {
      navigate("/orders");
    }
  }, [displayAmount, navigate]);

  const paymentOptions = [
    {
      id: "card",
      label: "Credit / Debit Card",
      description: "Pay instantly with card using Paystack.",
    },
    {
      id: "bank",
      label: "Bank Transfer",
      description: "Complete your payment through bank transfer.",
    },
  ];

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!location) {
      alert("Delivery location is required");
      return;
    }

    if (!displayAmount || displayAmount <= 0) {
      alert("Add items to your cart before checking out.");
      return;
    }

    setLoading(true);

    if (user) {
      setPaymentMethod(selectedMethod);
    }

    try {
      const result = await initializePayment(
        orderId,
        location,
        selectedMethod
      );

      if (!result.success) {
        throw new Error(result.message);
      }

      window.location.href = result.url;
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

      {user?.paymentMethod && (
        <div className="mb-6 rounded-3xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-700">
          <p className="font-semibold text-orange-900">Saved payment preference</p>
          <p className="mt-1 capitalize">
            {user.paymentMethod === "bank"
              ? "Bank Transfer"
              : "Credit / Debit Card"}
          </p>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            className={`block rounded-3xl border p-4 cursor-pointer transition ${
              selectedMethod === option.id
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 bg-white hover:border-orange-200"
            }`}
          >
            <input
              type="radio"
              value={option.id}
              checked={selectedMethod === option.id}
              onChange={() => setSelectedMethod(option.id)}
              className="mr-3 h-4 w-4 text-orange-500"
            />
            <span className="font-semibold text-gray-900">{option.label}</span>
            <p className="mt-2 text-sm text-gray-500">{option.description}</p>
          </label>
        ))}
      </div>

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
        className="bg-orange-500 text-white p-3 w-full rounded disabled:opacity-60"
      >
        {loading ? "Processing..." : `Pay ₦${displayAmount}`}
      </button>
    </form>
  );
}

export default PaymentForm;
