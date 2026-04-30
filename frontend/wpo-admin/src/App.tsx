import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { Suspense } from "react";
import { ContactProvider } from "./context/ContactContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./pages/error-boundary/ErrorFallback";

import PageLoadingSpinner from "./components/common/loaders/PageLoadingSpinner";


function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ContactProvider>
        <Suspense fallback={<PageLoadingSpinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </ContactProvider>
    </ErrorBoundary>

  );
}

export default App;