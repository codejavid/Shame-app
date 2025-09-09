import { NavLink } from "react-router-dom";

const linkBase = "px-4 py-2 rounded-full text-sm transition";
const linkIdle = "text-white/70 hover:text-white hover:bg-white/10";
const linkActive = "text-white bg-white/15";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-lg font-bold tracking-wide">
            ShameApp <span className="text-[#FF3CAC]">🫣</span>
          </a>
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/feed"
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
            >
              Feed
            </NavLink>
            <NavLink
              to="/post"
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
            >
              Share Shame
            </NavLink>
          </div>
        </nav>
      </header>

      {/* CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-white/50 flex items-center justify-between">
          <span>© {new Date().getFullYear()} ShameApp</span>
          <span>Awwwards-style • MERN + Tailwind v4.1</span>
        </div>
      </footer>
    </div>
  );
}
