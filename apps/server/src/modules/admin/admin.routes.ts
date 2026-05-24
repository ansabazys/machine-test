import { Router } from "express";

import {
  approveUser,
  getUsers,
  getPendingUsers,
  rejectUser,
} from "./admin.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers,
);

router.get(
  "/users/pending",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getPendingUsers,
);

router.patch(
  "/users/:id/approve",
  authMiddleware,
  roleMiddleware("ADMIN"),
  approveUser,
);

router.patch(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  approveUser,
);

router.patch(
  "/users/:id/reject",
  authMiddleware,
  roleMiddleware("ADMIN"),
  rejectUser,
);

router.patch(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  rejectUser,
);

export default router;
