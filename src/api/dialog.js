import { axios } from "../libs/axios.js";

export default {
  getPeers() {
    return axios.get("/dialogs/peers");
  },

  getDialog(id) {
    return axios.get(`/dialogs/${id}`);
  },

  addDialog(data) {
    return axios.post("/dialogs", data);
  },
};
