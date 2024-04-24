import { createRouter, createWebHistory } from "vue-router";
import { checkAuth } from "./guards.js";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHistory("/ui"),
  routes: routes,
});
router.beforeEach(checkAuth);
