"use client";
import { useState } from "react";
import { Star, Eye, Edit, Trash2, Plus } from "lucide-react";
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
import {} from "@/components/ui/dialog";
import { toast } from "sonner";
import { mockReviews } from "./data";
import ItemFormDialog from "./_components/item-form-dialog";

export default function Reviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentReview, setCurrentReview] = useState<any>(null);

  const handleFeaturedToggle = (id: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? { ...review, isFeatured: !review.isFeatured }
          : review
      )
    );

    const review = reviews.find((r) => r.id === id);
    toast(
      `"${review?.customerName}'s review" has been ${
        review?.isFeatured ? "removed from" : "added to"
      } featured reviews.`
    );
  };

  const handleEdit = (id: string) => {
    const reviewToEdit = reviews.find((review) => review.id === id);
    setCurrentReview(reviewToEdit);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const reviewToDelete = reviews.find((review) => review.id === id);
    setCurrentReview(reviewToDelete);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentReview) {
      setReviews(reviews.filter((review) => review.id !== currentReview.id));
      toast(`"${currentReview.customerName}'s review" has been deleted.`);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleView = (id: string) => {
    const reviewToView = reviews.find((review) => review.id === id);
    setCurrentReview(reviewToView);
    setIsViewDialogOpen(true);
  };

  const handleAdd = () => {
    setCurrentReview({
      id: `${reviews.length + 1}`,
      customerName: "",
      rating: 5,
      date: new Date().toISOString().split("T")[0],
      content: "",
      isFeatured: false,
    });
    setIsAddDialogOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitAdd = (data: any) => {
    const newReview = {
      ...currentReview,
      ...data,
      isFeatured: data.isFeatured || false,
    };

    setReviews([...reviews, newReview]);
    setIsAddDialogOpen(false);

    toast(`"${data.customerName}'s review" has been added successfully.`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitEdit = (data: any) => {
    setReviews(
      reviews.map((review) =>
        review.id === currentReview.id ? { ...review, ...data } : review
      )
    );
    setIsEditDialogOpen(false);

    toast(`"${data.customerName}'s review" has been updated successfully.`);
  };

  return (
    <div>
      <PageTitle
        title="Customer Reviews"
        description="Manage and highlight customer feedback about your restaurant"
        actions={
          <Button onClick={handleAdd} className="btn-gold">
            <Plus size={16} />
            Add Review
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className={`p-6 ${review.isFeatured ? "border-amber-500" : ""}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">{review.customerName}</h3>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFeaturedToggle(review.id)}
                  className={`px-3 text-xs ${
                    review.isFeatured
                      ? "bg-amber-100 text-amber-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {review.isFeatured ? "Featured" : "Not Featured"}
                </Button>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{review.content}</p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleView(review.id)}
                className="h-8 w-8 text-amber-500"
              >
                <Eye size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(review.id)}
                className="h-8 w-8 text-amber-500"
              >
                <Edit size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(review.id)}
                className="h-8 w-8 text-red-500"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Review Dialog */}
      <ItemFormDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        title="Add New Review"
        description="Add a new customer review to your collection"
        submitLabel="Add Review"
        onSubmit={handleSubmitAdd}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              name="customerName"
              placeholder="Enter customer name"
              required
            />
          </div>

          <div>
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              min="1"
              max="5"
              defaultValue="5"
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
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
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="isFeatured" name="isFeatured" />
            <Label htmlFor="isFeatured">Feature this review</Label>
          </div>
        </div>
      </ItemFormDialog>

      {/* Edit Review Dialog */}
      {currentReview && (
        <ItemFormDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          title="Edit Review"
          description="Make changes to this customer review"
          submitLabel="Update Review"
          onSubmit={handleSubmitEdit}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                name="customerName"
                defaultValue={currentReview.customerName}
                required
              />
            </div>

            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                defaultValue={currentReview.rating}
                required
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={currentReview.date}
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Review Content</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={currentReview.content}
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isFeatured"
                name="isFeatured"
                defaultChecked={currentReview.isFeatured}
              />
              <Label htmlFor="isFeatured">Feature this review</Label>
            </div>
          </div>
        </ItemFormDialog>
      )}

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
                  {currentReview.customerName}
                </h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < currentReview.rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(currentReview.date).toLocaleDateString()}
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
                {currentReview.content}
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
              {currentReview?.customerName}. This action cannot be undone.
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
    </div>
  );
}
