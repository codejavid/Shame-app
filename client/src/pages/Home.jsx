import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routePaths";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-120px)] grid place-items-center px-6">
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
        <h1 className="text-4xl font-bold text-center">
          ShameApp <span className="text-[#FF3CAC]">🫣</span>
        </h1>
        <p className="text-white/70 text-center mt-3">
          Confess your dev fails anonymously. Learn with dignity. Improve with AI.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to={ROUTES.POST}
            className="bg-gradient-to-r from-[#FF3CAC] via-[#2B86C5] to-[#784BA0] px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Share Your Shame
          </Link>
          <Link
            to={ROUTES.FEED}
            className="px-6 py-3 rounded-full border border-white/15 hover:bg-white/10 transition"
          >
            Explore Feed
          </Link>
        </div>
      </div>
    </section>
  );
}
