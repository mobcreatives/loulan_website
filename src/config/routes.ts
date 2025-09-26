export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    CURRENT_USER: "/auth/currentUser",
  },
  REVIEW: "reviews",
  RESERVATIONS: "reservations",
  MENU_CATEGORIES: "menus",
  GALLERY: "galleries",
  FOODS: "foods",
  CONTACTS: "contacts",
  SETTINGS : "settings",
  ABOUT: "about",
  POPUP_NEWS: "popupnews",
} as const;

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  BOOKING: "/booking",
  MENU: "/menu",
  GALLERY: "/gallery",
  CONTACTS: "/contact",
  
};
