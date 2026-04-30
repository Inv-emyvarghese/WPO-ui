import { isAuthenticated } from "@/utils/tokenUtils";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { IconButton } from "@/components/ui/IconButton";
import { HeaderInfoIconSize } from "@/constants/stringConstants";
import { Info, Layers, Menu, Shield } from "lucide-react";
import { cx } from "@/utils/cx";

interface HeaderProps {
  handleDrawerToggle?: () => void;
}

function isDashboardPath(pathname: string): boolean {
  return (
    pathname === "/psychosocial-dashboard" ||
    pathname.startsWith("/psychosocial-dashboard/") ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/")
  );
}

export default function Header({ handleDrawerToggle }: Readonly<HeaderProps>) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isDashboard = isDashboardPath(pathname);

  const barClass = cx(
    "fixed right-0 left-0 top-0 z-[1100] flex h-16 min-h-16 items-center border-b-0 shadow-none",
    isDashboard ? "bg-[#002D5B] text-white" : "bg-[#1976d2] text-white"
  );

  if (isDashboard) {
    return (
      <header className={barClass}>
        <div className="box-border flex h-full w-full max-w-full min-h-16 items-center px-2 pl-2 pr-1 sm:px-3">
          {isAuthenticated() && (
            <IconButton
              type="button"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className="mr-1.5 text-white hover:bg-white/10 sm:hidden"
              edge="start"
            >
              <Menu className="h-6 w-6 text-white" aria-hidden />
            </IconButton>
          )}
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <Shield className="h-8 w-8 shrink-0 text-white" aria-hidden />
            <h1
              className={
                // Global index.css sets `h1 { font-size: 56px; margin: … }` — override so design is 20px in the app header.
                "min-w-0 font-sans !m-0 !text-[20px] !font-semibold !leading-[28px] !tracking-[-0.95px] !text-white"
              }
            >
              {t("app.dashboardHeaderTitle")}
            </h1>
          </div>
          <IconButton
            type="button"
            size="sm"
            aria-label={t("app.help")}
            className="shrink-0 text-white hover:bg-white/10"
          >
            <Info className="h-5 w-5 text-white" aria-hidden />
          </IconButton>
        </div>
      </header>
    );
  }

  return (
    <header className={barClass}>
      <div className="box-border flex h-full w-full max-w-full min-h-16 items-center px-2 pl-2 pr-2 sm:px-3">
        {isAuthenticated() && (
          <IconButton
            type="button"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className="mr-2 text-inherit hover:bg-white/10 sm:hidden"
            edge="start"
          >
            <Menu className="h-6 w-6 text-white" aria-hidden />
          </IconButton>
        )}
        <Link
          to="/"
          className="link flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 no-underline text-inherit"
        >
          <Layers className="h-8 w-8 shrink-0 text-white" aria-hidden />
          <span className="text-xl font-medium leading-tight sm:text-2xl">
            {t("app.header")}
          </span>
        </Link>
        <Info
          className="shrink-0 text-white"
          style={{ width: HeaderInfoIconSize, height: HeaderInfoIconSize }}
          aria-hidden
        />
      </div>
    </header>
  );
}
