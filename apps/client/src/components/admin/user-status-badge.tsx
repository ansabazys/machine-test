interface Props {
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED";
}

const UserStatusBadge = ({
  status,
}: Props) => {
  const className =
    status === "APPROVED"
      ? "border-[#16a34a]/30 bg-[#16a34a]/10 text-[#16a34a]"
      : status === "REJECTED"
      ? "border-[#dc2626]/30 bg-[#dc2626]/10 text-[#dc2626]"
      : "border-[#ca8a04]/30 bg-[#ca8a04]/10 text-[#ca8a04]";

  return (
    <span
      className={`border px-2 py-1 text-xs font-medium ${className}`}
    >
      {status}
    </span>
  );
};

export default UserStatusBadge;