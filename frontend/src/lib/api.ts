const API_BASE_URL = "http://localhost:4000";

export async function fetchData(endpoint) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}
