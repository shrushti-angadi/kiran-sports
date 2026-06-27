"import { useState } from \"react\";
import { Link, NavLink } from \"react-router-dom\";
import { Menu, X } from \"lucide-react\";
import { SHOP } from \"../lib/api\";

const links = [
  { to: \"/\", label: \"Home\" },
  { to: \"/shop\", label: \"Shop\" },
  { to: \"/about\", label: \"About\" },
  { to: \"/contact\", label: \"Contact\" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid=\"site-navbar\"
      className=\"fixed top-0 w-full z-50 backdrop-blur-xl bg-black/80 border-b border-white/10\"
    >
      <div className=\"max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between\">
        <Link to=\"/\" data-testid=\"nav-logo\" className=\"flex items-baseline gap-3\">
          <span className=\"font-heading text-2xl tracking-wider text-white\">
            KIRAN<span className=\"text-[#FF3B30]\">.</span>SPORTS
          </span>
          <span className=\"hidden sm:inline text-[10px] tracking-[0.3em] text-white/40 uppercase\">
            {SHOP.kannada}
          </span>
        </Link>

        <nav className=\"hidden md:flex gap-10 text-xs font-bold uppercase tracking-[0.25em] text-gray-300\">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === \"/\"}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `transition-colors hover:text-[#FF3B30] ${
                  isActive ? \"text-[#FF3B30]\" : \"\"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          data-testid=\"nav-mobile-toggle\"
          onClick={() => setOpen(!open)}
          className=\"md:hidden text-white\"
          aria-label=\"Toggle menu\"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          data-testid=\"nav-mobile-menu\"
          className=\"md:hidden border-t border-white/10 bg-black/95\"
        >
          <div className=\"flex flex-col px-6 py-6 gap-5\">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === \"/\"}
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `font-bold uppercase tracking-[0.25em] text-sm ${
                    isActive ? \"text-[#FF3B30]\" : \"text-gray-300\"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
"
