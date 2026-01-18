const API = import.meta.env.VITE_ADMIN_API;

export const fetchAdminProblems = async () => {
  const res = await fetch(`${API}/admin/problems`, {
    headers: {
      "x-admin-secret": localStorage.getItem("adminSecret")
    }
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};
