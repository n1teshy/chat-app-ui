import { axios } from "../libs/axios.js";

export default {
  getDialogs() {
    return axios.get("/dialogs");
  },

  getDialog(id) {
    return axios.get(`/dialogs/${id}`);
  },

  addDialog(data) {
    return axios.post("/dialogs", data);
  },
};
