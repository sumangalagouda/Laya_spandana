import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      login(data.token, data.user);
      toast.success("Welcome back.");
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.error || "Login failed";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page login-page">
      <div className="auth-card">
        <div className="temple-corners" />
        <div className="auth-om">ॐ</div>
        <h1>प्रवेश करें</h1>
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Entering..." : "Enter"}
          </button>
        </form>

        <p className="auth-link">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
