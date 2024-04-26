import baseAxios from "axios";
import { useRouter } from "vue-router";
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
    if (status) {
      if (status === 422) {
        return Promise.reject({ validation: error.response.data });
      }
      if (
        status === STATUS_BAD_REQUEST ||
        status === STATUS_FORBIDDEN ||
        status === STATUS_UNAUTHORIZED ||
        status === STATUS_NOT_FOUND
      ) {
        const router = useRouter();
        const auth = useAuthStore();
        auth.clearSession();
        router.push({ name: "login" });
        return;
      }
    }
    return Promise.reject({
      message: error.message ?? "Something went wrong, please try again later",
    });
  },
);
