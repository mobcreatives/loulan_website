import { TPopupProductsDetails } from "./types";

export const mockPopupProducts: TPopupProductsDetails[] = [
  {
    id: "1",
    name: "Limited Time Seafood Platter",
    description:
      "A seasonal selection of our finest seafood offerings including shrimp, scallops, and lobster.",
    price: 39.99,
    category: "Seafood",
    imageUrl: "/images/placeholder.svg",
    isActive: true,
    isPopup: true,
  },
  {
    id: "2",
    name: "Seasonal Fruit Dessert",
    description:
      "Fresh berries and seasonal fruits with a light custard and mint garnish.",
    price: 12.99,
    category: "Desserts",
    imageUrl: "/images/placeholder.svg",
    isActive: true,
    isPopup: true,
  },
  {
    id: "3",
    name: "Holiday Special Roast",
    description:
      "Slow-cooked prime rib with rosemary and garlic, served with seasonal vegetables.",
    price: 32.99,
    category: "Main Course",
    imageUrl: "/images/placeholder.svg",
    isActive: false,
    isPopup: true,
  },
];
