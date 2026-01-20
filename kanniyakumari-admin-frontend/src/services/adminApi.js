const API = import.meta.env.VITE_ADMIN_API;
const KEY = import.meta.env.VITE_ADMIN_SECRET;

export const adminFetch = async (url, options = {}) => {
  const res = await fetch(`${API}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": KEY,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Unauthorized");
  }

  return res.json();
};
