import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Mail,
  Lock,
} from "lucide-react";

function TrainerAuth({ onLoginSuccess, onBackToLanding }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = () => {
    const email = loginEmail.trim().toLowerCase();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    if (!loginPassword) {
      alert("Please enter your password.");
      return;
    }

    setLoggingIn(true);

    // Frontend-only Task 2 login.
    // No database, API or OTP.
    const user = {
      id: "task2-trainer",
      fullName: email.split("@")[0],
      email: email,
      role: "trainer",
      is_active: true,
    };

    localStorage.setItem(
      "capacityConnectCurrentUser",
      JSON.stringify(user)
    );

    setTimeout(() => {
      setLoggingIn(false);

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    }, 300);
  };

  const goBackToLanding = () => {
    if (onBackToLanding) {
      onBackToLanding();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* ================= BRAND PANEL ================= */}

        <div className="auth-brand-panel">

          <button
            type="button"
            className="auth-back-button"
            onClick={goBackToLanding}
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="auth-brand-content">

            <div className="auth-logo">
              <GraduationCap size={25} />
            </div>

            <span className="auth-small-label">
              CAPACITY CONNECT
            </span>

            <h1>
              Teach.
              <br />
              <span>Manage. Empower.</span>
            </h1>

            <p>
              Manage your courses, learning resources and
              trainee progress from one centralized trainer
              workspace.
            </p>

            <div className="auth-info-card">

              <div className="auth-info-icon">
                <GraduationCap size={18} />
              </div>

              <div>
                <strong>Trainer Workspace</strong>

                <span>
                  Courses, trainees & learning management
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* ================= LOGIN PANEL ================= */}

        <div className="auth-form-panel">

          <div className="auth-form-wrapper">

            <div className="auth-header">

              <span className="auth-badge">
                TRAINER ACCOUNT
              </span>

              <h2>Welcome back</h2>

              <p>
                Login to access your trainer workspace
                and manage your learning content.
              </p>

            </div>

            <div className="auth-form">

              {/* EMAIL */}

              <div className="auth-field">

                <label>Email Address</label>

                <div className="auth-input-wrapper">

                  <Mail size={17} />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) =>
                      setLoginEmail(e.target.value)
                    }
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div className="auth-field">

                <label>Password</label>

                <div className="auth-input-wrapper">

                  <Lock size={17} />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) =>
                      setLoginPassword(e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* OPTIONS */}

              <div className="auth-options">

                <label className="remember-option">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() =>
                    alert(
                      "Password reset will be connected in the next authentication module."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>

              {/* LOGIN */}

              <button
                type="button"
                className="auth-submit-button"
                onClick={handleLogin}
                disabled={loggingIn}
                style={{
                  opacity: loggingIn ? 0.7 : 1,
                  cursor: loggingIn
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {loggingIn
                  ? "Logging in..."
                  : "Login"}

                {!loggingIn && (
                  <ArrowRight size={18} />
                )}
              </button>

              {/* INFO */}

              <div
                style={{
                  marginTop: "18px",
                  padding: "12px 14px",
                  background: "#f5faf8",
                  border: "1px solid #e1eee9",
                  borderRadius: "10px",
                  fontSize: "10px",
                  lineHeight: "1.6",
                  color: "#71807a",
                  textAlign: "left",
                }}
              >
                <strong
                  style={{
                    color: "#07885f",
                  }}
                >
                  Trainer Access
                </strong>

                <br />

                Access your courses, trainee profiles,
                learning resources, assessments and
                performance management tools from one
                workspace.

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default TrainerAuth;