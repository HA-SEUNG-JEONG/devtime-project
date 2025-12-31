import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import SignUp from "./page/User/SignUp.tsx";
import SignIn from "./page/User/SignIn.tsx";
import ProfileSetup from "./page/User/ProfileSetup.tsx";
import { GuestRoute, ProtectedRoute } from "./ProtectedRoute.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ErrorModalProvider } from "./contexts/ErrorModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorModalProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/signup"
              element={
                <GuestRoute>
                  <SignUp />
                </GuestRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <GuestRoute>
                  <SignIn />
                </GuestRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileSetup />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ErrorModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
