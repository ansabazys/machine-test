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

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);

/**
 * @swagger
 * /admin/users/pending:
 *   get:
 *     summary: Get pending approval users
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Pending users fetched successfully
 */
router.get(
  "/users/pending",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getPendingUsers
);

/**
 * @swagger
 * /admin/users/{id}/approve:
 *   patch:
 *     summary: Approve a user
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68308b95f8f9a0bcb72f0011
 *     responses:
 *       200:
 *         description: User approved successfully
 */
router.patch(
  "/users/:id/approve",
  authMiddleware,
  roleMiddleware("ADMIN"),
  approveUser
);

/**
 * @swagger
 * /admin/users/{id}/reject:
 *   patch:
 *     summary: Reject a user
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68308b95f8f9a0bcb72f0011
 *     responses:
 *       200:
 *         description: User rejected successfully
 */
router.patch(
  "/users/:id/reject",
  authMiddleware,
  roleMiddleware("ADMIN"),
  rejectUser
);

export default router;