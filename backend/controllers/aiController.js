// controllers/aiController.js
import dotenv from "dotenv";
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "meta-llama/llama-3.1-70b-instruct";

const systemPrompt = `You are a concise mentor. Given a user's failure/confession, respond with:
1) Empathy (1 short line)
2) What went wrong (bullets)
3) What to do next time (bullets)
4) 1 actionable checklist
<=120 words, kind, practical, no shaming.`;

export const suggestAI = async (req, res) => {
  try {
    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ message: "Missing OPENROUTER_API_KEY" });
    }

    const { text } = req.body || {};
    if (!text || text.trim().length < 10) {
      return res.status(400).json({ message: "Provide a longer description." });
    }

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        // These two headers help with OpenRouter routing/attribution (optional but good):
        "HTTP-Referer": "http://localhost:8000",
        "X-Title": "ShameApp",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.5,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text },
        ],
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("OpenRouter error:", errText);
      return res.status(500).json({ message: "AI request failed" });
    }

    const data = await resp.json();
    const suggestion =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No suggestion returned.";

    return res.json({ suggestion });
  } catch (err) {
    console.error("AI error:", err?.message || err);
    return res.status(500).json({ message: "AI request failed" });
  }
};
