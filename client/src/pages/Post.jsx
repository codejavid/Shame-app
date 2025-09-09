import { useState, useMemo } from "react";
import { postShame } from "../lib/api";

const MIN_LEN = 20;
const MAX_LEN = 600;

export default function Post() {
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const len = text.length;
  const tooShort = len > 0 && len < MIN_LEN;
  const tooLong  = len > MAX_LEN;
  const isValid  = len >= MIN_LEN && len <= MAX_LEN;

  const counterColor = useMemo(() => {
    if (tooLong) return "text-rose-300";
    if (tooShort) return "text-amber-300";
    if (len === 0) return "text-white/40";
    return "text-emerald-300";
  }, [len, tooShort, tooLong]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!isValid) {
      setMsg({ type: "error", text: `Write between ${MIN_LEN}–${MAX_LEN} characters.` });
      return;
    }

    const normTags = tags.split(/[,\s]+/).map(t => t.trim().replace(/^#/, "")).filter(Boolean);

    try {
      setLoading(true);
      await postShame({ text: text.trim(), tags: normTags, isAnonymous });
      setMsg({ type: "success", text: "Published! 🎉" });
      setText(""); setTags(""); setIsAnonymous(true);
      // Optional: redirect
      // setTimeout(() => (window.location.href = "/feed"), 500);
    } catch (err) {
      const reason = err?.response?.data?.message || err.message;
      setMsg({ type: "error", text: `Failed: ${reason}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">Share Your Shame</h2>

      {msg && (
        <div className={`mb-4 rounded-2xl px-4 py-3 text-sm border ${
          msg.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            : "bg-rose-500/10 border-rose-500/30 text-rose-300"
        }`}>
          {msg.text}
        </div>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <textarea
            className={`w-full min-h-40 bg-white/5 border rounded-2xl p-4 outline-none focus:border-white/20
              ${tooShort || tooLong ? "border-rose-400/40" : "border-white/10"}`}
            placeholder={`What happened? (${MIN_LEN}-${MAX_LEN} chars)`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={MAX_LEN + 200} // hard cap with some buffer
          />
          <div className={`mt-1 text-xs ${counterColor}`}>
            {len}/{MAX_LEN} {tooShort && "• too short"} {tooLong && "• too long"}
          </div>
        </div>

        <input
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 outline-none focus:border-white/20"
          placeholder="#tags (comma or space separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            className="accent-[#FF3CAC]"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          Post as anonymous
        </label>

        <button
          type="submit"
          disabled={loading || !isValid}
          className="w-full bg-gradient-to-r from-[#FF3CAC] via-[#2B86C5] to-[#784BA0] px-6 py-3 rounded-full font-semibold
                     hover:scale-[1.02] transition disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </section>
  );
}
