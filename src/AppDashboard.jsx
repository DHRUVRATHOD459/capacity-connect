import { useEffect, useMemo, useRef, useState } from "react";

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
  ChevronRight,
  ChevronLeft,
  Play,
  Clock3,
  Target,
  CheckCircle2,
  ShieldCheck,
  X,
  ArrowRight,
  LogOut,
  Trophy,
  UserCheck,
  AlertCircle,
  Code2,
  Database,
  Palette,
  LockKeyhole,
  Cpu,
  Braces,
  Server,
  Globe,
  Plus,
} from "lucide-react";

/* =========================================================
   AVAILABLE SKILLS
========================================================= */

const AVAILABLE_SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C / C++",
  "SQL",
  "WordPress",
  "UI/UX Design",
  "Cyber Security",
  "Artificial Intelligence",
];

/* =========================================================
   COURSE CATALOG
========================================================= */

const COURSE_CATALOG = [
  {
    id: "html-css",
    title: "HTML & CSS Foundations",
    category: "Web Development",
    trainer: "Arjun Mehta",
    duration: "12 hours",
    lessons: 18,
    requiredSkills: ["HTML", "CSS"],
    description: "Build strong foundations for modern web interfaces.",
    icon: Code2,
    bannerLabel: "WEB",
    bannerSub: "FOUNDATIONS",
  },
  {
    id: "javascript",
    title: "Modern JavaScript",
    category: "Web Development",
    trainer: "Priya Shah",
    duration: "18 hours",
    lessons: 24,
    requiredSkills: ["JavaScript"],
    description: "Master modern JavaScript concepts and practical development.",
    icon: Braces,
    bannerLabel: "JS",
    bannerSub: "MODERN WEB",
  },
  {
    id: "react",
    title: "React Development",
    category: "Frontend Engineering",
    trainer: "Priya Shah",
    duration: "24 hours",
    lessons: 31,
    requiredSkills: ["React", "JavaScript"],
    description: "Create scalable and interactive React applications.",
    icon: Globe,
    bannerLabel: "REACT",
    bannerSub: "FRONTEND",
  },
  {
    id: "node",
    title: "Node.js & REST APIs",
    category: "Backend Development",
    trainer: "Rahul Patel",
    duration: "20 hours",
    lessons: 27,
    requiredSkills: ["Node.js", "JavaScript"],
    description: "Learn backend development and REST API architecture.",
    icon: Server,
    bannerLabel: "NODE",
    bannerSub: "BACKEND",
  },
  {
    id: "python",
    title: "Python for Developers",
    category: "Programming",
    trainer: "Neha Joshi",
    duration: "16 hours",
    lessons: 22,
    requiredSkills: ["Python"],
    description: "Learn Python through practical programming concepts.",
    icon: Code2,
    bannerLabel: "PY",
    bannerSub: "PROGRAMMING",
  },
  {
    id: "sql",
    title: "SQL & Database Fundamentals",
    category: "Database",
    trainer: "Aman Shah",
    duration: "14 hours",
    lessons: 20,
    requiredSkills: ["SQL"],
    description: "Understand relational databases and SQL queries.",
    icon: Database,
    bannerLabel: "SQL",
    bannerSub: "DATABASE",
  },
  {
    id: "wordpress",
    title: "Professional WordPress Development",
    category: "Web Development",
    trainer: "Karan Patel",
    duration: "15 hours",
    lessons: 19,
    requiredSkills: ["WordPress", "HTML", "CSS"],
    description: "Build and customize professional WordPress websites.",
    icon: Globe,
    bannerLabel: "WP",
    bannerSub: "DEVELOPMENT",
  },
  {
    id: "uiux",
    title: "UI/UX Design Essentials",
    category: "Design",
    trainer: "Riya Shah",
    duration: "11 hours",
    lessons: 17,
    requiredSkills: ["UI/UX Design"],
    description: "Learn user-centered design, wireframes and interfaces.",
    icon: Palette,
    bannerLabel: "UX",
    bannerSub: "DESIGN",
  },
  {
    id: "cyber",
    title: "Cyber Security Fundamentals",
    category: "Cyber Security",
    trainer: "Vivek Sharma",
    duration: "21 hours",
    lessons: 29,
    requiredSkills: ["Cyber Security"],
    description: "Understand security fundamentals and common threats.",
    icon: LockKeyhole,
    bannerLabel: "SEC",
    bannerSub: "CYBER DEFENSE",
  },
  {
    id: "ai",
    title: "Artificial Intelligence Foundations",
    category: "Artificial Intelligence",
    trainer: "Dr. Ananya Rao",
    duration: "25 hours",
    lessons: 34,
    requiredSkills: ["Artificial Intelligence", "Python"],
    description: "Explore AI concepts, models and practical applications.",
    icon: Cpu,
    bannerLabel: "AI",
    bannerSub: "INTELLIGENCE",
  },
];

/* =========================================================
   QUESTION BANK
========================================================= */

const QUESTION_BANK = {
  HTML: [
    {
      q: "Which HTML element is used for the main heading?",
      options: ["<h1>", "<head>", "<title>", "<heading>"],
      answer: 0,
    },
    {
      q: "Which attribute provides alternative text for an image?",
      options: ["src", "alt", "href", "title"],
      answer: 1,
    },
    {
      q: "Which element is used to create a hyperlink?",
      options: ["<link>", "<a>", "<url>", "<href>"],
      answer: 1,
    },
  ],

  CSS: [
    {
      q: "Which property changes the text color?",
      options: ["font-color", "text-color", "color", "foreground"],
      answer: 2,
    },
    {
      q: "Which CSS property controls space inside an element?",
      options: ["margin", "padding", "spacing", "inner-space"],
      answer: 1,
    },
    {
      q: "Which layout system is commonly used for one-dimensional layouts?",
      options: ["Flexbox", "FloatDB", "GridSQL", "PositionDB"],
      answer: 0,
    },
  ],

  JavaScript: [
    {
      q: "Which keyword declares a block-scoped variable that can be reassigned?",
      options: ["var", "let", "const", "static"],
      answer: 1,
    },
    {
      q: "Which method converts JSON text into a JavaScript object?",
      options: [
        "JSON.parse()",
        "JSON.object()",
        "JSON.convert()",
        "JSON.toObject()",
      ],
      answer: 0,
    },
    {
      q: "Which symbol is used for strict equality?",
      options: ["=", "==", "===", "!="],
      answer: 2,
    },
  ],

  React: [
    {
      q: "What is JSX primarily used for?",
      options: [
        "Writing SQL",
        "Describing UI in JavaScript",
        "Managing servers",
        "Creating databases",
      ],
      answer: 1,
    },
    {
      q: "Which hook is commonly used for local component state?",
      options: ["useRoute", "useState", "usePage", "useServer"],
      answer: 1,
    },
    {
      q: "React applications are commonly built using reusable _____.",
      options: ["tables", "components", "servers", "queries"],
      answer: 1,
    },
  ],

  Python: [
    {
      q: "Which symbol starts a Python comment?",
      options: ["//", "#", "<!--", "/*"],
      answer: 1,
    },
    {
      q: "Which data type stores key-value pairs?",
      options: ["List", "Tuple", "Dictionary", "Set"],
      answer: 2,
    },
    {
      q: "Which keyword defines a function?",
      options: ["function", "func", "def", "define"],
      answer: 2,
    },
  ],

  SQL: [
    {
      q: "Which command is used to retrieve data?",
      options: ["GET", "SELECT", "FETCHALL", "READ"],
      answer: 1,
    },
    {
      q: "Which clause filters rows?",
      options: ["WHERE", "FILTER", "WHEN", "CHECK"],
      answer: 0,
    },
    {
      q: "Which command adds a new row?",
      options: ["ADD", "INSERT", "PUSH", "CREATE ROW"],
      answer: 1,
    },
  ],

  WordPress: [
    {
      q: "WordPress is primarily used as a _____.",
      options: [
        "Database engine",
        "CMS",
        "Compiler",
        "Operating system",
      ],
      answer: 1,
    },
    {
      q: "Which technology is commonly used to customize WordPress styling?",
      options: ["CSS", "SQL only", "BIOS", "Assembly"],
      answer: 0,
    },
    {
      q: "Plugins are mainly used to _____ WordPress functionality.",
      options: ["remove", "extend", "compile", "encrypt"],
      answer: 1,
    },
  ],

  "UI/UX Design": [
    {
      q: "UX primarily focuses on the _____.",
      options: [
        "user experience",
        "server hardware",
        "database",
        "compiler",
      ],
      answer: 0,
    },
    {
      q: "A wireframe mainly represents _____.",
      options: [
        "Database records",
        "Basic layout and structure",
        "Final source code",
        "Server logs",
      ],
      answer: 1,
    },
    {
      q: "Which principle improves readability?",
      options: [
        "Poor contrast",
        "Clear hierarchy",
        "Random spacing",
        "Tiny text",
      ],
      answer: 1,
    },
  ],

  "Cyber Security": [
    {
      q: "What does MFA stand for?",
      options: [
        "Multi-Factor Authentication",
        "Main Firewall Access",
        "Managed File Access",
        "Multi-File Authorization",
      ],
      answer: 0,
    },
    {
      q: "Phishing commonly attempts to steal _____.",
      options: [
        "credentials",
        "screen brightness",
        "CPU speed",
        "fonts",
      ],
      answer: 0,
    },
    {
      q: "Which is a strong security practice?",
      options: [
        "Reusing passwords",
        "Sharing OTPs",
        "Using unique passwords",
        "Disabling updates",
      ],
      answer: 2,
    },
  ],

  "Artificial Intelligence": [
    {
      q: "AI stands for _____.",
      options: [
        "Automated Internet",
        "Artificial Intelligence",
        "Advanced Interface",
        "Applied Integration",
      ],
      answer: 1,
    },
    {
      q: "Machine learning systems learn patterns from _____.",
      options: ["data", "HTML tags only", "power cables", "screens"],
      answer: 0,
    },
    {
      q: "Which is an example of supervised learning?",
      options: [
        "Learning from labeled examples",
        "No data learning",
        "Manual coding only",
        "Deleting training data",
      ],
      answer: 0,
    },
  ],
};

/* =========================================================
   TRAINERS
========================================================= */

const TRAINERS = [
  {
    name: "Arjun Mehta",
    expertise: ["HTML", "CSS", "JavaScript"],
    experience: "8 years",
    rating: "4.9",
  },
  {
    name: "Priya Shah",
    expertise: ["React", "JavaScript", "UI/UX Design"],
    experience: "7 years",
    rating: "4.8",
  },
  {
    name: "Rahul Patel",
    expertise: ["Node.js", "JavaScript", "SQL"],
    experience: "9 years",
    rating: "4.9",
  },
  {
    name: "Neha Joshi",
    expertise: ["Python", "Artificial Intelligence"],
    experience: "8 years",
    rating: "4.8",
  },
  {
    name: "Vivek Sharma",
    expertise: ["Cyber Security", "SQL"],
    experience: "10 years",
    rating: "4.9",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getSelectedSkills(user) {
  const raw = user?.skills;

  if (Array.isArray(raw)) {
    return raw
      .map((skill) =>
        typeof skill === "string"
          ? skill
          : skill?.name || skill?.skill || ""
      )
      .filter(Boolean);
  }

  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return [];
}

function getInitials(name = "Trainee") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function normalizeSkillName(skill = "") {
  return skill.trim().toLowerCase();
}

function getQuestionsForSkill(skill) {
  const exact = QUESTION_BANK[skill];

  if (exact) return exact;

  const found = Object.keys(QUESTION_BANK).find(
    (key) =>
      normalizeSkillName(key) === normalizeSkillName(skill)
  );

  if (found) return QUESTION_BANK[found];

  return [
    {
      q: `What is the main purpose of ${skill}?`,
      options: [
        "It is used for its intended technical purpose",
        "It is only used for gaming",
        "It is only used for hardware repair",
        "It has no practical use",
      ],
      answer: 0,
    },
    {
      q: `Which approach is best when learning ${skill}?`,
      options: [
        "Practice and understand fundamentals",
        "Never practice",
        "Only memorize names",
        "Avoid real projects",
      ],
      answer: 0,
    },
    {
      q: `How should your knowledge of ${skill} be improved?`,
      options: [
        "Through projects and assessment",
        "By avoiding examples",
        "By guessing answers",
        "By skipping fundamentals",
      ],
      answer: 0,
    },
  ];
}

/* =========================================================
   RECOMMENDATIONS
========================================================= */

function getRecommendedCourses(skillState) {
  if (!skillState || skillState.length === 0) {
    return [];
  }

  const strongSkills = skillState
    .filter((skill) => Number(skill.level) >= 6)
    .map((skill) => normalizeSkillName(skill.name));

  return COURSE_CATALOG.filter((course) => {
    const requiredSkills = course.requiredSkills.map(
      normalizeSkillName
    );

    const allSkillsStrong = requiredSkills.every((skill) =>
      strongSkills.includes(skill)
    );

    return !allSkillsStrong;
  });
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AppDashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);

  const [displayUser, setDisplayUser] = useState(user || {});

  useEffect(() => {
    setDisplayUser(user || {});
  }, [user]);

  const displayName = displayUser.fullName || "Trainee";
  const initials = getInitials(displayName);

  const selectedSkills = useMemo(
    () => getSelectedSkills(displayUser),
    [displayUser]
  );

  const storageKey = `capacityConnectSkillState_${(
    displayUser.email || "guest"
  ).toLowerCase()}`;

  const [skillState, setSkillState] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );

      return selectedSkills.map((name) => {
        const existing = saved.find(
          (item) =>
            normalizeSkillName(item.name) ===
            normalizeSkillName(name)
        );

        return (
          existing || {
            name,
            level: 0,
            verified: false,
            status: "Not Yet Assessed",
          }
        );
      });
    } catch {
      return selectedSkills.map((name) => ({
        name,
        level: 0,
        verified: false,
        status: "Not Yet Assessed",
      }));
    }
  });

  /* Sync registration skills without removing added skills */
  useEffect(() => {
    setSkillState((current) => {
      const merged = [...current];

      selectedSkills.forEach((name) => {
        const exists = merged.some(
          (skill) =>
            normalizeSkillName(skill.name) ===
            normalizeSkillName(name)
        );

        if (!exists) {
          merged.push({
            name,
            level: 0,
            verified: false,
            status: "Not Yet Assessed",
          });
        }
      });

      return merged;
    });
  }, [selectedSkills]);

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(skillState)
    );
  }, [skillState, storageKey]);

  const verifiedSkills = skillState.filter(
    (skill) => skill.verified
  ).length;

  const averageLevel =
    skillState.length > 0
      ? Math.round(
          (skillState.reduce(
            (sum, skill) => sum + Number(skill.level || 0),
            0
          ) /
            skillState.length) *
            10
        ) / 10
      : 0;

  const skillGaps = skillState.filter(
    (skill) => Number(skill.level) < 6
  );

  function updateSkill(updatedSkill) {
    setSkillState((current) =>
      current.map((skill) =>
        normalizeSkillName(skill.name) ===
        normalizeSkillName(updatedSkill.name)
          ? updatedSkill
          : skill
      )
    );
  }

  function addSkill(skillName) {
    if (!skillName) return;

    const alreadyExists = skillState.some(
      (skill) =>
        normalizeSkillName(skill.name) ===
        normalizeSkillName(skillName)
    );

    if (alreadyExists) return;

    const newSkill = {
      name: skillName,
      level: 0,
      verified: false,
      status: "Not Yet Assessed",
    };

    const updatedSkills = [...skillState, newSkill];

    setSkillState(updatedSkills);

    const existingUserSkills = getSelectedSkills(displayUser);

    const updatedUser = {
      ...displayUser,
      skills: [...existingUserSkills, skillName],
    };

    setDisplayUser(updatedUser);

    localStorage.setItem(
      "capacityConnectCurrentUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "capacityConnectTraineeAccount",
      JSON.stringify(updatedUser)
    );

    setShowAddSkill(false);
  }

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

      <aside
        className={`sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
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
            <div
              className="menu-section"
              key={section.label}
            >
              <p>{section.label}</p>

              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    className={`menu-item ${
                      activePage === item.name
                        ? "active"
                        : ""
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
            <div className="avatar">{initials}</div>

            <div className="mini-profile-text">
              <strong>{displayName}</strong>
              <span>Trainee</span>
            </div>
          </div>

          <button
            className="dashboard-logout"
            onClick={onLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
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
              <div className="avatar small">
                {initials}
              </div>

              <div>
                <strong>{displayName}</strong>
                <span>Trainee</span>
              </div>
            </div>
          </div>
        </header>

        <div className="page">
          {activePage === "Dashboard" && (
            <Dashboard
              displayName={displayName}
              skillState={skillState}
              skillGaps={skillGaps}
              verifiedSkills={verifiedSkills}
              averageLevel={averageLevel}
              onOpenSkills={() => setActivePage("Skills")}
              onOpenLearning={() =>
                setActivePage("My Learning")
              }
              onAddSkill={() => setShowAddSkill(true)}
            />
          )}

          {activePage === "My Learning" && (
            <Learning skillState={skillState} />
          )}

          {activePage === "Skills" && (
            <Skills
              skills={skillState}
              onUpdateSkill={updateSkill}
              onAddSkill={() => setShowAddSkill(true)}
            />
          )}

          {activePage === "Find a Trainer" && (
            <Trainers skillGaps={skillGaps} />
          )}

          {activePage === "Profile" && (
            <Profile
              user={displayUser}
              skills={skillState}
            />
          )}
        </div>
      </main>

      {showAddSkill && (
        <AddSkillModal
          skillState={skillState}
          onAdd={addSkill}
          onClose={() => setShowAddSkill(false)}
        />
      )}
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  displayName,
  skillState,
  skillGaps,
  verifiedSkills,
  averageLevel,
  onOpenSkills,
  onOpenLearning,
  onAddSkill,
}) {
  const carouselRef = useRef(null);
  const [carouselPaused, setCarouselPaused] = useState(false);

  const recommendedCourses = useMemo(
    () => getRecommendedCourses(skillState),
    [skillState]
  );

  const learningCourses = recommendedCourses.length
    ? recommendedCourses
    : skillState.length
    ? COURSE_CATALOG
    : [];

  /* AUTO SLIDE */
  useEffect(() => {
    const carousel = carouselRef.current;

    if (
      !carousel ||
      learningCourses.length <= 3 ||
      carouselPaused
    ) {
      return;
    }

    const interval = setInterval(() => {
      const maxScroll =
        carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft >= maxScroll - 20) {
        carousel.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        carousel.scrollBy({
          left: 360,
          behavior: "smooth",
        });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [carouselPaused, learningCourses.length]);

  function scrollCourses(direction) {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction === "right" ? 360 : -360,
      behavior: "smooth",
    });
  }

  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">
            TRAINEE DASHBOARD
          </div>

          <h1>
            {getGreeting()}, {displayName} <span>👋</span>
          </h1>

          <p>
            Build your capabilities, identify skill gaps and
            learn what you need next.
          </p>
        </div>

        <button className="primary-button dashboard-ai-button">
          <Sparkles size={17} />
          Ask Capacity AI
        </button>
      </section>

      <section className="stats-grid">
        <StatCard
          icon={<BrainCircuit />}
          title="Verified Skills"
          value={verifiedSkills}
          note={`${skillState.length} selected`}
        />

        <StatCard
          icon={<Target />}
          title="Skill Level"
          value={`${averageLevel}/7`}
          note="Current average"
        />

        <StatCard
          icon={<TrendingUp />}
          title="Skill Gaps"
          value={skillGaps.length}
          note="Needs development"
        />
      </section>

      {/* LEARNING HUB */}
      <section className="panel course-carousel-panel">
        <div className="carousel-header">
          <div>
            <span className="panel-eyebrow">
              LEARNING HUB
            </span>

            <h2>Recommended Courses</h2>

            <p>
              Courses selected according to your current
              skill profile.
            </p>
          </div>

          <div className="carousel-header-actions">
            <button
              className="panel-action-button premium-action"
              onClick={onOpenLearning}
            >
              View all
              <ChevronRight size={14} />
            </button>

            <div className="carousel-controls">
              <button
                type="button"
                onClick={() => scrollCourses("left")}
                aria-label="Previous courses"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => scrollCourses("right")}
                aria-label="Next courses"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {skillState.length === 0 ? (
          <div className="recommendation-empty">
            <div className="recommendation-empty-icon">
              <BrainCircuit size={23} />
            </div>

            <div>
              <strong>
                Add skills to personalize your learning
              </strong>

              <p>
                Once your skills are added, Capacity Connect
                will identify what you need to learn next.
              </p>
            </div>

            <button
              className="small-primary-button"
              onClick={onAddSkill}
            >
              Add Skill
              <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div
            className="course-carousel premium-carousel"
            ref={carouselRef}
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocus={() => setCarouselPaused(true)}
            onBlur={() => setCarouselPaused(false)}
          >
            {learningCourses.map((course) => (
              <CourseCard
                course={course}
                key={course.id}
                skillState={skillState}
              />
            ))}
          </div>
        )}
      </section>

      {/* LOWER CONTENT */}
      <section className="dashboard-two-column">
        {/* COMPETENCY */}
        <div className="panel competency-panel">
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">
                COMPETENCY
              </span>

              <h2>Your Skill Profile</h2>

              <p>
                Your current competency levels.
              </p>
            </div>

            <div className="panel-header-buttons">
              <button
                className="panel-action-button add-small premium-action"
                onClick={onAddSkill}
              >
                <Plus size={14} />
                Add Skill
              </button>

              <button
                className="panel-action-button premium-action"
                onClick={onOpenSkills}
              >
                Manage
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {skillState.length === 0 ? (
            <EmptyState
              icon={<BrainCircuit size={25} />}
              title="No skills selected"
              text="Add skills to start your competency profile."
            />
          ) : (
            <div className="skill-list compact-skill-list">
              {skillState.slice(0, 6).map((skill) => (
                <SkillBar
                  skill={skill}
                  key={skill.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* INSIGHTS */}
        <div className="panel insights-panel">
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">
                INSIGHTS
              </span>

              <h2>Skill Gap Insights</h2>

              <p>
                Areas that may need your attention.
              </p>
            </div>

            <div className="insight-heading-icon">
              <Target size={18} />
            </div>
          </div>

          {skillState.length === 0 ? (
            <div className="simple-insight">
              <AlertCircle size={20} />

              <p>
                Add skills to generate personalized skill
                insights.
              </p>
            </div>
          ) : skillGaps.length === 0 ? (
            <div className="success-insight">
              <CheckCircle2 size={25} />

              <div>
                <strong>Excellent progress!</strong>

                <p>
                  Your current verified skills are at a
                  strong level.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="gap-list compact-gap-list">
                {skillGaps.slice(0, 4).map((skill) => (
                  <GapInsight
                    skill={skill}
                    key={skill.name}
                  />
                ))}
              </div>

              <div className="recommendation-mini">
                <Sparkles size={17} />

                <span>
                  Courses are prioritized around these
                  learning gaps.
                </span>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ icon, title, value, note }) {
  return (
    <div className="stat-card upgraded-stat-card">
      <div className="stat-icon">{icon}</div>

      <div className="stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </div>
  );
}

/* =========================================================
   COURSE CARD
========================================================= */

function CourseCard({ course, skillState = [] }) {
  const Icon = course.icon || BookOpen;

  const relevantSkills = course.requiredSkills.map(
    (required) => {
      const found = skillState.find(
        (skill) =>
          normalizeSkillName(skill.name) ===
          normalizeSkillName(required)
      );

      return {
        name: required,
        level: found?.level || 0,
      };
    }
  );

  const progress =
    relevantSkills.length > 0
      ? Math.min(
          100,
          Math.round(
            relevantSkills.reduce(
              (sum, skill) =>
                sum + (skill.level / 7) * 100,
              0
            ) / relevantSkills.length
          )
        )
      : 0;

  return (
    <article className="course-card lms-course-card">
      {/* PREMIUM MOTION BANNER */}
      <div
        className={`course-visual course-banner banner-${course.id}`}
      >
        <div className="banner-noise" />
        <div className="course-banner-grid" />

        <div className="banner-glow glow-one" />
        <div className="banner-glow glow-two" />

        <div className="course-orbit orbit-one" />
        <div className="course-orbit orbit-two" />
        <div className="course-orbit orbit-three" />

        <div className="banner-code-lines">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="course-banner-content">
          <span className="course-category">
            {course.category}
          </span>

          <div className="banner-main-symbol">
            <Icon size={31} strokeWidth={1.7} />
          </div>

          <strong>{course.bannerLabel}</strong>
          <small>{course.bannerSub}</small>
        </div>

        <div className="course-banner-play">
          <Play size={15} fill="currentColor" />
        </div>

        <div className="banner-floating-card floating-one">
          <span />
          <span />
          <span />
        </div>

        <div className="banner-floating-card floating-two">
          <span />
          <span />
        </div>
      </div>

      <div className="course-content">
        <div className="course-title-row">
          <div>
            <span className="course-mini-category">
              {course.category}
            </span>

            <h3>{course.title}</h3>
          </div>
        </div>

        <p className="course-description">
          {course.description}
        </p>

        <p className="course-trainer">
          <UserCheck size={14} />
          {course.trainer}
        </p>

        <div className="course-meta">
          <span>
            <Clock3 size={14} />
            {course.duration}
          </span>

          <span>
            <BookOpen size={14} />
            {course.lessons} lessons
          </span>
        </div>

        <div className="course-skills">
          {course.requiredSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <div className="course-progress-row">
          <span>Current readiness</span>
          <strong>{progress}%</strong>
        </div>

        <div className="progress upgraded-progress">
          <span
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <button className="course-action premium-course-button">
          {progress > 0
            ? "Continue Learning"
            : "Start Course"}

          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   SKILL BAR
========================================================= */

function SkillBar({ skill }) {
  const level = Number(skill.level || 0);
  const percentage = (level / 7) * 100;

  const levelClass =
    level <= 3
      ? "skill-low"
      : level <= 5
      ? "skill-medium"
      : "skill-high";

  const statusText = skill.verified
    ? "Verified"
    : level === 0
    ? "Not Yet Assessed"
    : "Needs Development";

  return (
    <div
      className={`skill-item competency-skill ${levelClass}`}
    >
      <div className="skill-item-top">
        <div className="skill-name-block">
          <div className="skill-name-row">
            <strong>{skill.name}</strong>

            {skill.verified && (
              <span className="verified-badge">
                <CheckCircle2 size={11} />
                Verified
              </span>
            )}
          </div>

          {!skill.verified && (
            <span className="not-assessed">
              {statusText}
            </span>
          )}
        </div>

        <div className="skill-score-pill">
          <strong>{level}</strong>
          <span>/7</span>
        </div>
      </div>

      <div className="skill-track">
        <span
          className={`skill-fill level-${level}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   GAP INSIGHT
========================================================= */

function GapInsight({ skill }) {
  const level = Number(skill.level || 0);

  const tone =
    level <= 3
      ? "danger"
      : level <= 5
      ? "warning"
      : "success";

  return (
    <div className={`gap-item gap-${tone}`}>
      <div className="gap-item-icon">
        {level === 0 ? (
          <AlertCircle size={17} />
        ) : (
          <TrendingUp size={17} />
        )}
      </div>

      <div className="gap-item-main">
        <div className="gap-item-top">
          <strong>{skill.name}</strong>

          <span className="gap-score">
            {level}/7
          </span>
        </div>

        <div className="gap-bar">
          <span
            style={{
              width: `${(level / 7) * 100}%`,
            }}
          />
        </div>

        <small>
          {skill.verified
            ? "Verified competency"
            : level === 0
            ? "Not Yet Assessed"
            : "Needs Development"}
        </small>
      </div>
    </div>
  );
}

/* =========================================================
   LEARNING PAGE
========================================================= */

function Learning({ skillState }) {
  const [filter, setFilter] = useState("Recommended");

  const recommendedCourses = useMemo(
    () => getRecommendedCourses(skillState),
    [skillState]
  );

  const categories = [
    "Recommended",
    "All",
    ...new Set(
      COURSE_CATALOG.map((course) => course.category)
    ),
  ];

  let courses = [];

  if (filter === "Recommended") {
    courses = recommendedCourses;
  } else if (filter === "All") {
    courses = COURSE_CATALOG;
  } else {
    courses = COURSE_CATALOG.filter(
      (course) => course.category === filter
    );
  }

  return (
    <>
      <PageTitle
        eyebrow="LEARNING HUB"
        title="My Learning"
        subtitle="Explore courses and build the skills that matter most."
      />

      <div className="learning-insight">
        <div className="learning-insight-icon">
          <Sparkles size={20} />
        </div>

        <div>
          <strong>
            Personalized for your skill profile
          </strong>

          <p>
            Strong skills are deprioritized while
            development areas are brought forward.
          </p>
        </div>
      </div>

      <div className="course-filters upgraded-course-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              filter === category ? "active" : ""
            }
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {courses.length === 0 ? (
        <div className="learning-empty">
          <BrainCircuit size={28} />

          <h3>No personalized courses yet</h3>

          <p>
            Add at least one skill to start receiving
            personalized learning recommendations.
          </p>
        </div>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              skillState={skillState}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* =========================================================
   SKILLS PAGE
========================================================= */

function Skills({
  skills,
  onUpdateSkill,
  onAddSkill,
}) {
  const [selectedSkill, setSelectedSkill] =
    useState(null);

  return (
    <>
      <PageTitle
        eyebrow="COMPETENCY DEVELOPMENT"
        title="My Skills"
        subtitle="Verify and track your real competency level."
      >
        <button
          className="add-skill-btn premium-add-button"
          onClick={onAddSkill}
        >
          <Plus size={16} />
          Add Skill
        </button>
      </PageTitle>

      <div className="skill-system-banner">
        <div className="skill-system-icon">
          <ShieldCheck size={22} />
        </div>

        <div>
          <strong>
            Capacity Connect Skill Verification
          </strong>

          <p>
            Selected skills start at 0/7. Pass the
            assessment first, then complete the AI skill
            interview to receive a verified score.
          </p>
        </div>
      </div>

      {skills.length === 0 ? (
        <EmptyState
          icon={<BrainCircuit size={28} />}
          title="No skills found"
          text="Add a skill to start your competency verification."
        />
      ) : (
        <div className="skills-page-grid">
          {skills.map((skill) => (
            <SkillVerificationCard
              key={skill.name}
              skill={skill}
              onTest={() => setSelectedSkill(skill)}
            />
          ))}
        </div>
      )}

      {selectedSkill && (
        <SkillAssessmentModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onComplete={(result) => {
            onUpdateSkill(result);
            setSelectedSkill(null);
          }}
        />
      )}
    </>
  );
}

/* =========================================================
   SKILL VERIFICATION CARD
========================================================= */

function SkillVerificationCard({
  skill,
  onTest,
}) {
  const level = Number(skill.level || 0);

  const levelClass =
    level <= 3
      ? "strong-danger"
      : level <= 5
      ? "strong-warning"
      : "strong-success";

  return (
    <div
      className={`skill-verification-card upgraded-skill-card ${levelClass}`}
    >
      <div className="skill-card-header">
        <div className="skill-main-icon">
          <BrainCircuit size={20} />
        </div>

        <div className="skill-card-title">
          <h3>{skill.name}</h3>

          <span
            className={`skill-status ${
              skill.verified
                ? "verified-status"
                : level <= 3
                ? "danger-status"
                : "medium-status"
            }`}
          >
            {skill.verified
              ? "Verified Skill"
              : level === 0
              ? "Not Yet Assessed"
              : "Needs Development"}
          </span>
        </div>

        {skill.verified && (
          <div className="verified-check">
            <CheckCircle2 size={20} />
          </div>
        )}
      </div>

      <div className="skill-score-big upgraded-score">
        <strong>{level}</strong>
        <span>/7</span>
      </div>

      <div className="skill-score-label">
        {level === 0
          ? "Not Yet Assessed"
          : `${level}/7 competency level`}
      </div>

      <div className="skill-large-track">
        <span
          className={`skill-fill level-${level}`}
          style={{
            width: `${(level / 7) * 100}%`,
          }}
        />
      </div>

      <div className="skill-card-footer">
        <span>
          {level === 0
            ? "Assessment required"
            : skill.verified
            ? "Skill verified"
            : "Further development recommended"}
        </span>

        <button
          className="premium-test-button"
          onClick={onTest}
        >
          {level === 0
            ? "Test Your Skill"
            : "Retest Skill"}

          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   ASSESSMENT MODAL
========================================================= */

function SkillAssessmentModal({
  skill,
  onClose,
  onComplete,
}) {
  const questions = getQuestionsForSkill(skill.name);

  const [stage, setStage] = useState("assessment");
  const [currentQuestion, setCurrentQuestion] =
    useState(0);
  const [answers, setAnswers] = useState({});
  const [assessmentScore, setAssessmentScore] =
    useState(0);
  const [interviewStep, setInterviewStep] =
    useState(0);
  const [interviewDone, setInterviewDone] =
    useState(false);
  const [interviewAnswer, setInterviewAnswer] =
    useState("");

  function chooseAnswer(index) {
    setAnswers((current) => ({
      ...current,
      [currentQuestion]: index,
    }));
  }

  function submitAssessment() {
    let correct = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correct++;
      }
    });

    const percentage = Math.round(
      (correct / questions.length) * 100
    );

    setAssessmentScore(percentage);

    if (percentage >= 60) {
      setStage("passed");
    } else {
      setStage("failed");
    }
  }

  function startInterview() {
    setStage("interview");
  }

  function finishInterview() {
    setInterviewDone(true);
  }

  function calculateFinalLevel() {
    let baseLevel = Math.round(
      (assessmentScore / 100) * 7
    );

    if (baseLevel < 1) baseLevel = 1;

    return Math.min(7, Math.max(1, baseLevel));
  }

  function completeVerification() {
    const finalLevel = calculateFinalLevel();

    onComplete({
      ...skill,
      level: finalLevel,
      verified: true,
      status: "Verified",
      lastAssessed: new Date().toISOString(),
    });
  }

  const interviewQuestions = [
    `Explain how you would use ${skill.name} in a real project.`,
    `What is one common mistake beginners make while using ${skill.name}?`,
    `How would you improve your ${skill.name} knowledge further?`,
  ];

  return (
    <div className="skill-modal-overlay">
      <div className="skill-modal assessment-modal">
        <button
          className="skill-modal-close"
          onClick={onClose}
        >
          <X size={19} />
        </button>

        <div className="assessment-header">
          <div className="assessment-icon">
            <BrainCircuit size={23} />
          </div>

          <div>
            <span>SKILL VERIFICATION</span>
            <h2>{skill.name}</h2>
          </div>
        </div>

        {stage === "assessment" && (
          <>
            <div className="assessment-progress">
              <div>
                Question {currentQuestion + 1} of{" "}
                {questions.length}
              </div>

              <span>
                {Math.round(
                  ((currentQuestion + 1) /
                    questions.length) *
                    100
                )}
                %
              </span>
            </div>

            <div className="assessment-track">
              <span
                style={{
                  width: `${
                    ((currentQuestion + 1) /
                      questions.length) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="assessment-question">
              <span>ASSESSMENT</span>

              <h3>
                {questions[currentQuestion].q}
              </h3>
            </div>

            <div className="assessment-options">
              {questions[
                currentQuestion
              ].options.map((option, index) => (
                <button
                  key={option}
                  className={
                    answers[currentQuestion] ===
                    index
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    chooseAnswer(index)
                  }
                >
                  <span>
                    {String.fromCharCode(65 + index)}
                  </span>

                  {option}
                </button>
              ))}
            </div>

            <div className="assessment-actions">
              {currentQuestion > 0 && (
                <button
                  className="secondary-button"
                  onClick={() =>
                    setCurrentQuestion(
                      (current) => current - 1
                    )
                  }
                >
                  Back
                </button>
              )}

              {currentQuestion <
              questions.length - 1 ? (
                <button
                  className="primary-button"
                  disabled={
                    answers[currentQuestion] ===
                    undefined
                  }
                  onClick={() =>
                    setCurrentQuestion(
                      (current) => current + 1
                    )
                  }
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  className="primary-button"
                  disabled={
                    answers[currentQuestion] ===
                    undefined
                  }
                  onClick={submitAssessment}
                >
                  Submit Assessment
                  <CheckCircle2 size={16} />
                </button>
              )}
            </div>
          </>
        )}

        {stage === "passed" && (
          <div className="assessment-result success">
            <div className="result-icon">
              <CheckCircle2 size={38} />
            </div>

            <span className="result-label">
              ASSESSMENT PASSED
            </span>

            <h2>{assessmentScore}%</h2>

            <p>
              Great work! You are eligible for the
              next verification stage.
            </p>

            <div className="verification-step">
              <div className="step-done">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>
                  Knowledge Assessment
                </strong>

                <span>Passed</span>
              </div>
            </div>

            <div className="verification-step active">
              <div className="step-number">2</div>

              <div>
                <strong>
                  AI Skill Interview
                </strong>

                <span>
                  Evaluate practical understanding
                </span>
              </div>
            </div>

            <button
              className="primary-button full-width"
              onClick={startInterview}
            >
              Start AI Skill Interview
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {stage === "failed" && (
          <div className="assessment-result failed">
            <div className="result-icon">
              <AlertCircle size={38} />
            </div>

            <span className="result-label">
              ASSESSMENT NOT PASSED
            </span>

            <h2>{assessmentScore}%</h2>

            <p>
              The assessment score is not enough to
              start the AI skill interview yet.
            </p>

            <div className="failed-info">
              <strong>Your skill remains:</strong>
              <span>
                0/7 — Not Yet Assessed
              </span>
            </div>

            <button
              className="secondary-button full-width"
              onClick={onClose}
            >
              Try Again Later
            </button>
          </div>
        )}

        {stage === "interview" &&
          !interviewDone && (
            <>
              <div className="ai-interview-banner">
                <div>
                  <Sparkles size={21} />
                </div>

                <div>
                  <strong>
                    Capacity AI Interview
                  </strong>

                  <span>
                    Practical skill evaluation
                  </span>
                </div>
              </div>

              <div className="interview-question">
                <span>
                  AI INTERVIEW • {interviewStep + 1}/3
                </span>

                <h3>
                  {interviewQuestions[
                    interviewStep
                  ]}
                </h3>

                <textarea
                  value={interviewAnswer}
                  onChange={(e) =>
                    setInterviewAnswer(
                      e.target.value
                    )
                  }
                  placeholder="Type your response..."
                  rows={5}
                />
              </div>

              <div className="assessment-actions">
                <button
                  className="primary-button full-width"
                  disabled={
                    !interviewAnswer.trim()
                  }
                  onClick={() => {
                    setInterviewAnswer("");

                    if (interviewStep < 2) {
                      setInterviewStep(
                        (current) =>
                          current + 1
                      );
                    } else {
                      finishInterview();
                    }
                  }}
                >
                  {interviewStep < 2
                    ? "Next Interview Question"
                    : "Complete AI Evaluation"}

                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}

        {stage === "interview" &&
          interviewDone && (
            <div className="assessment-result success">
              <div className="result-icon">
                <Trophy size={38} />
              </div>

              <span className="result-label">
                SKILL VERIFIED
              </span>

              <h2>
                {calculateFinalLevel()}/7
              </h2>

              <p>
                Assessment and AI interview completed.
                Your competency level has been
                verified.
              </p>

              <div className="verified-final">
                <CheckCircle2 size={18} />
                {skill.name} is now a verified skill
              </div>

              <button
                className="primary-button full-width"
                onClick={completeVerification}
              >
                Save Verified Skill
                <CheckCircle2 size={16} />
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

/* =========================================================
   ADD SKILL MODAL
========================================================= */

function AddSkillModal({
  skillState,
  onAdd,
  onClose,
}) {
  const [search, setSearch] = useState("");

  const existingSkills = skillState.map(
    (skill) => normalizeSkillName(skill.name)
  );

  const availableSkills = AVAILABLE_SKILLS.filter(
    (skill) =>
      !existingSkills.includes(
        normalizeSkillName(skill)
      ) &&
      normalizeSkillName(skill).includes(
        search.toLowerCase().trim()
      )
  );

  return (
    <div
      className="skill-modal-overlay"
      onClick={onClose}
    >
      <div
        className="skill-modal add-skill-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="add-skill-modal-header">
          <div>
            <span className="modal-eyebrow">
              SKILL DEVELOPMENT
            </span>

            <h2>Add a Skill</h2>

            <p>
              Add another skill you want to learn or
              get assessed in.
            </p>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="skill-search">
          <Search size={17} />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search skills..."
            autoFocus
          />
        </div>

        <div className="available-skills">
          {availableSkills.length > 0 ? (
            availableSkills.map((skill) => (
              <button
                key={skill}
                className="available-skill"
                onClick={() => onAdd(skill)}
              >
                <span>{skill}</span>

                <span className="skill-add-icon">
                  +
                </span>
              </button>
            ))
          ) : (
            <div className="no-skills">
              <CheckCircle2 size={23} />

              <p>
                No new matching skills available.
              </p>
            </div>
          )}
        </div>

        <div className="skill-modal-footer">
          <span>
            New skills start at <strong>0/7</strong>{" "}
            until assessed.
          </span>

          <button
            className="secondary-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TRAINERS
========================================================= */

function Trainers({ skillGaps }) {
  const gapNames = skillGaps.map((skill) =>
    normalizeSkillName(skill.name)
  );

  const rankedTrainers = [...TRAINERS].sort(
    (a, b) => {
      const aMatches = a.expertise.filter(
        (skill) =>
          gapNames.includes(
            normalizeSkillName(skill)
          )
      ).length;

      const bMatches = b.expertise.filter(
        (skill) =>
          gapNames.includes(
            normalizeSkillName(skill)
          )
      ).length;

      return bMatches - aMatches;
    }
  );

  return (
    <>
      <PageTitle
        eyebrow="EXPERT NETWORK"
        title="Find a Trainer"
        subtitle="Connect with trainers matched to your competency gaps."
      />

      <div className="trainer-match-banner">
        <div className="trainer-match-icon">
          <Sparkles size={21} />
        </div>

        <div>
          <strong>
            Smart Trainer Matching
          </strong>

          <p>
            Capacity Connect prioritizes trainers who
            can help improve your lowest verified or
            unassessed skills.
          </p>
        </div>
      </div>

      <div className="trainer-grid">
        {rankedTrainers.map((trainer) => {
          const matchingSkills =
            trainer.expertise.filter((skill) =>
              gapNames.includes(
                normalizeSkillName(skill)
              )
            );

          return (
            <div
              className="trainer-card"
              key={trainer.name}
            >
              <div className="trainer-avatar">
                {getInitials(trainer.name)}
              </div>

              <div className="trainer-info">
                <h3>{trainer.name}</h3>

                <span>
                  {trainer.experience} experience
                </span>
              </div>

              {matchingSkills.length > 0 && (
                <div className="trainer-match">
                  {matchingSkills.length} skill gap
                  match
                </div>
              )}

              <div className="trainer-rating">
                ★ {trainer.rating}
              </div>

              <div className="trainer-skills">
                {trainer.expertise.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <button className="trainer-button">
                View Trainer
                <ArrowRight size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function Profile({ user, skills }) {
  const displayName =
    user?.fullName || "Trainee";

  return (
    <>
      <PageTitle
        eyebrow="ACCOUNT"
        title="My Profile"
        subtitle="Your information and verified competency profile."
      />

      <div className="profile-layout">
        <div className="profile-main-card">
          <div className="profile-cover">
            <div className="profile-large-avatar">
              {getInitials(displayName)}
            </div>
          </div>

          <div className="profile-body">
            <h2>{displayName}</h2>

            <span className="profile-role">
              Trainee • Capacity Connect
            </span>

            <div className="profile-details-grid">
              <ProfileField
                label="Email"
                value={user?.email}
              />

              <ProfileField
                label="Phone"
                value={user?.phone}
              />

              <ProfileField
                label="Education"
                value={user?.education}
              />

              <ProfileField
                label="Course"
                value={user?.course}
              />

              <ProfileField
                label="Institution"
                value={user?.institution}
              />

              <ProfileField
                label="Year"
                value={user?.year}
              />

              <ProfileField
                label="Qualification"
                value={user?.qualification}
              />

              <ProfileField
                label="Experience"
                value={user?.experience}
              />

              <ProfileField
                label="Interests"
                value={user?.interests}
              />
            </div>
          </div>
        </div>

        <div className="profile-side-card">
          <div className="profile-side-header">
            <BrainCircuit size={20} />
            <h3>My Skills</h3>
          </div>

          {skills.length === 0 ? (
            <p>No skills selected.</p>
          ) : (
            <div className="profile-skill-list">
              {skills.map((skill) => (
                <div
                  className="profile-skill"
                  key={skill.name}
                >
                  <div>
                    <strong>{skill.name}</strong>

                    {skill.verified && (
                      <CheckCircle2 size={14} />
                    )}
                  </div>

                  <span>{skill.level}/7</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   PROFILE FIELD
========================================================= */

function ProfileField({ label, value }) {
  return (
    <div className="profile-field">
      <span>{label}</span>
      <strong>
        {value || "Not provided"}
      </strong>
    </div>
  );
}

/* =========================================================
   PAGE TITLE
========================================================= */

function PageTitle({
  eyebrow,
  title,
  subtitle,
  children,
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>

        <h1>{title}</h1>

        <p>{subtitle}</p>
      </div>

      {children}
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  icon,
  title,
  text,
}) {
  return (
    <div className="dashboard-empty-state">
      <div>{icon}</div>

      <strong>{title}</strong>

      <p>{text}</p>
    </div>
  );
}