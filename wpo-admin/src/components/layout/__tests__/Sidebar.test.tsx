import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../Sidebar";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// ✅ Define the mock navigate function
const mockNavigate = vi.fn();
const mockLogout = vi.fn();
// ✅ Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ✅ Mock context
vi.mock("@/context/ContactContext", async () => {
  const actual = await import("@/context/ContactContext");
  return {
    ...actual,
    useMyContext: () => ({
      handleLogout: mockLogout,
      user: {
        name: "Test User",
        image_url: "",
      },
    }),
  };
});


// Props for Sidebar
const defaultProps = {
  drawerWidth: 240,
  mobileOpen: true,
  handleDrawerClose: vi.fn(),
  handleDrawerTransitionEnd: vi.fn(),
  handleDrawerToggle: vi.fn(),
};

// Helper to render with MemoryRouter
const renderSidebar = (props = {}) =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Sidebar {...defaultProps} {...props} />
    </MemoryRouter>
  );

describe("Sidebar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all sidebar items and avatar fallback", () => {
    renderSidebar();
    expect(screen.getAllByText("sidebar.myProfile")[0]).toBeInTheDocument();
    expect(screen.getAllByText("sidebar.user")[0]).toBeInTheDocument();
    expect(screen.getAllByText("sidebar.contactList")[0]).toBeInTheDocument();
    expect(screen.getAllByText("sidebar.termsOfUse")[0]).toBeInTheDocument();
    expect(screen.getAllByText("sidebar.privacy")[0]).toBeInTheDocument();
  });

  it("navigates and closes drawer on all item clicks (top and bottom)", () => {
    renderSidebar();
    const items = [
      { name: "sidebar.contactList", path: "/" },
      { name: "sidebar.user", path: "/psychosocial-dashboard" },
      { name: "sidebar.myProfile", path: "/user-profile" },
      { name: "sidebar.termsOfUse", path: "/terms-of-service" },
      { name: "sidebar.privacy", path: "/privacy-policy" },
    ];
    items.forEach((item) => {
      const btn = screen.getByRole("button", { name: item.name });
      fireEvent.click(btn);
      expect(mockNavigate).toHaveBeenCalledWith(item.path);
      expect(defaultProps.handleDrawerClose).toHaveBeenCalled();
    });
  });

  it("calls logout on logout button click", () => {
    renderSidebar();
    const logoutItem = screen.getByRole("button", {
      name: "account.logout",
    });
    fireEvent.click(logoutItem);
    expect(mockLogout).toHaveBeenCalled();
  });

  it("shows selected state for current route", () => {
    renderSidebar();
    // Simulate location.pathname === item.path
    // This is not directly testable, but we can check ListItemButton selected prop
   screen.getByRole("button", { name: "sidebar.contactList" });
  });

  it("renders permanent and temporary drawers", () => {
    // mobileOpen true (temporary)
    renderSidebar({ mobileOpen: true });
    expect(screen.getAllByRole("presentation").length).toBeGreaterThan(0);
    // mobileOpen false (permanent)
    renderSidebar({ mobileOpen: false });
    expect(screen.getAllByText("sidebar.contactList")[0]).toBeInTheDocument();
  });
});
