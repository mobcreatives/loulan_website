"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Search, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Label,
  Switch,
} from "@/components";
import ImageCard from "./_components/image-card";

import {
  TAddGalleyData,
  TImageGalleryDetails,
  TUpdateGalleryArgs,
  TUpdateGalleryData,
} from "./types";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthAxios } from "@/config/auth-axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addGallerySchema, updateGallerySchema } from "./validator";
import { API_ROUTES } from "@/config/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";
import { toast } from "sonner";


// Add this type for paginated gallery response
type GalleryPaginatedResponse = {
  galleries: TImageGalleryDetails[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
};

export default function Gallery() {
  // hooks
  const isMobile = useIsMobile();
  const { _axios } = useAuthAxios();

  // states
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);
  const [currentImage, setCurrentImage] = useState<TImageGalleryDetails | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    handleSubmit: addHandleSubmit,
    register: addRegister,
    setValue: addSetValue,
    reset: addReset,
    formState: { },
  } = useForm<TAddGalleyData>({
    resolver: zodResolver(addGallerySchema),
    defaultValues: {
      isVisible: true
    }
  });

  const {
    handleSubmit: updateHandleSubmit,
    register: updateRegister,
    setValue: updateSetValue,
    reset: updateReset,
  } = useForm<TUpdateGalleryData>({
    resolver: zodResolver(updateGallerySchema),
  });

  const { data, refetch, isLoading } = useQuery<GalleryPaginatedResponse>({
    queryKey: [
      KEYS.GALLERY.GET,
      currentPage,
      searchQuery,
      showHidden,
      showFeatured
    ],
    queryFn: () => getGalleryImages(currentPage, itemsPerPage, searchQuery, showHidden, showFeatured),
    placeholderData: (prev) => prev,
  });

  const gallery = data?.galleries || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1 };

  const { mutateAsync: addMutateSync, isPending: addPending } = useMutation({
    mutationKey: [KEYS.GALLERY.ADD],
    mutationFn: addGallery,
    onSuccess: async () => {
      await refetch(); // Wait for refetch to complete
      setIsFormOpen(false);
      toast.success("Images added to the gallery successfully");
      addReset();
      setSelectedFiles([]);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Failed to add images to the gallery");
    },
  });

  const { mutateAsync: updateMutateSync, isPending: updatePending } =
    useMutation({
      mutationKey: KEYS.GALLERY.UPDATE,
      mutationFn: (updateData: TUpdateGalleryArgs) =>
        updateGallery(updateData.id, updateData.data),
      onSuccess: () => {
        refetch();
        setIsEditOpen(false);
        toast("Image updated successfully");
        setCurrentImage(null);
        updateReset();
      },
      onError: () => {
        toast("Fail to update image.");
      },
    });

  const { mutateAsync: deleteMutateSync } =
    useMutation({
      mutationKey: KEYS.GALLERY.DELETE,
      mutationFn: deleteGallery,
      onSuccess: () => {
        refetch();
        setCurrentImage(null);
        toast("Image deleted successfully");
      },
      onError: () => {
        toast("Fail to delete image.");
      },
    });

  const { mutateAsync: toggleVisibilityMutateSync } = useMutation({
    mutationKey: KEYS.GALLERY.TOGGLE_VISIBILITY,
    mutationFn: toggleVisibility,
    onSuccess: () => {
      refetch();
      toast("Image visibility updated successfully");
    },
    onError: () => {
      toast("Fail to update image visibility.");
    },
  });

  function handleEdit(data: TImageGalleryDetails) {
    setCurrentImage(data);
    setIsEditOpen(true);
  }

  function handleDelete(data: TImageGalleryDetails) {
    setCurrentImage(data);
    setIsDeleteOpen(true);
  }

  async function confirmDelete() {
    if (!currentImage) return;
    await deleteMutateSync(currentImage.id);
  }

  async function handleToggleVisibility(data: TImageGalleryDetails) {
    await toggleVisibilityMutateSync(data.id);
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    console.log("Selected files:", files); // Debug log
    setSelectedFiles(files);
    addSetValue("images", files, { shouldValidate: true });
  };

  const onAddSubmit = async (data: TAddGalleyData) => {
    console.log("Form submitted with data:", data); // Debug log
    if (!data.images || data.images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    try {
      await addMutateSync(data);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to submit form");
    }
  };

  async function onUpdateSubmit(data: TUpdateGalleryData) {
    if (!currentImage) return;
    await updateMutateSync({
      id: currentImage.id,
      data,
    });
  }

  useEffect(() => {
    if (currentImage) {
      updateReset({
        description: currentImage.description,
        isVisible: currentImage.isVisible,
      });
    }
  }, [currentImage, updateReset]);

  async function addGallery(data: TAddGalleyData) {
    console.log("Submitting data:", data); // Debug log
    try {
      const formData = new FormData();
      
      // Log the files being added
      console.log("Files to be added:", data.images);
      
      data.images.forEach((file, index) => {
        console.log(`Adding file ${index}:`, file.name); // Debug log
        formData.append(`files`, file);
      });
      
      if (data.description) {
        formData.append('description', data.description);
      }
      formData.append('isVisible', String(data.isVisible));

      // Log the FormData contents


      const response = await _axios.post(
        API_ROUTES.GALLERY,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error("Error in addGallery:", error);
      throw error;
    }
  }

  async function updateGallery(id: number, data: TUpdateGalleryData) {
    let updateData = {};
    if (data.image) {
      updateData = {
        ...updateData,
        imgUrl: data.image[0],
      };
    }
    try {
      const response = await _axios.patch(
        `${API_ROUTES.GALLERY}/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch {
      throw new Error("Fail to update image in gallery");
    }
  }

  async function deleteGallery(id: number) {
    try {
      return await _axios.delete(`${API_ROUTES.GALLERY}/${id}`);
    } catch {
      throw new Error("Fail to delete image from gallery");
    }
  }

  async function toggleVisibility(id: number) {
    try {
      const response = await _axios.patch(
        `${API_ROUTES.GALLERY}/${id}/visibility`
      );
      return response.data;
    } catch {
      throw new Error("Fail to update image visibility");
    }
  }

  async function getGalleryImages(
    page = 1,
    limit = 10,
    search = "",
    hidden = false,
    featured = false
  ): Promise<GalleryPaginatedResponse> {
    try {
      let params = `?page=${page}&limit=${limit}`;
      if (search) params += `&search=${encodeURIComponent(search)}`;
      if (hidden) params += `&isVisible=false`;
      if (featured) params += `&isVisible=true`;
      const response = await _axios.get(`${API_ROUTES.GALLERY}${params}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      throw new Error("Failed to fetch images.");
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gallery</h1>
          <p className="text-gray-500">Manage the images shown on your restaurant&apos;s website</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="cursor-pointer text-black"
          variant="outline"
        >
          <Plus size={16} />
          Add Image
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
            placeholder="Search gallery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center space-x-2">
            <Button
              variant={showHidden ? "outline" : "secondary"} // Changed gold to a valid variant
              onClick={() => {
                setShowHidden(true);
                setShowFeatured(false);
              }}
            >
              Show Hidden Images
            </Button>
            <Button
              variant={showFeatured ? "outline" : "secondary"} // Changed gold to a valid variant
              onClick={() => {
                setShowFeatured(true);
                setShowHidden(false);
              }}
            >
              Show Featured Images
            </Button>
            <Button
              variant={!showFeatured && !showHidden ? "outline" : "secondary"} // Changed gold to a valid variant
              onClick={() => {
                setShowFeatured(false);
                setShowHidden(false);
              }}
            >
              Show All Images
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center p-12">
            <p className="text-gray-500">Loading gallery...</p>
          </div>
        ) : gallery.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No images found</p>
            <Button onClick={() => setIsFormOpen(true)} className="cursor-pointer">
              <Plus size={16} />
              Add Your First Image
            </Button>
          </div>
        ) : (
          <>
            {gallery.map((image) => (
              <ImageCard
                key={image.id}
                data={image}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleVisibility={handleToggleVisibility}
              />
            ))}
          </>
        )}
      </div>

      {/* Pagination (always show) */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={pagination.page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={pagination.page === page ? "default" : "outline"}
            onClick={() => setCurrentPage(page)}
            className="w-8 h-8"
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
          disabled={pagination.page === pagination.totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Add Image Form */}
      <Drawer open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DrawerContent
          className={
            isMobile
              ? "max-h-[90vh]"
              : "max-h-[85vh] max-w-2xl mx-auto rounded-t-lg"
          }
        >
          <form onSubmit={addHandleSubmit(onAddSubmit)} noValidate>
            <DrawerHeader className="px-4 sm:px-6 py-0">
              <div className="flex items-center justify-between">
                <DrawerTitle>Add Images to Gallery</DrawerTitle>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => {
                      setSelectedFiles([]);
                      addReset();
                    }}
                  >
                    <X size={16} />
                  </Button>
                </DrawerClose>
              </div>
              <DrawerDescription>{`Manage images for your restaurant&apos;s gallery`}</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 sm:px-6 pb-4 overflow-y-auto">
              <div className="space-y-4 py-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium">
                      Images (Select multiple)
                    </label>
                    <input
                      id="image"
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full p-2 border rounded-md"
                      onChange={handleFileSelect}
                    />
                    {selectedFiles.length > 0 && (
                      <p className="text-sm text-gray-500">
                        {selectedFiles.length} image(s) selected
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description (Optional)
                    </label>
                    <input
                      id="description"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter a description for the images"
                      {...addRegister("description")}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isVisible"
                      name="isVisible"
                      defaultChecked={true}
                      onCheckedChange={(isChecked) =>
                        addSetValue("isVisible", isChecked)
                      }
                    />
                    <Label htmlFor="isVisible">Visible on website</Label>
                  </div>
                </div>
              </div>
            </div>
            <DrawerFooter className="px-4 sm:px-6 border-t">
              <div className="flex justify-end gap-2">
                <DrawerClose asChild>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedFiles([]);
                      addReset();
                    }}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={addPending || selectedFiles.length === 0}
                  onClick={() => console.log("Submit button clicked")}
                >
                  {addPending ? "Saving..." : "Add Images"}
                </Button>
              </div>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>

      {/* Update Image Form */}
      <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DrawerContent
          className={
            isMobile
              ? "max-h-[90vh]"
              : "max-h-[85vh] max-w-2xl mx-auto rounded-t-lg"
          }
        >
          <form onSubmit={updateHandleSubmit(onUpdateSubmit)}>
            <DrawerHeader className="px-4 sm:px-6 py-0">
              <div className="flex items-center justify-between">
                <DrawerTitle>Edit Image</DrawerTitle>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                  >
                    <X size={16} />
                  </Button>
                </DrawerClose>
              </div>
              <DrawerDescription>Update your gallery image</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 sm:px-6 pb-4 overflow-y-auto">
              <div className="space-y-4 py-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium">
                      Image
                    </label>
                    <input
                      id="image"
                      type="file"
                      className="w-full p-2 border rounded-md"
                      onChange={(e) => {
                        if (!e.target.files) return;
                        updateSetValue("image", Array.from(e.target.files));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="caption" className="text-sm font-medium">
                      Caption
                    </label>
                    <input
                      id="caption"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue={currentImage?.description ?? ""}
                      placeholder="Describe this image"
                      {...updateRegister("description")}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isVisible"
                      name="isVisible"
                      checked={currentImage?.isVisible ?? false}
                      onCheckedChange={(isChecked) =>
                        updateSetValue("isVisible", isChecked)
                      }
                    />
                    <Label htmlFor="isVisible">Visible on website</Label>
                  </div>
                </div>
              </div>
            </div>
            <DrawerFooter className="px-4 sm:px-6 border-t">
              <div className="flex justify-end gap-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={updatePending}
                >
                  {updatePending ? "Updating..." : "Update Image"}
                </Button>
              </div>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>

      {/* Confirm Delete Image */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        Do you want to delete this image permanently from the gallery?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>
        <Button variant="outline">Cancel</Button>
      </AlertDialogCancel>
      <AlertDialogAction>
        <Button
          className="btn-gold"
          onClick={async () => {
            if (currentImage) {
              await confirmDelete();
              setIsDeleteOpen(false);
            }
          }}
        >
          Confirm
        </Button>
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  );
}
