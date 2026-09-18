import { useState } from "react";
import AppDashboard from "./AppDashboard";
import TraineeAuth from "./TraineeAuth";
import TrainerAuth from "./TrainerAuth";

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
  const [showTrainerAuth, setShowTrainerAuth] = useState(false);

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
    setShowRoles(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("capacityConnectCurrentUser");

    setCurrentUser(null);
    setShowTraineeAuth(false);
    setShowTrainerAuth(false);
    setShowRoles(false);
  };

  // =========================
  // TRAINEE DASHBOARD
  // =========================
  if (currentUser?.role === "trainee") {
    return (
      <AppDashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  // =========================
  // TRAINER DASHBOARD
  // =========================
  if (currentUser?.role === "trainer") {
    return (
      <TrainerDashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  // =========================
  // TRAINEE LOGIN / SIGNUP
  // =========================
  if (showTraineeAuth) {
    return (
      <TraineeAuth
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setShowTraineeAuth(false)}
      />
    );
  }

  // =========================
  // TRAINER LOGIN
  // =========================
  if (showTrainerAuth) {
    return (
      <TrainerAuth
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setShowTrainerAuth(false)}
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

        <section
          className="section"
          id="how-it-works"
        >
          <div className="section-heading">
            <div className="section-badge">
              HOW IT WORKS
            </div>

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

        <section
          className="final-cta"
          id="about"
        >
          <div>
            <div className="section-badge">
              CAPACITY CONNECT
            </div>

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

            <h2>
              How would you like to continue?
            </h2>

            <p>
              Select your role to enter the appropriate
              Capacity Connect experience.
            </p>

            <div className="role-options">
              {/* TRAINEE */}
              <RoleCard
                icon={<GraduationCap size={25} />}
                title="Trainee"
                text="Learn, verify skills and track your competency."
                onClick={() => {
                  setShowRoles(false);
                  setShowTraineeAuth(true);
                }}
              />

              {/* TRAINER */}
              <RoleCard
                icon={<Users size={25} />}
                title="Trainer"
                text="Create learning content and support trainees."
                onClick={() => {
                  setShowRoles(false);
                  setShowTrainerAuth(true);
                }}
              />

              {/* ADMIN - NOT CONNECTED YET */}
              <RoleCard
                icon={<ShieldCheck size={25} />}
                title="Organization Admin"
                text="Manage users, learning and organizational analytics."
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
   TRAINER DASHBOARD
   Frontend-only Task 2 prototype
   ========================================================= */

function TrainerDashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] =
    useState("dashboard");

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
            active={activeSection === "dashboard"}
            onClick={() => setActiveSection("dashboard")}
          />

          <TrainerNavItem
            label="My Courses"
            active={activeSection === "courses"}
            onClick={() => setActiveSection("courses")}
          />

          <TrainerNavItem
            label="Trainees"
            active={activeSection === "trainees"}
            onClick={() => setActiveSection("trainees")}
          />

          <TrainerNavItem
            label="Assessments"
            active={activeSection === "assessments"}
            onClick={() => setActiveSection("assessments")}
          />

          <TrainerNavItem
            label="Resources"
            active={activeSection === "resources"}
            onClick={() => setActiveSection("resources")}
          />

          <TrainerNavItem
            label="Analytics"
            active={activeSection === "analytics"}
            onClick={() => setActiveSection("analytics")}
          />

          <TrainerNavItem
            label="Feedback"
            active={activeSection === "feedback"}
            onClick={() => setActiveSection("feedback")}
          />
        </nav>

        <div className="trainer-sidebar-bottom">
          <button
            className="trainer-settings"
            onClick={() => setActiveSection("settings")}
          >
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
            onNavigate={setActiveSection}
          />
        )}

        {activeSection === "courses" && (
          <TrainerCourses />
        )}

        {activeSection === "trainees" && (
          <TrainerTrainees />
        )}

        {activeSection === "assessments" && (
          <TrainerAssessments />
        )}

        {activeSection === "resources" && (
          <TrainerResources />
        )}

        {activeSection === "analytics" && (
          <TrainerAnalytics />
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

function TrainerNavItem({ label, active, onClick }) {
  return (
    <button
      className={`trainer-nav-item ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/* =========================================================
   TRAINER OVERVIEW
   ========================================================= */

function TrainerOverview({ onNavigate }) {
  return (
    <div className="trainer-content">
      <div className="trainer-welcome">
        <div>
          <span>WELCOME BACK</span>

          <h2>
            Manage learning. Empower trainees.
          </h2>

          <p>
            Create courses, monitor trainee progress and
            manage your learning workspace.
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
          detail="+2 this month"
        />

        <TrainerStat
          label="Trainees"
          value="126"
          detail="18 active today"
        />

        <TrainerStat
          label="Assessments"
          value="24"
          detail="6 pending review"
        />

        <TrainerStat
          label="Course Completion"
          value="78%"
          detail="+6.4% this month"
        />
      </div>

      <div className="trainer-dashboard-grid">
        <div className="trainer-panel">
          <div className="trainer-panel-header">
            <div>
              <span>YOUR COURSES</span>
              <h3>Course Management</h3>
            </div>

            <button
              onClick={() => onNavigate("courses")}
            >
              View all
            </button>
          </div>

          <div className="trainer-course-row">
            <div className="trainer-course-icon blue">
              WD
            </div>

            <div>
              <strong>Web Development Fundamentals</strong>
              <span>42 trainees · 76% completion</span>
            </div>

            <b>76%</b>
          </div>

          <div className="trainer-course-row">
            <div className="trainer-course-icon orange">
              JS
            </div>

            <div>
              <strong>JavaScript Essentials</strong>
              <span>31 trainees · 64% completion</span>
            </div>

            <b>64%</b>
          </div>

          <div className="trainer-course-row">
            <div className="trainer-course-icon green">
              UI
            </div>

            <div>
              <strong>UI/UX Design Basics</strong>
              <span>28 trainees · 88% completion</span>
            </div>

            <b>88%</b>
          </div>
        </div>

        <div className="trainer-panel">
          <div className="trainer-panel-header">
            <div>
              <span>TRAINEE ACTIVITY</span>
              <h3>Recent Activity</h3>
            </div>

            <button
              onClick={() => onNavigate("trainees")}
            >
              View trainees
            </button>
          </div>

          <div className="trainer-activity">
            <div className="activity-avatar">
              A
            </div>

            <div>
              <strong>Arjun completed JavaScript Assessment</strong>
              <span>Score: 82% · 12 minutes ago</span>
            </div>
          </div>

          <div className="trainer-activity">
            <div className="activity-avatar">
              P
            </div>

            <div>
              <strong>Priya enrolled in Web Development</strong>
              <span>8 trainees joined · 1 hour ago</span>
            </div>
          </div>

          <div className="trainer-activity">
            <div className="activity-avatar">
              R
            </div>

            <div>
              <strong>Rahul submitted an assessment</strong>
              <span>Pending review · 2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrainerStat({ label, value, detail }) {
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
      completion: "76%",
      status: "Published",
    },
    {
      code: "JS",
      title: "JavaScript Essentials",
      category: "Programming",
      trainees: 31,
      completion: "64%",
      status: "Published",
    },
    {
      code: "UI",
      title: "UI/UX Design Basics",
      category: "Design",
      trainees: 28,
      completion: "88%",
      status: "Published",
    },
    {
      code: "RE",
      title: "React Development",
      category: "Web Development",
      trainees: 25,
      completion: "52%",
      status: "Draft",
    },
  ];

  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <h2>Manage your courses</h2>
          <p>
            Create, organize and monitor your learning
            content.
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
                <span>{course.trainees} trainees</span>
                <span>{course.completion} complete</span>
              </div>

              <div className="trainer-course-progress">
                <div
                  style={{
                    width: course.completion,
                  }}
                ></div>
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

function TrainerTrainees() {
  const trainees = [
    {
      name: "Arjun Patel",
      role: "Trainee",
      skill: "Web Development",
      level: "6/7",
      progress: "82%",
      course: "Web Development Fundamentals",
    },
    {
      name: "Priya Shah",
      role: "Trainee",
      skill: "JavaScript",
      level: "5/7",
      progress: "74%",
      course: "JavaScript Essentials",
    },
    {
      name: "Rahul Mehta",
      role: "Trainee",
      skill: "UI/UX",
      level: "4/7",
      progress: "61%",
      course: "UI/UX Design Basics",
    },
    {
      name: "Neha Patel",
      role: "Trainee",
      skill: "React",
      level: "3/7",
      progress: "48%",
      course: "React Development",
    },
  ];

  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <h2>Trainee Profiles</h2>
          <p>
            View trainee skills, progress, assessments and
            learning activity.
          </p>
        </div>
      </div>

      <div className="trainer-table-panel">
        <div className="trainer-table-header">
          <span>Name</span>
          <span>Primary Skill</span>
          <span>Competency</span>
          <span>Course Progress</span>
          <span>Action</span>
        </div>

        {trainees.map((trainee) => (
          <div
            className="trainer-table-row"
            key={trainee.name}
          >
            <div className="trainer-name-cell">
              <div className="table-avatar">
                {trainee.name.charAt(0)}
              </div>

              <div>
                <strong>{trainee.name}</strong>
                <span>{trainee.course}</span>
              </div>
            </div>

            <span>{trainee.skill}</span>

            <strong className="competency-badge">
              {trainee.level}
            </strong>

            <div className="progress-cell">
              <div className="small-progress">
                <div
                  style={{
                    width: trainee.progress,
                  }}
                ></div>
              </div>

              <span>{trainee.progress}</span>
            </div>

            <button className="view-profile-button">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   OTHER LMS SECTIONS
   ========================================================= */

function TrainerAssessments() {
  return (
    <TrainerPlaceholder
      title="Assessment Management"
      description="Create questionnaires, review trainee submissions and monitor assessment performance."
      cards={[
        ["Pending Reviews", "06"],
        ["Active Assessments", "12"],
        ["Completed", "184"],
      ]}
    />
  );
}

function TrainerResources() {
  return (
    <TrainerPlaceholder
      title="Learning Resources"
      description="Manage presentations, recorded lectures, study material and course resources."
      cards={[
        ["Uploaded Resources", "38"],
        ["Videos", "14"],
        ["Study Materials", "24"],
      ]}
    />
  );
}

function TrainerAnalytics() {
  return (
    <TrainerPlaceholder
      title="Training Analytics"
      description="Monitor course completion, trainee performance and competency development."
      cards={[
        ["Avg. Completion", "78%"],
        ["Avg. Score", "81%"],
        ["Active Learners", "126"],
      ]}
    />
  );
}

function TrainerFeedback() {
  return (
    <TrainerPlaceholder
      title="Trainee Feedback"
      description="Review feedback submitted by trainees about courses and learning experiences."
      cards={[
        ["Responses", "94"],
        ["Avg. Rating", "4.6/5"],
        ["Pending", "08"],
      ]}
    />
  );
}

function TrainerSettings({ user }) {
  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <h2>Trainer Settings</h2>
          <p>
            Manage your trainer workspace preferences.
          </p>
        </div>
      </div>

      <div className="trainer-settings-panel">
        <div>
          <span>Trainer Name</span>
          <strong>{user?.fullName || "Trainer"}</strong>
        </div>

        <div>
          <span>Email</span>
          <strong>{user?.email}</strong>
        </div>

        <div>
          <span>Role</span>
          <strong>Trainer</strong>
        </div>
      </div>
    </div>
  );
}

function TrainerPlaceholder({
  title,
  description,
  cards,
}) {
  return (
    <div className="trainer-content">
      <div className="trainer-section-intro">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="trainer-stat-grid">
        {cards.map(([label, value]) => (
          <TrainerStat
            key={label}
            label={label}
            value={value}
            detail="Task 2 frontend prototype"
          />
        ))}
      </div>

      <div className="trainer-empty-panel">
        <div className="trainer-empty-icon">
          <Sparkles size={24} />
        </div>

        <h3>Workspace ready</h3>

        <p>
          This section is prepared for the next frontend
          implementation stage. Backend, database and AI
          integrations are intentionally excluded from Task 2.
        </p>
      </div>
    </div>
  );
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