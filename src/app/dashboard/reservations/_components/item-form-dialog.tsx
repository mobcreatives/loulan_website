"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ItemFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  submitLabel?: string;
}

const ItemFormDialog = ({
  isOpen,
  onClose,
  title,
  description,
  onSubmit,
  children,
  submitLabel = "Save Changes",
}: ItemFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      const data: Record<string, any> = {};

      // Process form data
      formData.forEach((value, key) => {
        // Handle checkboxes
        if (
          key.startsWith("is") ||
          key === "isActive" ||
          key === "isFeatured"
        ) {
          data[key] = value === "on";
        }
        // Handle numeric fields
        else if (key === "price" || key === "rating") {
          data[key] = Number(value);
        }
        // Everything else is a string
        else {
          data[key] = value;
        }
      });

      onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
      toast("There was a problem saving your data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="px-0">
            <div className="flex items-center justify-between">
              <DialogTitle>{title}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X size={16} />
              </Button>
            </div>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="py-4">{children}</div>
          <DialogFooter className="px-0 border-t pt-4">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn-gold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isSubmitting ? "Saving..." : submitLabel}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemFormDialog;
