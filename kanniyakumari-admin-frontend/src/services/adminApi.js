const API = import.meta.env.VITE_ADMIN_API;
const KEY = import.meta.env.VITE_ADMIN_SECRET;

export const adminFetch = async (url, options = {}) => {
  const res = await fetch(`${API}${url}`, {
    ...options,
    headers: {
      "x-admin-key": KEY,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Unauthorized");
  }

  return res.json();
};
