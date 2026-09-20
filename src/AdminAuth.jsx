import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Mail,
  Lock,
  ShieldCheck,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function AdminAuth({ onLoginSuccess, onBackToLanding }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setLoggingIn(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.trim().toLowerCase(),
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Admin login failed.");
      }

      const adminUser = data.user;
      localStorage.setItem("capacityConnectCurrentUser", JSON.stringify(adminUser));

      if (onLoginSuccess) {
        onLoginSuccess(adminUser);
      }
    } catch (error) {
      setErrorMessage(error.message || "Unable to login. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const goBackToLanding = () => {
    if (onBackToLanding) onBackToLanding();
    else window.location.reload();
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* ================= BRAND PANEL ================= */}
        <div className="auth-brand-panel">
          <button type="button" className="auth-back-button" onClick={goBackToLanding}>
            <ArrowLeft size={17} /> Back
          </button>

          <div className="auth-brand-content">
            <div className="auth-logo"><GraduationCap size={25} /></div>
            <span className="auth-small-label">CAPACITY CONNECT</span>
            <h1>
              Govern.
              <br />
              <span>Verify. Scale.</span>
            </h1>
            <p>
              Oversee the entire Capacity Connect portal — manage trainers, trainees, competency verification and organizational analytics from one command center.
            </p>
            <div className="auth-info-card">
              <div className="auth-info-icon"><ShieldCheck size={18} /></div>
              <div>
                <strong>Admin Command Center</strong>
                <span>Users, verification & analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FORM PANEL ================= */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <span className="auth-badge">ORGANIZATION ADMIN</span>
              <h2>Admin Login</h2>
              <p>Sign in to manage trainers, trainees and organizational learning.</p>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              <div className="auth-field">
                <label>Email Address</label>
                <div className="auth-input-wrapper">
                  <Mail size={17} />
                  <input
                    type="email"
                    placeholder="Enter admin email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    disabled={loggingIn}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={17} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={loggingIn}
                    onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loggingIn}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div style={{ marginTop: "12px", padding: "11px 13px", background: "#fff4f4", border: "1px solid #f3d1d1", borderRadius: "10px", fontSize: "12px", color: "#c0392b" }}>
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loggingIn}
                style={{ opacity: loggingIn ? 0.7 : 1, cursor: loggingIn ? "not-allowed" : "pointer" }}
              >
                {loggingIn ? "Signing in..." : "Sign In"}
                {!loggingIn && <ArrowRight size={18} />}
              </button>

              <div style={{ marginTop: "18px", padding: "12px 14px", background: "#f5faf8", border: "1px solid #e1eee9", borderRadius: "10px", fontSize: "10px", color: "#71807a" }}>
                <strong style={{ color: "#07885f" }}>Secure Admin Access</strong>
                <br />
                Admin accounts are restricted to authorized organization administrators.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAuth;