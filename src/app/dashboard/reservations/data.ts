export const mockReservations = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-123-4567",
    date: "2023-08-15",
    time: "19:00",
    guests: 4,
    status: "confirmed",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "555-987-6543",
    date: "2023-08-16",
    time: "20:30",
    guests: 2,
    status: "pending",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "555-456-7890",
    date: "2023-08-17",
    time: "18:00",
    guests: 6,
    status: "cancelled",
  },
];

export const statusStyles = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800",
};

export const timeSlots = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];
