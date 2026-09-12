import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());
app.use(express.json());

/* =========================
   RESEND
========================= */

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   TEMPORARY OTP STORAGE
========================= */

const otpStore = new Map();

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Capacity Connect backend is running 🚀",
  });
});

/* =========================
   SEND OTP
========================= */

app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    /* Validate email */

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const emailKey = email.trim().toLowerCase();

    /* Generate 6-digit OTP */

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    /* Store OTP for 5 minutes */

    otpStore.set(emailKey, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    console.log(`OTP generated for ${emailKey}: ${otp}`);

    /* Send email */

    const { data, error } = await resend.emails.send({
      from: "Capacity Connect <onboarding@resend.dev>",

      to: [emailKey],

      subject: "Your Capacity Connect OTP",

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 40px auto;
            padding: 30px;
            border: 1px solid #e5ebe8;
            border-radius: 18px;
            background: #ffffff;
          "
        >

          <h2
            style="
              color: #07885f;
              margin-bottom: 10px;
            "
          >
            Capacity Connect
          </h2>

          <p
            style="
              color: #555;
              font-size: 15px;
            "
          >
            Your email verification OTP is:
          </p>

          <div
            style="
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              padding: 18px;
              margin: 25px 0;
              background: #eaf8f3;
              color: #07885f;
              text-align: center;
              border-radius: 12px;
            "
          >
            ${otp}
          </div>

          <p
            style="
              color: #555;
              font-size: 14px;
            "
          >
            This OTP is valid for
            <strong>5 minutes</strong>.
          </p>

          <p
            style="
              color: #888;
              font-size: 13px;
              margin-top: 25px;
            "
          >
            Please do not share this OTP with anyone.
          </p>

          <hr
            style="
              border: none;
              border-top: 1px solid #eeeeee;
              margin: 25px 0;
            "
          />

          <p
            style="
              color: #999;
              font-size: 12px;
            "
          >
            This is an automated email from Capacity Connect.
          </p>

        </div>
      `,
    });

    /* Resend returned an error */

    if (error) {
      console.error("Resend error:", error);

      otpStore.delete(emailKey);

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to send OTP.",
      });
    }

    /* Success */

    console.log(
      `OTP email sent successfully to ${emailKey}`
    );

    return res.json({
      success: true,
      message: "OTP sent successfully.",
      emailId: data?.id,
    });

  } catch (error) {
    console.error("Send OTP server error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong while sending OTP.",
    });
  }
});

/* =========================
   VERIFY OTP
========================= */

app.post("/api/verify-otp", (req, res) => {
  try {
    const { email, otp } = req.body;

    /* Validate */

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const emailKey = email.trim().toLowerCase();

    /* Find stored OTP */

    const storedData = otpStore.get(emailKey);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message:
          "OTP not found. Please request a new OTP.",
      });
    }

    /* Check expiry */

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(emailKey);

      return res.status(400).json({
        success: false,
        message:
          "OTP expired. Please request a new OTP.",
      });
    }

    /* Check OTP */

    if (storedData.otp !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP.",
      });
    }

    /* OTP verified */

    otpStore.delete(emailKey);

    console.log(
      `OTP verified successfully for ${emailKey}`
    );

    return res.json({
      success: true,
      message: "Email verified successfully.",
    });

  } catch (error) {
    console.error(
      "OTP verification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while verifying OTP.",
    });
  }
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Capacity Connect backend running on port ${PORT}`
  );
});