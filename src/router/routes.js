import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";

export const routes = [
  { path: "/", component: HomeView, name: "home" },
  { path: "/login", component: LoginView, name: "login" },
];
