import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw new Error("Mount element #root was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <>
      <App />
      <ToastContainer
        position="top-right"
        className="!z-[1060]"
        toastClassName="rounded-md"
        pauseOnHover
        pauseOnFocusLoss
        closeOnClick={false}
        draggable
      />
    </>
  </StrictMode>,
);
