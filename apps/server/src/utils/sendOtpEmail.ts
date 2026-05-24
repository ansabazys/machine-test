import SibApiV3Sdk from "sib-api-v3-sdk";

const defaultClient =
  SibApiV3Sdk.ApiClient
    .instance;

const apiKey =
  defaultClient.authentications[
    "api-key"
  ];

apiKey.apiKey =
  process.env.BREVO_API_KEY!;

const apiInstance =
  new SibApiV3Sdk
    .TransactionalEmailsApi();

const sendOtpEmail = async (
  email: string,
  otp: string
) => {
  await apiInstance.sendTransacEmail({
    sender: {
      email:
        "ansab.devxtra@gmail.com",

      name: "Machine Test",
    },

    to: [
      {
        email,
      },
    ],

    subject:
      "Verify Your Email Address",

    htmlContent: `
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
            "
          >
            This OTP will expire in
            5 minutes.
          </p>
        </div>
      </div>
    `,
  });
};

export default sendOtpEmail;