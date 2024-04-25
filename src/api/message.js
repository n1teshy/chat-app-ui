import { axios } from "../libs/axios.js";

export default {
  getDialogMessages(id) {
    return axios.get(`/messages/dialogs/${id}`);
  },
};
