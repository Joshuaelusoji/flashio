import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <div style={{ paddingBottom: "64px" }}>  {/* prevents content hiding behind nav */}
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}