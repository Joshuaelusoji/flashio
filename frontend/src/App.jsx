import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserOrders from "./pages/UserOrders";
import RiderDashboard from "./pages/RiderDashboard";
import PaymentForm from "./pages/PaymentForm";
import OrderConfirmation from "./pages/OrderConfirmation";
import VerifyEmail from "./pages/VerifyEmail";
import PaymentSuccess from "./pages/PaymentSuccess";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Dashboard / private routes */}
        <Route path="/user/orders" element={<UserOrders />} />
        <Route path="/rider/dashboard" element={<RiderDashboard />} />

        {/* Checkout / Payment */}
        <Route path="/checkout" element={<PaymentForm />} />

        {/* 👇 THIS is where Paystack redirects after payment */}
        <Route path="/payment/success" element={<PaymentSuccess />} />


        {/* Order confirmation */}
        <Route path="/order/confirmation/:orderId" element={<OrderConfirmation />} />

        {/* Default redirecting route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;