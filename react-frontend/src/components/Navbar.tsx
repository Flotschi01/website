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
    <nav className="fixed top-0 left-0 w-full z-50 bg-bg-[var(--color-nav)] backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto w-full px-8 h-24 flex items-center justify-between">
        {/* Left Section: Logo & Brand Text */}
        <div className="flex items-center gap-4">
          {/* Round logo placeholder */}
          <img
            src="/Logo.png"
            alt="Logo"
            className="w-16 h-16 rounded-full"
          />

          {/* Text right after logo - visible only on desktop */}
          <span className="hidden md:block text-2xl font-semibold">
            Verein Faszination Tierwelt Linmezis's
          </span>
        </div>

        {/* Right Section: Nav Items */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="px-6 py-3 rounded-full text-lg font-medium whitespace-nowrap transition-colors hover:text-primary"
                style={{
                  color: isActive ? "var(--color-primary)" : "inherit",
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