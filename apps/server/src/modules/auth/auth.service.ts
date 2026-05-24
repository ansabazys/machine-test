import User from "../../models/user.model.js";

import generateOtp from "../../utils/generateOtp.js";

import { comparePassword, hashPassword } from "../../utils/hash.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";

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
  const existingUser = await User.findOne({
    email,
  });

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

  // IMPORTANT:
  // KEEP AWAIT HERE
  // Registration should guarantee OTP delivery
  await sendOtpEmail(email, otp);

  return user;
};

export const verifyOtp = async (email: string, otp: string) => {
  const user = await User.findOne({
    email,
  });

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
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // ACCOUNT LOCK CHECK
  if (user.lockUntil && user.lockUntil > new Date()) {
    throw new Error("Account temporarily locked. Try again later.");
  }

  // PASSWORD CHECK
  const isPasswordCorrect = await comparePassword(password, user.password);

  // FAILED LOGIN HANDLING
  if (!isPasswordCorrect) {
    user.loginAttempts += 1;

    if (user.loginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);

      user.loginAttempts = 0;
    }

    await user.save();

    throw new Error("Invalid credentials");
  }

  // RESET LOGIN ATTEMPTS
  user.loginAttempts = 0;

  user.lockUntil = undefined;

  // EMAIL VERIFIED CHECK
  if (!user.emailVerified) {
    throw new Error("Please verify your email");
  }

  // ADMIN APPROVAL CHECK
  if (user.status !== "APPROVED") {
    throw new Error("Your account is waiting for admin approval");
  }

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

export const refreshAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Refresh token missing");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = generateAccessToken(user._id.toString(), user.role);

  return accessToken;
};

export const logoutUser = async (refreshToken: string) => {
  if (!refreshToken) {
    return;
  }

  const user = await User.findOne({
    refreshToken,
  });

  if (user) {
    user.refreshToken = undefined;

    await user.save();
  }
};

export const resendOtp = async (email: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.emailVerified) {
    throw new Error("Email already verified");
  }

  const otp = generateOtp();

  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  user.otp = otp;

  user.otpExpires = otpExpires;

  await user.save();

  // SEND EMAIL IN BACKGROUND
  // Faster resend experience
  sendOtpEmail(email, otp).catch(console.error);

  return true;
};
