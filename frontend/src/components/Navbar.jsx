import { Link, useLocation } from "react-router-dom";
import { SiOpenai } from "react-icons/si";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    const base =
      "relative text-xs md:text-sm font-medium transition-colors duration-200";
    const active =
      "text-sky-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:rounded-full after:bg-gradient-to-r after:from-sky-400 after:to-violet-400 after:opacity-100 after:transition-opacity after:duration-200";
    const inactive =
      "text-slate-400 hover:text-slate-100 after:opacity-0 after:transition-opacity after:duration-200";

    return `${base} ${location.pathname === path ? active : inactive}`;
  };

  return (
    <header className="glass-card sticky top-4 z-40 flex items-center justify-between px-4 py-3 section-fade">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 shadow-lg shadow-sky-500/40">
          <SiOpenai className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight">
            AI Resume Analyzer
          </p>
          <p className="text-[11px] text-slate-400">
            Make your profile recruiter-ready
          </p>
        </div>
      </div>
      <nav className="flex items-center gap-4 text-xs md:text-sm">
        <Link to="/" className={isActive("/")}>
          Home
        </Link>
        <Link to="/upload" className={isActive("/upload")}>
          Upload
        </Link>
        <Link to="/dashboard" className={isActive("/dashboard")}>
          Dashboard
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

