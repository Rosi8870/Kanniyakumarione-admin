import { adminFetch } from "./adminApi";

export const getTouristPlaces = () =>
  adminFetch("/api/admin/tourist");

export const addTouristPlace = (data) =>
  adminFetch("/api/admin/tourist", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteTouristPlace = (id) =>
  adminFetch(`/api/admin/tourist/${id}`, { method: "DELETE" });
