import type { ReactElement } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";
import ToastMessage from "../ToastMessage";
import { toastTime } from "@/constants/stringConstants";

vi.mock("react-i18next", () => {
  const t = (key: string) => key;
  return {
    useTranslation: () => ({ t }),
  };
});

function renderWithToastContainer(ui: ReactElement) {
  return render(
    <>
      {ui}
      <ToastContainer />
    </>,
  );
}

describe("ToastMessage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("renders with success type and success translation key header", async () => {
    renderWithToastContainer(<ToastMessage message="Operation ok" type="success" />);
    await act(async () => {});
    const marker = screen.getByTestId("toast-message");
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveStyle({ zIndex: "1060" });
    expect(screen.getByText("messages.success.header")).toBeInTheDocument();
    expect(screen.getByText("Operation ok")).toBeInTheDocument();
  });

  it("renders error variant with error translation key header and danger styling", async () => {
    renderWithToastContainer(<ToastMessage message="Failed" type="error" />);
    await act(async () => {});
    const header = screen.getByText("messages.error.header");
    const toastEl = header.closest(".toast");
    expect(toastEl?.className).toContain("bg-red-600");
  });

  it("renders warning variant with warning translation key header and primary styling", async () => {
    renderWithToastContainer(<ToastMessage message="Heads up" type="warning" />);
    await act(async () => {});
    const header = screen.getByText("messages.warning.header");
    const toastEl = header.closest(".toast");
    expect(toastEl?.className).toContain("bg-blue-600");
  });

  it("auto hides after toastTime and triggers onClose once", async () => {
    vi.useRealTimers();
    const onClose = vi.fn();
    renderWithToastContainer(
      <ToastMessage message="Auto hide" type="success" onClose={onClose} />,
    );
    await act(async () => {});
    expect(screen.getByText("Auto hide")).toBeInTheDocument();
    await new Promise((resolve) => setTimeout(resolve, toastTime + 400));
    expect(onClose).toHaveBeenCalledTimes(1);
  }, 8000);

  it("manual close triggers onClose once", async () => {
    vi.useRealTimers();
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithToastContainer(
      <ToastMessage message="Close me" type="success" onClose={onClose} />,
    );
    await act(async () => {});
    const closeBtn = screen.getByRole("button", { name: /close/i });
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  }, 8000);
});
