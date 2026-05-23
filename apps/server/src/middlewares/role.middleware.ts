import { NextFunction, Response } from "express";

interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

const roleMiddleware = (
  role: string
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