const API = import.meta.env.VITE_ADMIN_API;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_SECRET;

export const getAdminProblems = async () => {
  const res = await fetch(`${API}/api/admin/problems`, {
    headers: {
      "x-admin-key": ADMIN_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};

export const approveProblem = async (id) => {
  const res = await fetch(`${API}/api/admin/problems/${id}/approve`, {
    method: "PATCH",
    headers: {
      "x-admin-key": ADMIN_KEY,
    },
  });

  if (!res.ok) throw new Error("Approve failed");
};

export const rejectProblem = async (id) => {
  const res = await fetch(`${API}/api/admin/problems/${id}/reject`, {
    method: "PATCH",
    headers: {
      "x-admin-key": ADMIN_KEY,
    },
  });

  if (!res.ok) throw new Error("Reject failed");
};

export const deleteProblem = async (id) => {
  const res = await fetch(`${API}/api/admin/problems/${id}`, {
    method: "DELETE",
    headers: {
      "x-admin-key": ADMIN_KEY,
    },
  });

  if (!res.ok) throw new Error("Delete failed");
};
