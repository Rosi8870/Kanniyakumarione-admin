import { adminFetch } from "./adminApi";

export const getAdminProblems = () =>
  adminFetch("/api/admin/problems");

export const approveProblem = (id) =>
  adminFetch(`/api/admin/problems/${id}/approve`, { method: "PATCH" });

export const rejectProblem = (id) =>
  adminFetch(`/api/admin/problems/${id}/reject`, { method: "PATCH" });

export const deleteProblem = (id) =>
  adminFetch(`/api/admin/problems/${id}`, { method: "DELETE" });
