import baseAxios from "axios";
import { useAuthStore } from "../stores/auth.js";

export const axios = baseAxios.create({
  baseURL: "http://localhost:9000",
});

axios.interceptors.request.use(
  (config) => {
    const auth = useAuthStore();
    if (auth.authToken !== null) {
      config.headers["Authorization"] = auth.authToken;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 422) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({
      message: "something went wrong, please try again later.",
    });
  },
);
