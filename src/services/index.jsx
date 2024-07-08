import axios from "axios";

export const axiosIntercepted = axios.create({
  headers: { "Content-Type": "application/json" },
});

export const axiosBase = axios.create({
  headers: { "Content-Type": "application/json" },
});
