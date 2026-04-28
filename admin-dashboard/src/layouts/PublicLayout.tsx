// import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  return (
    <div className="flex min-h-screen">
      <Header />
      <main
        className={`flex min-h-0 min-w-0 flex-1 flex-col transition-[margin,width] duration-300 ease-out sm:w-[calc(100%-240px)] ${
          isDashboard ? "bg-slate-900" : "bg-transparent"
        }`}
      >
        <div className="min-h-16 shrink-0" aria-hidden />
        <div
          className={`flex min-h-0 flex-1 flex-col overflow-auto ${
            isDashboard ? "bg-slate-900" : "bg-transparent"
          }`}
        >
          <Outlet />
        </div>
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default PublicLayout;
