import User from "../../models/user.model.js";

interface GetUsersParams {
  status?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const getAllUsersService =
  async ({
    status,
    search,
    sort,
    page = 1,
    limit = 10,
  }: GetUsersParams) => {
    const query: any = {};

    /* FILTER */
    if (status) {
      query.status =
        status.toUpperCase();
    }

    /* SEARCH */
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /* SORT */
    let sortOption: any = {
      createdAt: -1,
    };

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    if (sort === "newest") {
      sortOption = {
        createdAt: -1,
      };
    }

    if (sort === "name_asc") {
      sortOption = {
        name: 1,
      };
    }

    if (sort === "name_desc") {
      sortOption = {
        name: -1,
      };
    }

    /* PAGINATION */
    const skip =
      (page - 1) * limit;

    const users =
      await User.find(query)
        .select(
          "-password -refreshToken -otp"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    const total =
      await User.countDocuments(query);

    return {
      users,

      pagination: {
        total,
        page,
        limit,

        totalPages:
          Math.ceil(total / limit),

        hasNextPage:
          page <
          Math.ceil(
            total / limit
          ),

        hasPrevPage:
          page > 1,
      },
    };
  };

export const getPendingUsersService =
  async (
    page = 1,
    limit = 5
  ) => {
    const query = {
      status: "PENDING" as const,
    };

    const skip =
      (page - 1) * limit;

    const users =
      await User.find(query)
        .select(
          "-password -refreshToken -otp"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    const total =
      await User.countDocuments(query);

    return {
      users,

      pagination: {
        total,
        page,
        limit,

        totalPages:
          Math.ceil(total / limit),

        hasNextPage:
          page <
          Math.ceil(
            total / limit
          ),

        hasPrevPage:
          page > 1,
      },
    };
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