import { Request, Response } from "express";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendOtp,
  verifyOtp,
} from "./auth.service.js";

interface AuthRequest extends Request {
  userId?: string;
}

const cookieOptions = {
  httpOnly: true,

  secure: process.env.NODE_ENV === "production",

  sameSite:
    process.env.NODE_ENV === "production"
      ? ("none" as const)
      : ("lax" as const),

  maxAge: 7 * 24 * 60 * 60 * 1000,

  path: "/",
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,

      message: "OTP sent successfully",

      data: {
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const verifyEmailOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    await verifyOtp(email, otp);

    res.status(200).json({
      success: true,

      message: "Email verified successfully. Waiting for admin approval.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    // SET REFRESH TOKEN COOKIE
    res.cookie("refreshToken", data.refreshToken, cookieOptions);

    res.status(200).json({
      success: true,

      message: "Login successful",

      data: {
        accessToken: data.accessToken,

        user: {
          id: data.user._id,

          name: data.user.name,

          email: data.user.email,

          role: data.user.role,

          status: data.user.status,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const me = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getCurrentUser(req.userId as string);

    res.status(200).json({
      success: true,

      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: "Something went wrong",
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const accessToken = await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,

      accessToken,
    });
  } catch (error) {
    res.status(401).json({
      success: false,

      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await logoutUser(refreshToken);

    // CLEAR COOKIE
    res.clearCookie("refreshToken", cookieOptions);

    res.status(200).json({
      success: true,

      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: "Something went wrong",
    });
  }
};

export const resendEmailOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await resendOtp(email);

    res.status(200).json({
      success: true,

      message: "OTP resent successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
