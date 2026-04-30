import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders title, date, data confidence, and version", () => {
    render(
      <Footer
        lastUpdated={new Date(2026, 0, 12)}
        dataConfidenceValue="Medium-High"
        version="2.4"
      />
    );
    expect(
      screen.getByText("Psychosocial Risk Context Dashboard")
    ).toBeInTheDocument();
    expect(screen.getByText("© 2026")).toBeInTheDocument();
    expect(
      screen.getByText("Last Updated: January 12, 2026")
    ).toBeInTheDocument();
    expect(screen.getByText("Medium-High")).toBeInTheDocument();
    expect(screen.getByText("Version 2.4")).toBeInTheDocument();
  });
});
