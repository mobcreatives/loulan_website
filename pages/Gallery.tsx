
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageTitle from '@/components/ui/PageTitle';
import ImageCard from '@/components/gallery/ImageCard';
import ItemFormDrawer from '@/components/shared/ItemFormDrawer';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock gallery data
const mockGalleryImages = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    caption: 'Elegant dining area with ambient lighting',
    isVisible: true
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    caption: 'Gourmet dish prepared by our executive chef',
    isVisible: true
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    caption: 'Our selection of fine wines',
    isVisible: false
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    caption: 'Private dining experience',
    isVisible: true
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    caption: 'Weekend brunch special',
    isVisible: true
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    caption: 'Outdoor seating area',
    isVisible: false
  }
];

const Gallery = () => {
  const [images, setImages] = useState(mockGalleryImages);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const { toast } = useToast();

  const filteredImages = images.filter(image => {
    const matchesSearch = image.caption.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVisibility = showHidden ? true : image.isVisible;
    return matchesSearch && matchesVisibility;
  });

  const handleAdd = () => {
    setCurrentImage(null);
    setIsFormOpen(true);
  };

  const handleEdit = (id: string) => {
    const imageToEdit = images.find(image => image.id === id);
    if (imageToEdit) {
      setCurrentImage(imageToEdit);
      setIsFormOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setImages(images.filter(image => image.id !== deleteId));
      toast({
        title: "Image Deleted",
        description: "The image has been removed from the gallery.",
        variant: "default",
      });
      setDeleteId(null);
    }
  };

  const handleToggleVisibility = (id: string) => {
    setImages(images.map(image => 
      image.id === id ? { ...image, isVisible: !image.isVisible } : image
    ));
    
    const image = images.find(img => img.id === id);
    toast({
      title: image?.isVisible ? "Image Hidden" : "Image Visible",
      description: image?.isVisible 
        ? "The image has been hidden from public view." 
        : "The image is now visible to the public.",
      variant: "default",
    });
  };

  const handleFormSubmit = (data: any) => {
    if (currentImage) {
      // Edit existing
      setImages(images.map(image => 
        image.id === currentImage.id ? { ...image, ...data } : image
      ));
      toast({
        title: "Image Updated",
        description: "The gallery image has been updated successfully.",
        variant: "default",
      });
    } else {
      // Add new
      const newImage = {
        id: Date.now().toString(),
        ...data,
        isVisible: data.isVisible || false
      };
      setImages([...images, newImage]);
      toast({
        title: "Image Added",
        description: "The new image has been added to the gallery.",
        variant: "default",
      });
    }
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout>
      <PageTitle
        title="Gallery"
        description="Manage the images shown on your restaurant's website"
        actions={
          <Button onClick={handleAdd} className="btn-gold">
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
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 gold-focus-ring"
            placeholder="Search gallery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center space-x-2">
            <input 
              id="showHidden" 
              type="checkbox" 
              className="gold-focus-ring rounded"
              checked={showHidden}
              onChange={() => setShowHidden(!showHidden)}
            />
            <label htmlFor="showHidden" className="text-sm font-medium">Show Hidden Images</label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map(image => (
          <ImageCard
            key={image.id}
            id={image.id}
            imageUrl={image.imageUrl}
            caption={image.caption}
            isVisible={image.isVisible}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleVisibility={handleToggleVisibility}
          />
        ))}
        
        {filteredImages.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No images found</p>
            <Button onClick={handleAdd} className="btn-gold">
              <Plus size={16} />
              Add Your First Image
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Image Form */}
      <ItemFormDrawer
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}
        description="Manage images for your restaurant's gallery"
        onSubmit={handleFormSubmit}
        submitLabel={currentImage ? 'Save Changes' : 'Add Image'}
      >
        <div className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-sm font-medium">Image URL</label>
              <input 
                id="imageUrl" 
                type="text" 
                className="w-full p-2 border rounded-md gold-focus-ring"
                defaultValue={currentImage?.imageUrl || ''}
                placeholder="https://example.com/image.jpg" 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="caption" className="text-sm font-medium">Caption</label>
              <input 
                id="caption" 
                type="text" 
                className="w-full p-2 border rounded-md gold-focus-ring"
                defaultValue={currentImage?.caption || ''}
                placeholder="Describe this image" 
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                id="isVisible" 
                name="isVisible"
                type="checkbox" 
                className="gold-focus-ring rounded"
                defaultChecked={currentImage ? currentImage.isVisible : true}
              />
              <label htmlFor="isVisible" className="text-sm font-medium">Visible on website</label>
            </div>

            {currentImage?.imageUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={currentImage.imageUrl} 
                    alt={currentImage.caption} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </ItemFormDrawer>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image from the gallery? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Gallery;
