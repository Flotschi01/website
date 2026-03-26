import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Posts", path: "/posts" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <nav className="bg-bg text-secondary shadow-md border-b border-fg/20">
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              <svg className="w-14 fill-primary" version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="300.000000pt" height="300.000000pt" viewBox="0 0 300.000000 300.000000"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" stroke="none">
<path d="M899 2602 l-396 -105 -76 -291 c-42 -160 -90 -339 -106 -397 l-28
-107 706 -705 706 -704 396 105 396 105 76 291 c42 160 90 339 106 397 l28
107 -706 705 -706 704 -396 -105z m591 -289 c126 -124 230 -233 230 -242 -1
-31 -78 -303 -88 -310 -6 -3 -78 -24 -160 -45 l-150 -39 -38 -149 c-21 -82
-41 -154 -45 -160 -6 -10 -279 -88 -309 -88 -8 0 -118 103 -244 229 l-230 230
83 313 c45 172 85 316 89 320 7 7 596 166 619 167 7 1 116 -101 243 -226z
m412 -410 c26 -26 48 -50 48 -54 0 -9 -130 -43 -137 -36 -6 7 27 137 36 137 3
0 27 -21 53 -47z m412 -412 l230 -230 -83 -313 c-45 -172 -85 -316 -89 -320
-4 -4 -146 -43 -315 -88 -300 -79 -309 -81 -330 -64 -67 55 -447 441 -447 454
1 31 78 303 88 309 6 3 78 24 160 45 l150 39 38 149 c21 82 42 154 45 160 7
11 268 86 304 87 13 1 96 -75 249 -228z m-724 89 c0 -6 -7 -40 -16 -75 l-16
-63 -69 -17 c-39 -10 -73 -15 -76 -12 -3 3 2 37 12 76 l17 69 56 15 c70 19 92
20 92 7z m-400 -400 c0 -20 -33 -130 -40 -130 -9 0 -104 99 -99 104 7 6 102
34 122 35 9 1 17 -4 17 -9z"/>
<path d="M880 1885 l0 -375 75 0 75 0 0 150 0 150 150 0 150 0 0 65 0 65 -150
0 -150 0 0 95 0 95 165 0 165 0 0 65 0 65 -240 0 -240 0 0 -375z"/>
<path d="M1760 1065 l0 -375 240 0 240 0 0 60 0 60 -165 0 -165 0 0 315 0 315
-75 0 -75 0 0 -375z"/>
</g>
              </svg>
              </Link>
          </div>


          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => ( 
              <Link
                key={item.name}
                to={item.path}
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-bg px-4 pb-4 space-y-3 border-t border-fg/20">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
