import type React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <div className="flex min-h-dvh min-h-[100svh] w-full min-w-0 flex-1 flex-col bg-white">
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-center justify-center overflow-y-auto bg-white px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
