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

export const getAdminUsers = async () => {
  const response = await api.get("/admin/users");

  return response.data.data.map(normalizeAdminUser);
};

export const approveUser = async (id: string) => {
  const response = await api.patch(`/admin/users/${id}/approve`);

  return normalizeAdminUser(response.data.data);
};

export const rejectUser = async (id: string) => {
  const response = await api.patch(`/admin/users/${id}/reject`);

  return normalizeAdminUser(response.data.data);
};
