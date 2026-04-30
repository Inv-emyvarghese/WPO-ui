import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "@/i18n";

const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw new Error("Mount element #root was not found.");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);