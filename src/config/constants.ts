export const KEYS = {
  CUISINE: {
    GET: ["cuisines"],
    ADD: ["cuisines", "add"],
    UPDATE: ["cuisines", "update"],
    DELETE: ["cuisines", "delete"],
  },
  MENU: {
    GET: ["menu"],
    ADD: ["menu", "add"],
    UPDATE: ["menu", "update"],
    DELETE: ["menu", "delete"],
  },
  FOOD: {
    GET: ["food"],
    ADD: ["food", "add"],
    UPDATE: ["food", "update"],
    DELETE: ["food", "delete"],
    TOGGLE_FEATURED: ["food", "toggle-featured"],
  },
  FEATURED_FOOD: {
    GET: ["get", "featured", "foods"],
    ADD: ["add", "featured", "food"],
    DELETE: ["delete", "featured", "food"],
    TOGGLE: ["toggle", "featured", "food"],
  },
  REVIEWS: {
    GET: ["get", "reviews"],
    ADD: ["add", "review"],
    UPDATE: ["update", "review"],
    DELETE: ["delete", "review"],
    FEATURED: ["toggle", "featured", "review"],
  },
  RESERVATION: {
    GET: ["reservations"],
    ADD: ["reservations", "add"],
    UPDATE: ["reservations", "update"],
    DELETE: ["reservations", "delete"],
  },
  MENU_CATEGORIES: {
    GET: ["get", "menu", "categories"],
    ADD: ["add", "menu", "category"],
    UPDATE: ["update", "menu", "category"],
    DELETE: ["delete", "menu", "category"],
  },
  GALLERY: {
    GET: ["get", "gallery"],
    ADD: ["add", "gallery"],
    UPDATE: ["update", "gallery"],
    DELETE: ["delete", "gallery"],
    TOGGLE_VISIBILITY: ["toggle", "visibility", "gallery"],
  },
  CONTACTS: {
    ADD: ["add", "contact"],
    GET: ["get", "contacts"],
    DELETE: ["delete", "contact"],
    CHANGE_STATUS: ["change", "status", "contact"],
  },
  USER: {
    GET: ["users"],
    ADD: ["users", "add"],
    UPDATE: ["users", "update"],
    DELETE: ["users", "delete"],
  },
  AUTH: {
    CURRENT_USER: ["auth", "current-user"],
  },
  SETTINGS: {
    GET: ["settings"],
    UPDATE: ["settings", "update"],
  },
};

export const CONSTANTS = {
  TOKEN: "token",
};
