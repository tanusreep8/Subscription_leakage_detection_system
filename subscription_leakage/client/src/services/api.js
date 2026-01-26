import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getLeakageReport = () => API.get("/subscriptions/leakage");
export const getSubscriptions = () => API.get("/subscriptions");
export const addSubscription = (data) => API.post("/subscriptions", data);
export const deleteSubscription = (id) => API.delete(`/subscriptions/${id}`);
// Add to existing exports
export const updateSubscription = (id, data) => API.put(`/subscriptions/${id}`, data);