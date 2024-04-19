import { h } from "vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export function renderRouterLink(name, label) {
  return h(RouterLink, { to: { name } }, { default: () => label });
}

export function renderIcon(icon) {
  return h(FontAwesomeIcon, {
    icon,
    size: "sm",
    fixedWidth: true,
  });
}
