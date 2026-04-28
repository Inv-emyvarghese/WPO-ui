import { isAuthenticated } from "@/utils/tokenUtils";
import {
  LayersOutlinedIcon,
  MenuIcon,
} from "@/components/icons/MuiIcons";
import { Link, useLocation } from "react-router-dom";
import InfoIcon from "../common/icons/InfoIcon";
import { HeaderInfoIconSize } from "@/constants/stringConstants";

interface HeaderProps {
  handleDrawerToggle?: () => void;
}

export default function Header({ handleDrawerToggle }: Readonly<HeaderProps>) { 
  const { pathname } = useLocation();
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (isDashboard) {
    return (
      <header className="fixed left-0 right-0 top-0 z-[1100] bg-[#1447E6] shadow-none">
        <div className="flex min-h-16 items-center px-2 shadow-none sm:px-3">
          {isAuthenticated() && (
            <button
              type="button"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className="mr-3 inline-flex shrink-0 rounded-md p-2 text-white hover:bg-white/10 sm:hidden"
            >
              <MenuIcon className="size-6" />
            </button>
          )}
          <div className="flex flex-1 flex-wrap items-center gap-2.5 text-white">
            <h1 className="text-[0.85rem] font-bold leading-tight sm:text-base">
              Psychosocial Risk Dashboard
            </h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-[1100] bg-[#1976d2] shadow-none">
      <div className="flex min-h-16 items-center px-2 shadow-none sm:px-4">
        {isAuthenticated() && (
          <button
            type="button"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className="mr-4 inline-flex shrink-0 rounded-md p-2 text-white hover:bg-white/10 sm:hidden"
          >
            <MenuIcon />
          </button>
        )}
        <Link
          to="/"
          className="flex flex-1 cursor-pointer items-center gap-2.5 text-inherit no-underline"
        >
          <LayersOutlinedIcon className="size-6" />
          <span className="text-xl font-medium leading-tight">
            Psychosocial Risk Dashboard
          </span>
        </Link>
        <InfoIcon width={HeaderInfoIconSize} height={HeaderInfoIconSize} />
      </div>
    </header>
  );
}
