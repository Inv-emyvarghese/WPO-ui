import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type React from "react";
import { Outlet } from "react-router-dom";

const ProtectedLayout: React.FC = () => {
  /** No-op while sidebar is disabled; restore drawer state when `Sidebar` is re-enabled. */
  const handleDrawerToggle = () => {};

  return (
    <div className="flex min-h-dvh min-h-[100svh] w-full min-w-0 flex-1 flex-col">
      <Header handleDrawerToggle={handleDrawerToggle} />
      <div className="min-h-0 w-full min-w-0 flex-1 overflow-auto bg-slate-100 pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
