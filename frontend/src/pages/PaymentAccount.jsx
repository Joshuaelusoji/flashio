import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

export default function PaymentAccount() {
  const { user, setPaymentMethod } = useAuth();
  const paymentMethod = user?.paymentMethod || "card";
  const [selectedMethod, setSelectedMethod] = useState(paymentMethod);
  const [message, setMessage] = useState("");

  const paymentOptions = [
    { id: "card", label: "Credit / Debit Card" },
    { id: "bank", label: "Bank Transfer" },
  ];

  const handleSaveMethod = () => {
    setPaymentMethod(selectedMethod);
    setMessage("Payment method saved successfully.");
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="max-w-xl mx-auto px-4 py-8">
        <PageHeader
          title="Payment account"
          subtitle="Manage your saved payment methods"
          showBack
        />

        <div className="bg-white rounded-3xl shadow-sm p-8">
          <p className="mt-2 text-sm text-gray-500">
            Manage your saved payment methods and billing preferences.
          </p>

          <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">Saved payment method</p>
            <p className="mt-2 text-gray-700 capitalize">{paymentMethod.replace(/_/g, " ")}</p>
          </div>

          <div className="mt-6 space-y-3">
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
                  name="paymentMethod"
                  value={option.id}
                  checked={selectedMethod === option.id}
                  onChange={() => setSelectedMethod(option.id)}
                  className="mr-3 h-4 w-4 text-orange-500"
                />
                <span className="font-semibold text-gray-900">{option.label}</span>
              </label>
            ))}

            <button
              onClick={handleSaveMethod}
              className="w-full rounded-3xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Save payment preference
            </button>

            {message && (
              <p className="text-sm text-green-600">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
