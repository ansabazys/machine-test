import User from "../../models/user.model.js";

export const getAllUsersService =
  async () => {
    return User.find()
      .select("-password -refreshToken -otp")
      .sort({ createdAt: -1 });
  };

export const getPendingUsersService =
  async () => {
    return User.find({
      status: "PENDING",
      emailVerified: true,
    }).select("-password");
  };

export const approveUserService =
  async (id: string) => {
    return User.findByIdAndUpdate(
      id,
      {
        status: "APPROVED",
      },
      {
        new: true,
      }
    ).select("-password");
  };

export const rejectUserService =
  async (id: string) => {
    return User.findByIdAndUpdate(
      id,
      {
        status: "REJECTED",
      },
      {
        new: true,
      }
    ).select("-password");
  };
