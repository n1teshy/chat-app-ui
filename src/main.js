import { createApp } from "vue";
import { router } from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./style.css";
import App from "./App.vue";

// use naive-ui style
const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

import "./libs/font-awesome";

const app = createApp(App);
app.component("fa-icon", FontAwesomeIcon);
app.use(router);

app.mount("#app");
