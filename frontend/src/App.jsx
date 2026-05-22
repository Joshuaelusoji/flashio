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
import Menu from "./pages/Menu";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import RestaurantsDetails from "./pages/RestaurantsDetails";
import CategoryPage from "./pages/CategoryPage";
import CategoryItemPage from "./pages/CategoryItemPage.jsx";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import Addresses from "./pages/Addresses";
import PaymentAccount from "./pages/PaymentAccount";
import RequireAuth from "./pages/RequireAuth";

import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH (NO NAVBAR) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* APP LAYOUT (NAVBAR ALWAYS HERE) */}
        <Route element={<AppLayout />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/category/:type" element={<CategoryPage />} />
          <Route path="/category/:type/:id" element={<CategoryItemPage />} />
          <Route path="/restaurants/:slug" element={<RestaurantsDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rider/dashboard" element={<RiderDashboard />} />
          <Route path="/checkout" element={<RequireAuth><PaymentForm /></RequireAuth>} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/profile/details" element={
              <RequireAuth>
                <ProfileDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/addresses" element={
              <RequireAuth>
                <Addresses />
              </RequireAuth>
            }
          />
          <Route path="/profile/payment" element={
              <RequireAuth>
                <PaymentAccount />
              </RequireAuth>
            }
          />
          <Route path="/order/confirmation/:orderId" element={<OrderConfirmation />} />
        </Route>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route path="*" element={<Navigate to="/menu" />} />

      </Routes>
    </Router>
  );
}

export default App;