import baseAxios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const router = useRouter();
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
    const auth = useAuthStore();
    const status = error.response.status;
    if (error.response && status === 422) {
      return Promise.reject(error.response.data);
    }
    if (
      status === STATUS_BAD_REQUEST ||
      status === STATUS_FORBIDDEN ||
      status === STATUS_UNAUTHORIZED ||
      status === STATUS_NOT_FOUND
    ) {
      auth.clearSession();
      router.push({ name: "login" });
      return;
    }
    return Promise.reject({
      message: "something went wrong, please try again later.",
    });
  },
);
