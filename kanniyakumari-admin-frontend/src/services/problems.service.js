const API = import.meta.env.VITE_ADMIN_API;
const KEY = import.meta.env.VITE_ADMIN_KEY;

const headers = { "x-admin-key": KEY };

export const fetchProblems = async () =>
  fetch(`${API}/api/admin/problems`, { headers }).then(r => r.json());

export const approveProblem = (id) =>
  fetch(`${API}/api/admin/problems/${id}/approve`, {
    method: "PATCH",
    headers,
  });

export const rejectProblem = (id) =>
  fetch(`${API}/api/admin/problems/${id}/reject`, {
    method: "PATCH",
    headers,
  });

export const deleteProblem = (id) =>
  fetch(`${API}/api/admin/problems/${id}`, {
    method: "DELETE",
    headers,
  });
