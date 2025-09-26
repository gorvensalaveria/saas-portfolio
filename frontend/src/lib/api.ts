export const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function handle(res: Response) {
  // If there's no content, just return null
  if (res.status === 204) return null;

  // Try to parse JSON safely (works even if body is empty)
  const text = await res.text();
  const data = text
    ? (() => {
        try {
          return JSON.parse(text);
        } catch {
          return null;
        }
      })()
    : null;

  if (!res.ok) {
    const message = (data as any)?.error || res.statusText || "Request failed";
    throw { error: message, status: res.status, data };
  }
  return data;
}

export const get = (p: string) =>
  fetch(`${API}${p}`, { credentials: "include" }).then(handle);

export const post = (p: string, body?: any) =>
  fetch(`${API}${p}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  }).then(handle);

export const put = (p: string, body?: any) =>
  fetch(`${API}${p}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(handle);

export const del = (p: string) =>
  fetch(`${API}${p}`, { method: "DELETE", credentials: "include" }).then(
    handle
  );
