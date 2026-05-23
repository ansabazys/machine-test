import transporter from "../config/mail.js";

const sendOtpEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "Verify Your Email",

    html: `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
    `,
  });
};

export default sendOtpEmail;