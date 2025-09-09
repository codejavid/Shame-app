import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const postShame   = (payload) => api.post("/api/shame", payload);
export const getShames   = () => api.get("/api/shame");
export const deleteShame = (id) => api.delete(`/api/shame/${id}`);

export const askAISuggest = (text) => api.post("/api/ai/suggest", { text });
