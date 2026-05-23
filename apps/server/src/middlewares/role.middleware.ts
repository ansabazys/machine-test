import {
  NextFunction,
  Request,
  Response,
} from "express";

interface AuthRequest
  extends Request {
  userId?: string;
  userRole?: "ADMIN" | "USER";
}

const roleMiddleware = (
  role: "ADMIN" | "USER"
) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (req.userRole !== role) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };
};

export default roleMiddleware;