import {
  NextFunction,
  Request,
  Response,
} from "express";

import { verifyAccessToken }
  from "../utils/jwt.js";

interface AuthRequest
  extends Request {
  userId?: string;
  userRole?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      verifyAccessToken(token);

    req.userId =
      decoded.userId;

    req.userRole =
      decoded.role;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;