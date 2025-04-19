"use client";

import { useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";
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
  PageTitle,
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
import { TResponse } from "@/global/types";

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

  const {
    handleSubmit: addHandleSubmit,
    register: addRegister,
    setValue: addSetValue,
    reset: addReset,
  } = useForm<TAddGalleyData>({
    resolver: zodResolver(addGallerySchema),
  });

  const {
    handleSubmit: updateHandleSubmit,
    register: updateRegister,
    setValue: updateSetValue,
    reset: updateReset,
  } = useForm<TUpdateGalleryData>({
    resolver: zodResolver(updateGallerySchema),
  });

  const { mutateAsync: addMutateSync, isPending: addPending } = useMutation({
    mutationKey: KEYS.GALLERY.ADD,
    mutationFn: addGallery,
    onSuccess: () => {
      refetch();
      setIsFormOpen(false);
      toast("Image added to the gallery successfully");
      addReset();
    },
    onError: () => {
      toast("Fail to add image to the gallery.");
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

  const { data: gallery, refetch } = useQuery({
    queryKey: KEYS.GALLERY.GET,
    queryFn: getGalleryImages,
  });

  // Dynamic filtering based on visibility and featured states
  const filteredImages = gallery?.filter((image) => {
    const matchesSearch = image.description
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesVisibility = showFeatured
      ? image.isVisible === true // Show featured images
      : showHidden
      ? image.isVisible === false // Show hidden images
      : true; // Show all images when neither is selected

    return matchesSearch && matchesVisibility;
  });

  async function addGallery(data: TAddGalleyData) {
    try {
      const response = await _axios.post(
        API_ROUTES.GALLERY,
        {
          imgUrl: data.image[0],
          description: data.description,
          iseVisible: data.isVisible,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch {
      throw new Error("Fail to add image to gallery");
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

  async function getGalleryImages() {
    try {
      const response = await _axios.get<
        TResponse<TImageGalleryDetails, "galleries">
      >(API_ROUTES.GALLERY);
      return response.data.galleries;
    } catch {
      throw new Error("Fail to fetch images.");
    }
  }

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

  async function onAddSubmit(data: TAddGalleyData) {
    await addMutateSync(data);
  }

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

  return (
    <div>
      <PageTitle
        title="Gallery"
        description="Manage the images shown on your restaurant's website"
        actions={
          <Button
            onClick={() => setIsFormOpen(true)}
            className="cursor-pointer text-black"
            variant="outline" // Change to outline or another valid variant
          >
            <Plus size={16} />
            Add Image
          </Button>
        }
      />

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
        {filteredImages?.map((image) => (
          <ImageCard
            key={image.id}
            data={image}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleVisibility={handleToggleVisibility}
          />
        ))}

        {filteredImages?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No images found</p>
            <Button onClick={() => setIsFormOpen(true)} className="cursor-pointer">
              <Plus size={16} />
              Add Your First Image
            </Button>
          </div>
        )}
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
          <form onSubmit={addHandleSubmit(onAddSubmit)}>
            <DrawerHeader className="px-4 sm:px-6 py-0">
              <div className="flex items-center justify-between">
                <DrawerTitle>Add Image to Gallery</DrawerTitle>
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
              <DrawerDescription>{`Manage images for your restaurant's gallery`}</DrawerDescription>
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
                        addSetValue("image", Array.from(e.target.files));
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
                    <Label htmlFor="isFeatured">Visible on website</Label>
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
                  disabled={addPending}
                >
                  {addPending ? "Saving..." : "Add Image"}
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
