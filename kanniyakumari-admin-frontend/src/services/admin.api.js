const API = import.meta.env.VITE_ADMIN_API;

const headers = () => ({
  "x-admin-secret": localStorage.getItem("adminSecret"),
});

export const fetchProblems = async () => {
  const res = await fetch(`${API}/admin/problems`, { headers: headers() });
  if (!res.ok) throw new Error();
  return res.json();
};

export const approveProblem = (id) =>
  fetch(`${API}/admin/problems/${id}/approve`, {
    method: "PATCH",
    headers: headers(),
  });

export const rejectProblem = (id) =>
  fetch(`${API}/admin/problems/${id}/reject`, {
    method: "PATCH",
    headers: headers(),
  });

export const deleteProblem = (id) =>
  fetch(`${API}/admin/problems/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
