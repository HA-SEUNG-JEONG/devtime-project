import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import SignUp from "./page/User/SignUp.tsx";
import SignIn from "./page/User/SignIn.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isLoggedIn={false}>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <ProtectedRoute isLoggedIn={false}>
              <SignIn />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
