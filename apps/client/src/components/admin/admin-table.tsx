import { useState } from "react";

import { Check, Loader2, X } from "lucide-react";

import { toast } from "sonner";

import ConfirmModal from "@/components/ui/confirm-modal";

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
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null,
  );

  const [approveModalOpen, setApproveModalOpen] = useState(false);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // APPROVE USER
  const handleApprove = async (id: string) => {
    try {
      setActionLoadingId(id);

      setActionType("approve");

      toast.loading("Approving user...", {
        id: "approve-user",
      });

      await approveUser(id);

      toast.dismiss("approve-user");

      toast.success("User approved successfully");

      onRefresh();
    } catch (error: any) {
      toast.dismiss("approve-user");

      toast.error(error?.response?.data?.message || "Failed to approve user");
    } finally {
      setActionLoadingId(null);

      setActionType(null);
    }
  };

  // REJECT USER
  const handleReject = async (id: string) => {
    try {
      setActionLoadingId(id);

      setActionType("reject");

      toast.loading("Rejecting user...", {
        id: "reject-user",
      });

      await rejectUser(id);

      toast.dismiss("reject-user");

      toast.success("User rejected successfully");

      onRefresh();
    } catch (error: any) {
      toast.dismiss("reject-user");

      toast.error(error?.response?.data?.message || "Failed to reject user");
    } finally {
      setActionLoadingId(null);

      setActionType(null);
    }
  };

  // EMPTY STATE
  if (!users?.length) {
    return (
      <div className="border border-[#e5e7eb] bg-white p-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9ca3af]">
          Empty State
        </p>

        <h3 className="mt-3 text-lg font-medium text-[#09090b]">
          No users found
        </h3>

        <p className="mt-2 text-sm text-[#6b7280]">
          There are currently no users available.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* TABLE */}
      <section className="hidden overflow-hidden border border-[#e5e7eb] bg-white lg:block">
        <div className="w-full overflow-x-auto">
          {/* HEADER */}
          <div className="grid w-full grid-cols-[1.2fr_1.6fr_0.7fr_1fr_1fr_1fr_1.2fr] gap-4 border-b border-[#e5e7eb] px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">
            <div>Name</div>

            <div>Email</div>

            <div>Role</div>

            <div>Verified</div>

            <div>Status</div>

            <div>Created</div>

            <div className="text-right">Actions</div>
          </div>

          {/* BODY */}
          <div className="divide-y divide-[#e5e7eb] bg-[#f9fafb]">
            {users.map((user) => (
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

                {/* CREATED */}
                <div className="font-mono text-xs text-[#6b7280]">
                  {formatDate(user.createdAt)}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-2">
                  {/* APPROVE */}
                  <button
                    type="button"
                    disabled={
                      user.status === "APPROVED" || actionLoadingId === user._id
                    }
                    onClick={() => {
                      setSelectedUserId(user._id);

                      setApproveModalOpen(true);
                    }}
                    className="flex h-9 w-9 items-center justify-center border border-[#16a34a]/30 bg-[#16a34a]/10 text-[#16a34a] transition-all hover:bg-[#16a34a]/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {actionLoadingId === user._id &&
                    actionType === "approve" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </button>

                  {/* REJECT */}
                  <button
                    type="button"
                    disabled={
                      user.status === "REJECTED" || actionLoadingId === user._id
                    }
                    onClick={() => {
                      setSelectedUserId(user._id);

                      setRejectModalOpen(true);
                    }}
                    className="flex h-9 w-9 items-center justify-center border border-[#dc2626]/30 bg-[#dc2626]/10 text-[#dc2626] transition-all hover:bg-[#dc2626]/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {actionLoadingId === user._id && actionType === "reject" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROVE MODAL */}
      <ConfirmModal
        open={approveModalOpen}
        title="Approve User"
        description="Are you sure you want to approve this user?"
        confirmText="Approve"
        loading={actionType === "approve"}
        onCancel={() => {
          setApproveModalOpen(false);

          setSelectedUserId(null);
        }}
        onConfirm={async () => {
          if (!selectedUserId) return;

          await handleApprove(selectedUserId);

          setApproveModalOpen(false);

          setSelectedUserId(null);
        }}
      />

      {/* REJECT MODAL */}
      <ConfirmModal
        open={rejectModalOpen}
        title="Reject User"
        description="Are you sure you want to reject this user?"
        confirmText="Reject"
        loading={actionType === "reject"}
        onCancel={() => {
          setRejectModalOpen(false);

          setSelectedUserId(null);
        }}
        onConfirm={async () => {
          if (!selectedUserId) return;

          await handleReject(selectedUserId);

          setRejectModalOpen(false);

          setSelectedUserId(null);
        }}
      />
    </>
  );
};

export default AdminTable;
