import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  UserCheck,
  UserCog,
  X,
} from "lucide-react";

import {
  approveUser,
  getAdminUsers,
  rejectUser,
  type AdminUser,
  type AdminUserStatus,
} from "@/services/admin.service";
import { useAuthStore } from "@/store/auth.store";

type FilterOption =
  | "all"
  | "approved"
  | "pending"
  | "rejected"
  | "admins"
  | "users";

type SortOption = "newest" | "oldest" | "name";

interface FilterForm {
  search: string;
  filter: FilterOption;
  sort: SortOption;
}

interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface AdminDashboardProps {
  defaultFilter?: FilterOption;
  title?: string;
  description?: string;
}

const PAGE_SIZE = 8;

const formatDate = (value?: string) => {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
};

const getStatusClassName = (status: AdminUserStatus) => {
  if (status === "APPROVED") {
    return "border-[#16a34a]/30 bg-[#16a34a]/10 text-[#16a34a]";
  }

  if (status === "REJECTED") {
    return "border-[#dc2626]/30 bg-[#dc2626]/10 text-[#dc2626]";
  }

  return "border-[#ca8a04]/30 bg-[#ca8a04]/10 text-[#ca8a04]";
};

const StatsCard = ({ label, value, icon: Icon }: StatsCardProps) => (
  <div className="border border-[#e5e7eb] bg-white p-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
          {label}
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-[#09090b]">
          {value}
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center border border-[#e5e7eb] bg-[#f7f7f8] text-[#374151]">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="divide-y divide-[#e5e7eb] bg-[#f9fafb]">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="grid min-w-[980px] grid-cols-[170px_220px_90px_130px_140px_130px_150px] items-center gap-4 px-5 py-4"
      >
        {Array.from({ length: 7 }).map((__, cellIndex) => (
          <div
            key={cellIndex}
            className="h-4 animate-pulse bg-[#e5e7eb]"
          />
        ))}
      </div>
    ))}
  </div>
);

const AdminDashboard = ({
  defaultFilter = "all",
  title = "User Management",
  description = "Review accounts, approve requests, and monitor user access.",
}: AdminDashboardProps) => {
  const admin = useAuthStore((state) => state.user);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const { register, watch } = useForm<FilterForm>({
    defaultValues: {
      search: "",
      filter: defaultFilter,
      sort: "newest",
    },
  });

  const search = watch("search");
  const filter = watch("filter");
  const sort = watch("sort");

  const loadUsers = async () => {
    try {
      setError("");
      setIsLoading(true);

      const data = await getAdminUsers();

      setUsers(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Unable to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
      setPage(1);
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [filter, sort]);

  const stats = useMemo(() => {
    return {
      total: users.length,
      pending: users.filter((user) => user.status === "PENDING").length,
      approved: users.filter((user) => user.status === "APPROVED").length,
      admins: users.filter((user) => user.role === "admin").length,
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    const nextUsers = users
      .filter((user) => {
        const matchesSearch =
          !debouncedSearch ||
          user.name.toLowerCase().includes(debouncedSearch) ||
          user.email.toLowerCase().includes(debouncedSearch);

        if (!matchesSearch) {
          return false;
        }

        if (filter === "approved") {
          return user.status === "APPROVED";
        }

        if (filter === "pending") {
          return user.status === "PENDING";
        }

        if (filter === "rejected") {
          return user.status === "REJECTED";
        }

        if (filter === "admins") {
          return user.role === "admin";
        }

        if (filter === "users") {
          return user.role === "user";
        }

        return true;
      })
      .sort((firstUser, secondUser) => {
        if (sort === "name") {
          return firstUser.name.localeCompare(secondUser.name);
        }

        const firstDate = new Date(firstUser.createdAt || 0).getTime();
        const secondDate = new Date(secondUser.createdAt || 0).getTime();

        return sort === "oldest"
          ? firstDate - secondDate
          : secondDate - firstDate;
      });

    return nextUsers;
  }, [debouncedSearch, filter, sort, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const updateUserStatus = async (id: string, status: AdminUserStatus) => {
    const previousUsers = users;

    setActionId(id);
    setUsers((current) =>
      current.map((user) =>
        user._id === id
          ? {
              ...user,
              status,
            }
          : user
      )
    );

    try {
      const updatedUser =
        status === "APPROVED"
          ? await approveUser(id)
          : await rejectUser(id);

      setUsers((current) =>
        current.map((user) =>
          user._id === id ? updatedUser : user
        )
      );
    } catch (err: any) {
      setUsers(previousUsers);
      setError(err?.response?.data?.message || "Action failed");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-5">
      <section className="border border-[#e5e7eb] bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-medium tracking-tight text-[#09090b]">
              {title}
            </h1>
            <p className="mt-2 text-sm text-[#6b7280]">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="border border-[#e5e7eb] bg-white px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
              {admin?.email}
            </span>

            <button
              type="button"
              onClick={loadUsers}
              className="flex h-9 items-center justify-center gap-2 border border-[#e5e7eb] bg-white px-3 font-mono text-[10px] uppercase tracking-widest text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#09090b]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Users" value={stats.total} icon={Users} />
        <StatsCard label="Pending Approvals" value={stats.pending} icon={ShieldCheck} />
        <StatsCard label="Approved Users" value={stats.approved} icon={UserCheck} />
        <StatsCard label="Admin Users" value={stats.admins} icon={UserCog} />
      </section>

      <section className="border border-[#e5e7eb] bg-white p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_180px_180px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            <input
              {...register("search")}
              className="h-10 w-full border border-[#e5e7eb] bg-white pl-9 pr-4 text-sm text-[#09090b] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#b8bec8]"
              placeholder="Search name or email..."
            />
          </div>

          <select
            {...register("filter")}
            className="h-10 border border-[#e5e7eb] bg-white px-3 text-sm text-[#374151] outline-none transition-colors hover:bg-[#f3f4f6] focus:border-[#b8bec8]"
          >
            <option value="all">All Users</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="admins">Admins</option>
            <option value="users">Users</option>
          </select>

          <select
            {...register("sort")}
            className="h-10 border border-[#e5e7eb] bg-white px-3 text-sm text-[#374151] outline-none transition-colors hover:bg-[#f3f4f6] focus:border-[#b8bec8]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </section>

      <section className="overflow-hidden border border-[#e5e7eb] bg-white">
        <div className="overflow-x-auto">
          <div className="grid min-w-[980px] grid-cols-[170px_220px_90px_130px_140px_130px_150px] gap-4 border-b border-[#e5e7eb] px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Verified</div>
            <div>Approval</div>
            <div>Created</div>
            <div className="text-right">Actions</div>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : error ? (
            <div className="flex min-h-[260px] items-center justify-center p-8 text-center">
              <div>
                <p className="text-sm font-medium text-[#dc2626]">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={loadUsers}
                  className="mt-4 border border-[#e5e7eb] bg-white px-4 py-2 text-sm text-[#374151] transition-colors hover:bg-[#f3f4f6]"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex min-h-[260px] items-center justify-center p-8 text-center">
              <div>
                <p className="text-sm font-medium text-[#09090b]">
                  No users found
                </p>
                <p className="mt-2 text-sm text-[#6b7280]">
                  Try changing the search text or filter.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-[#e5e7eb] bg-[#f9fafb]">
              {paginatedUsers.map((user) => (
                <div
                  key={user._id}
                  className="grid min-w-[980px] grid-cols-[170px_220px_90px_130px_140px_130px_150px] items-center gap-4 px-5 py-3 text-sm transition-colors hover:bg-[#eef2f7]"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#09090b]">
                      {user.name}
                    </p>
                    <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-widest text-[#9ca3af]">
                      {user._id}
                    </p>
                  </div>

                  <div className="truncate text-[#374151]">
                    {user.email}
                  </div>

                  <div className="font-mono text-[11px] uppercase tracking-widest text-[#6b7280]">
                    {user.role}
                  </div>

                  <div>
                    <span
                      className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${
                        user.emailVerified
                          ? "border-[#16a34a]/30 bg-[#16a34a]/10 text-[#16a34a]"
                          : "border-[#dc2626]/30 bg-[#dc2626]/10 text-[#dc2626]"
                      }`}
                    >
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </span>
                  </div>

                  <div>
                    <span className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${getStatusClassName(user.status)}`}>
                      {user.status}
                    </span>
                  </div>

                  <div className="font-mono text-xs text-[#6b7280]">
                    {formatDate(user.createdAt)}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      disabled={actionId === user._id || user.status === "APPROVED"}
                      onClick={() => updateUserStatus(user._id, "APPROVED")}
                      className="flex h-8 w-8 items-center justify-center border border-[#e5e7eb] bg-white text-[#16a34a] transition-colors hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-40"
                      title="Approve user"
                    >
                      {actionId === user._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={actionId === user._id || user.status === "REJECTED"}
                      onClick={() => updateUserStatus(user._id, "REJECTED")}
                      className="flex h-8 w-8 items-center justify-center border border-[#e5e7eb] bg-white text-[#dc2626] transition-colors hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-40"
                      title="Reject user"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isLoading && !error && filteredUsers.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-[#e5e7eb] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#6b7280]">
              Showing {(page - 1) * PAGE_SIZE + 1}-
              {Math.min(page * PAGE_SIZE, filteredUsers.length)} of{" "}
              {filteredUsers.length}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                className="flex h-9 w-9 items-center justify-center border border-[#e5e7eb] bg-white text-[#6b7280] transition-colors hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="font-mono text-xs text-[#6b7280]">
                Page {page} / {totalPages}
              </span>

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((current) => current + 1)}
                className="flex h-9 w-9 items-center justify-center border border-[#e5e7eb] bg-white text-[#6b7280] transition-colors hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
