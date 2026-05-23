import User from "../../models/user.model.js";
import generateOtp from "../../utils/generateOtp.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
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

  await sendOtpEmail(email, otp);

  return user;
};

export const verifyOtp = async (email: string, otp: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (!user.otpExpires || user.otpExpires < new Date()) {
    throw new Error("OTP expired");
  }

  user.emailVerified = true;

  user.otp = undefined;

  user.otpExpires = undefined;

  await user.save();

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // ACCOUNT LOCK CHECK
  if (user.lockUntil && user.lockUntil > new Date()) {
    throw new Error("Account temporarily locked. Try again later.");
  }

  if (!user.emailVerified) {
    throw new Error("Please verify your email");
  }

  if (user.status !== "APPROVED") {
    throw new Error("Your account is waiting for admin approval");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  // FAILED LOGIN HANDLING
  if (!isPasswordCorrect) {
    user.loginAttempts += 1;

    // LOCK AFTER 5 ATTEMPTS
    if (user.loginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);

      user.loginAttempts = 0;
    }

    await user.save();

    throw new Error("Invalid credentials");
  }

  // RESET AFTER SUCCESSFUL LOGIN
  user.loginAttempts = 0;

  user.lockUntil = undefined;

  const accessToken = generateAccessToken(user._id.toString(), user.role);

  const refreshToken = generateRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;

  await user.save();

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  return user;
};
