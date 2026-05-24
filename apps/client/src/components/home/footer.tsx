import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6b7280]">
            Full Stack Machine Test
          </p>

          <h3 className="mt-2 text-lg font-mono tracking-tight text-[#09090b]">
            React • Express • Strapi • Neon • MongoDB
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ansabazys/machine-test"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#e5e7eb] bg-white px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#09090b]"
          >
            GitHub
          </a>

          <Link
            to={"/dashboard"}
            className="border border-[#09090b] bg-[#09090b] px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
