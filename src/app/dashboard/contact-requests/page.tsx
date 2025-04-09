"use client";

import { useState, useEffect } from "react";
import { EyeIcon, Trash2Icon, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  Button,
  PageTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components";
import { statusStyles } from "./data"; // Assuming this file contains styles for status
import { useAuthAxios } from "@/config/auth-axios";
import { API_ROUTES } from "@/config/routes";
import { TContactDetails, TStatus, TToggleStatusArgs } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { KEYS } from "@/config/constants";

export default function ContactRequest() {
  const { _axios } = useAuthAxios();

  // Local state to store contacts data
  const [requests, setRequests] = useState<TContactDetails[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] =
    useState<TContactDetails | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false); // State to handle dialog visibility

  // Mutation for toggling status
  const { mutateAsync: toggleStatusMutateSync } = useMutation({
    mutationKey: KEYS.CONTACTS.CHANGE_STATUS,
    mutationFn: (updateData: TToggleStatusArgs) =>
      toggleStatus(updateData.id, updateData.status),
    onSuccess: async () => {
      await refetch(); // Refetch data after successful mutation
      toast("Status updated successfully");
    },
    onError: () => {
      toast("Failed to update status. Please try again.");
    },
  });

  // Mutation for deleting a contact
  const { mutateAsync: deleteMutateSync, isPending: deletePending } =
    useMutation({
      mutationKey: KEYS.CONTACTS.DELETE,
      mutationFn: deleteContact,
      onSuccess: async () => {
        await refetch();
        toast("Contact deleted successfully");
        setOpenDeleteDialog(false); // Close the delete dialog after success
      },
      onError: () => {
        toast("Failed to delete contact. Please try again.");
      },
    });

  // Fetching contact data using React Query
  const { refetch } = useQuery({
    queryKey: KEYS.CONTACTS.GET,
    queryFn: getContacts,
  });

  // Fetch contacts from API
  async function getContacts() {
    try {
      const response = await _axios.get(API_ROUTES.CONTACTS);


      const contacts = response.data.data || []; // Access the contacts data

      setRequests(contacts);
      return contacts;
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      return []; 
    }
  }

  // Handle contact status toggle
  async function toggleStatus(id: number, status: TStatus) {
    try {
      return await _axios.patch(`${API_ROUTES.CONTACTS}/${id}`, { status });
    } catch {
      throw new Error("Failed to toggle contact status");
    }
  }

  // Handle contact deletion
  async function deleteContact(id: number) {
    try {
      return await _axios.delete(`${API_ROUTES.CONTACTS}/${id}`);
    } catch {
      throw new Error("Failed to delete contact");
    }
  }

  // Handle view contact details
  function handleView(data: TContactDetails) {
    setSelectedContact(data);
    setIsViewDialogOpen(true); // Open the dialog when view is clicked
  }

  // Handle delete action
  function handleDelete(data: TContactDetails) {
    setSelectedContact(data);
    setOpenDeleteDialog(true); // Open delete confirmation dialog
  }

  // Handle status change
  async function handleStatusChange(id: number, newStatus: TStatus) {
    await toggleStatusMutateSync({ id, status: newStatus });
  }

  // Confirm delete
  function confirmDelete() {
    if (selectedContact) {
      deleteMutateSync(selectedContact.id);
    }
  }

  return (
    <div>
      <PageTitle
        title="Contact Requests"
        description="Manage inquiries from the website contact form"
      />

      <Card className="mt-8">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead> 
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    No contact requests available.
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{request.name}</div>
                    </TableCell>
                    <TableCell>
                      {request.phone || "No phone available"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusStyles[request.status]
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(request)}
                          className="h-8 w-8 text-amber-500 cursor-pointer"
                        >
                          <EyeIcon size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(request)}
                          className="h-8 w-8 text-red-500 cursor-pointer"
                        >
                          <Trash2Icon size={16} />
                        </Button>
                        {request.status !== "RESPONDED" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleStatusChange(request.id, "RESPONDED")
                            }
                            className="h-8 w-8 text-green-500 cursor-pointer"
                          >
                            <CheckCircle size={16} />
                          </Button>
                        )}
                        {request.status !== "CLOSED" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleStatusChange(request.id, "CLOSED")
                            }
                            className="h-8 w-8 text-gray-500 cursor-pointer"
                          >
                            <XCircle size={16} />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* View Contact Dialog */}
      {selectedContact && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-1">
                  {selectedContact.name}
                </h3>
                <div className="text-sm text-muted-foreground mb-2">
                  <div>Email: {selectedContact.email || "Not available"}</div>
                  <div>Phone: {selectedContact.phone || "Not available"}</div>
                </div>
                <div>
                  <span className="text-sm">Message:</span>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedContact.message || "No message available"}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contact? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deletePending}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
