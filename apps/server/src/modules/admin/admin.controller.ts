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
      const {
        status,
        search,
        sort,
        page,
        limit,
      } = req.query;

      const result =
        await getAllUsersService({
          status: status as string,
          search: search as string,
          sort: sort as string,
          page: Number(page) || 1,
          limit:
            Number(limit) || 10,
        });

      res.status(200).json({
        success: true,
        data: result.users,
        pagination:
          result.pagination,
      });
    } catch (error) {
      console.log(error);

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
      const {
        page,
        limit,
      } = req.query;

      const result =
        await getPendingUsersService(
          Number(page) || 1,
          Number(limit) || 5
        );

      res.status(200).json({
        success: true,

        data: result.users,

        pagination:
          result.pagination,
      });
    } catch (error) {
      console.log(error);

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
        await approveUserService(
          id as string
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "User approved successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);

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
        await rejectUserService(
          id as string
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "User rejected successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Something went wrong",
      });
    }
  };