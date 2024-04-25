import { axios } from "../libs/axios.js";

export default {
  getUsers(username) {
    return axios.get("/users" + (username ? `?username=${username}` : ""));
  },

  getSelf() {
    return axios.get("/users/self");
  },
};
