import {
  Link,
  useRouteError,
} from "react-router-dom";

const ErrorPage = () => {
  const error: any =
    useRouteError();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-4">
      <div className="w-full max-w-lg border border-[#e5e7eb] bg-white p-10 text-center">
        {/* LABEL */}
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9ca3af]">
          Application Error
        </p>

        {/* TITLE */}
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#09090b]">
          Something went wrong
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-3 text-sm leading-7 text-[#6b7280]">
          {error?.statusText ||
            error?.message ||
            "Unexpected error occurred"}
        </p>

        {/* ACTIONS */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="
              border border-[#e5e7eb]
              bg-white
              px-5 py-3
              text-xs font-mono uppercase tracking-widest
              text-[#6b7280]
              transition-colors
              hover:bg-[#f3f4f6]
              hover:text-[#09090b]
            "
          >
            Reload
          </button>

          <Link
            to="/"
            className="
              border border-[#09090b]
              bg-[#09090b]
              px-5 py-3
              text-xs font-mono uppercase tracking-widest
              text-white
              transition-opacity
              hover:opacity-90
            "
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;