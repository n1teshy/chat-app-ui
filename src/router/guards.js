import { useAuthStore } from "../stores/auth.js";
import storage from "../utils/storage.js";
import { STORAGE_TOKEN_KEY } from "../utils/constants.js";

export async function checkAuth(to) {
  const auth = useAuthStore();
  if (!auth.isAuthenticated) {
    if (storage.has(STORAGE_TOKEN_KEY)) {
      await auth.restoreSession();
      return true;
    }
    if (to.name !== "login") return { name: "login" };
  }
}
