import { useEffect, useMemo, useState } from "react";
import AppDashboard from "./AppDashboard";
import TraineeAuth from "./TraineeAuth";
import TrainerAuth from "./TrainerAuth";
import AdminAuth from "./AdminAuth";

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
  BarChart3,
  BookOpen,
  Target,
  ClipboardCheck,
  FileText,
  MessageSquare,
  Settings,
  Search,
  TrendingUp,
  Award,
  Video,
  Upload,
  ChevronRight,
  RefreshCw,
  X,
  Eye,
  Plus,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

/* =========================================================
   MAIN APP
   ========================================================= */

function App() {
  const [showRoles, setShowRoles] = useState(false);
  const [showTraineeAuth, setShowTraineeAuth] = useState(false);
  const [showTrainerAuth, setShowTrainerAuth] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(
        "capacityConnectCurrentUser"
      );
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (user) => {
    localStorage.setItem(
      "capacityConnectCurrentUser",
      JSON.stringify(user)
    );

    setCurrentUser(user);
    setShowTraineeAuth(false);
    setShowTrainerAuth(false);
    setShowAdminAuth(false);
    setShowRoles(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("capacityConnectCurrentUser");
    setCurrentUser(null);
    setShowTraineeAuth(false);
    setShowTrainerAuth(false);
    setShowAdminAuth(false);
    setShowRoles(false);
  };

  if (currentUser?.role === "trainee") {
    return (
      <AppDashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  if (currentUser?.role === "trainer") {
    return (
      <TrainerDashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  if (currentUser?.role === "admin") {
    return (
      <AdminDashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  if (showTraineeAuth) {
    return (
      <TraineeAuth
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setShowTraineeAuth(false)}
      />
    );
  }

  if (showTrainerAuth) {
    return (
      <TrainerAuth
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setShowTrainerAuth(false)}
      />
    );
  }

  if (showAdminAuth) {
    return (
      <AdminAuth
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setShowAdminAuth(false)}
      />
    );
  }

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-mark">
            <Sparkles size={21} strokeWidth={2.5} />
          </div>
          <div>
            <div className="brand-name">Capacity</div>
            <div className="brand-subtitle">CONNECT</div>
          </div>
        </div>

        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <button
          className="nav-button"
          onClick={() => setShowRoles(true)}
        >
          Get Started
          <ArrowRight size={17} />
        </button>
      </nav>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={15} />
              Intelligent Capacity Building Platform
            </div>

            <h1>
              Build Skills.
              <span> Verify Competency.</span>
              <br />
              Connect with the Right Learning.
            </h1>

            <p className="hero-description">
              Capacity Connect brings trainees, trainers and
              organizations together through verified skills,
              personalized learning, intelligent recommendations
              and measurable progress.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => setShowRoles(true)}
              >
                Get Started
                <ArrowRight size={18} />
              </button>

              <a
                href="#how-it-works"
                className="secondary-button"
              >
                Explore Platform
              </a>
            </div>

            <div className="trust-row">
              <div>
                <CheckCircle2 size={17} />
                Verified competency
              </div>
              <div>
                <CheckCircle2 size={17} />
                AI-powered guidance
              </div>
              <div>
                <CheckCircle2 size={17} />
                Role-based platform
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="platform-card">
              <div className="platform-card-top">
                <div>
                  <div className="small-label">
                    CAPACITY CONNECT
                  </div>
                  <h3>Learning Intelligence</h3>
                </div>

                <div className="ai-icon">
                  <BrainCircuit size={25} />
                </div>
              </div>

              <div className="skill-panel">
                <div className="skill-panel-header">
                  <span>Your Competency</span>
                  <strong>5.2 / 7</strong>
                </div>

                <div className="skill-progress">
                  <div className="skill-progress-fill"></div>
                </div>

                <div className="skill-levels">
                  <span>Basic</span>
                  <span>Developing</span>
                  <span>Proficient</span>
                  <span>Expert</span>
                </div>
              </div>

              <div className="visual-grid">
                <div className="visual-mini-card">
                  <div className="mini-icon blue">
                    <Target size={19} />
                  </div>
                  <div>
                    <span>Skill Gap</span>
                    <strong>3 areas</strong>
                  </div>
                </div>

                <div className="visual-mini-card">
                  <div className="mini-icon orange">
                    <BookOpen size={19} />
                  </div>
                  <div>
                    <span>Learning Path</span>
                    <strong>42 hours</strong>
                  </div>
                </div>
              </div>

              <div className="recommendation-card">
                <div className="recommendation-icon">
                  <Sparkles size={19} />
                </div>

                <div>
                  <span>AI Recommendation</span>
                  <strong>Improve JavaScript next</strong>
                  <p>Based on your verified skill gap</p>
                </div>

                <ArrowRight size={18} />
              </div>
            </div>

            <div className="floating-card floating-top">
              <div className="floating-icon">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <span>Skill verified</span>
                <strong>React · 6/7</strong>
              </div>
            </div>

            <div className="floating-card floating-bottom">
              <div className="floating-icon orange-bg">
                <Users size={18} />
              </div>
              <div>
                <span>Trainer Match</span>
                <strong>92% match</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="section-heading">
            <div className="section-badge">HOW IT WORKS</div>

            <h2>
              From claimed skills to verified capability.
            </h2>

            <p>
              Capacity Connect creates a continuous cycle of
              assessment, learning, verification and improvement.
            </p>
          </div>

          <div className="process-grid">
            <ProcessCard
              number="01"
              icon={<Users size={22} />}
              title="Create your profile"
              text="Build a structured profile with qualifications, interests, experience and skills."
            />

            <ProcessCard
              number="02"
              icon={<BarChart3 size={22} />}
              title="Verify competency"
              text="Assess your knowledge through tests and skill-focused AI interview evaluation."
            />

            <ProcessCard
              number="03"
              icon={<Target size={22} />}
              title="Identify skill gaps"
              text="Compare verified competency with your target skills and learning requirements."
            />

            <ProcessCard
              number="04"
              icon={<BrainCircuit size={22} />}
              title="Learn & improve"
              text="Receive personalized courses, trainers and learning paths based on your gaps."
            />
          </div>
        </section>

        <section
          className="section features-section"
          id="features"
        >
          <div className="section-heading">
            <div className="section-badge">
              ONE CONNECTED PLATFORM
            </div>

            <h2>
              Designed around real competency development.
            </h2>

            <p>
              Everything required to manage learning, training and
              organizational capacity in one place.
            </p>
          </div>

          <div className="feature-grid">
            <FeatureCard
              icon={<GraduationCap size={23} />}
              title="Trainee Learning"
              text="Personalized learning based on verified skills, progress and competency gaps."
            />

            <FeatureCard
              icon={<Users size={23} />}
              title="Trainer Network"
              text="Connect trainees with trainers based on expertise, requirements and matching."
            />

            <FeatureCard
              icon={<BrainCircuit size={23} />}
              title="Capacity AI"
              text="Context-aware assistance for learning guidance, explanations and recommendations."
            />

            <FeatureCard
              icon={<ShieldCheck size={23} />}
              title="Verified Skills"
              text="Combine assessments and AI interview evaluation to establish competency levels."
            />
          </div>
        </section>

        <section className="final-cta" id="about">
          <div>
            <div className="section-badge">CAPACITY CONNECT</div>

            <h2>
              Turn learning into measurable capability.
            </h2>

            <p>
              A centralized digital platform for training,
              competency development and knowledge sharing.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => setShowRoles(true)}
          >
            Enter Platform
            <ArrowRight size={18} />
          </button>
        </section>
      </main>

      {showRoles && (
        <div
          className="modal-overlay"
          onClick={() => setShowRoles(false)}
        >
          <div
            className="role-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowRoles(false)}
            >
              ×
            </button>

            <div className="modal-badge">
              <Sparkles size={15} />
              Welcome to Capacity Connect
            </div>

            <h2>How would you like to continue?</h2>

            <p>
              Select your role to enter the appropriate Capacity
              Connect experience.
            </p>

            <div className="role-options">
              <RoleCard
                icon={<GraduationCap size={25} />}
                title="Trainee"
                text="Learn, verify skills and track your competency."
                onClick={() => {
                  setShowRoles(false);
                  setShowTraineeAuth(true);
                }}
              />

              <RoleCard
                icon={<Users size={25} />}
                title="Trainer"
                text="Create learning content and support trainees."
                onClick={() => {
                  setShowRoles(false);
                  setShowTrainerAuth(true);
                }}
              />

              <RoleCard
                icon={<ShieldCheck size={25} />}
                title="Organization Admin"
                text="Manage users, learning and organizational analytics."
                onClick={() => {
                  setShowRoles(false);
                  setShowAdminAuth(true);
                }}
              />
            </div>

            <div className="modal-note">
              Admin access is restricted to authorized
              organization administrators.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   ADMIN DASHBOARD (FIXED - Graphs, Reviews, Buttons)
   ========================================================= */

function AdminDashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [showAddTraineeModal, setShowAddTraineeModal] = useState(false);
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [trainees, setTrainees] = useState([]);
  const [loadingTrainees, setLoadingTrainees] = useState(false);

  // Mock Review Queue (Demo data)
  const [reviewQueue, setReviewQueue] = useState([
    { id: 1, userName: "Dhruv Rathod", role: "Trainee", skill: "JavaScript", proposedLevel: 5, aiCheatFlag: "None", status: "Pending" },
    { id: 2, userName: "Arjun Mehta", role: "Trainer", skill: "React", proposedLevel: 0, aiCheatFlag: "Suspicious (Tab Switch)", status: "Pending" }
  ]);

  // Fetch Trainees from Backend
  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        setLoadingTrainees(true);
        const response = await fetch(`${API_BASE}/api/trainer/trainees`);
        const data = await response.json();
        if (response.ok && data.success) setTrainees(data.trainees || []);
      } catch (error) {
        console.error("Admin fetch error:", error);
      } finally {
        setLoadingTrainees(false);
      }
    };
    fetchTrainees();
  }, []);

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setShowEvidenceModal(true);
  };

  const handleApprove = (review) => {
    setReviewQueue(prev => prev.filter(r => r.id !== review.id));
    setShowEvidenceModal(false);
    alert(`✅ ${review.userName}'s ${review.skill} verified at ${review.proposedLevel}/7`);
  };

  const handleReject = (review) => {
    setReviewQueue(prev => prev.filter(r => r.id !== review.id));
    setShowEvidenceModal(false);
    alert(`❌ ${review.userName}'s ${review.skill} rejected (0/7)`);
  };

  const totalSkills = trainees.reduce((total, t) => total + (t.skills?.length || 0), 0);
  const verifiedSkills = trainees.reduce((total, t) => total + (t.skills || []).filter(s => s.isVerified).length, 0);
  const avgLevel = totalSkills > 0 ? (trainees.reduce((sum, t) => sum + (t.skills || []).reduce((s, sk) => s + Number(sk.level || 0), 0), 0) / totalSkills).toFixed(1) : "0.0";

  // Bar Chart Data Calculation (FIXED - relative heights)
  const barData = [0, 1, 2, 3, 4, 5, 6, 7].map(level => {
    const count = trainees.flatMap(t => t.skills || []).filter(s => Number(s.level) === level).length;
    return { level, count };
  });
  const maxBarCount = Math.max(...barData.map(d => d.count), 1);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f172a" }}>
      {/* SIDEBAR */}
      <aside style={{ width: "260px", background: "#1e293b", borderRight: "1px solid #334155", padding: "24px", display: "flex", flexDirection: "column", flexShrink: "0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", color: "#38bdf8" }}>
          <ShieldCheck size={24} />
          <span style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>ADMIN<span style={{color: "#38bdf8"}}>PANEL</span></span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
          <AdminNavItem icon={<BarChart3 size={18} />} label="Overview & Analytics" active={activeSection === "dashboard"} onClick={() => setActiveSection("dashboard")} />
          <AdminNavItem icon={<Users size={18} />} label="All Trainees" active={activeSection === "trainees"} onClick={() => setActiveSection("trainees")} />
          <AdminNavItem icon={<GraduationCap size={18} />} label="All Trainers" active={activeSection === "trainers"} onClick={() => setActiveSection("trainers")} />
          <AdminNavItem icon={<ClipboardCheck size={18} />} label={`Verification Reviews (${reviewQueue.length})`} active={activeSection === "reviews"} onClick={() => setActiveSection("reviews")} />
        </nav>
        <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", borderRadius: "8px", border: "1px solid #475569", background: "transparent", color: "#f8fafc", fontWeight: "600", cursor: "pointer", marginTop: "16px" }}>
          <ArrowRight size={18} style={{ transform: "rotate(180deg)" }} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "32px", background: "#f8fafc", overflowY: "auto" }}>
        <header style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "1px", color: "#64748b" }}>ORGANIZATION ADMIN</span>
            <h1 style={{ margin: "8px 0 0", fontSize: "28px", color: "#0f172a" }}>
              {activeSection === "dashboard" ? "Portal Overview" :
               activeSection === "trainees" ? "All Trainees" :
               activeSection === "trainers" ? "All Trainers" :
               activeSection === "reviews" ? "Pending Verification Reviews" : "Portal Overview"}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#07885f", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>A</div>
            <div>
              <div style={{ fontWeight: "700", fontSize: "14px", color: "#0f172a" }}>{user?.fullName || "Admin"}</div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>{user?.email}</div>
            </div>
          </div>
        </header>

        {/* DASHBOARD / ANALYTICS */}
        {activeSection === "dashboard" && (
          <>
            {/* Stats Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
              <StatCard label="Total Trainees" value={loadingTrainees ? "..." : String(trainees.length)} detail="Live Database" color="#07885f" />
              <StatCard label="Total Trainers" value="0" detail="No trainers yet" color="#2563eb" />
              <StatCard label="Pending Reviews" value={String(reviewQueue.length)} detail="Action Required" color="#dc2626" />
              <StatCard label="Avg. Competency" value={`${avgLevel}/7`} detail="Across all skills" color="#ea580c" />
            </div>

            {/* Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {/* Bar Chart - Skill Level Distribution (FIXED) */}
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px" }}>
                <h3 style={{ marginTop: 0, fontSize: "16px", color: "#0f172a", marginBottom: "20px" }}>Skill Level Distribution</h3>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "220px", padding: "20px 0", borderBottom: "2px solid #e2e8f0" }}>
                  {barData.map(({ level, count }) => {
                    const barHeight = (count / maxBarCount) * 160;
                    const barColor = level <= 3 ? "#fecaca" : level <= 5 ? "#fed7aa" : "#bbf7d0";
                    return (
                      <div key={level} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>{count}</span>
                        <div style={{ width: "100%", background: barColor, borderRadius: "6px 6px 0 0", height: `${Math.max(8, barHeight)}px`, transition: "height 0.5s", minHeight: "8px" }}></div>
                        <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>L{level}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: "16px", padding: "12px", background: "#f8fafc", borderRadius: "8px", fontSize: "12px", color: "#64748b" }}>
                  <strong>Legend:</strong>
                  <span style={{ marginLeft: "12px" }}><span style={{ display: "inline-block", width: "12px", height: "12px", background: "#fecaca", borderRadius: "2px", marginRight: "4px" }}></span>0-3 (Developing)</span>
                  <span style={{ marginLeft: "12px" }}><span style={{ display: "inline-block", width: "12px", height: "12px", background: "#fed7aa", borderRadius: "2px", marginRight: "4px" }}></span>4-5 (Intermediate)</span>
                  <span style={{ marginLeft: "12px" }}><span style={{ display: "inline-block", width: "12px", height: "12px", background: "#bbf7d0", borderRadius: "2px", marginRight: "4px" }}></span>6-7 (Expert)</span>
                </div>
              </div>

              {/* Pie Chart - Verified vs Unverified (FIXED SVG) */}
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px" }}>
                <h3 style={{ marginTop: 0, fontSize: "16px", color: "#0f172a", marginBottom: "20px" }}>Verified vs Unverified</h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "40px", minHeight: "220px" }}>
                  <div style={{ position: "relative", width: "180px", height: "180px" }}>
                    <svg width="180" height="180" viewBox="0 0 180 180">
                      <circle cx="90" cy="90" r="70" fill="#e2e8f0" />
                      {totalSkills > 0 && (
                        <circle
                          cx="90"
                          cy="90"
                          r="70"
                          fill="none"
                          stroke="#07885f"
                          strokeWidth="40"
                          strokeDasharray={`${(verifiedSkills/totalSkills) * 440} 440`}
                          transform="rotate(-90 90 90)"
                        />
                      )}
                      <circle cx="90" cy="90" r="50" fill="#fff" />
                    </svg>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                      <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a" }}>{totalSkills > 0 ? Math.round((verifiedSkills/totalSkills)*100) : 0}%</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Verified</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#07885f" }}></div>
                      <span style={{ fontSize: "14px", color: "#0f172a" }}>Verified</span>
                      <strong style={{ fontSize: "14px", color: "#07885f" }}>{verifiedSkills}</strong>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#e2e8f0" }}></div>
                      <span style={{ fontSize: "14px", color: "#0f172a" }}>Unverified</span>
                      <strong style={{ fontSize: "14px", color: "#64748b" }}>{totalSkills - verifiedSkills}</strong>
                    </div>
                    <div style={{ marginTop: "8px", padding: "8px 12px", background: "#f8fafc", borderRadius: "6px", fontSize: "12px", color: "#64748b" }}>
                      Total: <strong>{totalSkills}</strong> skills
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ALL TRAINEES */}
        {activeSection === "trainees" && (
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "16px" }}>All Trainees ({trainees.length})</h3>
              <button onClick={() => setShowAddTraineeModal(true)} style={{ padding: "10px 20px", background: "#07885f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                <Plus size={16} /> Add Trainee
              </button>
            </div>
            {loadingTrainees ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading trainees...</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#f8fafc" }}>
                  <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                    <th style={{ padding: "14px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Name</th>
                    <th style={{ padding: "14px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Email</th>
                    <th style={{ padding: "14px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Course</th>
                    <th style={{ padding: "14px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Skills</th>
                    <th style={{ padding: "14px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Avg Level</th>
                    <th style={{ padding: "14px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trainees.map(t => {
                    const avg = t.skills?.length > 0 ? (t.skills.reduce((sum, s) => sum + Number(s.level), 0) / t.skills.length).toFixed(1) : "0.0";
                    return (
                      <tr key={t.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "16px 24px", fontWeight: "600" }}>{t.fullName}</td>
                        <td style={{ padding: "16px 24px", color: "#64748b" }}>{t.email}</td>
                        <td style={{ padding: "16px 24px", color: "#64748b" }}>{t.course || "N/A"}</td>
                        <td style={{ padding: "16px 24px" }}>{t.skills?.map(s => s.name).join(", ") || "None"}</td>
                        <td style={{ padding: "16px 24px", fontWeight: "700", color: "#07885f" }}>{avg}/7</td>
                        <td style={{ padding: "16px 24px" }}>
                          <button onClick={() => alert(`Viewing profile of ${t.fullName}`)} style={{ padding: "6px 12px", background: "#07885f", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", marginRight: "8px" }}>View</button>
                          <button onClick={() => alert(`Edit ${t.fullName}`)} style={{ padding: "6px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Edit</button>
                        </td>
                      </tr>
                    );
                  })}
                  {trainees.length === 0 && (
                    <tr><td colSpan="6" style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>No trainees found</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ALL TRAINERS */}
        {activeSection === "trainers" && (
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "16px" }}>All Trainers (0)</h3>
              <button onClick={() => setShowAddTrainerModal(true)} style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                <Plus size={16} /> Add Trainer
              </button>
            </div>
            <div style={{ padding: "60px 20px", textAlign: "center", color: "#64748b" }}>
              <GraduationCap size={48} color="#64748b" style={{ marginBottom: "16px" }} />
              <h3 style={{ margin: "0 0 8px" }}>No trainers yet</h3>
              <p style={{ margin: 0 }}>Click "Add Trainer" to create a new trainer account.</p>
            </div>
          </div>
        )}

        {/* VERIFICATION REVIEWS */}
        {activeSection === "reviews" && (
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ margin: 0, fontSize: "16px" }}>Pending Verification Reviews ({reviewQueue.length})</h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f8fafc" }}>
                <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>User</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Role</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Skill</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>AI Proposed</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Cheat Flag</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviewQueue.map(review => (
                  <tr key={review.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "16px 24px", fontWeight: "600" }}>{review.userName}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ padding: "4px 10px", borderRadius: "20px", background: review.role === "Trainer" ? "#dbeafe" : "#dcfce7", color: review.role === "Trainer" ? "#1d4ed8" : "#166534", fontSize: "11px", fontWeight: "700" }}>{review.role}</span>
                    </td>
                    <td style={{ padding: "16px 24px" }}>{review.skill}</td>
                    <td style={{ padding: "16px 24px", fontWeight: "700", color: review.proposedLevel >= 4 ? "#07885f" : "#dc2626" }}>{review.proposedLevel}/7</td>
                    <td style={{ padding: "16px 24px", color: review.aiCheatFlag === "None" ? "#07885f" : "#dc2626", fontWeight: "600", fontSize: "13px" }}>{review.aiCheatFlag}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <button onClick={() => handleReviewClick(review)} style={{ padding: "8px 14px", background: "#07885f", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                        <Eye size={14} /> Review
                      </button>
                    </td>
                  </tr>
                ))}
                {reviewQueue.length === 0 && (
                  <tr><td colSpan="6" style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>✅ No pending reviews</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* EVIDENCE MODAL */}
        {showEvidenceModal && selectedReview && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setShowEvidenceModal(false)}>
            <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", width: "600px", maxHeight: "80vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ margin: 0, fontSize: "20px" }}>Verification Evidence: {selectedReview.skill}</h2>
                <button onClick={() => setShowEvidenceModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}><X size={24} /></button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Camera Recording</div>
                  <div style={{ fontWeight: "600", color: "#07885f", display: "flex", alignItems: "center", gap: "8px" }}><Video size={16} /> Demo File Available</div>
                </div>
                <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Microphone / Screen</div>
                  <div style={{ fontWeight: "600", color: "#07885f", display: "flex", alignItems: "center", gap: "8px" }}><FileText size={16} /> Demo File Available</div>
                </div>
              </div>

              <div style={{ padding: "16px", background: selectedReview.aiCheatFlag === "None" ? "#f0fdf4" : "#fef2f2", border: `1px solid ${selectedReview.aiCheatFlag === "None" ? "#bbf7d0" : "#fecaca"}`, borderRadius: "8px", marginBottom: "24px" }}>
                <strong>AI Analysis Result:</strong>
                <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#334155" }}>
                  {selectedReview.aiCheatFlag === "None"
                    ? "No suspicious activity detected. Eye movement and tab focus remained normal throughout the 10-minute interview."
                    : "Suspicious activity detected: Multiple tab switches and prolonged absence of face in camera frame during questioning."}
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button onClick={() => handleReject(selectedReview)} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Reject (0/7)</button>
                <button onClick={() => handleApprove(selectedReview)} style={{ padding: "10px 20px", background: "#07885f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Approve & Set Level ({selectedReview.proposedLevel}/7)</button>
              </div>
            </div>
          </div>
        )}

        {/* ADD TRAINEE MODAL */}
        {showAddTraineeModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setShowAddTraineeModal(false)}>
            <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", width: "500px" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ margin: 0, fontSize: "20px" }}>Add New Trainee</h2>
                <button onClick={() => setShowAddTraineeModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={24} /></button>
              </div>
              <p style={{ color: "#64748b", marginBottom: "20px" }}>Trainee registration form will open here. For now, trainees can self-register through the landing page.</p>
              <button onClick={() => { alert("Trainee registration form coming soon!"); setShowAddTraineeModal(false); }} style={{ width: "100%", padding: "12px", background: "#07885f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ADD TRAINER MODAL */}
        {showAddTrainerModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setShowAddTrainerModal(false)}>
            <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", width: "500px" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ margin: 0, fontSize: "20px" }}>Add New Trainer</h2>
                <button onClick={() => setShowAddTrainerModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={24} /></button>
              </div>
              <p style={{ color: "#64748b", marginBottom: "20px" }}>Trainer creation form will open here. Backend endpoint is ready.</p>
              <button onClick={() => { alert("Trainer creation form coming soon!"); setShowAddTrainerModal(false); }} style={{ width: "100%", padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
                Continue
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function AdminNavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", border: "none", background: active ? "#07885f" : "transparent", color: active ? "#fff" : "#94a3b8", fontWeight: active ? "700" : "500", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.2s" }}>
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, detail, color }) {
  return (
    <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", borderTop: `4px solid ${color}` }}>
      <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
      <div style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: "8px 0" }}>{value}</div>
      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{detail}</div>
    </div>
  );
}

/* =========================================================
   TRAINER DASHBOARD
   ========================================================= */

function TrainerDashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [trainees, setTrainees] = useState([]);
  const [loadingTrainees, setLoadingTrainees] = useState(false);
  const [traineeError, setTraineeError] = useState("");
  const [selectedTrainee, setSelectedTrainee] =
    useState(null);

  const fetchTrainees = async () => {
    try {
      setLoadingTrainees(true);
      setTraineeError("");

      const response = await fetch(
        `${API_BASE}/api/trainer/trainees`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch trainees."
        );
      }

      setTrainees(data.trainees || []);
    } catch (error) {
      console.error("Trainer trainees error:", error);
      setTraineeError(
        "Unable to load trainees. Please try again."
      );
    } finally {
           setLoadingTrainees(false);
    }
  };

  useEffect(() => {
    fetchTrainees();
  }, []);

  const totalSkills = useMemo(
    () =>
      trainees.reduce(
        (total, trainee) =>
          total + (trainee.skills?.length || 0),
        0
      ),
    [trainees]
  );

  const verifiedSkills = useMemo(
    () =>
      trainees.reduce(
        (total, trainee) =>
          total +
          (trainee.skills || []).filter(
            (skill) => skill.isVerified
          ).length,
        0
      ),
    [trainees]
  );

  return (
    <div className="trainer-dashboard">
      <aside className="trainer-sidebar">
        <div className="trainer-brand">
          <div className="trainer-brand-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <strong>Capacity</strong>
            <span>CONNECT</span>
          </div>
        </div>

        <div className="trainer-profile-mini">
          <div className="trainer-avatar">
            {(user?.fullName || "T")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <strong>{user?.fullName || "Trainer"}</strong>
            <span>Trainer</span>
          </div>
        </div>

        <nav className="trainer-nav">
          <TrainerNavItem
            label="Dashboard"
            icon={<BarChart3 size={18} />}
            active={activeSection === "dashboard"}
            onClick={() => setActiveSection("dashboard")}
          />

          <TrainerNavItem
            label="My Courses"
            icon={<BookOpen size={18} />}
            active={activeSection === "courses"}
            onClick={() => setActiveSection("courses")}
          />

          <TrainerNavItem
            label="Trainees"
            icon={<Users size={18} />}
            active={activeSection === "trainees"}
            onClick={() => setActiveSection("trainees")}
          />

          <TrainerNavItem
            label="Assessments"
            icon={<ClipboardCheck size={18} />}
            active={activeSection === "assessments"}
            onClick={() => setActiveSection("assessments")}
          />

          <TrainerNavItem
            label="Resources"
            icon={<FileText size={18} />}
            active={activeSection === "resources"}
            onClick={() => setActiveSection("resources")}
          />

          <TrainerNavItem
            label="Analytics"
            icon={<TrendingUp size={18} />}
            active={activeSection === "analytics"}
            onClick={() => setActiveSection("analytics")}
          />

          <TrainerNavItem
            label="Feedback"
            icon={<MessageSquare size={18} />}
            active={activeSection === "feedback"}
            onClick={() => setActiveSection("feedback")}
          />
        </nav>

        <div className="trainer-sidebar-bottom">
          <button
            className="trainer-settings"
            onClick={() => setActiveSection("settings")}
          >
            <Settings size={17} />
            Settings
          </button>

          <button
            className="trainer-logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="trainer-main">
        <header className="trainer-topbar">
          <div>
            <span className="trainer-page-label">
              TRAINER WORKSPACE
            </span>

            <h1>
              {activeSection === "dashboard"
                ? "Trainer Dashboard"
                : activeSection === "courses"
                ? "My Courses"
                : activeSection === "trainees"
                ? "Trainees"
                : activeSection === "assessments"
                ? "Assessments"
                : activeSection === "resources"
                ? "Learning Resources"
                : activeSection === "analytics"
                ? "Analytics"
                : activeSection === "feedback"
                ? "Feedback"
                : "Settings"}
            </h1>
          </div>

          <div className="trainer-top-user">
            <div className="trainer-top-avatar">
              {(user?.fullName || "T")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <strong>{user?.fullName || "Trainer"}</strong>
              <span>{user?.email}</span>
            </div>
          </div>
        </header>

        {activeSection === "dashboard" && (
          <TrainerOverview
            trainees={trainees}
            onNavigate={setActiveSection}
          />
        )}

        {activeSection === "courses" && (
          <TrainerCourses />
        )}

        {activeSection === "trainees" && (
          <TrainerTrainees
            trainees={trainees}
            loading={loadingTrainees}
            error={traineeError}
            onRefresh={fetchTrainees}
            selectedTrainee={selectedTrainee}
            setSelectedTrainee={setSelectedTrainee}
          />
        )}

        {activeSection === "assessments" && (
          <TrainerAssessments
            trainees={trainees}
          />
        )}

        {activeSection === "resources" && (
          <TrainerResources />
        )}

        {activeSection === "analytics" && (
          <TrainerAnalytics
            trainees={trainees}
            totalSkills={totalSkills}
            verifiedSkills={verifiedSkills}
          />
        )}

        {activeSection === "feedback" && (
          <TrainerFeedback />
        )}

        {activeSection === "settings" && (
          <TrainerSettings user={user} />
        )}
      </main>
    </div>
  );
}

/* =========================================================
   TRAINER NAV
   ========================================================= */

function TrainerNavItem({
  label,
  icon,
  active,
  onClick,
}) {
  return (
    <button
      className={`trainer-nav-item ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* =========================================================
   OVERVIEW
   ========================================================= */

function TrainerOverview({
  trainees,
  onNavigate,
}) {
  const totalTrainees = trainees.length;

  const activeTrainees = trainees.filter(
    (trainee) => trainee.isActive
  ).length;

  const allSkills = trainees.flatMap(
    (trainee) => trainee.skills || []
  );

  const verified = allSkills.filter(
    (skill) => skill.isVerified
  ).length;

  const averageLevel =
    allSkills.length > 0
      ? (
          allSkills.reduce(
            (sum, skill) =>
              sum + Number(skill.level || 0),
            0
          ) / allSkills.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="trainer-content">
      <div className="trainer-welcome">
        <div>
          <span>WELCOME BACK</span>

          <h2>
            Manage learning. Empower trainees.
          </h2>

          <p>
            Monitor real trainee data, competency and
            learning activity from one workspace.
          </p>
        </div>

        <button
          className="trainer-primary-action"
          onClick={() => onNavigate("courses")}
        >
          + Create Course
        </button>
      </div>

      <div className="trainer-stat-grid">
        <TrainerStat
          label="Active Courses"
          value="08"
          detail="Learning workspace"
        />

        <TrainerStat
          label="Trainees"
          value={String(totalTrainees)}
          detail={`${activeTrainees} active users`}
        />

        <TrainerStat
          label="Verified Skills"
          value={String(verified)}
          detail={`${allSkills.length} total skill records`}
        />

        <TrainerStat
          label="Avg. Competency"
          value={`${averageLevel}/7`}
          detail="Across recorded skills"
        />
      </div>

      <div className="trainer-dashboard-grid">
        <div className="trainer-panel">
          <div className="trainer-panel-header">
            <div>
              <span>TRAINEE OVERVIEW</span>
              <h3>Latest Trainees</h3>
            </div>

            <button
              onClick={() => onNavigate("trainees")}
            >
              View all
            </button>
          </div>

          {trainees.slice(0, 4).map((trainee) => (
            <div
              className="trainer-activity"
              key={trainee.id}
            >
              <div className="activity-avatar">
                {(trainee.fullName || "T")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <strong>
                  {trainee.fullName}
                </strong>

                <span>
                  {trainee.course || "Course not added"} ·{" "}
                  {trainee.skills?.length || 0} skills
                </span>
              </div>
            </div>
          ))}

          {trainees.length === 0 && (
            <div className="trainer-empty-small">
              No trainees available yet.
            </div>
          )}
        </div>

        <div className="trainer-panel">
          <div className="trainer-panel-header">
            <div>
              <span>COMPETENCY SNAPSHOT</span>
              <h3>Skill Distribution</h3>
            </div>

            <button
              onClick={() => onNavigate("analytics")}
            >
              Analytics
            </button>
          </div>

          <div className="overview-skill-list">
            {getTopSkills(trainees, 5).map(
              (skill) => (
                <div
                  className="overview-skill-row"
                  key={skill.name}
                >
                  <div>
                    <strong>{skill.name}</strong>
                    <span>
                      {skill.count} trainees
                    </span>
                  </div>

                  <div className="overview-skill-bar">
                    <div
                      style={{
                        width: `${Math.min(
                          100,
                          (skill.average / 7) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  <b>
                    {skill.average.toFixed(1)}/7
                  </b>
                </div>
              )
            )}

            {getTopSkills(trainees, 5).length === 0 && (
              <div className="trainer-empty-small">
                Skill data will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrainerStat({
  label,
  value,
  detail,
}) {
  return (
    <div className="trainer-stat">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

/* =========================================================
   COURSES
   ========================================================= */

function TrainerCourses() {
  const courses = [
    {
      code: "WD",
      title: "Web Development Fundamentals",
      category: "Web Development",
      trainees: 42,
      completion: 76,
      status: "Published",
    },
    {
      code: "JS",
      title: "JavaScript Essentials",
      category: "Programming",
      trainees: 31,
      completion: 64,
      status: "Published",
    },
    {
      code: "UI",
      title: "UI/UX Design Basics",
      category: "Design",
      trainees: 28,
      completion: 88,
      status: "Published",
    },
    {
      code: "RE",
      title: "React Development",
      category: "Web Development",
      trainees: 25,
      completion: 52,
      status: "Draft",
    },
  ];

  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <span className="trainer-page-label">
            CONTENT MANAGEMENT
          </span>

          <h2>My Courses</h2>

          <p>
            Create, organize and monitor your learning
            programs.
          </p>
        </div>

        <button className="trainer-primary-action">
          + Create Course
        </button>
      </div>

      <div className="trainer-course-grid">
        {courses.map((course) => (
          <div
            className="trainer-course-card"
            key={course.title}
          >
            <div
              className={`trainer-course-cover ${
                course.code === "JS"
                  ? "orange"
                  : course.code === "UI"
                  ? "green"
                  : ""
              }`}
            >
              <span>{course.code}</span>
              <small>{course.status}</small>
            </div>

            <div className="trainer-course-body">
              <span className="trainer-course-category">
                {course.category}
              </span>

              <h3>{course.title}</h3>

              <div className="trainer-course-meta">
                <span>
                  {course.trainees} trainees
                </span>

                <span>
                  {course.completion}% complete
                </span>
              </div>

              <div className="trainer-course-progress">
                <div
                  style={{
                    width: `${course.completion}%`,
                  }}
                />
              </div>

              <div className="trainer-course-actions">
                <button>Manage</button>
                <button>View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   TRAINEES
   ========================================================= */

function TrainerTrainees({
  trainees,
  loading,
  error,
  onRefresh,
  selectedTrainee,
  setSelectedTrainee,
}) {
  const [search, setSearch] = useState("");

  const filteredTrainees = trainees.filter(
    (trainee) => {
      const query = search.toLowerCase();

      return (
        trainee.fullName
          ?.toLowerCase()
          .includes(query) ||
        trainee.email
          ?.toLowerCase()
          .includes(query) ||
        trainee.course
          ?.toLowerCase()
          .includes(query) ||
        trainee.skills?.some((skill) =>
          skill.name
            ?.toLowerCase()
            .includes(query)
        )
      );
    }
  );

  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <span className="trainer-page-label">
            LEARNER MANAGEMENT
          </span>

          <h2>Trainee Profiles</h2>

          <p>
            Real trainee profiles fetched from the
            Capacity Connect database.
          </p>
        </div>

        <button
          className="trainer-refresh-button"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw
            size={17}
            className={
              loading ? "spin-icon" : ""
            }
          />
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      <div className="trainee-toolbar">
        <div className="trainee-search">
          <Search size={18} />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search trainees, courses or skills..."
          />
        </div>

        <div className="trainee-count">
          {filteredTrainees.length} of{" "}
          {trainees.length} trainees
        </div>
      </div>

      {error && (
        <div className="trainer-error-panel">
          <strong>Unable to load trainees</strong>
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="trainer-loading-panel">
          <RefreshCw className="spin-icon" size={28} />
          <h3>Loading trainee data...</h3>
          <p>
            Connecting to the Capacity Connect
            database.
          </p>
        </div>
      ) : (
        <div className="trainer-table-panel">
          <div className="trainer-table-header">
            <span>Name</span>
            <span>Education</span>
            <span>Skills</span>
            <span>Competency</span>
            <span>Action</span>
          </div>

          {filteredTrainees.map((trainee) => {
            const skills = trainee.skills || [];

            const average =
              skills.length > 0
                ? (
                    skills.reduce(
                      (sum, skill) =>
                        sum +
                        Number(skill.level || 0),
                      0
                    ) / skills.length
                  ).toFixed(1)
                : "0.0";

            const primarySkill =
              skills[0]?.name || "No skills";

            return (
              <div
                className="trainer-table-row"
                key={trainee.id}
              >
                <div className="trainer-name-cell">
                  <div className="table-avatar">
                    {(trainee.fullName || "T")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {trainee.fullName}
                    </strong>

                    <span>
                      {trainee.email}
                    </span>
                  </div>
                </div>

                <span>
                  {trainee.education ||
                    "Not added"}
                </span>

                <div className="skill-tags-cell">
                  <span className="skill-tag">
                    {primarySkill}
                  </span>

                  {skills.length > 1 && (
                    <span className="skill-more">
                      +{skills.length - 1}
                    </span>
                  )}
                </div>

                <strong className="competency-badge">
                  {average}/7
                </strong>

                <button
                  className="view-profile-button"
                  onClick={() =>
                    setSelectedTrainee(
                      trainee
                    )
                  }
                >
                  View Profile
                  <ChevronRight size={15} />
                </button>
              </div>
            );
          })}

          {!loading &&
            filteredTrainees.length === 0 && (
              <div className="trainer-empty-panel">
                <div className="trainer-empty-icon">
                  <Users size={25} />
                </div>

                <h3>No trainees found</h3>

                <p>
                  Try a different search term.
                </p>
              </div>
            )}
        </div>
      )}

      {selectedTrainee && (
        <TraineeProfileModal
          trainee={selectedTrainee}
          onClose={() =>
            setSelectedTrainee(null)
          }
        />
      )}
    </div>
  );
}

/* =========================================================
   TRAINEE PROFILE MODAL
   ========================================================= */

function TraineeProfileModal({
  trainee,
  onClose,
}) {
  const skills = trainee.skills || [];

  const average =
    skills.length > 0
      ? (
          skills.reduce(
            (sum, skill) =>
              sum + Number(skill.level || 0),
            0
          ) / skills.length
        ).toFixed(1)
      : "0.0";

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="trainee-profile-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="profile-modal-header">
          <div className="large-profile-avatar">
            {(trainee.fullName || "T")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <span className="trainer-page-label">
              TRAINEE PROFILE
            </span>

            <h2>{trainee.fullName}</h2>

            <p>{trainee.email}</p>
          </div>
        </div>

        <div className="profile-info-grid">
          <ProfileInfo
            label="Education"
            value={trainee.education}
          />

          <ProfileInfo
            label="Course"
            value={trainee.course}
          />

          <ProfileInfo
            label="Institution"
            value={trainee.institution}
          />

          <ProfileInfo
            label="Academic Year"
            value={trainee.year}
          />

          <ProfileInfo
            label="Qualification"
            value={trainee.qualification}
          />

          <ProfileInfo
            label="Experience"
            value={trainee.experience}
          />

          <ProfileInfo
            label="Interests"
            value={trainee.interests}
          />

          <ProfileInfo
            label="Account Status"
            value={
              trainee.isActive
                ? "Active"
                : "Inactive"
            }
          />
        </div>

        <div className="profile-skills-section">
          <div className="profile-section-heading">
            <div>
              <span>COMPETENCY</span>
              <h3>Verified Skill Profile</h3>
            </div>

            <strong>
              {average}/7 average
            </strong>
          </div>

          {skills.length === 0 ? (
            <p className="profile-muted">
              No skills added yet.
            </p>
          ) : (
            skills.map((skill) => (
              <div
                className="profile-skill-row"
                key={skill.name}
              >
                <div>
                  <strong>
                    {skill.name}
                  </strong>

                  <span>
                    {skill.isVerified
                      ? "Verified"
                      : "Not verified"}
                  </span>
                </div>

                <div className="profile-skill-progress">
                  <div
                    style={{
                      width: `${
                        (Number(
                          skill.level || 0
                        ) /
                          7) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <b>
                  {skill.level || 0}/7
                </b>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileInfo({
  label,
  value,
}) {
  return (
    <div className="profile-info-item">
      <span>{label}</span>
      <strong>{value || "Not added"}</strong>
    </div>
  );
}

/* =========================================================
   ASSESSMENTS
   ========================================================= */

function TrainerAssessments({
  trainees,
}) {
  const skills = trainees.flatMap(
    (trainee) => trainee.skills || []
  );

  const pending = skills.filter(
    (skill) =>
      skill.assessmentStatus ===
      "pending" ||
      skill.assessmentStatus ===
      "in_review"
  ).length;

  const completed = skills.filter(
    (skill) =>
      skill.assessmentStatus ===
      "completed"
  ).length;

  const notStarted = skills.filter(
    (skill) =>
      !skill.assessmentStatus ||
      skill.assessmentStatus ===
      "not_started"
  ).length;

  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <span className="trainer-page-label">
            COMPETENCY VERIFICATION
          </span>

          <h2>Assessment Management</h2>

          <p>
            Monitor skill assessments and identify
            trainees who need competency verification.
          </p>
        </div>

        <button className="trainer-primary-action">
          + Create Assessment
        </button>
      </div>

      <div className="trainer-stat-grid">
        <TrainerStat
          label="Pending Review"
          value={String(pending)}
          detail="Needs trainer attention"
        />

        <TrainerStat
          label="Completed"
          value={String(completed)}
          detail="Verified assessment records"
        />

        <TrainerStat
          label="Not Started"
          value={String(notStarted)}
          detail="Trainees can begin"
        />

        <TrainerStat
          label="Total Skills"
          value={String(skills.length)}
          detail="Assessment-ready records"
        />
      </div>

      <div className="assessment-board">
        <div className="assessment-board-header">
          <div>
            <span>ASSESSMENT PIPELINE</span>
            <h3>Skill verification status</h3>
          </div>
        </div>

        <div className="assessment-columns">
          <AssessmentColumn
            title="Not Started"
            count={notStarted}
            items={skills.filter(
              (skill) =>
                !skill.assessmentStatus ||
                skill.assessmentStatus ===
                  "not_started"
            )}
          />

          <AssessmentColumn
            title="In Review"
            count={pending}
            items={skills.filter(
              (skill) =>
                skill.assessmentStatus ===
                  "pending" ||
                skill.assessmentStatus ===
                  "in_review"
            )}
          />

          <AssessmentColumn
            title="Completed"
            count={completed}
            items={skills.filter(
              (skill) =>
                skill.assessmentStatus ===
                "completed"
            )}
          />
        </div>
      </div>
    </div>
  );
}

function AssessmentColumn({
  title,
  count,
  items,
}) {
  return (
    <div className="assessment-column">
      <div className="assessment-column-title">
        <strong>{title}</strong>
        <span>{count}</span>
      </div>

      {items.slice(0, 5).map(
        (item, index) => (
          <div
            className="assessment-card"
            key={`${item.name}-${index}`}
          >
            <strong>{item.name}</strong>
            <span>
              Level {item.level || 0}/7
            </span>
          </div>
        )
      )}

      {items.length === 0 && (
        <div className="assessment-empty">
          Nothing here
        </div>
      )}
    </div>
  );
}

/* =========================================================
   RESOURCES
   ========================================================= */

function TrainerResources() {
  const resources = [
    {
      icon: <Video size={22} />,
      title: "Recorded Lectures",
      count: "14",
      text: "Upload and organize trainer lecture videos.",
    },
    {
      icon: <FileText size={22} />,
      title: "Study Materials",
      count: "24",
      text: "Presentations, PDFs and learning documents.",
    },
    {
      icon: <BookOpen size={22} />,
      title: "Course Library",
      count: "18",
      text: "Reusable resources for active courses.",
    },
  ];

  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <span className="trainer-page-label">
            KNOWLEDGE LIBRARY
          </span>

          <h2>Learning Resources</h2>

          <p>
            Organize lectures, presentations and
            study material for your trainees.
          </p>
        </div>

        <button className="trainer-primary-action">
          <Upload size={17} />
          Upload Resource
        </button>
      </div>

      <div className="resource-grid">
        {resources.map((resource) => (
          <div
            className="resource-card"
            key={resource.title}
          >
            <div className="resource-card-icon">
              {resource.icon}
            </div>

            <div>
              <span>{resource.title}</span>
              <strong>{resource.count}</strong>
              <p>{resource.text}</p>
            </div>

            <button>
              Manage
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="resource-upload-panel">
        <div className="resource-upload-icon">
          <Upload size={25} />
        </div>

        <div>
          <h3>Trainer Resource Workspace</h3>

          <p>
            Add recorded lectures, presentations and
            study materials here for centralized
            trainee access.
          </p>
        </div>

        <button className="trainer-secondary-action">
          Add Resource
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   ANALYTICS
   ========================================================= */

function TrainerAnalytics({
  trainees,
  totalSkills,
  verifiedSkills,
}) {
  const skillData = getTopSkills(
    trainees,
    7
  );

  const levelCounts = [0, 0, 0, 0, 0, 0, 0, 0];

  trainees.forEach((trainee) => {
    (trainee.skills || []).forEach(
      (skill) => {
        const level = Math.max(
          0,
          Math.min(
            7,
            Number(skill.level || 0)
          )
        );

        levelCounts[level]++;
      }
    );
  });

  const maxLevelCount = Math.max(
    ...levelCounts,
    1
  );

  const verifiedPercentage =
    totalSkills > 0
      ? Math.round(
          (verifiedSkills /
            totalSkills) *
            100
        )
      : 0;

  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <span className="trainer-page-label">
            PERFORMANCE INTELLIGENCE
          </span>

          <h2>Training Analytics</h2>

          <p>
            Understand competency levels,
            skill distribution and verification
            progress across trainees.
          </p>
        </div>
      </div>

      <div className="trainer-stat-grid">
        <TrainerStat
          label="Trainees"
          value={String(trainees.length)}
          detail="Database records"
        />

        <TrainerStat
          label="Skill Records"
          value={String(totalSkills)}
          detail="Across all trainees"
        />

        <TrainerStat
          label="Verified"
          value={`${verifiedPercentage}%`}
          detail={`${verifiedSkills} verified skills`}
        />

        <TrainerStat
          label="Average Level"
          value={`${calculateAverageLevel(
            trainees
          )}/7`}
          detail="Current competency"
        />
      </div>

      <div className="analytics-grid">
        <div className="analytics-panel">
          <div className="analytics-panel-header">
            <div>
              <span>SKILL PERFORMANCE</span>
              <h3>Average competency by skill</h3>
            </div>
          </div>

          <div className="bar-chart">
            {skillData.length === 0 ? (
              <div className="analytics-empty">
                No skill data available.
              </div>
            ) : (
              skillData.map((skill) => (
                <div
                  className="bar-item"
                  key={skill.name}
                >
                  <div className="bar-value">
                    {skill.average.toFixed(1)}
                  </div>

                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        height: `${Math.max(
                          6,
                          (skill.average / 7) *
                            100
                        )}%`,
                      }}
                    />
                  </div>

                  <span>
                    {skill.name.length > 11
                      ? `${skill.name.slice(
                          0,
                          11
                        )}…`
                      : skill.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="analytics-panel">
          <div className="analytics-panel-header">
            <div>
              <span>LEVEL DISTRIBUTION</span>
              <h3>Competency scale 0–7</h3>
            </div>
          </div>

          <div className="level-chart">
            {levelCounts.map(
              (count, level) => (
                <div
                  className="level-row"
                  key={level}
                >
                  <span>
                    Level {level}
                  </span>

                  <div className="level-track">
                    <div
                      className="level-fill"
                      style={{
                        width: `${
                          (count /
                            maxLevelCount) *
                          100
                        }%`,
                      }}
                    />
                  </div>

                  <strong>{count}</strong>
                </div>
              )
            )}
          </div>

          <div className="analytics-legend">
            <span>
              <i className="legend-dot red" />
              0–3 Developing
            </span>

            <span>
              <i className="legend-dot orange" />
              4–5 Intermediate
            </span>

            <span>
              <i className="legend-dot green" />
              6–7 Strong
            </span>
          </div>
        </div>
      </div>

      <div className="analytics-panel competency-overview">
        <div className="analytics-panel-header">
          <div>
            <span>TOP SKILLS</span>
            <h3>Competency overview</h3>
          </div>
        </div>

        <div className="competency-list">
          {skillData.map((skill) => (
            <div
              className="competency-list-row"
              key={skill.name}
            >
              <div className="competency-name">
                <div className="competency-icon">
                  <Award size={18} />
                </div>

                <div>
                  <strong>
                    {skill.name}
                  </strong>

                  <span>
                    {skill.count} trainee
                    {skill.count !== 1
                      ? "s"
                      : ""}
                  </span>
                </div>
              </div>

              <div className="competency-progress">
                <div>
                  <span>
                    Average level
                  </span>

                  <strong>
                    {skill.average.toFixed(
                      1
                    )}
                    /7
                  </strong>
                </div>

                <div className="competency-track">
                  <div
                    style={{
                      width: `${
                        (skill.average /
                          7) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          {skillData.length === 0 && (
            <div className="analytics-empty">
              Skill analytics will appear
              when trainees add skills.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FEEDBACK
   ========================================================= */

function TrainerFeedback() {
  const feedback = [
    {
      initials: "TR",
      title: "Course feedback",
      text: "Review trainee comments and identify areas where learning content can be improved.",
      tag: "Learning Quality",
    },
    {
      initials: "PF",
      title: "Performance feedback",
      text: "Use trainee responses to understand learning difficulties and support needs.",
      tag: "Performance",
    },
    {
      initials: "AI",
      title: "Improvement insights",
      text: "Organize feedback around courses, resources and competency development.",
      tag: "Insights",
    },
  ];

  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <span className="trainer-page-label">
            LEARNER VOICE
          </span>

          <h2>Trainee Feedback</h2>

          <p>
            Review feedback and turn learner
            experiences into actionable improvements.
          </p>
        </div>

        <button className="trainer-secondary-action">
          Export Feedback
        </button>
      </div>

      <div className="feedback-grid">
        {feedback.map((item) => (
          <div
            className="feedback-card"
            key={item.title}
          >
            <div className="feedback-card-top">
              <div className="feedback-avatar">
                {item.initials}
              </div>

              <span>{item.tag}</span>
            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

            <button>
              Open Workspace
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="feedback-summary-panel">
        <div className="feedback-summary-icon">
          <MessageSquare size={24} />
        </div>

        <div>
          <span>FEEDBACK WORKSPACE</span>
          <h3>Ready for trainee responses</h3>

          <p>
            The interface is prepared for course,
            trainer and learning-resource feedback.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SETTINGS
   ========================================================= */

function TrainerSettings({
  user,
}) {
  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <span className="trainer-page-label">
            ACCOUNT
          </span>

          <h2>Trainer Settings</h2>

          <p>
            Review your trainer profile and workspace
            information.
          </p>
        </div>
      </div>

      <div className="trainer-settings-panel">
        <div>
          <span>Trainer Name</span>
          <strong>
            {user?.fullName || "Trainer"}
          </strong>
        </div>

        <div>
          <span>Email</span>
          <strong>
            {user?.email || "Not added"}
          </strong>
        </div>

        <div>
          <span>Phone</span>
          <strong>
            {user?.phone || "Not added"}
          </strong>
        </div>

        <div>
          <span>Role</span>
          <strong>Trainer</strong>
        </div>

        <div>
          <span>Qualification</span>
          <strong>
            {user?.qualification ||
              "Not added"}
          </strong>
        </div>

        <div>
          <span>Experience</span>
          <strong>
            {user?.experience ||
              "Not added"}
          </strong>
        </div>

        <div>
          <span>Specialization</span>
          <strong>
            {user?.specialization ||
              "Not added"}
          </strong>
        </div>

        <div>
          <span>Organization</span>
          <strong>
            {user?.organization ||
              "Not added"}
          </strong>
        </div>

        <div>
          <span>Designation</span>
          <strong>
            {user?.designation ||
              "Not added"}
          </strong>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
   ========================================================= */

function getTopSkills(
  trainees,
  limit = 7
) {
  const map = {};

  trainees.forEach((trainee) => {
    (trainee.skills || []).forEach(
      (skill) => {
        const name = skill.name;

        if (!name) return;

        if (!map[name]) {
          map[name] = {
            name,
            count: 0,
            total: 0,
          };
        }

        map[name].count += 1;
        map[name].total += Number(
          skill.level || 0
        );
      }
    );
  });

  return Object.values(map)
    .map((skill) => ({
      ...skill,
      average:
        skill.count > 0
          ? skill.total / skill.count
          : 0,
    }))
    .sort(
      (a, b) =>
        b.count - a.count ||
        b.average - a.average
    )
    .slice(0, limit);
}

function calculateAverageLevel(
  trainees
) {
  const skills = trainees.flatMap(
    (trainee) => trainee.skills || []
  );

  if (!skills.length) {
    return "0.0";
  }

  const average =
    skills.reduce(
      (sum, skill) =>
        sum + Number(skill.level || 0),
      0
    ) / skills.length;

  return average.toFixed(1);
}

/* =========================================================
   LANDING PAGE COMPONENTS
   ========================================================= */

function ProcessCard({
  number,
  icon,
  title,
  text,
}) {
  return (
    <div className="process-card">
      <div className="process-top">
        <span>{number}</span>

        <div className="process-icon">
          {icon}
        </div>
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <ArrowRight
        size={18}
        className="feature-arrow"
      />
    </div>
  );
}

function RoleCard({
  icon,
  title,
  text,
  onClick,
}) {
  return (
    <button
      className="role-card"
      onClick={onClick}
    >
      <div className="role-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <ArrowRight size={18} />
    </button>
  );
}

export default App;