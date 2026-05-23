import { Router } from "express";

import {
  approveUser,
  getPendingUsers,
  rejectUser,
} from "./admin.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/pending-users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getPendingUsers,
);

router.patch(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  approveUser,
);

router.patch(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  rejectUser,
);

export default router;
