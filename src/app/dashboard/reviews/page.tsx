"use client";

import { useEffect, useState } from "react";
import { Star, Eye, Edit, Trash2, Plus, Loader2 } from "lucide-react";

import { useEffect, useState } from "react";
import { Star, Eye, Edit, Trash2, Plus, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Switch,
  Textarea,
  Label,
  Input,
  Card,
  Button,
  PageTitle,
} from "@/components";
import { DialogDescription } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "./validator";
import {
  TAddReviewData,
  TReviewDetails,
  TUpdateReviewArgs,
  TUpdateReviewData,
} from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/config/routes";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";
import { TResponse } from "@/global/types";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "./validator";
import {
  TAddReviewData,
  TReviewDetails,
  TUpdateReviewArgs,
  TUpdateReviewData,
} from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/config/routes";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";
import { TResponse } from "@/global/types";
import { cn } from "@/lib/utils";

export default function Reviews() {
  const { _axios } = useAuthAxios();
  // states
  const { _axios } = useAuthAxios();
  // states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<TReviewDetails>(
    {} as TReviewDetails
  );

  // forms
  const {
    register: addRegister,
    handleSubmit: addHandleSubmit,
    reset: resetAddReview,
  } = useForm<TAddReviewData>({
    resolver: zodResolver(reviewSchema),
  });

  const {
    register: updateRegister,
    handleSubmit: updateHandleSubmit,
    reset: resetUpdateReview,
  } = useForm<TUpdateReviewData>({
    resolver: zodResolver(reviewSchema),
  });

  // tanstack query
  const { mutateAsync: createPreviewSync, isPending: isCreatingReview } =
    useMutation({
      mutationKey: KEYS.REVIEWS.ADD,
      mutationFn: createReview,
      onSuccess: async () => {
        refetch();
        toast.success("Review added successfully");
        resetAddReview();
        setIsAddDialogOpen(false);
      },
      onError: () => {
        toast.error("Failed to add review");
      },
    });

  const { mutateAsync: updateReviewSync, isPending: isUpdatingReview } =
    useMutation({
      mutationKey: KEYS.REVIEWS.UPDATE,
      mutationFn: (data: TUpdateReviewArgs) => updateReview(data.id, data.data),
      onSuccess: async () => {
        refetch();
        toast.success("Review updated successfully");
        setIsEditDialogOpen(false);
      },
      onError: () => {
        toast.error("Failed to update review");
      },
    });

  const { mutateAsync: deleteReviewSync, isPending: isDeletingReview } =
    useMutation({
      mutationKey: KEYS.REVIEWS.DELETE,
      mutationFn: (id: number) => deleteReview(id),
      onSuccess: async () => {
        refetch();
        toast.success("Review deleted successfully");
        setIsDeleteDialogOpen(false);
      },
      onError: () => {
        toast.error("Failed to delete review");
      },
    });

  const { mutateAsync: toggleFeaturedReview, isPending: isTogglingFeatured } =
    useMutation({
      mutationKey: KEYS.REVIEWS.FEATURED,
      mutationFn: toggleFeatured,
      onSuccess: async () => {
        refetch();
        toast.success("Review featured toggled successfully");
      },
      onError: () => {
        toast.error("Failed to toggle featured review");
      },
    });

  const { data: reviews, refetch } = useQuery({
    queryKey: KEYS.REVIEWS.GET,
    queryFn: getPreviews,
  });
  // handlers
  // API call handlers
  async function createReview(data: TAddReviewData) {
    try {
      const response = await _axios.post(API_ROUTES.REVIEW, data);
      return response.data;
    } catch {
      throw new Error("There was a problem creating your review");
    }
  }
  async function updateReview(id: number, data: Partial<TUpdateReviewData>) {
    try {
      const response = await _axios.patch(`${API_ROUTES.REVIEW}/${id}`, data);
      return response.data;
    } catch {
      throw new Error("There was a problem creating your review");
    }
  }
  async function deleteReview(id: number) {
    try {
      const response = await _axios.delete(`${API_ROUTES.REVIEW}/${id}`);
      return response.data;
    } catch {
      throw new Error("There was a problem deleting your review");
    }
  }

  async function getPreviews() {
    try {
      const response = await _axios.get<TResponse<TReviewDetails, "data">>(
        API_ROUTES.REVIEW
      );
      return response.data.data;
    } catch {
      throw new Error("There was a problem getting your review");
    }
  }

  async function toggleFeatured(id: number) {
    try {
      const response = await _axios.patch(`${API_ROUTES.REVIEW}/${id}/feature`);
      return response.data;
    } catch (error) {
      console.error("Error toggling featured review:", error);
      throw new Error("There was a problem toggling featured review");
    }
  }

  // basic handlers
  async function handleFeaturedToggle(data: TReviewDetails) {
    await toggleFeaturedReview(data.id);
  }

  async function handleEdit(review: TReviewDetails) {
    setCurrentReview(review);
    setIsEditDialogOpen(true);
  }
  }

  function handleDelete(review: TReviewDetails) {
    setCurrentReview(review);
  function handleDelete(review: TReviewDetails) {
    setCurrentReview(review);
    setIsDeleteDialogOpen(true);
  }
  }

  function confirmDelete() {
    if (!isDeleteDialogOpen) return;
    deleteReviewSync(currentReview.id);
  }

  function handleView(data: TReviewDetails) {
    setCurrentReview(data);
    setIsViewDialogOpen(true);
  }
  }

  async function handleAdd() {
  async function handleAdd() {
    setIsAddDialogOpen(true);
  }

  async function handleSubmitAdd(data: TAddReviewData) {
    await createPreviewSync(data);
  }

  async function handleSubmitEdit(data: TUpdateReviewData) {
    await updateReviewSync({
      id: currentReview.id,
      data,
    });
  }

  // resets the form values for update
  useEffect(() => {
    if (Object.keys(currentReview).length <= 0) return;
    resetUpdateReview({
      reviewerName: currentReview.reviewerName,
      stars: currentReview.stars,
      comment: currentReview.comment,
    });
  }, [currentReview, resetUpdateReview]);
  }

  async function handleSubmitAdd(data: TAddReviewData) {
    await createPreviewSync(data);
  }

  async function handleSubmitEdit(data: TUpdateReviewData) {
    await updateReviewSync({
      id: currentReview.id,
      data,
    });
  }

  // resets the form values for update
  useEffect(() => {
    if (Object.keys(currentReview).length <= 0) return;
    resetUpdateReview({
      reviewerName: currentReview.reviewerName,
      stars: currentReview.stars,
      comment: currentReview.comment,
    });
  }, [currentReview, resetUpdateReview]);
  return (
    <div>
      <PageTitle
        title="Customer Reviews"
        description="Manage and highlight customer feedback about your restaurant"
        actions={
          <Button
            onClick={handleAdd}
            className="btn-gold text-black cursor-pointer"
          >
          <Button
            onClick={handleAdd}
            className="btn-gold text-black cursor-pointer"
          >
            <Plus size={16} />
            Add Review
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {Array.isArray(reviews) &&
          reviews.map((review) => (
            <Card
              key={review.id}
              className={cn(`p-6`, review.isFeatured && "border-amber-500")}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium capitalize">
                    {review.reviewerName}
                  </h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={`star_${_}${i}`}
                        size={16}
                        className={
                          i < review.stars
                            ? "fill-amber-500 text-amber-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFeaturedToggle(review)}
                    disabled={isTogglingFeatured}
                    className={cn(
                      `px-3 text-xs cursor-pointer`,
                      review.isFeatured
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-800"
                    )}
                  >
                    {review.isFeatured ? "Featured" : "Not Featured"}
                  </Button>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleView(review)}
                  className="h-8 w-8 text-amber-500 cursor-pointer"
                >
                  <Eye size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(review)}
                  className="h-8 w-8 text-amber-500 cursor-pointer"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(review)}
                  className="h-8 w-8 text-red-500 cursor-pointer"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))}
        {Array.isArray(reviews) &&
          reviews.map((review) => (
            <Card
              key={review.id}
              className={cn(`p-6`, review.isFeatured && "border-amber-500")}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium capitalize">
                    {review.reviewerName}
                  </h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={`star_${_}${i}`}
                        size={16}
                        className={
                          i < review.stars
                            ? "fill-amber-500 text-amber-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFeaturedToggle(review)}
                    disabled={isTogglingFeatured}
                    className={cn(
                      `px-3 text-xs cursor-pointer`,
                      review.isFeatured
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-800"
                    )}
                  >
                    {review.isFeatured ? "Featured" : "Not Featured"}
                  </Button>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleView(review)}
                  className="h-8 w-8 text-amber-500 cursor-pointer"
                >
                  <Eye size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(review)}
                  className="h-8 w-8 text-amber-500 cursor-pointer"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(review)}
                  className="h-8 w-8 text-red-500 cursor-pointer"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </Card>
          ))}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={addHandleSubmit(handleSubmitAdd)}>
            <DialogHeader className="px-0">
              <div className="flex items-center justify-between">
                <DialogTitle>Add New Review</DialogTitle>
              </div>
              <DialogDescription>
                Add a new customer review to your collection
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Enter customer name"
                  {...addRegister("reviewerName")}
                  required
                />
              </div>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={addHandleSubmit(handleSubmitAdd)}>
            <DialogHeader className="px-0">
              <div className="flex items-center justify-between">
                <DialogTitle>Add New Review</DialogTitle>
              </div>
              <DialogDescription>
                Add a new customer review to your collection
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Enter customer name"
                  {...addRegister("reviewerName")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  {...addRegister("stars")}
                  defaultValue="5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Review Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Enter the review content"
                  className="min-h-[100px]"
                  {...addRegister("comment")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  {...addRegister("stars")}
                  defaultValue="5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Review Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Enter the review content"
                  className="min-h-[100px]"
                  {...addRegister("comment")}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  name="isFeatured"
                  // onCheckedChange={(isChecked) => setValue("", isChecked)}
                />
                <Label htmlFor="isFeatured">Feature this review</Label>
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
                  disabled={isCreatingReview}
                >
                  {isCreatingReview ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isCreatingReview ? "Saving..." : "Add Review"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Add Review Dialog */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  name="isFeatured"
                  // onCheckedChange={(isChecked) => setValue("", isChecked)}
                />
                <Label htmlFor="isFeatured">Feature this review</Label>
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
                  disabled={isCreatingReview}
                >
                  {isCreatingReview ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isCreatingReview ? "Saving..." : "Add Review"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Add Review Dialog */}
      {/* Edit Review Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={updateHandleSubmit(handleSubmitEdit)}>
            <DialogHeader className="px-0">
              <div className="flex items-center justify-between">
                <DialogTitle>Edit Review</DialogTitle>
              </div>
              <DialogDescription>
                Make changes to this customer review
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Enter customer name"
                  {...updateRegister("reviewerName")}
                  required
                />
              </div>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={updateHandleSubmit(handleSubmitEdit)}>
            <DialogHeader className="px-0">
              <div className="flex items-center justify-between">
                <DialogTitle>Edit Review</DialogTitle>
              </div>
              <DialogDescription>
                Make changes to this customer review
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Enter customer name"
                  {...updateRegister("reviewerName")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  {...updateRegister("stars")}
                  defaultValue="5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Review Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Enter the review content"
                  className="min-h-[100px]"
                  {...updateRegister("comment")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  {...updateRegister("stars")}
                  defaultValue="5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Review Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Enter the review content"
                  className="min-h-[100px]"
                  {...updateRegister("comment")}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  name="isFeatured"
                  // onCheckedChange={(isChecked) => setValue("", isChecked)}
                />
                <Label htmlFor="isFeatured">Feature this review</Label>
              </div>
            </div>
            <DialogFooter className="px-0 border-t pt-4">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-gold"
                  disabled={isUpdatingReview}
                >
                  {isUpdatingReview ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isUpdatingReview ? "Saving..." : "Update Review"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  name="isFeatured"
                  // onCheckedChange={(isChecked) => setValue("", isChecked)}
                />
                <Label htmlFor="isFeatured">Feature this review</Label>
              </div>
            </div>
            <DialogFooter className="px-0 border-t pt-4">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-gold"
                  disabled={isUpdatingReview}
                >
                  {isUpdatingReview ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isUpdatingReview ? "Saving..." : "Update Review"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Review Dialog */}
      {currentReview && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review Details</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-1">
                  {currentReview.reviewerName}
                  {currentReview.reviewerName}
                </h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star_${_}${i}`}
                      key={`star_${_}${i}`}
                      size={16}
                      className={
                        i < currentReview.stars
                        i < currentReview.stars
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(currentReview.createdAt).toLocaleDateString()}
                    {new Date(currentReview.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div
                  className={`inline-block px-2 py-1 rounded text-xs ${
                    currentReview.isFeatured
                      ? "bg-amber-100 text-amber-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {currentReview.isFeatured ? "Featured" : "Not Featured"}
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">
                {currentReview.comment}
                {currentReview.comment}
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the review from{" "}
              {currentReview?.reviewerName}. This action cannot be undone.
              {currentReview?.reviewerName}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
              disabled={isDeletingReview}
              disabled={isDeletingReview}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
