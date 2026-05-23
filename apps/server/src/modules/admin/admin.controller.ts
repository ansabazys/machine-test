import { Request, Response } from "express";

import {
  approveUserService,
  getAllUsersService,
  getPendingUsersService,
  rejectUserService,
} from "./admin.service.js";

export const getUsers =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const users =
        await getAllUsersService();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Something went wrong",
      });
    }
  };

export const getPendingUsers =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const users =
        await getPendingUsersService();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Something went wrong",
      });
    }
  };

export const approveUser =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const user =
        await approveUserService(id as string);

      res.status(200).json({
        success: true,
        message:
          "User approved successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Something went wrong",
      });
    }
  };

export const rejectUser =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const user =
        await rejectUserService(id as string);

      res.status(200).json({
        success: true,
        message:
          "User rejected successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Something went wrong",
      });
    }
  };
