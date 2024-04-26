import DialogView from "../views/dialog/DialogView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegistrationView from "../views/auth/RegistrationView.vue";

export const routes = [
  { path: "/", component: HomeView, name: "home" },
  { path: "/register", component: RegistrationView, name: "registration" },
  { path: "/login", component: LoginView, name: "login" },
  { path: "/dialog/:dialogId", component: DialogView, name: "dialog" },
];
