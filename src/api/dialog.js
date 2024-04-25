import { axios } from "../libs/axios.js";

export default {
  getDialogs() {
    return axios.get("/dialogs");
  },

  addDialog(data) {
    return axios.post("/dialogs", data);
  },
};
