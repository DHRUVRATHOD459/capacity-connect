import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = "dhruvrathod12301@gmail.com";

const otpStore = new Map();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Capacity Connect backend is running 🚀",
  });
});

app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!BREVO_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Brevo API key is not configured.",
      });
    }

    const emailKey = email.trim().toLowerCase();

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    otpStore.set(emailKey, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    console.log(`OTP generated for ${emailKey}: ${otp}`);

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
                This OTP is valid for <strong>5 minutes</strong>.
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

    if (!response.ok) {
      console.error("Brevo error:", data);

      otpStore.delete(emailKey);

      return res.status(500).json({
        success: false,
        message: data?.message || "Failed to send OTP.",
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
    console.error("Send OTP server error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong while sending OTP.",
    });
  }
});

app.post("/api/verify-otp", (req, res) => {
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
        message: "OTP not found. Please request a new OTP.",
      });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(emailKey);

      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new OTP.",
      });
    }

    if (storedData.otp !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP.",
      });
    }

    otpStore.delete(emailKey);

    console.log(
      `OTP verified successfully for ${emailKey}`
    );

    return res.json({
      success: true,
      message: "Email verified successfully.",
    });

  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying OTP.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Capacity Connect backend running on port ${PORT}`
  );
});