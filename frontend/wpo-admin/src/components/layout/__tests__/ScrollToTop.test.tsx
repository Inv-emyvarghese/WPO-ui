
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ScrollToTop from "../ScrollToTop";

describe("ScrollToTop", () => {
	it("calls window.scrollTo when pathname changes", () => {
		const scrollToMock = vi.fn();
		window.scrollTo = scrollToMock;

		const { rerender } = render(
			<MemoryRouter initialEntries={["/page1"]}>
				<Routes>
					<Route path="*" element={<ScrollToTop />} />
				</Routes>
			</MemoryRouter>
		);

		// Simulate route change
		rerender(
			<MemoryRouter initialEntries={["/page2"]}>
				<Routes>
					<Route path="*" element={<ScrollToTop />} />
				</Routes>
			</MemoryRouter>
		);

		expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
	});
});
