import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Menu from "../pages/Menu";

export default function UserOrders() {
  return (
    <div>
      <Navbar />
      <Menu />
    </div>
  );
}