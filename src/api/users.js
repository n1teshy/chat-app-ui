import { axios } from "../libs/axios.js";

export default {
  getSelf() {
    return axios.get("/users/self");
  },
};
