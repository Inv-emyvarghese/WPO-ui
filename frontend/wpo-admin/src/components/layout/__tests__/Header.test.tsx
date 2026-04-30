import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import * as tokenUtils from "@/utils/tokenUtils";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

vi.mock("@/utils/tokenUtils", () => ({
  isAuthenticated: vi.fn(),
}));

const renderWithRouter = (path: string) => {
  const router = createMemoryRouter(
    [
      {
        path: "*",
        element: <Header />,
      },
    ],
    { initialEntries: [path] }
  );
  return render(
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );
};

describe("Header component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(tokenUtils.isAuthenticated).mockReturnValue(false);
  });

  it("renders app title and info icon on non-admin route", () => {
    renderWithRouter("/");

    expect(
      screen.getByRole("link", { name: /psychosocial risk dashboard/i })
    ).toBeInTheDocument();
  });

  it("renders dashboard header on /admin", () => {
    renderWithRouter("/admin");

    expect(
      screen.getByRole("heading", {
        name: /psychosocial risk context dashboard \(country-level\)/i,
      })
    ).toBeInTheDocument();
  });

  it("renders dashboard header on /psychosocial-dashboard", () => {
    renderWithRouter("/psychosocial-dashboard");

    expect(
      screen.getByRole("heading", {
        name: /psychosocial risk context dashboard \(country-level\)/i,
      })
    ).toBeInTheDocument();
  });
});
