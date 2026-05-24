import { useEffect, useState } from "react";

import AdminFilters from "./admin-filters";
import AdminPagination from "./admin-pagination";
import AdminTable from "./admin-table";
import TableSkeleton from "./table-skeleton";

import { useAdminUsers } from "@/hooks/use-admin-users";

const AdminDashboard = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("");

  const [sort, setSort] = useState("newest");

  // DEBOUNCE SEARCH
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);

      // RESET PAGE
      setPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isLoading, isError, refetch } = useAdminUsers({
    page,
    search: debouncedSearch,
    status,
    sort,
  });

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#09090b]">
          User Management
        </h1>

        <p className="mt-2 text-sm text-[#6b7280]">
          Review accounts and manage approvals.
        </p>
      </div>

      {/* FILTERS */}
      <AdminFilters
        search={search}
        status={status}
        sort={sort}
        onSearchChange={(value) => {
          setSearch(value);

          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);

          setPage(1);
        }}
        onSortChange={(value) => {
          setSort(value);

          setPage(1);
        }}
      />

      {/* LOADING */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        /* ERROR STATE */
        <div className="flex min-h-[320px] items-center justify-center border border-[#e5e7eb] bg-white px-6">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9ca3af]">
              Error State
            </p>

            <h3 className="mt-3 text-lg font-medium text-[#09090b]">
              Failed to load users
            </h3>

            <p className="mt-2 text-sm text-[#6b7280]">
              Something went wrong while fetching users.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="
                mt-6
                border border-[#09090b]
                bg-[#09090b]
                px-5 py-3
                text-xs font-mono uppercase tracking-widest
                text-white
                transition-opacity
                hover:opacity-90
              "
            >
              Retry
            </button>
          </div>
        </div>
      ) : data?.users?.length === 0 ? (
        /* EMPTY STATE */
        <div className="flex min-h-[320px] items-center justify-center border border-[#e5e7eb] bg-white px-6">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9ca3af]">
              Empty State
            </p>

            <h3 className="mt-3 text-lg font-medium text-[#09090b]">
              No users found
            </h3>

            <p className="mt-2 text-sm text-[#6b7280]">
              Try adjusting your search or filters.
            </p>
          </div>
        </div>
      ) : (
        /* TABLE */
        <div className="w-full space-y-4">
          <AdminTable users={data?.users || []} onRefresh={refetch} />

          <AdminPagination
            page={data?.pagination?.page || 1}
            totalPages={data?.pagination?.totalPages || 1}
            onPrev={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
