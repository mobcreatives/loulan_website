
import { useState } from 'react';
import { Calendar as CalendarIcon, EyeIcon, Edit2Icon, Trash2Icon, Check, X, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageTitle from '@/components/ui/PageTitle';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ItemFormDialog from '@/components/shared/ItemFormDialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock data for initial development
const mockReservations = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '555-123-4567',
    date: '2023-08-15',
    time: '19:00',
    guests: 4,
    status: 'confirmed'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '555-987-6543',
    date: '2023-08-16',
    time: '20:30',
    guests: 2,
    status: 'pending'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '555-456-7890',
    date: '2023-08-17',
    time: '18:00',
    guests: 6,
    status: 'cancelled'
  }
];

const statusStyles = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  cancelled: 'bg-red-100 text-red-800'
};

const timeSlots = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', 
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

const Reservations = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState(mockReservations);
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState<any>(null);

  const handleView = (id: string) => {
    const reservation = reservations.find(res => res.id === id);
    setCurrentReservation(reservation);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (id: string) => {
    const reservation = reservations.find(res => res.id === id);
    setCurrentReservation(reservation);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const reservation = reservations.find(res => res.id === id);
    setCurrentReservation(reservation);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setReservations(reservations.filter(res => res.id !== currentReservation.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Reservation deleted",
      description: `Reservation for ${currentReservation.name} has been cancelled.`,
    });
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setReservations(
      reservations.map(res => 
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
    
    const reservation = reservations.find(res => res.id === id);
    toast({
      title: `Reservation ${newStatus}`,
      description: `Reservation for ${reservation.name} has been ${newStatus}.`,
    });
  };

  const handleAdd = () => {
    const today = new Date();
    setCurrentReservation({
      id: `${reservations.length + 1}`,
      name: '',
      email: '',
      phone: '',
      date: format(today, 'yyyy-MM-dd'),
      time: '19:00',
      guests: 2,
      status: 'pending'
    });
    setIsAddDialogOpen(true);
  };

  const handleSubmitAdd = (data: any) => {
    const newReservation = {
      ...currentReservation,
      ...data,
    };
    
    setReservations([...reservations, newReservation]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Reservation added",
      description: `Reservation for ${data.name} has been added successfully.`,
    });
  };

  const handleSubmitEdit = (data: any) => {
    setReservations(
      reservations.map(res =>
        res.id === currentReservation.id ? { ...res, ...data } : res
      )
    );
    setIsEditDialogOpen(false);
    
    toast({
      title: "Reservation updated",
      description: `Reservation for ${data.name} has been updated successfully.`,
    });
  };

  return (
    <DashboardLayout>
      <PageTitle
        title="Reservations"
        description="Manage customer table reservations and bookings"
        actions={
          <div className="flex gap-2">
            <Button 
              onClick={() => handleAdd()} 
              className="btn-gold"
            >
              Add Reservation
            </Button>
            <Button 
              variant="outline" 
              className="btn-outline"
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
                Reservations for {calendarDate ? format(calendarDate, 'MMMM d, yyyy') : 'Today'}
              </h3>
              
              {reservations
                .filter(res => res.date === (calendarDate ? format(calendarDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')))
                .sort((a, b) => a.time.localeCompare(b.time))
                .map(res => (
                  <div key={res.id} className={`mb-2 p-3 border rounded-md ${
                    res.status === 'confirmed' ? 'border-green-200 bg-green-50' :
                    res.status === 'pending' ? 'border-amber-200 bg-amber-50' :
                    'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{res.name} - {res.time}</p>
                        <p className="text-sm text-gray-600">{res.guests} guests</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(res.id)}
                          className="h-8 w-8 text-amber-500"
                        >
                          <EyeIcon size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(res.id)}
                          className="h-8 w-8 text-amber-500"
                        >
                          <Edit2Icon size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              
              {reservations.filter(res => 
                res.date === (calendarDate ? format(calendarDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'))
              ).length === 0 && (
                <p className="text-center text-gray-500 py-4">No reservations for this day</p>
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
                {reservations.map(reservation => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.name}</TableCell>
                    <TableCell>
                      {new Date(reservation.date).toLocaleDateString()} at {reservation.time}
                    </TableCell>
                    <TableCell>{reservation.guests}</TableCell>
                    <TableCell>
                      <div>{reservation.email}</div>
                      <div className="text-sm text-muted-foreground">{reservation.phone}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[reservation.status as keyof typeof statusStyles]}`}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleView(reservation.id)}
                          className="h-8 w-8 text-amber-500"
                        >
                          <EyeIcon size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEdit(reservation.id)}
                          className="h-8 w-8 text-amber-500"
                        >
                          <Edit2Icon size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(reservation.id)}
                          className="h-8 w-8 text-red-500"
                        >
                          <Trash2Icon size={16} />
                        </Button>
                        {reservation.status !== 'confirmed' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                            className="h-8 w-8 text-green-500"
                          >
                            <Check size={16} />
                          </Button>
                        )}
                        {reservation.status !== 'cancelled' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                            className="h-8 w-8 text-red-500"
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reservation Details</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{currentReservation.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusStyles[currentReservation.status as keyof typeof statusStyles]
                  }`}>
                    {currentReservation.status.charAt(0).toUpperCase() + currentReservation.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p>{new Date(currentReservation.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p>{currentReservation.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="flex items-center">
                      <Users size={16} className="mr-1" />
                      {currentReservation.guests}
                    </p>
                  </div>
                  <div>
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
      <ItemFormDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        title="Add Reservation"
        description="Book a new table reservation"
        onSubmit={handleSubmitAdd}
        submitLabel="Add Reservation"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Customer Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required />
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
                    {currentReservation?.date ? format(new Date(currentReservation.date), 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={currentReservation?.date ? new Date(currentReservation.date) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setCurrentReservation({
                          ...currentReservation,
                          date: format(date, 'yyyy-MM-dd')
                        });
                      }
                    }}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <Input 
                id="date" 
                name="date" 
                type="hidden" 
                value={currentReservation?.date || format(new Date(), 'yyyy-MM-dd')}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Select name="time" defaultValue={currentReservation?.time || "19:00"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
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
              defaultValue={currentReservation?.guests || 2}
              required 
            />
          </div>
        </div>
      </ItemFormDialog>

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
              <Input id="name" name="name" defaultValue={currentReservation.name} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={currentReservation.email} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={currentReservation.phone} required />
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
                      {currentReservation.date ? format(new Date(currentReservation.date), 'PPP') : <span>Pick a date</span>}
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
                            date: format(date, 'yyyy-MM-dd')
                          });
                        }
                      }}
                      initialFocus
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
                    {timeSlots.map(time => (
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
                defaultValue={currentReservation.guests}
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
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will cancel the reservation for {currentReservation.name} on {new Date(currentReservation.date).toLocaleDateString()} at {currentReservation.time}.
                This action cannot be undone.
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
    </DashboardLayout>
  );
};

export default Reservations;
