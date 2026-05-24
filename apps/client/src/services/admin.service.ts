import { api } from "@/api/axios";

export type AdminUserRole = "admin" | "user";

export type AdminUserStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  emailVerified: boolean;
  createdAt?: string;
}

const normalizeAdminUser = (user: any): AdminUser => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role?.toLowerCase() as AdminUserRole,
  status: user.status,
  emailVerified: Boolean(user.emailVerified),
  createdAt: user.createdAt,
});

interface GetAdminUsersParams {
  page?: number;

  limit?: number;

  status?: string;

  search?: string;

  sort?: string;
}

export const getAdminUsers = async ({
  page = 1,
  limit = 10,
  status,
  search,
  sort,
}: GetAdminUsersParams) => {
  const params = new URLSearchParams();

  params.append("page", String(page));

  params.append("limit", String(limit));

  if (status) {
    params.append("status", status);
  }

  if (search) {
    params.append("search", search);
  }

  if (sort) {
    params.append("sort", sort);
  }

  const response = await api.get(`/admin/users?${params.toString()}`);

  return {
    users: response.data.data.map(normalizeAdminUser),

    pagination: response.data.pagination,
  };
};

export const getPendingUsers = async ({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}) => {
  const response = await api.get(
    `/admin/users/pending?page=${page}&limit=${limit}`,
  );

  return {
    users: response.data.data.map(normalizeAdminUser),

    pagination: response.data.pagination,
  };
};

export const approveUser = async (id: string) => {
  const response = await api.patch(`/admin/users/${id}/approve`);

  return normalizeAdminUser(response.data.data);
};

export const rejectUser = async (id: string) => {
  const response = await api.patch(`/admin/users/${id}/reject`);

  return normalizeAdminUser(response.data.data);
};
