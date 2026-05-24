import transporter from "../config/mail.js";

const sendOtpEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    // VERIFIED BREVO SENDER EMAIL
    from: '"Machine Test" <ansab.devxtra@gmail.com>',

    to: email,

    subject: "Verify Your Email Address",

    // FALLBACK FOR CLIENTS THAT BLOCK HTML
    text: `Your OTP is ${otp}`,

    html: `
      <div
        style="
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
          background-color: #f8fafc;
        "
      >
        <div
          style="
            background: white;
            border-radius: 12px;
            padding: 40px 30px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          "
        >
          <h1
            style="
              margin: 0;
              color: #0f172a;
              font-size: 24px;
              font-weight: 700;
            "
          >
            Email Verification
          </h1>

          <p
            style="
              margin-top: 16px;
              color: #475569;
              font-size: 16px;
              line-height: 1.6;
            "
          >
            Welcome to Machine Test Platform.
            Please use the OTP below to verify
            your email address.
          </p>

          <div
            style="
              margin: 32px 0;
              text-align: center;
            "
          >
            <div
              style="
                display: inline-block;
                background: #0f172a;
                color: white;
                padding: 16px 32px;
                border-radius: 10px;
                font-size: 32px;
                font-weight: 700;
                letter-spacing: 8px;
              "
            >
              ${otp}
            </div>
          </div>

          <p
            style="
              color: #64748b;
              font-size: 14px;
              line-height: 1.6;
            "
          >
            This OTP will expire in 5 minutes.
          </p>

          <p
            style="
              color: #64748b;
              font-size: 14px;
              line-height: 1.6;
              margin-top: 24px;
            "
          >
            If you did not request this email,
            you can safely ignore it.
          </p>

          <hr
            style="
              margin: 32px 0;
              border: none;
              border-top: 1px solid #e2e8f0;
            "
          />

          <p
            style="
              color: #94a3b8;
              font-size: 12px;
              text-align: center;
              margin: 0;
            "
          >
            © 2026 Machine Test Platform
          </p>
        </div>
      </div>
    `,
  });
};

export default sendOtpEmail;
