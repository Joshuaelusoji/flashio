import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function PaymentSuccess() {
  const { state } = useLocation();
  const { clearCart } = useCart();

  const method = state?.method || "Card payment";
  const amount = state?.amount
    ? new Intl.NumberFormat("en-NG").format(state.amount)
    : null;

  useEffect(() => {
    if (state?.method && state?.amount) {
      clearCart();
    }
  }, [state, clearCart]);

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-sm p-8 text-center">
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center text-3xl text-orange-600">
            ✓
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">Payment successful</h1>
          <p className="mt-3 text-sm text-gray-500">
            Your payment has been processed successfully.
          </p>

          <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 p-6 text-left text-sm text-gray-700">
            <p className="font-semibold text-gray-900">Payment method</p>
            <p className="mt-2 capitalize">{method}</p>
            {amount && (
              <p className="mt-4 text-sm font-semibold text-gray-900">
                Amount paid: ₦{amount}
              </p>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <Link
              to="/orders"
              className="block rounded-3xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              View my orders
            </Link>
            <Link
              to="/menu"
              className="block rounded-3xl border border-orange-200 px-4 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50"
            >
              Back to menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
