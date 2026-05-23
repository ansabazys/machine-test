import { Router } from "express";
import { register, verifyEmailOtp } from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/verify-otp", verifyEmailOtp);

export default router;