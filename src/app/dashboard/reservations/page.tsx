"use client";
import { useState } from "react";
import {
  Calendar as CalendarIcon,
  EyeIcon,
  Edit2Icon,
  Trash2Icon,
  Check,
  X,
  Users,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Card,
  Calendar,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Label,
  PageTitle,
  DialogDescription,
} from "@/components";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { statusStyles, timeSlots } from "./data";
import ItemFormDialog from "./_components/item-form-dialog";
import { useAuthAxios } from "@/config/auth-axios";
import { TAddReservationData, TReservationDetails } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addReservationSchema } from "./validator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";
import { API_ROUTES } from "@/config/routes";
import { TResponse } from "@/global/types";

export default function Reservations() {
  const { _axios } = useAuthAxios();
  // states
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(
    new Date()
  );
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentReservation, setCurrentReservation] =
    useState<TReservationDetails>(null);

  const {
    register: addReservationRegister,
    handleSubmit: handleAddReservationSubmit,
    setValue: addReservationSetValue,
  } = useForm<TAddReservationData>({
    resolver: zodResolver(addReservationSchema),
  });
  // tanstack queries
  const { mutateAsync: addReservationMutateSync, isPending: addPending } =
    useMutation({
      mutationKey: KEYS.RESERVATIONS.ADD,
      mutationFn: addReservation,
      onSuccess: () => {
        refetch();
        toast("Reservation added successfully");
        setIsAddDialogOpen(false);
      },
      onError: () => {
        toast("Failed to add reservation");
      },
    });

  const { mutateAsync: deleteReservationMutateSync, isPending: deletePending } =
    useMutation({
      mutationKey: KEYS.RESERVATIONS.DELETE,
      mutationFn: deleteReservation,
      onSuccess: () => {
        refetch();
        toast("Reservation deleted successfully");
        setIsDeleteDialogOpen(false);
      },
      onError: () => {
        toast("Failed to delete reservation");
      },
    });

  const { data: reservations, refetch } = useQuery({
    queryKey: KEYS.RESERVATIONS.GET,
    queryFn: getReservations,
  });
  // handlers
  // api handlers
  async function addReservation(data: TAddReservationData) {
    try {
      const response = await _axios.post<TReservationDetails>(
        API_ROUTES.RESERVATIONS,
        data
      );
      return response.data;
    } catch {
      throw new Error("Failed to add reservation");
    }
  }

  async function updateReservation(id: number, data: TAddReservationData) {
    try {
      const response = await _axios.put(
        `${API_ROUTES.RESERVATIONS}/${id}`,
        data
      );
      return response.data;
    } catch {
      throw new Error("Failed to update reservation");
    }
  }

  async function deleteReservation(id: number) {
    try {
      await _axios.delete(`${API_ROUTES.RESERVATIONS}/${id}`);
    } catch {
      throw new Error("Failed to delete reservation");
    }
  }

  async function getReservations() {
    try {
      const response = await _axios.get<
        TResponse<TReservationDetails, "reservations">
      >(API_ROUTES.RESERVATIONS);
      return response.data.reservations;
    } catch {
      throw new Error("Failed to fetch reservations");
    }
  }

  // basic handlers
  function handleView(reservation: TReservationDetails) {
    setCurrentReservation(reservation);
    setIsViewDialogOpen(true);
  }

  const handleEdit = (reservation: TReservationDetails) => {
    setCurrentReservation(reservation);
    setIsEditDialogOpen(true);
  };

  function handleDelete(reservation: TReservationDetails) {
    setCurrentReservation(reservation);
    setIsDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (Object.keys(currentReservation).length <= 0 || !isDeleteDialogOpen)
      return;
    deleteReservationMutateSync(currentReservation.id);
  }

  const handleStatusChange = (
    reservation: TReservationDetails,
    newStatus: string
  ) => {};

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  async function handleSubmitAdd(data: TAddReservationData) {
    await addReservationMutateSync(data);
  }

  const handleSubmitEdit = (data: TAddReservationData) => {
    setIsEditDialogOpen(false);
    toast(`Reservation for ${data.name} has been updated successfully.`);
  };

  return (
    <div>
      <PageTitle
        title="Reservations"
        description="Manage customer table reservations and bookings"
        actions={
          <div className="flex gap-2">
            <Button
              onClick={() => handleAdd()}
              className="btn-gold cursor-pointer"
            >
              Add Reservation
            </Button>
            <Button
              variant="outline"
              className="btn-outline cursor-pointer"
              onClick={() => setShowCalendarView(!showCalendarView)}
            >
              <CalendarIcon size={16} className="mr-2" />
              {showCalendarView ? "Table View" : "Calendar View"}
            </Button>
          </div>
        }
      />

      {showCalendarView ? (
        <Card className="mt-8 p-6">
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              selected={calendarDate}
              onSelect={setCalendarDate}
              className="rounded-md border p-3 pointer-events-auto"
            />

            <div className="w-full mt-6">
              <h3 className="text-lg font-medium mb-4">
                Reservations for{" "}
                {calendarDate ? format(calendarDate, "MMMM d, yyyy") : "Today"}
              </h3>

              {Array.isArray(reservations) &&
                reservations
                  .filter(
                    (res) =>
                      res.date ===
                      (calendarDate
                        ? format(calendarDate, "yyyy-MM-dd")
                        : format(new Date(), "yyyy-MM-dd"))
                  )
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((res) => (
                    <div
                      key={res.id}
                      className={cn(
                        `mb-2 p-3 border rounded-md`,
                        res.status === "confirmed" &&
                          "border-green-200 bg-green-50",
                        res.status === "pending"
                          ? "border-amber-200 bg-amber-50"
                          : "border-red-200 bg-red-50"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            {res.name} - {res.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            {res.guestsNum} guests
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(res)}
                            className="h-8 w-8 text-amber-500"
                          >
                            <EyeIcon size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(res)}
                            className="h-8 w-8 text-amber-500"
                          >
                            <Edit2Icon size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

              {Array.isArray(reservations) &&
                reservations.filter(
                  (res) =>
                    res.date ===
                    (calendarDate
                      ? format(calendarDate, "yyyy-MM-dd")
                      : format(new Date(), "yyyy-MM-dd"))
                ).length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No reservations for this day
                  </p>
                )}
            </div>
          </div>
        </Card>
      ) : (
        <Card className="mt-8">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations?.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">
                      {reservation.name}
                    </TableCell>
                    <TableCell>
                      {new Date(reservation.date).toLocaleDateString()} at{" "}
                      {reservation.time ?? "19:00"}
                    </TableCell>
                    <TableCell>{reservation.guestsNum}</TableCell>
                    <TableCell>
                      <div>{reservation.email}</div>
                      <div className="text-sm text-muted-foreground">
                        {reservation.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          `px-2 py-1 rounded-full text-xs font-medium`,
                          statusStyles[
                            reservation.status as keyof typeof statusStyles
                          ]
                        )}
                      >
                        {reservation.status?.charAt(0).toUpperCase() +
                          reservation.status?.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(reservation)}
                          className="h-8 w-8 text-amber-500 cursor-pointer"
                        >
                          <EyeIcon size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(reservation)}
                          className="h-8 w-8 text-amber-500 cursor-pointer"
                        >
                          <Edit2Icon size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(reservation)}
                          disabled={deletePending}
                          className="h-8 w-8 text-red-500 cursor-pointer"
                        >
                          <Trash2Icon size={16} />
                        </Button>
                        {reservation.status !== "confirmed" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleStatusChange(reservation, "confirmed")
                            }
                            className="h-8 w-8 text-green-500 cursor-pointer"
                          >
                            <Check size={16} />
                          </Button>
                        )}
                        {reservation.status !== "cancelled" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleStatusChange(reservation, "cancelled")
                            }
                            className="h-8 w-8 text-red-500 cursor-pointer"
                          >
                            <X size={16} />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* View Reservation Dialog */}
      {currentReservation && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reservation Details</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-3">
                  <h3 className="text-lg font-medium">
                    {currentReservation.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium col-span-2 ${
                      statusStyles[
                        currentReservation.status as keyof typeof statusStyles
                      ]
                    }`}
                  >
                    {currentReservation.status?.charAt(0).toUpperCase() +
                      currentReservation.status?.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p>
                      {new Date(currentReservation.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Time</p>
                    <p>{currentReservation.time ?? "19:00"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="flex items-center">
                      <Users size={16} className="mr-1" />
                      {currentReservation.guestsNum}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{currentReservation.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{currentReservation.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Reservation Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={handleAddReservationSubmit(handleSubmitAdd)}>
            <DialogHeader className="px-0">
              <div className="flex items-center justify-between">
                <DialogTitle>Add Reservation</DialogTitle>
              </div>
              <DialogDescription>
                Book a new table reservation
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    required
                    {...addReservationRegister("name")}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      {...addReservationRegister("email")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      required
                      {...addReservationRegister("phone")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                          name="date"
                          id="date-trigger"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {currentReservation?.date ? (
                            format(new Date(currentReservation.date), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            currentReservation?.date
                              ? new Date(currentReservation.date)
                              : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              setCurrentReservation({
                                ...currentReservation,
                                date: format(date, "yyyy-MM-dd"),
                              });
                              addReservationSetValue(
                                "date",
                                format(date, "yyyy-MM-dd")
                              );
                            }
                          }}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Select
                      name="time"
                      defaultValue={currentReservation?.time || "19:00"}
                      onValueChange={(value) =>
                        addReservationSetValue("time", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="20"
                    defaultValue={currentReservation?.guestsNum || 2}
                    {...addReservationRegister("guestsNum")}
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="px-0 border-t pt-4">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-gold"
                  disabled={addPending}
                >
                  {addPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {addPending ? "Saving..." : "Add Reservation"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Reservation Dialog */}
      {currentReservation && (
        <ItemFormDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          title="Edit Reservation"
          description="Update the reservation details"
          onSubmit={handleSubmitEdit}
          submitLabel="Update Reservation"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={currentReservation.name}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentReservation.email}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={currentReservation.phone}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                      name="date-trigger"
                      id="date-trigger"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentReservation.date ? (
                        format(new Date(currentReservation.date), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(currentReservation.date)}
                      onSelect={(date) => {
                        if (date) {
                          setCurrentReservation({
                            ...currentReservation,
                            date: format(date, "yyyy-MM-dd"),
                          });
                        }
                      }}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  id="date"
                  name="date"
                  type="hidden"
                  value={currentReservation.date}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Select name="time" defaultValue={currentReservation.time}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="20"
                defaultValue={currentReservation.guestsNum}
                required
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={currentReservation.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ItemFormDialog>
      )}

      {/* Delete Confirmation Dialog */}
      {currentReservation && (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will cancel the reservation for {currentReservation.name}{" "}
                on {new Date(currentReservation.date).toLocaleDateString()} at{" "}
                {currentReservation.time}. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
