import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to={'/'} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-[#e5e7eb] bg-[#f3f4f6]">
            <ShieldCheck className="h-4 w-4 text-[#09090b]" />
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">
              Machine Test
            </p>

            <h1 className="text-sm font-semibold tracking-tight text-[#09090b]">
              Approval Platform
            </h1>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {["Features", "Announcements", "FAQ"].map((item) => (
            <button
              key={item}
              className="px-3 py-2 text-xs font-mono uppercase tracking-widest text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#09090b]"
            >
              {item}
            </button>
          ))}

          <Link to={'/login'} className="ml-2 border border-[#e5e7eb] bg-white px-4 py-2 text-xs font-mono uppercase tracking-widest text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#09090b]">
            Login
          </Link>

          <Link to={'/register'} className="border border-[#09090b] bg-[#09090b] px-4 py-2 text-xs font-mono uppercase tracking-widest text-white transition-opacity hover:opacity-90">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
