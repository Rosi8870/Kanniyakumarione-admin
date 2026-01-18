import { adminFetch } from "./adminApi";

/* GET ALL BUSINESSES */
export const getBusinesses = () =>
  adminFetch("/api/admin/businesses");

/* APPROVE BUSINESS */
export const approveBusiness = (id) =>
  adminFetch(`/api/admin/businesses/${id}/approve`, {
    method: "PATCH",
  });

/* REJECT BUSINESS */
export const rejectBusiness = (id) =>
  adminFetch(`/api/admin/businesses/${id}/reject`, {
    method: "PATCH",
  });

/* DELETE BUSINESS */
export const deleteBusiness = (id) =>
  adminFetch(`/api/admin/businesses/${id}`, {
    method: "DELETE",
  });
