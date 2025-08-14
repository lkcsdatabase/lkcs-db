export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function apiGet(path){
  const r = await fetch(`${API_BASE}${path}`);
  return r.json();
}
export async function apiPost(path, body){
  const r = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return r.json();
}
