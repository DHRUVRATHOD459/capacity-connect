import { useState } from "react";
import AppDashboard from "./AppDashboard";
import TraineeAuth from "./TraineeAuth";

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
} from "lucide-react";

function App() {
  const [showRoles, setShowRoles] = useState(false);
  const [showTraineeAuth, setShowTraineeAuth] = useState(false);

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
    setShowRoles(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("capacityConnectCurrentUser");
    setCurrentUser(null);
    setShowTraineeAuth(false);
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

  if (showTraineeAuth) {
    return (
      <TraineeAuth
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setShowTraineeAuth(false)}
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
              Capacity Connect brings trainees, trainers and organizations
              together through verified skills, personalized learning,
              intelligent recommendations and measurable progress.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => setShowRoles(true)}
              >
                Get Started
                <ArrowRight size={18} />
              </button>

              <a href="#how-it-works" className="secondary-button">
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
                  <div className="small-label">CAPACITY CONNECT</div>
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

            <h2>From claimed skills to verified capability.</h2>

            <p>
              Capacity Connect creates a continuous cycle of assessment,
              learning, verification and improvement.
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

        <section className="section features-section" id="features">
          <div className="section-heading">
            <div className="section-badge">ONE CONNECTED PLATFORM</div>

            <h2>Designed around real competency development.</h2>

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

            <h2>Turn learning into measurable capability.</h2>

            <p>
              A centralized digital platform for training, competency
              development and knowledge sharing.
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
              Select your role to enter the appropriate Capacity Connect
              experience.
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
              />

              <RoleCard
                icon={<ShieldCheck size={25} />}
                title="Organization Admin"
                text="Manage users, learning and organizational analytics."
              />
            </div>

            <div className="modal-note">
              Admin access is restricted to authorized organization
              administrators.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProcessCard({ number, icon, title, text }) {
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

function FeatureCard({ icon, title, text }) {
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

function RoleCard({ icon, title, text, onClick }) {
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