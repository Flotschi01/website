import { Link, useLocation } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Aktuelles", path: "/news" },
  { name: "Über uns", path: "/verein" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--color-nav)] text-[var(--color-primary)] border-white/10">
      {/* justify-center centers the links on mobile; sm:justify-between splits them on larger screens */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 h-24 flex items-center justify-center sm:justify-between">
        
        {/* Left Section: Hidden on mobile, visible from 'sm' screens and up */}
        <div className="hidden sm:flex items-center gap-4">
          <img
            src="/Logo.png"
            alt="Logo"
            className="w-16 h-16 rounded-full"
          />

          {/* Text right after logo - visible only on desktop (md and up) */}
          <span className="hidden md:block text-2xl font-semibold">
            Verein Faszination Tierwelt Linmezis's
          </span>
        </div>

        {/* Right Section: Nav Items */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg font-medium whitespace-nowrap transition-colors hover:text-primary"
                style={{
                  color: isActive ? "var(--color-primary)" : "var(--color-fg)/80",
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}