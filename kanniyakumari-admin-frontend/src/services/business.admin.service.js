import { adminFetch } from "./adminApi";

export const getBusinesses = () =>
  adminFetch("/api/admin/businesses");

export const approveBusiness = (id) =>
  adminFetch(`/api/admin/businesses/${id}/approve`, { method: "PATCH" });

export const deleteBusiness = (id) =>
  adminFetch(`/api/admin/businesses/${id}`, { method: "DELETE" });
