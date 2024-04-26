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

const [
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_UNAUTHORIZED,
  STATUS_NOT_FOUND,
] = [400, 403, 401, 404];

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;
    let data = {
      message: error.message ?? "Something went wrong, please try again later",
    };
    if (status) {
      if (status === 422) {
        data = { validation: error.response.data };
      } else if (
        status === STATUS_BAD_REQUEST ||
        status === STATUS_FORBIDDEN ||
        status === STATUS_UNAUTHORIZED ||
        status === STATUS_NOT_FOUND
      ) {
        const auth = useAuthStore();
        auth.clearSession();
        window.location.href = "/ui/login";
      }
    }
    return Promise.reject(data);
  },
);
