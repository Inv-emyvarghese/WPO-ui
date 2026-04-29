import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { Suspense } from "react";
import { ContactProvider } from "./context/ContactContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PageLoadingSpinner from "./components/common/loaders/PageLoadingSpinner";



function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_SSO_CLIENT_ID}>
      <ContactProvider>
          <Suspense fallback={<PageLoadingSpinner />}>
            <RouterProvider router={router} />
          </Suspense>
      </ContactProvider>
    </GoogleOAuthProvider>
  );
}

export default App;