import { useEffect, useState } from "react";
import { getShames, deleteShame } from "../lib/api";
import { askAISuggest } from "../lib/api";

export default function Feed() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle"); // idle|loading|error
  const [confirmId, setConfirmId] = useState(null);
  const [confirmTimer, setConfirmTimer] = useState(null);
  const [aiLoadingId, setAiLoadingId] = useState(null);
  const [aiTextById, setAiTextById] = useState({}); // { [id]: suggestion }

  useEffect(() => {
    const run = async () => {
      try {
        setStatus("loading");
        const { data } = await getShames();
        setItems(data);
        setStatus("idle");
      } catch {
        setStatus("error");
      }
    };
    run();
  }, []);

  const askConfirm = (id) => {
    clearTimeout(confirmTimer);
    setConfirmId(id);
    const t = setTimeout(() => setConfirmId(null), 5000);
    setConfirmTimer(t);
  };
  const cancelConfirm = () => {
    clearTimeout(confirmTimer);
    setConfirmId(null);
  };
  const onDelete = async (id) => {
    try {
      await deleteShame(id);
      setItems((prev) => prev.filter((x) => x._id !== id));
      setConfirmId(null);
    } catch {
      alert("Delete failed");
    }
  };

  const onAskAI = async (id, text) => {
    try {
      setAiLoadingId(id);
      const { data } = await askAISuggest(text);
      setAiTextById((prev) => ({ ...prev, [id]: data.suggestion }));
    } catch (e) {
      setAiTextById((prev) => ({ ...prev, [id]: "AI failed to respond. Try again." }));
    } finally {
      setAiLoadingId(null);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">Latest Confessions</h2>

      {status === "loading" && <div className="text-white/60">Loading…</div>}
      {status === "error" && (
        <div className="text-rose-300">Failed to load feed.</div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => {
          const isConfirming = confirmId === s._id;
          const aiText = aiTextById[s._id];

          return (
            <article key={s._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 relative">
              <p className="text-white/80 whitespace-pre-wrap">{s.text}</p>

              {Array.isArray(s.tags) && s.tags.length > 0 && (
                <div className="text-xs text-white/50 mt-2">
                  {s.tags.map((t, i) => (
                    <span key={i} className="mr-2">#{t.replace(/^#/, "")}</span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-3 text-[11px] text-white/40">
                <span>
                  {new Date(s.createdAt).toLocaleString()}
                  {s.isAnonymous ? " • Anonymous" : ""}
                </span>

                <div className="flex items-center gap-2">
                  {/* Ask AI */}
                  <button
                    className="px-3 py-1 rounded-full border border-white/15 hover:bg-white/10 text-white/70 hover:text-white transition"
                    onClick={() => onAskAI(s._id, s.text)}
                    disabled={aiLoadingId === s._id}
                  >
                    {aiLoadingId === s._id ? "Thinking…" : "Ask AI"}
                  </button>

                  {/* Delete with soft confirm */}
                  {!isConfirming ? (
                    <button
                      className="px-3 py-1 rounded-full border border-white/15 hover:bg-white/10 text-white/70 hover:text-white transition"
                      onClick={() => askConfirm(s._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-amber-300">Confirm?</span>
                      <button
                        className="px-3 py-1 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white transition"
                        onClick={() => onDelete(s._id)}
                      >
                        Yes
                      </button>
                      <button
                        className="px-3 py-1 rounded-full border border-white/15 hover:bg-white/10 text-white/70 transition"
                        onClick={cancelConfirm}
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* AI suggestion panel */}
              {aiText && (
                <div className="mt-3 text-sm bg-white/5 border border-white/10 rounded-xl p-3 text-white/80">
                  {aiText}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
