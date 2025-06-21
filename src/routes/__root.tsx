import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../App.css";
import Header from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    </>
  ),
});
