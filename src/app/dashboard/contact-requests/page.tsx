"use client";

import { useState } from "react";
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
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components";
import { mockContactRequests, statusStyles } from "./data";
import { useAuthAxios } from "@/config/auth-axios";
import { API_ROUTES } from "@/config/routes";
import { TContactDetails, TStatus, TToggleStatusArgs } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { KEYS } from "@/config/constants";

export default function ContactRequest() {
  const { _axios } = useAuthAxios();

  const [requests] = useState<TContactDetails[]>(mockContactRequests);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] =
    useState<TContactDetails | null>(null);
  const { mutateAsync: toggleStatusMutateSync } = useMutation({
    mutationKey: KEYS.CONTACTS.CHANGE_STATUS,
    mutationFn: (updateData: TToggleStatusArgs) =>
      toggleStatus(updateData.id, updateData.status),
    onSuccess: async () => {
      await refetch();
      toast("Food item updated successfully");
    },
    onError: () => {
      toast("Failed to update food item. Please try again.");
    },
  });
  const { mutateAsync: deleteMutateSync, isPending: deletePending } =
    useMutation({
      mutationKey: KEYS.FEATURED_FOOD.DELETE,
      mutationFn: deleteFood,
      onSuccess: async () => {
        await refetch();
        toast("Food item deleted successfully");
        setOpenDeleteDialog(false);
      },
      onError: () => {
        toast("Failed to delete food item. Please try again.");
      },
    });
  const { refetch } = useQuery({
    queryKey: KEYS.CONTACTS.GET,
    queryFn: getContacts,
  });

  function handleView(data: TContactDetails) {
    setSelectedContact(data);
  }
  async function getContacts() {
    try {
      const response = await _axios.get(API_ROUTES.CONTACTS);
      return response.data.foodItems;
    } catch {
      throw new Error("Failed to fetch food items");
    }
  }
  async function deleteFood(id: number) {
    try {
      return await _axios.delete(`${API_ROUTES.FOODS}/${id}`);
    } catch {
      throw new Error("Failed to delete food item");
    }
  }
  async function toggleStatus(id: number, status: TStatus) {
    try {
      return await _axios.patch(`${API_ROUTES.FOODS}/${id}`, { status });
    } catch {
      throw new Error("Failed to toggle featured");
    }
  }

  function handleDelete(data: TContactDetails) {
    setSelectedContact(data);
    setOpenDeleteDialog(true);
  }

  async function handleStatusChange(id: number, newStatus: TStatus) {
    await toggleStatusMutateSync({ id, status: newStatus });
  }

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
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {request.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusStyles[
                          request.status as keyof typeof statusStyles
                        ]
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
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
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
