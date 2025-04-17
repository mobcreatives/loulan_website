import Settings from "@/app/dashboard/settings/page";

export const KEYS = {
  CUISINE: {
    GET: ["get", "cuisines"],
    ADD: ["add", "cuisine"],
    UPDATE: ["update", "cuisine"],
    DELETE: ["delete", "cuisine"],
  },
  MENU: {
    GET: ["get", "menus"],
    ADD: ["add", "menu"],
    UPDATE: ["update", "menu"],
    DELETE: ["delete", "menu"],
  },
  FOOD: {
    GET: ["get", "foods"],
    ADD: ["add", "food"],
    UPDATE: ["update", "food"],
    DELETE: ["delete", "food"],
    TOGGLE_FEATURED: ["toggle", "featured", "food"],
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
  RESERVATIONS: {
    GET: ["get", "reservations"],
    ADD: ["add", "reservation"],
    UPDATE: ["update", "reservation"],
    DELETE: ["delete", "reservation"],
    FEATURED: ["toggle", "featured", "review"],
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
    ADD : ["add", "contact"],
    GET: ["get", "contacts"],
    DELETE: ["delete", "contact"],
    CHANGE_STATUS: ["change", "status", "contact"],
  },
  SETTINGS: {
    GET: ["settings", "get"],
    UPDATE: ["settings", "update"],
  },
};

export const CONSTANTS = {
  TOKEN: "token",
};
