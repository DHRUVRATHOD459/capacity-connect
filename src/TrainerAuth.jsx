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
  RefreshCw,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function TrainerAuth({ onLoginSuccess, onBackToLanding }) {
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState("login");
  const [loggingIn, setLoggingIn] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    const email = loginEmail.trim().toLowerCase();

    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!loginPassword) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setLoggingIn(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/trainer-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: loginPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Trainer login failed."
        );
      }

      setSuccessMessage(
        "OTP has been sent to your registered email."
      );

      setStep("otp");
      setOtp("");
    } catch (error) {
      setErrorMessage(
        error.message ||
          "Unable to connect to the authentication server."
      );
    } finally {
      setLoggingIn(false);
    }
  };

  const handleVerifyOtp = async () => {
    const email = loginEmail.trim().toLowerCase();

    setErrorMessage("");
    setSuccessMessage("");

    if (!otp || otp.length !== 6) {
      setErrorMessage("Please enter the 6-digit OTP.");
      return;
    }

    setVerifyingOtp(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/trainer-verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "OTP verification failed."
        );
      }

      // ==========================================
      // REAL TRAINER DATA RECEIVED FROM BACKEND
      // ==========================================
      console.log("=================================");
      console.log("CAPACITY CONNECT - TRAINER DATA");
      console.log("=================================");
      console.log("Full API Response:", data);
      console.log("Trainer User Object:", data.user);
      console.log("Trainer Name:", data.user?.fullName);
      console.log("Trainer Email:", data.user?.email);
      console.log("Qualification:", data.user?.qualification);
      console.log("Experience:", data.user?.experience);
      console.log(
        "Specialization:",
        data.user?.specialization
      );
      console.log("Organization:", data.user?.organization);
      console.log("Designation:", data.user?.designation);
      console.log("=================================");

      const trainer = data.user;

      localStorage.setItem(
        "capacityConnectCurrentUser",
        JSON.stringify(trainer)
      );

      setSuccessMessage(
        "OTP verified successfully. Opening trainer workspace..."
      );

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(trainer);
        }
      }, 500);
    } catch (error) {
      setErrorMessage(
        error.message || "Invalid or expired OTP."
      );
    } finally {
      setVerifyingOtp(false);
    }
  };

  const resendOtp = async () => {
    const email = loginEmail.trim().toLowerCase();

    if (!email || !loginPassword) {
      setErrorMessage(
        "Please return to login and enter your credentials again."
      );
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setResendingOtp(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/trainer-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: loginPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to resend OTP."
        );
      }

      setSuccessMessage(
        "A new OTP has been sent to your registered email."
      );
      setOtp("");
    } catch (error) {
      setErrorMessage(
        error.message || "Unable to resend OTP."
      );
    } finally {
      setResendingOtp(false);
    }
  };

  const goBackToLanding = () => {
    if (onBackToLanding) {
      onBackToLanding();
    } else {
      window.location.reload();
    }
  };

  const goBackToLogin = () => {
    setStep("login");
    setOtp("");
    setErrorMessage("");
    setSuccessMessage("");
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

        {/* ================= FORM PANEL ================= */}

        <div className="auth-form-panel">

          <div className="auth-form-wrapper">

            {/* ================= LOGIN ================= */}

            {step === "login" && (
              <>
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
                        placeholder="Enter your registered email"
                        value={loginEmail}
                        onChange={(e) =>
                          setLoginEmail(e.target.value)
                        }
                        disabled={loggingIn}
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
                        disabled={loggingIn}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleLogin();
                          }
                        }}
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        disabled={loggingIn}
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

                  {/* ERROR */}

                  {errorMessage && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "11px 13px",
                        background: "#fff4f4",
                        border: "1px solid #f3d1d1",
                        borderRadius: "10px",
                        fontSize: "12px",
                        lineHeight: "1.5",
                        color: "#c0392b",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* SUCCESS */}

                  {successMessage && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "11px 13px",
                        background: "#f2fbf7",
                        border: "1px solid #d4eee3",
                        borderRadius: "10px",
                        fontSize: "12px",
                        lineHeight: "1.5",
                        color: "#07885f",
                      }}
                    >
                      {successMessage}
                    </div>
                  )}

                  {/* LOGIN BUTTON */}

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
                      ? "Checking credentials..."
                      : "Continue to verification"}

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
                      Secure Trainer Access
                    </strong>

                    <br />

                    Trainer accounts are created by the
                    administrator. After password verification,
                    a one-time OTP is sent to the registered
                    trainer email.

                  </div>

                </div>
              </>
            )}

            {/* ================= OTP ================= */}

            {step === "otp" && (
              <>
                <div className="auth-header">

                  <span className="auth-badge">
                    EMAIL VERIFICATION
                  </span>

                  <h2>Verify your account</h2>

                  <p>
                    Enter the 6-digit OTP sent to your
                    registered trainer email.
                  </p>

                </div>

                <div className="auth-form">

                  {/* OTP ICON */}

                  <div
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "16px",
                      background: "#effaf6",
                      border: "1px solid #d8eee6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                      color: "#07885f",
                    }}
                  >
                    <ShieldCheck size={28} />
                  </div>

                  {/* EMAIL INFO */}

                  <div
                    style={{
                      marginBottom: "18px",
                      fontSize: "12px",
                      color: "#71807a",
                      lineHeight: "1.6",
                    }}
                  >
                    OTP sent to:

                    <br />

                    <strong
                      style={{
                        color: "#26332f",
                      }}
                    >
                      {loginEmail}
                    </strong>
                  </div>

                  {/* OTP */}

                  <div className="auth-field">

                    <label>Verification Code</label>

                    <div className="auth-input-wrapper">

                      <ShieldCheck size={17} />

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) =>
                          setOtp(
                            e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6)
                          )
                        }
                        disabled={verifyingOtp}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleVerifyOtp();
                          }
                        }}
                        style={{
                          letterSpacing: "5px",
                          fontWeight: "600",
                        }}
                      />

                    </div>

                  </div>

                  {/* ERROR */}

                  {errorMessage && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "11px 13px",
                        background: "#fff4f4",
                        border: "1px solid #f3d1d1",
                        borderRadius: "10px",
                        fontSize: "12px",
                        lineHeight: "1.5",
                        color: "#c0392b",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* SUCCESS */}

                  {successMessage && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "11px 13px",
                        background: "#f2fbf7",
                        border: "1px solid #d4eee3",
                        borderRadius: "10px",
                        fontSize: "12px",
                        lineHeight: "1.5",
                        color: "#07885f",
                      }}
                    >
                      {successMessage}
                    </div>
                  )}

                  {/* VERIFY */}

                  <button
                    type="button"
                    className="auth-submit-button"
                    onClick={handleVerifyOtp}
                    disabled={
                      verifyingOtp || otp.length !== 6
                    }
                    style={{
                      opacity:
                        verifyingOtp || otp.length !== 6
                          ? 0.7
                          : 1,
                      cursor:
                        verifyingOtp || otp.length !== 6
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {verifyingOtp
                      ? "Verifying..."
                      : "Verify & Continue"}

                    {!verifyingOtp && (
                      <ArrowRight size={18} />
                    )}
                  </button>

                  {/* RESEND / BACK */}

                  <div
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >

                    <button
                      type="button"
                      className="forgot-button"
                      onClick={goBackToLogin}
                      disabled={verifyingOtp}
                    >
                      <ArrowLeft
                        size={13}
                        style={{
                          verticalAlign: "middle",
                          marginRight: "4px",
                        }}
                      />
                      Back to login
                    </button>

                    <button
                      type="button"
                      className="forgot-button"
                      onClick={resendOtp}
                      disabled={resendingOtp || verifyingOtp}
                    >
                      <RefreshCw
                        size={13}
                        style={{
                          verticalAlign: "middle",
                          marginRight: "4px",
                        }}
                      />

                      {resendingOtp
                        ? "Sending..."
                        : "Resend OTP"}
                    </button>

                  </div>

                  {/* SECURITY INFO */}

                  <div
                    style={{
                      marginTop: "20px",
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
                      One-Time Verification
                    </strong>

                    <br />

                    This OTP is valid for a limited time.
                    Never share your verification code with
                    anyone.

                  </div>

                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default TrainerAuth;