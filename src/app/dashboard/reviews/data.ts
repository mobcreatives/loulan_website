import { TReviewDetails } from "./types";

export const mockReviews: TReviewDetails[] = [
  {
    id: "1",
    customerName: "Amanda Chen",
    rating: 5,
    date: "2023-08-01",
    content:
      "The food was absolutely amazing! The chef's special was to die for and the service was impeccable.",
    isFeatured: true,
  },
  {
    id: "2",
    customerName: "Robert Gonzalez",
    rating: 4,
    date: "2023-07-28",
    content:
      "Great atmosphere and delicious food. Would definitely come back again.",
    isFeatured: false,
  },
  {
    id: "3",
    customerName: "Emily Wilson",
    rating: 4,
    date: "2023-07-25",
    content:
      "Lovely place for a dinner date. The wine selection was excellent.",
    isFeatured: true,
  },
  {
    id: "4",
    customerName: "David Kim",
    rating: 3,
    date: "2023-07-22",
    content:
      "The food was good but the service was a bit slow. Would give another chance.",
    isFeatured: false,
  },
];
