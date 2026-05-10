import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Menu from "../pages/Menu";
import FloatingCart from "../components/FloatingCart";

export default function UserOrders() {
  return (
    <div>
      <Navbar />
      <Menu />
      <FloatingCart />
    </div>
  );
}