const AdminTableSkeleton = () => {
  return (
    <div className="overflow-hidden border border-[#e5e7eb] bg-white">
      {/* HEADER */}
      <div className="grid grid-cols-7 gap-4 border-b border-[#e5e7eb] px-5 py-3">
        {Array.from({
          length: 7,
        }).map((_, i) => (
          <div
            key={i}
            className="h-3 animate-pulse bg-[#e5e7eb]"
          />
        ))}
      </div>

      {/* ROWS */}
      <div className="divide-y divide-[#e5e7eb]">
        {Array.from({
          length: 6,
        }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-7 gap-4 px-5 py-4"
          >
            {Array.from({
              length: 7,
            }).map((_, j) => (
              <div
                key={j}
                className="h-4 animate-pulse bg-[#f1f5f9]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTableSkeleton;