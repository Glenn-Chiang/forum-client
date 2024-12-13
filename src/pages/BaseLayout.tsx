import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

export default function BaseLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
