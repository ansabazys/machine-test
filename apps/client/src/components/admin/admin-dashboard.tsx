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

  /* DEBOUNCE SEARCH */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);

      /* RESET PAGE WHEN SEARCH CHANGES */
      setPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isLoading, refetch } = useAdminUsers({
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

      {/* TABLE */}
      {isLoading ? (
        <TableSkeleton />
      ) : data?.users?.length === 0 ? (
        <div className="flex min-h-[320px] items-center justify-center border border-[#e5e7eb] bg-white">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[#09090b]">
              User not found
            </h3>

            <p className="mt-2 text-sm text-[#6b7280]">
              Try changing your search or filters.
            </p>
          </div>
        </div>
      ) : (
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
