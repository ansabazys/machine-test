const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto border border-[#e5e7eb] bg-white">
      <div className="divide-y divide-[#e5e7eb]">
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 px-5 py-5"
          >
            {Array.from({
              length: 5,
            }).map((__, cellIndex) => (
              <div
                key={cellIndex}
                className="h-4 animate-pulse bg-[#e5e7eb]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;