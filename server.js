import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";

dotenv.config();

const { Pool } = pg;

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// CONFIGURATION
// ==========================================

const PORT = process.env.PORT || 5000;

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = "dhruvrathod12301@gmail.com";

// ==========================================
// POSTGRESQL DATABASE
// ==========================================

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("PostgreSQL database connected successfully");
  })
  .catch((error) => {
    console.error(
      "PostgreSQL connection failed:",
      error.message
    );
  });

// ==========================================
// TEMPORARY OTP / REGISTRATION STORE
// ==========================================
//
// OTP remains temporary in server memory.
// The actual account is created in PostgreSQL
// only after the OTP is successfully verified.
//
// email -> {
//   otp,
//   expiresAt,
//   registration
// }
// ==========================================

const otpStore = new Map();
// ==========================================
// TRAINER OTP STORE
// ==========================================

const trainerOtpStore = new Map();


// ==========================================
// ADMIN AUTH SESSION STORE
// ==========================================

// Temporary in-memory admin sessions.
// Later this can be replaced with JWT/session storage.

const adminSessionStore = new Map();
// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Capacity Connect backend is running 🚀",
    database: "PostgreSQL configured",
    otp: "Brevo configured",
  });
});

// ==========================================
// DATABASE TEST
// ==========================================

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time"
    );

    return res.json({
      success: true,
      message:
        "PostgreSQL database is connected successfully.",
      databaseTime: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database test error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed.",
      error: error.message,
    });
  }
});

// ==========================================
// SEND OTP
// ==========================================
//
// This endpoint now receives the complete
// registration data.
//
// It does NOT create the database account yet.
//
// Account is created only after OTP verification.
// ==========================================

app.post("/api/send-otp", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      education,
      course,
      institution,
      year,
      qualification,
      experience,
      interests,
      skills,
    } = req.body;

    // --------------------------------------
    // BASIC VALIDATION
    // --------------------------------------

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 6 characters.",
      });
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one skill.",
      });
    }

    if (!BREVO_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Brevo API key is not configured.",
      });
    }

    const emailKey = email.trim().toLowerCase();

    // --------------------------------------
    // CHECK WHETHER EMAIL ALREADY EXISTS
    // --------------------------------------

    const existingUser = await pool.query(
      `
      SELECT id
      FROM users
      WHERE email = $1
      LIMIT 1
      `,
      [emailKey]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists. Please login instead.",
      });
    }

    // --------------------------------------
    // GENERATE OTP
    // --------------------------------------

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // --------------------------------------
    // SAVE TEMPORARY REGISTRATION DATA
    // --------------------------------------
    //
    // Password is kept only temporarily until
    // OTP verification, then immediately hashed
    // before PostgreSQL storage.
    //
    // It is NEVER stored as plaintext in DB.
    // --------------------------------------

    otpStore.set(emailKey, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,

      registration: {
        fullName: fullName.trim(),
        email: emailKey,
        phone: phone.trim(),

        password,

        education: education || null,
        course: course?.trim() || null,
        institution: institution?.trim() || null,
        year: year?.trim() || null,

        qualification: qualification?.trim() || null,
        experience: experience?.trim() || null,
        interests: interests?.trim() || null,

        skills: skills
          .filter(
            (skill) =>
              typeof skill === "string" &&
              skill.trim()
          )
          .map((skill) => skill.trim()),
      },
    });

    console.log(
      `OTP generated for ${emailKey}: ${otp}`
    );

    // --------------------------------------
    // SEND OTP THROUGH BREVO
    // --------------------------------------

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",

        headers: {
          accept: "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          sender: {
            name: "Capacity Connect",
            email: SENDER_EMAIL,
          },

          to: [
            {
              email: emailKey,
            },
          ],

          subject: "Your Capacity Connect OTP",

          htmlContent: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 500px;
              margin: 40px auto;
              padding: 30px;
              border: 1px solid #e5ebe8;
              border-radius: 18px;
              background: #ffffff;
            ">

              <h2 style="
                color: #07885f;
                margin-bottom: 10px;
              ">
                Capacity Connect
              </h2>

              <p style="
                color: #555;
                font-size: 15px;
              ">
                Your email verification OTP is:
              </p>

              <div style="
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                padding: 18px;
                margin: 25px 0;
                background: #eaf8f3;
                color: #07885f;
                text-align: center;
                border-radius: 12px;
              ">
                ${otp}
              </div>

              <p style="
                color: #555;
                font-size: 14px;
              ">
                This OTP is valid for
                <strong>5 minutes</strong>.
              </p>

              <p style="
                color: #888;
                font-size: 13px;
                margin-top: 25px;
              ">
                Please do not share this OTP with anyone.
              </p>

              <hr style="
                border: none;
                border-top: 1px solid #eeeeee;
                margin: 25px 0;
              " />

              <p style="
                color: #999;
                font-size: 12px;
              ">
                This is an automated email from Capacity Connect.
              </p>

            </div>
          `,
        }),
      }
    );

    const data = await response.json();

    // --------------------------------------
    // BREVO ERROR
    // --------------------------------------

    if (!response.ok) {
      console.error("Brevo error:", data);

      otpStore.delete(emailKey);

      return res.status(500).json({
        success: false,
        message:
          data?.message || "Failed to send OTP.",
      });
    }

    console.log(
      `OTP email sent successfully to ${emailKey}`
    );

    return res.json({
      success: true,
      message: "OTP sent successfully.",
      emailId: data?.messageId,
    });
  } catch (error) {
    console.error(
      "Send OTP server error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong while sending OTP.",
    });
  }
});

// ==========================================
// VERIFY OTP + CREATE ACCOUNT
// ==========================================
//
// This is the important final registration flow:
//
// OTP correct
//      ↓
// Hash password
//      ↓
// Create users row
//      ↓
// Create trainee profile
//      ↓
// Save selected skills
//      ↓
// email_verified = TRUE
// ==========================================

app.post("/api/verify-otp", async (req, res) => {
  const client = await pool.connect();

  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const emailKey = email.trim().toLowerCase();

    const storedData = otpStore.get(emailKey);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message:
          "OTP not found. Please request a new OTP.",
      });
    }

    // --------------------------------------
    // CHECK EXPIRY
    // --------------------------------------

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(emailKey);

      return res.status(400).json({
        success: false,
        message:
          "OTP expired. Please request a new OTP.",
      });
    }

    // --------------------------------------
    // CHECK OTP
    // --------------------------------------

    if (storedData.otp !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP.",
      });
    }

    const registration = storedData.registration;

    // --------------------------------------
    // FINAL EMAIL EXISTENCE CHECK
    // --------------------------------------

    const existingUser = await client.query(
      `
      SELECT id
      FROM users
      WHERE email = $1
      LIMIT 1
      `,
      [emailKey]
    );

    if (existingUser.rows.length > 0) {
      otpStore.delete(emailKey);

      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists. Please login instead.",
      });
    }

    // --------------------------------------
    // HASH PASSWORD
    // --------------------------------------

    const passwordHash = await bcrypt.hash(
      registration.password,
      12
    );

    // --------------------------------------
    // START DATABASE TRANSACTION
    // --------------------------------------

    await client.query("BEGIN");

    // --------------------------------------
    // CREATE USER
    // --------------------------------------

    const userResult = await client.query(
      `
      INSERT INTO users
      (
        full_name,
        email,
        phone,
        password_hash,
        role,
        email_verified
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        'trainee',
        TRUE
      )
      RETURNING
        id,
        full_name,
        email,
        phone,
        role,
        email_verified,
        created_at
      `,
      [
        registration.fullName,
        registration.email,
        registration.phone,
        passwordHash,
      ]
    );

    const user = userResult.rows[0];

    // --------------------------------------
    // CREATE TRAINEE PROFILE
    // --------------------------------------

    await client.query(
      `
      INSERT INTO trainee_profiles
      (
        user_id,
        education,
        course,
        institution,
        academic_year,
        qualification,
        experience,
        interests
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
      )
      `,
      [
        user.id,
        registration.education,
        registration.course,
        registration.institution,
        registration.year,
        registration.qualification,
        registration.experience,
        registration.interests,
      ]
    );

    // --------------------------------------
    // SAVE SELECTED SKILLS
    // --------------------------------------

    for (const skillName of registration.skills) {
      const skillResult = await client.query(
        `
        SELECT id
        FROM skills
        WHERE LOWER(name) = LOWER($1)
        LIMIT 1
        `,
        [skillName]
      );

      if (skillResult.rows.length === 0) {
        console.warn(
          `Skill not found in master table: ${skillName}`
        );

        continue;
      }

      const skillId = skillResult.rows[0].id;

      await client.query(
        `
        INSERT INTO user_skills
        (
          user_id,
          skill_id,
          level,
          is_verified,
          assessment_status
        )
        VALUES
        (
          $1,
          $2,
          0,
          FALSE,
          'not_started'
        )
        ON CONFLICT (user_id, skill_id)
        DO NOTHING
        `,
        [user.id, skillId]
      );
    }

    // --------------------------------------
    // COMMIT TRANSACTION
    // --------------------------------------

    await client.query("COMMIT");

    // OTP can now be removed because it has been used.
    otpStore.delete(emailKey);

    console.log(
      `Account created successfully for ${emailKey}`
    );

    return res.status(201).json({
      success: true,
      message:
        "Email verified and trainee account created successfully.",

      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.email_verified,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "OTP verification / account creation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to create your account. Please try again.",
    });
  } finally {
    client.release();
  }
});

// ==========================================
// LOGIN
// ==========================================
//
// Login now checks PostgreSQL instead of
// localStorage.
// ==========================================

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const emailKey = email.trim().toLowerCase();

    // --------------------------------------
    // GET USER
    // --------------------------------------

    const userResult = await pool.query(
      `
      SELECT
        id,
        full_name,
        email,
        phone,
        password_hash,
        role,
        email_verified,
        is_active,
        created_at
      FROM users
      WHERE email = $1
      LIMIT 1
      `,
      [emailKey]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const user = userResult.rows[0];

    // --------------------------------------
    // CHECK ACTIVE ACCOUNT
    // --------------------------------------

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message:
          "Your account is currently inactive.",
      });
    }

    // --------------------------------------
    // CHECK EMAIL VERIFICATION
    // --------------------------------------

    if (!user.email_verified) {
      return res.status(403).json({
        success: false,
        message:
          "Please verify your email before logging in.",
      });
    }

    // --------------------------------------
    // COMPARE PASSWORD
    // --------------------------------------

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    // --------------------------------------
    // GET TRAINEE PROFILE
    // --------------------------------------

    let profile = null;

    if (user.role === "trainee") {
      const profileResult = await pool.query(
        `
        SELECT
          education,
          course,
          institution,
          academic_year,
          qualification,
          experience,
          interests
        FROM trainee_profiles
        WHERE user_id = $1
        LIMIT 1
        `,
        [user.id]
      );

      if (profileResult.rows.length > 0) {
        profile = profileResult.rows[0];
      }
    }

    // --------------------------------------
    // GET USER SKILLS
    // --------------------------------------

    const skillsResult = await pool.query(
      `
      SELECT
        s.name,
        us.level,
        us.is_verified,
        us.assessment_status,
        us.assessment_score,
        us.verified_at
      FROM user_skills us
      INNER JOIN skills s
        ON s.id = us.skill_id
      WHERE us.user_id = $1
      ORDER BY s.name ASC
      `,
      [user.id]
    );

    const skills = skillsResult.rows;

    // --------------------------------------
    // SAFE USER RESPONSE
    // --------------------------------------
    //
    // password_hash is NEVER returned.
    // --------------------------------------

    return res.json({
      success: true,
      message: "Login successful.",

      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.email_verified,
        createdAt: user.created_at,

        education: profile?.education || "",
        course: profile?.course || "",
        institution: profile?.institution || "",
        year: profile?.academic_year || "",
        qualification:
          profile?.qualification || "",
        experience:
          profile?.experience || "",
        interests:
          profile?.interests || "",

        skills,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while logging in.",
    });
  }
});

// ==========================================
// TRAINER LOGIN - PASSWORD CHECK
// ==========================================
//
// Trainer account is created by Admin.
// Trainer logs in using email + password.
// If credentials are correct, OTP is sent
// to the trainer's registered email.
// ==========================================

app.post("/api/trainer-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const emailKey = email.trim().toLowerCase();

    // --------------------------------------
    // GET TRAINER
    // --------------------------------------

    const userResult = await pool.query(
      `
      SELECT
        id,
        full_name,
        email,
        phone,
        password_hash,
        role,
        email_verified,
        is_active,
        created_at
      FROM users
      WHERE email = $1
        AND role = 'trainer'
      LIMIT 1
      `,
      [emailKey]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid trainer email or password.",
      });
    }

    const user = userResult.rows[0];

    // --------------------------------------
    // CHECK ACTIVE ACCOUNT
    // --------------------------------------

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Your trainer account is currently inactive.",
      });
    }

    // --------------------------------------
    // CHECK EMAIL VERIFICATION
    // --------------------------------------

    if (!user.email_verified) {
      return res.status(403).json({
        success: false,
        message: "Trainer email is not verified.",
      });
    }

    // --------------------------------------
    // CHECK PASSWORD
    // --------------------------------------

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid trainer email or password.",
      });
    }

    // --------------------------------------
    // GENERATE OTP
    // --------------------------------------

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    trainerOtpStore.set(emailKey, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    console.log(
      `Trainer OTP generated for ${emailKey}: ${otp}`
    );

    // --------------------------------------
    // CHECK BREVO
    // --------------------------------------

    if (!BREVO_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Brevo API key is not configured.",
      });
    }

    // --------------------------------------
    // SEND OTP THROUGH BREVO
    // --------------------------------------

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "Capacity Connect",
            email: SENDER_EMAIL,
          },
          to: [
            {
              email: emailKey,
            },
          ],
          subject: "Capacity Connect Trainer Login OTP",
          htmlContent: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 500px;
              margin: 40px auto;
              padding: 30px;
              border: 1px solid #e5ebe8;
              border-radius: 18px;
              background: #ffffff;
            ">

              <h2 style="
                color: #07885f;
                margin-bottom: 10px;
              ">
                Capacity Connect
              </h2>

              <p style="
                color: #555;
                font-size: 15px;
              ">
                Your Trainer login verification OTP is:
              </p>

              <div style="
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                padding: 18px;
                margin: 25px 0;
                background: #eaf8f3;
                color: #07885f;
                text-align: center;
                border-radius: 12px;
              ">
                ${otp}
              </div>

              <p style="
                color: #555;
                font-size: 14px;
              ">
                This OTP is valid for
                <strong>5 minutes</strong>.
              </p>

              <p style="
                color: #888;
                font-size: 13px;
                margin-top: 25px;
              ">
                Please do not share this OTP with anyone.
              </p>

              <hr style="
                border: none;
                border-top: 1px solid #eeeeee;
                margin: 25px 0;
              " />

              <p style="
                color: #999;
                font-size: 12px;
              ">
                This is an automated email from Capacity Connect.
              </p>

            </div>
          `,
        }),
      }
    );

    const data = await response.json();

    // --------------------------------------
    // BREVO ERROR
    // --------------------------------------

    if (!response.ok) {
      console.error("Trainer Brevo error:", data);

      trainerOtpStore.delete(emailKey);

      return res.status(500).json({
        success: false,
        message:
          data?.message || "Failed to send trainer OTP.",
      });
    }

    console.log(
      `Trainer OTP email sent successfully to ${emailKey}`
    );

    return res.json({
      success: true,
      message: "Trainer OTP sent successfully.",
    });

  } catch (error) {
    console.error(
      "Trainer login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong during trainer login.",
    });
  }
});


// ==========================================
// TRAINER OTP VERIFICATION
// ==========================================
//
// OTP correct
//      ↓
// Get trainer profile
//      ↓
// Return safe trainer data
//      ↓
// Frontend opens TrainerDashboard
// ==========================================

app.post("/api/trainer-verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const emailKey = email.trim().toLowerCase();

    // --------------------------------------
    // GET STORED OTP
    // --------------------------------------

    const storedData = trainerOtpStore.get(emailKey);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message:
          "OTP not found. Please login again.",
      });
    }

    // --------------------------------------
    // CHECK EXPIRY
    // --------------------------------------

    if (Date.now() > storedData.expiresAt) {
      trainerOtpStore.delete(emailKey);

      return res.status(400).json({
        success: false,
        message:
          "OTP expired. Please login again.",
      });
    }

    // --------------------------------------
    // CHECK OTP
    // --------------------------------------

    if (storedData.otp !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP.",
      });
    }

    // --------------------------------------
    // GET TRAINER + PROFILE
    // --------------------------------------

    const trainerResult = await pool.query(
      `
      SELECT
        u.id,
        u.full_name,
        u.email,
        u.phone,
        u.role,
        u.email_verified,
        u.is_active,
        u.created_at,

        tp.qualification,
        tp.experience,
        tp.specialization,
        tp.bio,
        tp.organization,
        tp.designation

      FROM users u

      LEFT JOIN trainer_profiles tp
        ON tp.user_id = u.id

      WHERE u.email = $1
        AND u.role = 'trainer'

      LIMIT 1
      `,
      [emailKey]
    );

    if (trainerResult.rows.length === 0) {
      trainerOtpStore.delete(emailKey);

      return res.status(404).json({
        success: false,
        message: "Trainer account not found.",
      });
    }

    const trainer = trainerResult.rows[0];

    // --------------------------------------
    // REMOVE USED OTP
    // --------------------------------------

    trainerOtpStore.delete(emailKey);

    // --------------------------------------
    // SAFE TRAINER RESPONSE
    // --------------------------------------

    return res.json({
      success: true,
      message: "Trainer login successful.",

      user: {
        id: trainer.id,
        fullName: trainer.full_name,
        email: trainer.email,
        phone: trainer.phone,
        role: trainer.role,
        emailVerified: trainer.email_verified,
        isActive: trainer.is_active,
        createdAt: trainer.created_at,

        qualification:
          trainer.qualification || "",

        experience:
          trainer.experience || "",

        specialization:
          trainer.specialization || "",

        bio:
          trainer.bio || "",

        organization:
          trainer.organization || "",

        designation:
          trainer.designation || "",
      },
    });

  } catch (error) {
    console.error(
      "Trainer OTP verification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while verifying trainer OTP.",
    });
  }
});
// ==========================================
// ADMIN - CREATE TRAINER
// ==========================================
//
// Admin creates the trainer account.
// Trainer does NOT self-signup.
//
// Creates:
// 1. users row
// 2. trainer_profiles row
//
// Password is hashed before storing.
// ==========================================

app.post("/api/admin/create-trainer", async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      fullName,
      email,
      phone,
      password,
      qualification,
      experience,
      specialization,
      bio,
      organization,
      designation,
    } = req.body;

    // --------------------------------------
    // BASIC VALIDATION
    // --------------------------------------

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters.",
      });
    }

    const emailKey = email.trim().toLowerCase();

    // --------------------------------------
    // CHECK EXISTING USER
    // --------------------------------------

    const existingUser = await client.query(
      `
      SELECT id
      FROM users
      WHERE email = $1
      LIMIT 1
      `,
      [emailKey]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // --------------------------------------
    // HASH PASSWORD
    // --------------------------------------

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    // --------------------------------------
    // START TRANSACTION
    // --------------------------------------

    await client.query("BEGIN");

    // --------------------------------------
    // CREATE TRAINER USER
    // --------------------------------------

    const userResult = await client.query(
      `
      INSERT INTO users
      (
        full_name,
        email,
        phone,
        password_hash,
        role,
        email_verified,
        is_active
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        'trainer',
        TRUE,
        TRUE
      )
      RETURNING
        id,
        full_name,
        email,
        phone,
        role,
        email_verified,
        is_active,
        created_at
      `,
      [
        fullName.trim(),
        emailKey,
        phone?.trim() || null,
        passwordHash,
      ]
    );

    const user = userResult.rows[0];

    // --------------------------------------
    // CREATE TRAINER PROFILE
    // --------------------------------------

    await client.query(
      `
      INSERT INTO trainer_profiles
      (
        user_id,
        qualification,
        experience,
        specialization,
        bio,
        organization,
        designation
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )
      `,
      [
        user.id,
        qualification?.trim() || null,
        experience?.trim() || null,
        specialization?.trim() || null,
        bio?.trim() || null,
        organization?.trim() || null,
        designation?.trim() || null,
      ]
    );

    // --------------------------------------
    // COMMIT
    // --------------------------------------

    await client.query("COMMIT");

    console.log(
      `Trainer account created: ${emailKey}`
    );

    return res.status(201).json({
      success: true,
      message: "Trainer account created successfully.",
      trainer: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.email_verified,
        isActive: user.is_active,
        createdAt: user.created_at,
      },
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error(
      "Create trainer error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to create trainer account.",
    });

  } finally {
    client.release();
  }
});
// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Capacity Connect backend running on port ${PORT}`
  );
});