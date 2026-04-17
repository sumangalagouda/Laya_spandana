import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import BharatanatyamPage from "./pages/BharatanatyamPage";
import History from "./pages/History";
import Home from "./pages/Home";
import LearnTalas from "./pages/LearnTalas";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-shell">
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar ? "page-main auth-main" : "page-main"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <LearnTalas />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/bharatanatyam" element={<BharatanatyamPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#2D1200",
            color: "#FDF6E3",
            border: "1px solid rgba(212,175,55,0.3)",
          },
        }}
      />
    </div>
  );
}

export default App;
