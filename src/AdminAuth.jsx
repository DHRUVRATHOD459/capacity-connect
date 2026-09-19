import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function AdminAuth({ onLoginSuccess, onBackToLanding }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loggingIn, setLoggingIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoggingIn(true);

      const response = await fetch(
        `${API_BASE_URL}/api/admin-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("=================================");
      console.log("CAPACITY CONNECT - ADMIN LOGIN");
      console.log("=================================");
      console.log("Full API Response:", data);
      console.log("Admin User:", data.user);
      console.log("=================================");

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Admin login failed."
        );
      }

      const adminUser = {
        ...data.user,
        adminToken: data.token,
      };

      setSuccessMessage("Admin login successful.");

      localStorage.setItem(
        "capacityConnectCurrentUser",
        JSON.stringify(adminUser)
      );

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(adminUser);
        }
      }, 400);
    } catch (error) {
      console.error("Admin login error:", error);

      setErrorMessage(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <button
          className="auth-back-button"
          onClick={onBackToLanding}
          type="button"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="auth-brand">
          <div className="auth-brand-icon">
            <Sparkles size={21} />
          </div>

          <div>
            <strong>Capacity</strong>
            <span>CONNECT</span>
          </div>
        </div>

        <div className="auth-icon-large">
          <ShieldCheck size={28} />
        </div>

        <div className="auth-heading">
          <span className="auth-eyebrow">
            ORGANIZATION ADMIN
          </span>

          <h1>Admin Login</h1>

          <p>
            Sign in to manage trainers, trainees and
            organizational learning.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="auth-field">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loggingIn}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <div className="auth-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loggingIn}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                disabled={loggingIn}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="auth-error">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="auth-success">
              {successMessage}
            </div>
          )}

          <button
            className="auth-submit-button"
            type="submit"
            disabled={loggingIn}
          >
            {loggingIn ? (
              "Signing in..."
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-security-note">
          <ShieldCheck size={16} />

          <span>
            Admin access is restricted to authorized
            organization administrators.
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminAuth;