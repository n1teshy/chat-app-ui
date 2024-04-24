import baseAxios from "axios";

export const axios = baseAxios.create({
  baseURL: "http://localhost:9000",
});

axios.interceptors.request.use(
  (config) => config,
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
