import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routePaths";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center px-6 text-center">
      <div>
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-white/60 mt-2">Page not found.</p>
        <Link
          to={ROUTES.HOME}
          className="inline-block mt-6 px-6 py-3 rounded-full border border-white/15 hover:bg-white/10 transition"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
}
