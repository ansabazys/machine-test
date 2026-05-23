import { Clock3 } from "lucide-react";

const PendingApproval = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center px-4">

      <div className="w-full max-w-md border border-[#e5e7eb] bg-white p-8">

        {/* ICON */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#e5e7eb] bg-[#fafafa]">

          <Clock3 className="h-6 w-6 text-[#09090b]" />

        </div>


        {/* HEADER */}
        <div>

          <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#6b7280]">
            Approval Status
          </p>

          <h1 className="text-2xl font-medium tracking-tight text-[#09090b]">
            Waiting for approval
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#6b7280]">
            Your email has been verified successfully.
            An administrator must approve your account
            before you can access the platform.
          </p>

        </div>


        {/* INFO BOX */}
        <div className="mt-6 border border-[#e5e7eb] bg-[#fafafa] p-4">

          <p className="text-xs leading-6 text-[#6b7280]">

            Once approved, you will be able to log in
            and access protected resources, dashboards,
            and system functionality.

          </p>

        </div>

      </div>

    </div>
  );
};

export default PendingApproval;