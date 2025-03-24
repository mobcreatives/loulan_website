"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface ItemFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  submitLabel?: string;
}

export const ItemFormDrawer = ({
  isOpen,
  onClose,
  title,
  description,
  onSubmit,
  children,
  submitLabel = "Save Changes",
}: ItemFormDrawerProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(formRef.current as HTMLFormElement);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent
        className={
          isMobile
            ? "max-h-[90vh]"
            : "max-h-[85vh] max-w-2xl mx-auto rounded-t-lg"
        }
      >
        <form ref={formRef} onSubmit={handleSubmit}>
          <DrawerHeader className="px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X size={16} />
                </Button>
              </DrawerClose>
            </div>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          <div className="px-4 sm:px-6 pb-4 overflow-y-auto">{children}</div>
          <DrawerFooter className="px-4 sm:px-6 border-t">
            <div className="flex justify-end gap-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button
                type="submit"
                className="btn-gold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : submitLabel}
              </Button>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default ItemFormDrawer;
