"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { mockPopupProducts } from "./data";
import { toast } from "sonner";
import { Button, PageTitle, ItemFormDrawer } from "@/components";
import FoodItemCard from "../food-items/_components/food-item-card";

export default function PopupProducts() {
  const [products, setProducts] = useState(mockPopupProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const handleEdit = (id: string) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      setCurrentProduct(productToEdit);
      setIsFormOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    setProducts(products.filter((product) => product.id !== id));
    toast("The popup product has been removed successfully.");
  };

  const handleAdd = () => {
    setCurrentProduct(null); // Reset to null for adding new
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (currentProduct) {
      // Edit existing
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id ? { ...product, ...data } : product
        )
      );
      toast("Your changes have been saved successfully.");
    } else {
      // Add new
      const newProduct = {
        id: Date.now().toString(),
        ...data,
        isPopup: true,
      };
      setProducts([...products, newProduct]);
      toast("New popup product has been added successfully.");
    }
    setIsFormOpen(false);
  };

  return (
    <div>
      <PageTitle
        title="Popup Products"
        description="Manage special promotions and limited-time menu items"
        actions={
          <Button onClick={handleAdd} className="btn-gold cursor-pointer">
            <Plus size={16} />
            Add Popup Product
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <FoodItemCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            category={product.category}
            imageUrl={product.imageUrl}
            isAvailable={product.isActive}
            isFeatured={false}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleFeatured={() => {}}
          />
        ))}
      </div>

      <ItemFormDrawer
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentProduct ? "Edit Popup Product" : "Add New Popup Product"}
        description="Fill in the details for this limited time menu item"
        onSubmit={handleFormSubmit}
        submitLabel={currentProduct ? "Save Changes" : "Add Product"}
      >
        <div className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Product Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-2 border rounded-md gold-focus-ring"
                defaultValue={currentProduct?.name || ""}
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                className="w-full p-2 border rounded-md gold-focus-ring min-h-[100px]"
                defaultValue={currentProduct?.description || ""}
                placeholder="Describe your product"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  className="w-full p-2 border rounded-md gold-focus-ring"
                  defaultValue={currentProduct?.price || ""}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full p-2 border rounded-md gold-focus-ring"
                  defaultValue={currentProduct?.category || ""}
                >
                  <option value="">Select category</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Appetizers">Appetizers</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Seafood">Seafood</option>
                  <option value="Beverages">Beverages</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL
              </label>
              <input
                id="image"
                type="text"
                className="w-full p-2 border rounded-md gold-focus-ring"
                defaultValue={currentProduct?.imageUrl || "/placeholder.svg"}
                placeholder="Enter image URL"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="isActive"
                type="checkbox"
                className="gold-focus-ring rounded"
                defaultChecked={currentProduct ? currentProduct.isActive : true}
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Active
              </label>
            </div>
          </div>
        </div>
      </ItemFormDrawer>
    </div>
  );
}
