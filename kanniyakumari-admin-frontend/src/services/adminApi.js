const API = import.meta.env.VITE_ADMIN_API;

const headers = () => ({
  "x-admin-email": localStorage.getItem("adminEmail"),
});

/* GET ALL PROBLEMS */
export const getAdminProblems = async () => {
  const res = await fetch(`${API}/api/admin/problems`, {
    headers: headers(),
  });

  if (!res.ok) throw new Error("Admin access denied");
  return res.json();
};

/* APPROVE */
export const approveProblem = async (id) => {
  await fetch(`${API}/api/admin/problems/${id}/approve`, {
    method: "PATCH",
    headers: headers(),
  });
};

/* REJECT */
export const rejectProblem = async (id) => {
  await fetch(`${API}/api/admin/problems/${id}/reject`, {
    method: "PATCH",
    headers: headers(),
  });
};

/* DELETE */
export const deleteProblem = async (id) => {
  await fetch(`${API}/api/admin/problems/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
};
