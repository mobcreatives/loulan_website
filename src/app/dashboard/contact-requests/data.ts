export const mockContactRequests = [
  {
    id: "1",
    name: "Jennifer Lopez",
    email: "jennifer@example.com",
    phone: "555-123-7890",
    subject: "Private Event Inquiry",
    message:
      "I would like to book your restaurant for a private corporate event next month. Please provide details on availability and pricing.",
    date: "2023-08-10",
    status: "new",
  },
  {
    id: "2",
    name: "Thomas White",
    email: "thomas@example.com",
    phone: "555-456-7891",
    subject: "Catering Services",
    message:
      "Do you offer catering services for off-site events? I need catering for 50 people.",
    date: "2023-08-08",
    status: "responded",
  },
  {
    id: "3",
    name: "Laura Chen",
    email: "laura@example.com",
    phone: "555-789-1234",
    subject: "Allergen Information",
    message:
      "I have severe nut allergies. Can you provide detailed allergen information for your menu items?",
    date: "2023-08-05",
    status: "new",
  },
];

export const statusStyles = {
  new: "bg-blue-100 text-blue-800",
  responded: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};
