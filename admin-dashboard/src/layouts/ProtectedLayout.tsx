import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// import Sidebar from "@/components/layout/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const ProtectedLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Header handleDrawerToggle={handleDrawerToggle} />
      {/* <Sidebar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerToggle={handleDrawerToggle}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        /> */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-slate-100 transition-[margin,width] duration-300 ease-out">
        <div className="min-h-16 shrink-0" aria-hidden />
        <div className="min-h-0 flex-1 overflow-auto bg-slate-100">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default ProtectedLayout;
