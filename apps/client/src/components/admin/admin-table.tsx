import { Check, X } from "lucide-react";

import {
  approveUser,
  rejectUser,
  type AdminUser,
} from "@/services/admin.service";

interface Props {
  users: AdminUser[];

  onRefresh: () => void;
}

const getStatusClassName = (status: "PENDING" | "APPROVED" | "REJECTED") => {
  if (status === "APPROVED") {
    return "border-[#16a34a]/30 bg-[#16a34a]/10 text-[#16a34a]";
  }

  if (status === "REJECTED") {
    return "border-[#dc2626]/30 bg-[#dc2626]/10 text-[#dc2626]";
  }

  return "border-[#ca8a04]/30 bg-[#ca8a04]/10 text-[#ca8a04]";
};

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

const AdminTable = ({ users, onRefresh }: Props) => {
  const handleApprove = async (id: string) => {
    await approveUser(id);

    onRefresh();
  };

  const handleReject = async (id: string) => {
    await rejectUser(id);

    onRefresh();
  };

  return (
    <>
      {/* DESKTOP TABLE */}
      <section className="hidden overflow-hidden border border-[#e5e7eb] bg-white lg:block">
        <div className="w-full overflow-x-auto">
          {/* HEADER */}
          <div className="grid w-full grid-cols-[1.2fr_1.6fr_0.7fr_1fr_1fr_1fr_1.2fr] gap-4 border-b border-[#e5e7eb] px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">
            <div>Name</div>

            <div>Email</div>

            <div>Role</div>

            <div>Verified</div>

            <div>Approval</div>

            <div>Created</div>

            <div className="text-right">Actions</div>
          </div>

          {/* BODY */}
          <div className="divide-y divide-[#e5e7eb] bg-[#f9fafb]">
            {(users || []).map((user) => (
              <div
                key={user._id}
                className="grid w-full grid-cols-[1.2fr_1.6fr_0.7fr_1fr_1fr_1fr_1.2fr] items-center gap-4 px-5 py-3 text-sm transition-colors hover:bg-[#eef2f7]"
              >
                {/* NAME */}
                <div className="min-w-0">
                  <p className="truncate font-medium text-[#09090b]">
                    {user.name}
                  </p>

                  <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-widest text-[#9ca3af]">
                    {user._id}
                  </p>
                </div>

                {/* EMAIL */}
                <div className="truncate text-[#374151]">{user.email}</div>

                {/* ROLE */}
                <div className="font-mono text-[11px] uppercase tracking-widest text-[#6b7280]">
                  {user.role}
                </div>

                {/* VERIFIED */}
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

                {/* STATUS */}
                <div>
                  <span
                    className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${getStatusClassName(
                      user.status,
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>

                {/* DATE */}
                <div className="font-mono text-xs text-[#6b7280]">
                  {formatDate(user.createdAt)}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    disabled={user.status === "APPROVED"}
                    onClick={() => handleApprove(user._id)}
                    className="flex h-8 w-8 items-center justify-center border border-[#e5e7eb] bg-white text-[#16a34a] transition-colors hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Check className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    disabled={user.status === "REJECTED"}
                    onClick={() => handleReject(user._id)}
                    className="flex h-8 w-8 items-center justify-center border border-[#e5e7eb] bg-white text-[#dc2626] transition-colors hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE CARDS */}
      <div className="space-y-4 lg:hidden">
        {(users || []).map((user) => (
          <div key={user._id} className="border border-[#e5e7eb] bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-[#09090b]">{user.name}</p>

                <p className="mt-1 text-sm text-[#6b7280]">{user.email}</p>
              </div>

              <span
                className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${getStatusClassName(
                  user.status,
                )}`}
              >
                {user.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#9ca3af]">
                  Role
                </p>

                <p className="mt-1 uppercase text-[#09090b]">{user.role}</p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#9ca3af]">
                  Verified
                </p>

                <p className="mt-1 text-[#09090b]">
                  {user.emailVerified ? "Yes" : "No"}
                </p>
              </div>

              <div className="col-span-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#9ca3af]">
                  Created
                </p>

                <p className="mt-1 text-[#09090b]">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => handleApprove(user._id)}
                disabled={user.status === "APPROVED"}
                className="flex-1 border border-[#16a34a] px-4 py-2 text-sm text-[#16a34a] disabled:opacity-40"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(user._id)}
                disabled={user.status === "REJECTED"}
                className="flex-1 border border-[#dc2626] px-4 py-2 text-sm text-[#dc2626] disabled:opacity-40"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminTable;
