import { useState } from "react";

import {
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";

import AdminPagination from "@/components/admin/admin-pagination";
import AdminTable from "@/components/admin/admin-table";

import { usePendingUsers } from "@/hooks/use-pending-users";

const AdminHome = () => {
  const [page, setPage] =
    useState(1);

  const {
    data,
    isLoading,
    refetch,
  } = usePendingUsers({
    page,
  });

  return (
    <div className="w-full space-y-6">
      {/* TOP CARDS */}
      <section className="grid gap-4 lg:grid-cols-3">
        {/* TOTAL PENDING */}
        <div className="border border-[#e5e7eb] bg-white p-5">
          <Users className="h-5 w-5 text-[#374151]" />

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6b7280]">
            Pending Users
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#09090b]">
            {data?.pagination
              ?.total || 0}
          </h2>

          <p className="mt-2 text-sm text-[#6b7280]">
            Users waiting for
            admin approval.
          </p>
        </div>

        {/* APPROVAL QUEUE */}
        <div className="border border-[#e5e7eb] bg-white p-5">
          <ShieldCheck className="h-5 w-5 text-[#ca8a04]" />

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6b7280]">
            Approval Queue
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#09090b]">
            {data?.pagination
              ?.totalPages || 0}
          </h2>

          <p className="mt-2 text-sm text-[#6b7280]">
            Total pending pages.
          </p>
        </div>

        {/* ACCESS CONTROL */}
        <div className="border border-[#e5e7eb] bg-white p-5">
          <UserCog className="h-5 w-5 text-[#16a34a]" />

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6b7280]">
            Access Control
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#09090b]">
            Secure
          </h2>

          <p className="mt-2 text-sm text-[#6b7280]">
            Role-protected admin
            system.
          </p>
        </div>
      </section>

      {/* PENDING TABLE */}
      <section className="w-full space-y-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6b7280]">
            Pending Approvals
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#09090b]">
            Users Waiting For
            Approval
          </h2>
        </div>

        {isLoading ? (
          <div className="border border-[#e5e7eb] bg-white p-10 text-center text-sm text-[#6b7280]">
            Loading pending
            approvals...
          </div>
        ) : data?.users?.length ===
          0 ? (
          <div className="border border-[#e5e7eb] bg-white p-10 text-center">
            <p className="text-sm text-[#6b7280]">
              No pending approval
              requests.
            </p>
          </div>
        ) : (
          <>
            <AdminTable
              users={
                data?.users || []
              }
              onRefresh={refetch}
            />

            <AdminPagination
              page={
                data?.pagination
                  ?.page || 1
              }
              totalPages={
                data?.pagination
                  ?.totalPages || 1
              }
              onPrev={() =>
                setPage((prev) =>
                  prev - 1
                )
              }
              onNext={() =>
                setPage((prev) =>
                  prev + 1
                )
              }
            />
          </>
        )}
      </section>
    </div>
  );
};

export default AdminHome;