import { axios } from "../libs/axios.js";

export default {
  getUsers(username) {
    return axios.get("/users" + (username ? `?username=${username}` : ""));
  },

  getUser(id) {
    return axios.get(`/users/${id}`);
  },

  getSelf() {
    return axios.get("/users/self");
  },
};
