interface Props {
  search: string;
  status: string;
  sort: string;

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  onSortChange: (
    value: string
  ) => void;
}

const AdminFilters = ({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: Props) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
          onSearchChange(
            e.target.value
          )
        }
        className="border border-[#e5e7eb] bg-white px-4 py-2 text-sm outline-none"
      />

      {/* STATUS FILTER */}
      <select
        value={status}
        onChange={(e) =>
          onStatusChange(
            e.target.value
          )
        }
        className="border border-[#e5e7eb] bg-white px-4 py-2 text-sm outline-none"
      >
        <option value="">
          All Status
        </option>

        <option value="PENDING">
          Pending
        </option>

        <option value="APPROVED">
          Approved
        </option>

        <option value="REJECTED">
          Rejected
        </option>
      </select>

      {/* SORT */}
      <select
        value={sort}
        onChange={(e) =>
          onSortChange(
            e.target.value
          )
        }
        className="border border-[#e5e7eb] bg-white px-4 py-2 text-sm outline-none"
      >
        <option value="newest">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>

        <option value="name_asc">
          Name A-Z
        </option>

        <option value="name_desc">
          Name Z-A
        </option>
      </select>
    </div>
  );
};

export default AdminFilters;