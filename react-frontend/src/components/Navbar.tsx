import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Admin", path: "/admin" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center">
      {/* Pill */}
      <div
        className="flex items-center bg-bg/80 backdrop-blur-md border border-white/10 shadow-lg rounded-full overflow-hidden"
        style={{ height: "48px" }}
      >
        {/* Links — always in DOM, fade in/out */}
        <div
          className="flex items-center gap-1 transition-all duration-1200"
          style={{
            maxWidth: isOpen ? "400px" : "0px",
            opacity: isOpen ? 1 : 0,
            paddingLeft: isOpen ? "16px" : "0px",
            overflow: "hidden",
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors hover:text-primary"
                style={{
                  color: isActive ? "var(--color-primary)" : "inherit",
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="flex items-center justify-center rounded-full hover:text-primary transition-colors"
          style={{ width: "48px", height: "48px", flexShrink: 0 }}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </div>
  );
}