import { defineStore } from "pinia";
import authApi from "../api/auth.js";
import usersApi from "../api/users.js";
import storage from "../utils/storage.js";
import { STORAGE_TOKEN_KEY } from "../utils/constants.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: null, token: null }),

  getters: {
    isAuthenticated: (state) => state.user !== null,

    authToken: (state) => state.token,

    name: (state) => {
      if (state.user === null) return null;
      const { first, last } = state.user.name;
      return last ? `${first} ${last}` : first;
    },
  },

  actions: {
    async register(data) {
      await authApi.register(data);
      await authApi.login(data.username, data.password);
    },

    async login(username, password) {
      const response = await authApi.login({ username, password });
      storage.set(STORAGE_TOKEN_KEY, response.token);
      this.token = response.token;
      await this.initSession();
    },

    async initSession() {
      this.user = await usersApi.getSelf();
    },

    clearSession() {
      this.$reset();
      storage.delete(STORAGE_TOKEN_KEY);
    },
  },
});
