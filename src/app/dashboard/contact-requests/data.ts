import { TContactDetails } from "./types";

export const mockContactRequests: TContactDetails[] = [
  {
    id: 1,
    name: "Jennifer Lopez",
    email: "jennifer@example.com",
    phone: "555-123-7890",
    message:
      "I would like to book your restaurant for a private corporate event next month. Please provide details on availability and pricing.",
    status: "NEW",
    createdAt: "2024-12-04",
    updatedAt: "2024-12-04",
  },
  {
    id: 2,
    name: "Thomas White",
    email: "thomas@example.com",
    phone: "555-456-7891",
    message:
      "Do you offer catering services for off-site events? I need catering for 50 people.",
    status: "RESPONDED",
    createdAt: "2024-12-04",
    updatedAt: "2024-12-04",
  },
  {
    id: 3,
    name: "Laura Chen",
    email: "laura@example.com",
    phone: "555-789-1234",
    message:
      "I have severe nut allergies. Can you provide detailed allergen information for your menu items?",
    status: "NEW",
    createdAt: "2024-12-04",
    updatedAt: "2024-12-04",
  },
];

export const statusStyles = {
  new: "bg-blue-100 text-blue-800",
  responded: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};
