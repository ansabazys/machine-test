import { Router } from "express";

import sendOtpEmail from "../utils/sendOtpEmail.js";

const router = Router();

router.get("/", async (_, res) => {
  try {
    await sendOtpEmail(
      "YOUR_PERSONAL_EMAIL@gmail.com",
      "123456"
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});

export default router;