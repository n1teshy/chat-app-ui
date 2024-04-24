import { axios } from "../libs/axios.js";

export default {
  register(data) {
    return axios.post("/auth/register", data);
  },

  login(data) {
    return axios.post("/auth/login", data);
  },
};
