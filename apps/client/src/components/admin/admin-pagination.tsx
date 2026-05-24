interface Props {
  page: number;

  totalPages: number;

  onPrev: () => void;

  onNext: () => void;
}

const AdminPagination = ({
  page,
  totalPages,
  onPrev,
  onNext,
}: Props) => {
  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-[#6b7280]">
        Page {page} of{" "}
        {totalPages}
      </p>

      <div className="flex gap-3">
        <button
          disabled={page === 1}
          onClick={onPrev}
          className="border border-[#e5e7eb] px-4 py-2 text-sm text-[#09090b] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={
            page === totalPages
          }
          onClick={onNext}
          className="border border-[#e5e7eb] px-4 py-2 text-sm text-[#09090b] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;