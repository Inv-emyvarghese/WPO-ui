import {
  LogoutIcon,
  PeopleOutlinedIcon,
  PersonOutlineOutlinedIcon,
  TextSnippetOutlinedIcon,
  VerifiedUserOutlinedIcon,
} from "@/components/icons/MuiIcons";
import { useMyContext } from "@/context/ContactContext";
import defaultAvatar from "@/assets/profileImage.svg";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  drawerWidth: number;
  container?: () => HTMLElement;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
  handleDrawerToggle: () => void;
}

export default function Sidebar({
  drawerWidth,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
}: Readonly<SidebarProps>) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, handleLogout } = useMyContext();

  const sidebarItemsTop = [
    {
      itemName: t("sidebar.contactList"),
      icon: <PeopleOutlinedIcon className="size-6 shrink-0" />,
      path: "/",
    },
    {
      itemName: t("sidebar.myProfile"),
      icon: <PersonOutlineOutlinedIcon className="size-6 shrink-0" />,
      path: "/user-profile",
    },
  ];

  const sidebarItemsBottom = [
    {
      itemName: t("sidebar.termsOfUse"),
      icon: <TextSnippetOutlinedIcon className="size-6 shrink-0" />,
      path: "/terms-of-service",
    },
    {
      itemName: t("sidebar.privacy"),
      icon: <VerifiedUserOutlinedIcon className="size-6 shrink-0" />,
      path: "/privacy-policy",
    },
  ];

  const drawerInner = (
    <div className="bg-[#f8f9fa]">
      <div className="flex min-h-14 items-center bg-[#1976d2] px-4">
        <Link
          to="/"
          className="flex-1 cursor-pointer text-xl font-medium text-white no-underline"
        >
          {t("app.header")}
        </Link>
      </div>
      <div className="flex min-h-[calc(100vh-70px)] flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 bg-green-600/10 px-4 py-2">
            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-300 text-sm font-medium text-slate-800">
              {user?.image_url ? (
                <img
                  src={user.image_url}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <img
                  src={defaultAvatar}
                  alt=""
                  className="size-full object-cover"
                />
              )}
            </div>
            <p className="line-clamp-1 min-w-0 flex-1 text-base text-slate-900">
              {user?.name}
            </p>
          </div>
          <hr className="border-slate-200" />
          {sidebarItemsTop.map((item) => {
            const selected = pathname === item.path;
            return (
              <div key={item.itemName} className="px-2 py-0.5">
                <button
                  type="button"
                  onClick={() => {
                    navigate(item.path);
                    handleDrawerClose();
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm hover:bg-slate-200/80 ${
                    selected ? "bg-blue-50 text-blue-900" : "text-slate-900"
                  }`}
                >
                  <span className="inline-flex text-slate-700">{item.icon}</span>
                  <span>{item.itemName}</span>
                </button>
              </div>
            );
          })}
          <div className="px-2 py-0.5">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm text-red-700 hover:bg-slate-200/80"
            >
              <span className="inline-flex text-red-600">
                <LogoutIcon className="size-6" />
              </span>
              <span>{t("account.logout")}</span>
            </button>
          </div>
        </div>
        <div>
          {sidebarItemsBottom.map((item) => {
            const selected = pathname === item.path;
            return (
              <div key={item.itemName} className="px-2 py-0.5">
                <button
                  type="button"
                  onClick={() => {
                    navigate(item.path);
                    handleDrawerClose();
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm hover:bg-slate-200/80 ${
                    selected ? "bg-blue-50 text-blue-900" : "text-slate-900"
                  }`}
                >
                  <span className="inline-flex text-slate-700">{item.icon}</span>
                  <span>{item.itemName}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <nav className="shrink-0" aria-label="mailbox folders">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={handleDrawerClose}
        />
      )}
      <div
        role="presentation"
        className={`fixed left-0 top-0 z-50 h-full w-[75%] max-w-sm overflow-y-auto shadow-xl transition-transform duration-300 ease-out sm:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
        onTransitionEnd={handleDrawerTransitionEnd}
      >
        {drawerInner}
      </div>

      <div
        role="presentation"
        className="hidden h-screen overflow-y-auto sm:block"
        style={{ width: drawerWidth }}
      >
        {drawerInner}
      </div>
    </nav>
  );
}
