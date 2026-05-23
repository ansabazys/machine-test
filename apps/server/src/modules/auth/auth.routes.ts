import { Router } from "express";
import { login, logout, me, refresh, register, resendEmailOtp, verifyEmailOtp } from "./auth.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { authRateLimiter } from "../../middlewares/rateLimit.middleware.js";

const router = Router();

router.post("/register", authRateLimiter, register);
router.post("/verify-otp", authRateLimiter, verifyEmailOtp);
router.post("/login", authRateLimiter, login);
router.post("/refresh", refresh);
router.post(
  "/resend-otp",
  authRateLimiter,
  resendEmailOtp
);

router.post("/logout", logout);

router.get("/me", authMiddleware, me);

export default router;
