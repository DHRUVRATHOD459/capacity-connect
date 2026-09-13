import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Mail,
  Lock,
  User,
  Phone,
  BookOpen,
  Briefcase,
  Award,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function TraineeAuth({ onLoginSuccess, onBackToLanding }) {
  const [mode, setMode] = useState("login");
  const [signupStep, setSignupStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    education: "",
    course: "",
    institution: "",
    year: "",

    qualification: "",
    experience: "",
    interests: "",

    skills: [],
  });

  const skillOptions = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Java",
    "C / C++",
    "SQL",
    "WordPress",
    "UI/UX Design",
    "Cyber Security",
    "Artificial Intelligence",
  ];

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((item) => item !== skill)
        : [...prev.skills, skill],
    }));
  };

  const startSignup = () => {
    setMode("signup");
    setSignupStep(1);
    setOtp("");
  };

  const sendOtp = async () => {
    if (!formData.email.trim()) {
      alert("Please enter your email address first.");
      return;
    }

    if (!formData.fullName.trim()) {
      alert("Please enter your full name.");
      setSignupStep(1);
      return;
    }

    if (!formData.phone.trim()) {
      alert("Please enter your phone number.");
      setSignupStep(1);
      return;
    }

    if (!formData.password) {
      alert("Please create a password.");
      setSignupStep(1);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      setSignupStep(1);
      return;
    }

    setSendingOtp(true);

    try {
      const response = await fetch(
        "https://capacity-connect-backend-syln.onrender.com/api/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Failed to send OTP.");
        return;
      }

      setOtp("");
      setSignupStep(5);

      alert(
        `OTP sent successfully to ${formData.email.trim()}`
      );
    } catch (error) {
      console.error("OTP sending error:", error);

      alert(
        "Unable to connect to the OTP server.\n\nPlease check your internet connection or try again."
      );
    } finally {
      setSendingOtp(false);
    }
  };

  const nextStep = () => {
    if (signupStep === 1) {
      if (!formData.fullName.trim()) {
        alert("Please enter your full name.");
        return;
      }

      if (!formData.email.trim()) {
        alert("Please enter your email address.");
        return;
      }

      if (!formData.phone.trim()) {
        alert("Please enter your phone number.");
        return;
      }

      if (!formData.password) {
        alert("Please create a password.");
        return;
      }

      if (formData.password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
      }

      if (!formData.confirmPassword) {
        alert("Please confirm your password.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    }

    if (signupStep === 2) {
      if (!formData.education) {
        alert("Please select your education level.");
        return;
      }

      if (!formData.course.trim()) {
        alert("Please enter your course / program.");
        return;
      }

      if (!formData.institution.trim()) {
        alert("Please enter your institution.");
        return;
      }

      if (!formData.year.trim()) {
        alert("Please enter your current year / semester.");
        return;
      }
    }

    if (signupStep === 3) {
      if (!formData.qualification.trim()) {
        alert("Please enter your highest qualification.");
        return;
      }

      if (!formData.experience.trim()) {
        alert("Please enter your work experience.");
        return;
      }

      if (!formData.interests.trim()) {
        alert("Please enter your interests.");
        return;
      }
    }

    if (signupStep === 4) {
      if (formData.skills.length === 0) {
        alert("Please select at least one skill.");
        return;
      }

      sendOtp();
      return;
    }

    if (signupStep < 4) {
      setSignupStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (signupStep > 1) {
      setSignupStep((prev) => prev - 1);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter a 6-digit OTP.");
      return;
    }

    setVerifyingOtp(true);

    try {
      const response = await fetch(
        "https://capacity-connect-backend-syln.onrender.com/api/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            otp: otp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Invalid OTP.");
        return;
      }

      const user = {
        ...formData,
        email: formData.email.trim().toLowerCase(),
        role: "trainee",
        emailVerified: true,
      };

      localStorage.setItem(
        "capacityConnectTraineeAccount",
        JSON.stringify(user)
      );

      alert("Email verified successfully! 🎉");

      setSignupStep(6);
    } catch (error) {
      console.error("OTP verification error:", error);

      alert(
        "Unable to connect to the OTP server.\n\nPlease check your internet connection or try again."
      );
    } finally {
      setVerifyingOtp(false);
    }
  };

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

    const savedAccount = localStorage.getItem(
      "capacityConnectTraineeAccount"
    );

    if (!savedAccount) {
      alert(
        "No trainee account found.\n\nPlease create your account first."
      );
      return;
    }

    try {
      const user = JSON.parse(savedAccount);

      if (
        user.email?.toLowerCase() !== email ||
        user.password !== loginPassword
      ) {
        alert("Incorrect email or password.");
        return;
      }

      const loggedInUser = {
        ...user,
        role: "trainee",
      };

      localStorage.setItem(
        "capacityConnectCurrentUser",
        JSON.stringify(loggedInUser)
      );

      if (onLoginSuccess) {
        onLoginSuccess(loggedInUser);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to login. Please try again.");
    }
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

        <div className="auth-brand-panel">

          <button
            type="button"
            className="auth-back-button"
            onClick={() => {
              if (mode === "signup" && signupStep > 1) {
                previousStep();
              } else {
                goBackToLanding();
              }
            }}
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
              Build your skills.
              <br />
              <span>Prove your competency.</span>
            </h1>

            <p>
              Create your trainee profile, select your skills and
              track your verified competency through Capacity Connect.
            </p>

            <div className="auth-info-card">
              <div className="auth-info-icon">
                <GraduationCap size={18} />
              </div>

              <div>
                <strong>Trainee Workspace</strong>

                <span>
                  Personalized learning & competency tracking
                </span>
              </div>
            </div>

          </div>
        </div>

        <div className="auth-form-panel">

          <div className="auth-form-wrapper">

            {mode === "login" && (
              <>
                <div className="auth-header">

                  <span className="auth-badge">
                    TRAINEE ACCOUNT
                  </span>

                  <h2>Welcome back</h2>

                  <p>
                    Login to continue to your personalized
                    learning dashboard.
                  </p>

                </div>

                <div className="auth-form">

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
                          setShowPassword(
                            !showPassword
                          )
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
                          "Password reset will be connected with the database later."
                        )
                      }
                    >
                      Forgot password?
                    </button>

                  </div>

                  <button
                    type="button"
                    className="auth-submit-button"
                    onClick={handleLogin}
                  >
                    Login
                    <ArrowRight size={18} />
                  </button>

                  <div className="auth-switch">

                    <span>
                      Don't have an account?
                    </span>

                    <button
                      type="button"
                      onClick={startSignup}
                    >
                      Create Account
                    </button>

                  </div>

                </div>
              </>
            )}

            {mode === "signup" && signupStep < 6 && (
              <>

                <div className="auth-header">

                  <span className="auth-badge">
                    TRAINEE REGISTRATION
                  </span>

                  <h2>
                    {signupStep === 1 &&
                      "Personal information"}

                    {signupStep === 2 &&
                      "Study details"}

                    {signupStep === 3 &&
                      "Qualification & experience"}

                    {signupStep === 4 &&
                      "Select your skills"}

                    {signupStep === 5 &&
                      "Verify your email"}
                  </h2>

                  <p>
                    {signupStep === 1 &&
                      "Let's start by creating your basic profile."}

                    {signupStep === 2 &&
                      "Tell us about your current education."}

                    {signupStep === 3 &&
                      "Add your qualifications and experience."}

                    {signupStep === 4 &&
                      "Select the skills you want to develop and verify."}

                    {signupStep === 5 &&
                      "Enter the OTP sent to your email address."}
                  </p>

                </div>

                {signupStep <= 4 && (
                  <div style={{ marginBottom: "25px" }}>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "#6f7c77",
                      }}
                    >

                      <span>
                        Step {signupStep} of 4
                      </span>

                      <span>
                        {Math.round(
                          (signupStep / 4) * 100
                        )}
                        %
                      </span>

                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: "6px",
                        background: "#e8efec",
                        borderRadius: "20px",
                        overflow: "hidden",
                      }}
                    >

                      <div
                        style={{
                          width: `${
                            (signupStep / 4) * 100
                          }%`,
                          height: "100%",
                          background: "#07885f",
                          borderRadius: "20px",
                          transition: "0.3s ease",
                        }}
                      />

                    </div>

                  </div>
                )}

                {signupStep === 1 && (
                  <div className="auth-form">

                    <div className="auth-field">

                      <label>Full Name</label>

                      <div className="auth-input-wrapper">

                        <User size={17} />

                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) =>
                            updateField(
                              "fullName",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                    <div className="auth-field">

                      <label>Email Address</label>

                      <div className="auth-input-wrapper">

                        <Mail size={17} />

                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            updateField(
                              "email",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                    <div className="auth-field">

                      <label>Phone Number</label>

                      <div className="auth-input-wrapper">

                        <Phone size={17} />

                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) =>
                            updateField(
                              "phone",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

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
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) =>
                            updateField(
                              "password",
                              e.target.value
                            )
                          }
                        />

                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
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

                    <div className="auth-field">

                      <label>
                        Confirm Password
                      </label>

                      <div className="auth-input-wrapper">

                        <Lock size={17} />

                        <input
                          type="password"
                          placeholder="Confirm your password"
                          value={
                            formData.confirmPassword
                          }
                          onChange={(e) =>
                            updateField(
                              "confirmPassword",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                    <button
                      type="button"
                      className="auth-submit-button"
                      onClick={nextStep}
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>

                  </div>
                )}

                {signupStep === 2 && (
                  <div className="auth-form">

                    <div className="auth-field">

                      <label>
                        Education Level
                      </label>

                      <div className="auth-input-wrapper">

                        <BookOpen size={17} />

                        <select
                          value={formData.education}
                          onChange={(e) =>
                            updateField(
                              "education",
                              e.target.value
                            )
                          }
                        >
                          <option value="">
                            Select education level
                          </option>

                          <option value="Diploma">
                            Diploma
                          </option>

                          <option value="Undergraduate">
                            Undergraduate
                          </option>

                          <option value="Postgraduate">
                            Postgraduate
                          </option>

                          <option value="Other">
                            Other
                          </option>

                        </select>

                      </div>

                    </div>

                    <div className="auth-field">

                      <label>
                        Course / Program
                      </label>

                      <div className="auth-input-wrapper">

                        <GraduationCap size={17} />

                        <input
                          type="text"
                          placeholder="e.g. Diploma in Computer Engineering"
                          value={formData.course}
                          onChange={(e) =>
                            updateField(
                              "course",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                    <div className="auth-field">

                      <label>Institution</label>

                      <div className="auth-input-wrapper">

                        <BookOpen size={17} />

                        <input
                          type="text"
                          placeholder="Enter institution name"
                          value={formData.institution}
                          onChange={(e) =>
                            updateField(
                              "institution",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                    <div className="auth-field">

                      <label>
                        Current Year / Semester
                      </label>

                      <div className="auth-input-wrapper">

                        <GraduationCap size={17} />

                        <input
                          type="text"
                          placeholder="e.g. 3rd Semester"
                          value={formData.year}
                          onChange={(e) =>
                            updateField(
                              "year",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                    <button
                      type="button"
                      className="auth-submit-button"
                      onClick={nextStep}
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={previousStep}
                      style={{
                        width: "100%",
                        height: "42px",
                        borderRadius: "10px",
                        border: "1px solid #dfe7e3",
                        background: "#ffffff",
                        color: "#66736e",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      ← Back
                    </button>

                  </div>
                )}

                {signupStep === 3 && (
                  <div className="auth-form">

                    <div className="auth-field">

                      <label>
                        Highest Qualification
                      </label>

                      <div className="auth-input-wrapper">

                        <Award size={17} />

                        <input
                          type="text"
                          placeholder="e.g. 10th, 12th, Diploma"
                          value={
                            formData.qualification
                          }
                          onChange={(e) =>
                            updateField(
                              "qualification",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                    <div className="auth-field">

                      <label>
                        Work Experience
                      </label>

                      <div className="auth-input-wrapper">

                        <Briefcase size={17} />

                        <input
                          type="text"
                          placeholder="e.g. Fresher / 1 year"
                          value={formData.experience}
                          onChange={(e) =>
                            updateField(
                              "experience",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                    <div className="auth-field">

                      <label>Interests</label>

                      <div className="auth-input-wrapper">

                        <BookOpen size={17} />

                        <input
                          type="text"
                          placeholder="e.g. AI, Web Development"
                          value={formData.interests}
                          onChange={(e) =>
                            updateField(
                              "interests",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                    <button
                      type="button"
                      className="auth-submit-button"
                      onClick={nextStep}
                    >
                      Continue
                      <ArrowRight size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={previousStep}
                      style={{
                        width: "100%",
                        height: "42px",
                        borderRadius: "10px",
                        border: "1px solid #dfe7e3",
                        background: "#ffffff",
                        color: "#66736e",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      ← Back
                    </button>

                  </div>
                )}

                {signupStep === 4 && (
                  <div className="auth-form">

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(2, minmax(0, 1fr))",
                        gap: "9px",
                      }}
                    >

                      {skillOptions.map((skill) => {

                        const selected =
                          formData.skills.includes(
                            skill
                          );

                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() =>
                              toggleSkill(skill)
                            }
                            style={{
                              border: selected
                                ? "1px solid #07885f"
                                : "1px solid #dfe7e3",
                              background: selected
                                ? "#eaf8f3"
                                : "#fbfdfc",
                              color: selected
                                ? "#087c58"
                                : "#52605b",
                              borderRadius: "10px",
                              padding: "12px 10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                "space-between",
                              fontSize: "10px",
                              fontWeight: "700",
                              cursor: "pointer",
                            }}
                          >

                            <span>{skill}</span>

                            {selected && (
                              <CheckCircle2
                                size={15}
                              />
                            )}

                          </button>
                        );
                      })}

                    </div>

                    <div
                      style={{
                        padding: "11px 13px",
                        background: "#f5faf8",
                        border:
                          "1px solid #e1eee9",
                        borderRadius: "10px",
                        fontSize: "10px",
                        color: "#71807a",
                      }}
                    >

                      <strong
                        style={{
                          color: "#087c58",
                        }}
                      >
                        {formData.skills.length}
                      </strong>{" "}
                      skills selected.

                      <br />

                      These skills will be verified
                      after account creation through
                      assessment and AI evaluation.

                    </div>

                    <button
                      type="button"
                      className="auth-submit-button"
                      onClick={nextStep}
                      disabled={sendingOtp}
                      style={{
                        opacity: sendingOtp ? 0.7 : 1,
                        cursor: sendingOtp
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      {sendingOtp
                        ? "Sending OTP..."
                        : "Continue"}

                      {!sendingOtp && (
                        <ArrowRight size={18} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={previousStep}
                      disabled={sendingOtp}
                      style={{
                        width: "100%",
                        height: "42px",
                        borderRadius: "10px",
                        border: "1px solid #dfe7e3",
                        background: "#ffffff",
                        color: "#66736e",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: sendingOtp
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      ← Back
                    </button>

                  </div>
                )}

                {signupStep === 5 && (
                  <div className="auth-form">

                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "16px",
                        background: "#eaf8f3",
                        color: "#07885f",
                        display: "grid",
                        placeItems: "center",
                        margin: "0 auto",
                      }}
                    >
                      <ShieldCheck size={28} />
                    </div>

                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "11px",
                        color: "#78858f",
                        margin: 0,
                      }}
                    >
                      Enter the 6-digit verification
                      code for
                    </p>

                    <strong
                      style={{
                        textAlign: "center",
                        color: "#172033",
                        fontSize: "12px",
                      }}
                    >
                      {formData.email || "your email"}
                    </strong>

                    <div className="auth-field">

                      <label>Enter OTP</label>

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
                              e.target.value.replace(
                                /\D/g,
                                ""
                              )
                            )
                          }
                        />

                      </div>

                    </div>

                    <button
                      type="button"
                      className="auth-submit-button"
                      onClick={verifyOtp}
                      disabled={verifyingOtp}
                      style={{
                        opacity: verifyingOtp ? 0.7 : 1,
                        cursor: verifyingOtp
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      {verifyingOtp
                        ? "Verifying..."
                        : "Verify & Create Account"}

                      {!verifyingOtp && (
                        <CheckCircle2 size={18} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={previousStep}
                      disabled={verifyingOtp}
                      style={{
                        width: "100%",
                        height: "42px",
                        borderRadius: "10px",
                        border: "1px solid #dfe7e3",
                        background: "#ffffff",
                        color: "#66736e",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: verifyingOtp
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      ← Back
                    </button>

                  </div>
                )}

              </>
            )}

            {mode === "signup" && signupStep === 6 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "25px 0",
                }}
              >

                <div
                  style={{
                    width: "76px",
                    height: "76px",
                    borderRadius: "50%",
                    background: "#e8f8f2",
                    color: "#07885f",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 22px",
                  }}
                >
                  <CheckCircle2 size={40} />
                </div>

                <span className="auth-badge">
                  ACCOUNT CREATED
                </span>

                <h2 style={{ marginTop: "18px" }}>
                  Welcome to Capacity Connect,
                  <br />
                  {formData.fullName || "Trainee"}!
                </h2>

                <p
                  style={{
                    color: "#74808d",
                    fontSize: "12px",
                    lineHeight: "1.7",
                    marginBottom: "25px",
                  }}
                >
                  Your trainee account has been
                  successfully created.
                </p>

                <button
                  type="button"
                  className="auth-submit-button"
                  onClick={() => {
                    setMode("login");
                    setSignupStep(1);
                    setLoginEmail(formData.email);
                    setLoginPassword("");
                  }}
                >
                  Go to Login
                  <ArrowRight size={18} />
                </button>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default TraineeAuth;