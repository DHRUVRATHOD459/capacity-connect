import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  BrainCircuit,
  Users,
  UserRound,
  Bell,
  Search,
  Sparkles,
  TrendingUp,
  Award,
  ChevronRight,
  Play,
  Clock3,
  Target,
  CheckCircle2,
} from "lucide-react";

const courses = [
  {
    title: "Modern JavaScript",
    category: "Web Development",
    trainer: "Arjun Mehta",
    progress: 68,
    duration: "18 hours",
  },
  {
    title: "React Development",
    category: "Frontend Engineering",
    trainer: "Priya Shah",
    progress: 32,
    duration: "24 hours",
  },
  {
    title: "Node.js & APIs",
    category: "Backend Development",
    trainer: "Rahul Patel",
    progress: 12,
    duration: "20 hours",
  },
];

const skills = [
  { name: "HTML & CSS", level: 7 },
  { name: "JavaScript", level: 3 },
  { name: "React", level: 2 },
  { name: "Node.js", level: 1 },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      label: "Overview",
      items: [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "My Learning", icon: BookOpen },
      ],
    },
    {
      label: "Development",
      items: [
        { name: "Skills", icon: BrainCircuit },
        { name: "Find a Trainer", icon: Users },
      ],
    },
    {
      label: "Account",
      items: [{ name: "Profile", icon: UserRound }],
    },
  ];

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <BrainCircuit size={22} />
          </div>

          <div className="brand-text">
            <strong>Capacity</strong>
            <span>CONNECT</span>
          </div>

          <button
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="sidebar-menu">
          {navigation.map((section) => (
            <div className="menu-section" key={section.label}>
              <p>{section.label}</p>

              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    className={`menu-item ${
                      activePage === item.name ? "active" : ""
                    }`}
                    onClick={() => {
                      setActivePage(item.name);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="capacity-ai-card">
            <div className="ai-small-icon">
              <Sparkles size={16} />
            </div>

            <div>
              <strong>Capacity AI</strong>
              <span>Your learning assistant</span>
            </div>

            <ChevronRight size={15} />
          </div>

          <div className="mini-profile">
            <div className="avatar">DR</div>

            <div className="mini-profile-text">
              <strong>Dhruv Rathod</strong>
              <span>Trainee</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <div className="search-box">
              <Search size={18} />
              <input placeholder="Search courses, skills or trainers..." />
            </div>
          </div>

          <div className="topbar-right">
            <button className="notification">
              <Bell size={19} />
              <i />
            </button>

            <div className="header-profile">
              <div className="avatar small">DR</div>

              <div>
                <strong>Dhruv Rathod</strong>
                <span>Trainee</span>
              </div>
            </div>
          </div>
        </header>

        <div className="page">
          {activePage === "Dashboard" && <Dashboard />}
          {activePage === "My Learning" && <Learning />}
          {activePage === "Skills" && <Skills />}
          {activePage === "Find a Trainer" && <Trainers />}
          {activePage === "Profile" && <Profile />}
        </div>
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">TRAINEE DASHBOARD</div>

          <h1>
            Good evening, Dhruv <span>👋</span>
          </h1>

          <p>
            Continue building your capabilities and close your skill gaps.
          </p>
        </div>

        <button className="primary-button">
          <Sparkles size={17} />
          Ask Capacity AI
        </button>
      </section>

      <section className="stats-grid">
        <StatCard
          icon={<BookOpen />}
          title="Courses in Progress"
          value="4"
          note="+1 this month"
        />

        <StatCard
          icon={<BrainCircuit />}
          title="Verified Skills"
          value="8"
          note="2 recently verified"
        />

        <StatCard
          icon={<Award />}
          title="Certificates"
          value="3"
          note="1 earned this month"
        />

        <StatCard
          icon={<TrendingUp />}
          title="Learning Progress"
          value="72%"
          note="+12% this month"
        />
      </section>

      <section className="main-grid">
        <div className="panel">
          <PanelHeader
            title="Continue Learning"
            subtitle="Pick up where you left off."
            action="View all"
          />

          <div className="course-list">
            {courses.map((course) => (
              <CourseCard course={course} key={course.title} />
            ))}
          </div>
        </div>

        <div className="right-column">
          <div className="panel">
            <PanelHeader
              title="Skill Overview"
              subtitle="Your verified competency levels."
              action="View skills"
            />

            <div className="skill-list">
              {skills.map((skill) => (
                <SkillBar skill={skill} key={skill.name} />
              ))}
            </div>
          </div>

          <div className="recommendation">
            <div className="recommendation-icon">
              <Sparkles size={21} />
            </div>

            <div className="recommendation-content">
              <span>AI RECOMMENDATION</span>

              <h3>Improve your JavaScript skills next.</h3>

              <p>
                Your verified level is 3/7. A focused learning path can help
                you reach 5/7.
              </p>

              <button>
                View learning path
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ icon, title, value, note }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <span className="stat-title">{title}</span>
        <h2>{value}</h2>
        <small>{note}</small>
      </div>
    </div>
  );
}

function PanelHeader({ title, subtitle, action }) {
  return (
    <div className="panel-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <button className="text-button">{action}</button>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-visual">
        <div className="course-icon">
          <BookOpen size={21} />
        </div>

        <span>{course.category}</span>
      </div>

      <div className="course-content">
        <div className="course-meta">
          <span>
            <Clock3 size={12} />
            {course.duration}
          </span>

          <strong>{course.progress}%</strong>
        </div>

        <h3>{course.title}</h3>

        <p>
          Instructor: <b>{course.trainer}</b>
        </p>

        <div className="progress">
          <div style={{ width: `${course.progress}%` }} />
        </div>

        <button className="continue-button">
          <Play size={14} fill="currentColor" />
          Continue learning
        </button>
      </div>
    </div>
  );
}

function SkillBar({ skill }) {
  const percentage = (skill.level / 7) * 100;

  let status = "Basic";
  let statusClass = "low";

  if (skill.level >= 6) {
    status = "Expert";
    statusClass = "high";
  } else if (skill.level >= 3) {
    status = "Developing";
    statusClass = "medium";
  }

  return (
    <div className="skill-item">
      <div className="skill-top">
        <div>
          <strong>{skill.name}</strong>
          <span className={statusClass}>{status}</span>
        </div>

        <b>{skill.level}/7</b>
      </div>

      <div className="skill-track">
        <div
          className={`skill-fill ${statusClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function Learning() {
  return (
    <PageTitle
      eyebrow="LEARNING HUB"
      title="My Learning"
      subtitle="Continue your active courses and track your development."
    >
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard course={course} key={course.title} />
        ))}
      </div>
    </PageTitle>
  );
}

function Skills() {
  return (
    <PageTitle
      eyebrow="COMPETENCY"
      title="My Skills"
      subtitle="Your competency is verified through assessments and AI interviews."
    >
      <div className="skill-summary-grid">
        <Summary icon={<BrainCircuit />} value="8" text="Verified Skills" />
        <Summary icon={<Target />} value="3" text="Skills Improving" />
        <Summary icon={<CheckCircle2 />} value="5" text="Targets Completed" />
      </div>

      <div className="panel">
        <PanelHeader
          title="Competency Matrix"
          subtitle="Your current verified skill levels."
          action="+ Add skill"
        />

        <div className="big-skill-list">
          {skills.map((skill) => (
            <SkillBar skill={skill} key={skill.name} />
          ))}
        </div>
      </div>
    </PageTitle>
  );
}

function Summary({ icon, value, text }) {
  return (
    <div className="summary-card">
      <div>{icon}</div>

      <section>
        <strong>{value}</strong>
        <span>{text}</span>
      </section>
    </div>
  );
}

function Trainers() {
  const trainers = [
    {
      name: "Arjun Mehta",
      role: "Full Stack Development",
      match: "94%",
    },
    {
      name: "Priya Shah",
      role: "Frontend Engineering",
      match: "91%",
    },
    {
      name: "Rahul Patel",
      role: "Backend Development",
      match: "87%",
    },
  ];

  return (
    <PageTitle
      eyebrow="TRAINER NETWORK"
      title="Find a Trainer"
      subtitle="Recommended trainers based on your competency gaps."
    >
      <div className="trainer-grid">
        {trainers.map((trainer) => (
          <div className="trainer-card" key={trainer.name}>
            <div className="trainer-top">
              <div className="trainer-avatar">
                {trainer.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>

              <span>{trainer.match} match</span>
            </div>

            <h3>{trainer.name}</h3>
            <p>{trainer.role}</p>

            <div className="trainer-tags">
              <span>JavaScript</span>
              <span>React</span>
              <span>Node.js</span>
            </div>

            <button className="outline-button">
              View profile
              <ChevronRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </PageTitle>
  );
}

function Profile() {
  return (
    <PageTitle
      eyebrow="ACCOUNT"
      title="My Profile"
      subtitle="Manage your professional and learning information."
    >
      <div className="profile-layout">
        <div className="panel profile-card">
          <div className="large-avatar">DR</div>

          <h2>Dhruv Rathod</h2>
          <p>Diploma in Computer Engineering</p>

          <div className="profile-line" />

          <div className="profile-detail">
            <span>User ID</span>
            <strong>CC-TR-00124</strong>
          </div>

          <div className="profile-detail">
            <span>Role</span>
            <strong>Trainee</strong>
          </div>

          <div className="profile-detail">
            <span>Status</span>
            <strong className="verified">Active</strong>
          </div>
        </div>

        <div className="panel">
          <PanelHeader
            title="Professional Information"
            subtitle="Your career and learning profile."
          />

          <div className="form-grid">
            <label>
              Full Name
              <input value="Dhruv Rathod" readOnly />
            </label>

            <label>
              Career Goal
              <input value="AI / ML Engineer" readOnly />
            </label>

            <label>
              Qualification
              <input value="Diploma in Computer Engineering" readOnly />
            </label>

            <label>
              Experience
              <input value="Student / Fresher" readOnly />
            </label>
          </div>

          <button className="primary-button">Save changes</button>
        </div>
      </div>
    </PageTitle>
  );
}

function PageTitle({ eyebrow, title, subtitle, children }) {
  return (
    <>
      <section className="page-heading">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>

      {children}
    </>
  );
}

export default App;