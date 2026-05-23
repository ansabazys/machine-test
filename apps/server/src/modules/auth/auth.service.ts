import User from "../../models/user.model.js";
import generateOtp from "../../utils/generateOtp.js";
import { hashPassword } from "../../utils/hash.js";
import sendOtpEmail from "../../utils/sendOtpEmail.js";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterPayload) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const otp = generateOtp();

  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpires,
  });

  await sendOtpEmail(email, otp)

  return user;
};