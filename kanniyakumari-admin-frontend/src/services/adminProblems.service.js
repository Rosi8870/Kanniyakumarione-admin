import { API, ADMIN_KEY } from "./adminApi";

/* GET ALL PROBLEMS */
export const getAdminProblems = async () => {
  const res = await fetch(`${API}/api/admin/problems`, {
    headers: {
      "x-admin-key": ADMIN_KEY,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
};

/* APPROVE */
export const approveProblem = async (id) => {
  const res = await fetch(`${API}/api/admin/problems/${id}/approve`, {
    method: "PATCH",
    headers: { "x-admin-key": ADMIN_KEY },
  });

  if (!res.ok) throw new Error("Approve failed");
};

/* REJECT */
export const rejectProblem = async (id) => {
  const res = await fetch(`${API}/api/admin/problems/${id}/reject`, {
    method: "PATCH",
    headers: { "x-admin-key": ADMIN_KEY },
  });

  if (!res.ok) throw new Error("Reject failed");
};

/* DELETE */
export const deleteProblem = async (id) => {
  const res = await fetch(`${API}/api/admin/problems/${id}`, {
    method: "DELETE",
    headers: { "x-admin-key": ADMIN_KEY },
  });

  if (!res.ok) throw new Error("Delete failed");
};
