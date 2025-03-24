"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { PageTitle } from "@/components";
import FoodItemCard from "./_components/food-item-card";
const initialFoodItems = [
  {
    id: "1",
    name: "Filet Mignon",
    price: 42.99,
    description:
      "Premium cut beef tenderloin, served with roasted vegetables and red wine reduction.",
    category: "Main Dishes",
    isFeatured: true,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "2",
    name: "Truffle Risotto",
    price: 28.99,
    description:
      "Creamy Arborio rice with wild mushrooms, finished with truffle oil and parmesan.",
    category: "Main Dishes",
    isFeatured: false,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1633436375743-b1e249fa9bf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "3",
    name: "Lobster Bisque",
    price: 16.99,
    description:
      "Rich and creamy soup made with fresh lobster, finished with a touch of cognac.",
    category: "Appetizers",
    isFeatured: true,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1297&q=80",
  },
  {
    id: "4",
    name: "Chocolate Soufflé",
    price: 12.99,
    description:
      "Warm chocolate soufflé with a molten center, served with vanilla ice cream.",
    category: "Desserts",
    isFeatured: false,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "5",
    name: "Premium Wine Selection",
    price: 85.0,
    description:
      "Bottle of our finest reserve wine, selected by our sommelier.",
    category: "Beverages",
    isFeatured: false,
    isAvailable: false,
    imageUrl:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "6",
    name: "Seasonal Seafood Platter",
    price: 68.99,
    description:
      "Selection of the freshest seafood, including oysters, shrimp, and crab claws.",
    category: "Specials",
    isFeatured: true,
    isAvailable: true,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1071&q=80",
  },
];

export default function FoodItems() {
  const [foodItems, setFoodItems] = useState(initialFoodItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = [
    "All",
    ...new Set(foodItems.map((item) => item.category)),
  ];

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesFeatured = !showFeaturedOnly || item.isFeatured;

    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const handleEdit = (id: string) => {
    console.log("Edit item:", id);
    // In a real app, this would open an edit modal or navigate to an edit page
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setFoodItems(foodItems.filter((item) => item.id !== id));
    }
  };

  const handleToggleFeatured = (id: string) => {
    setFoodItems(
      foodItems.map((item) =>
        item.id === id ? { ...item, isFeatured: !item.isFeatured } : item
      )
    );
  };

  return (
    <div>
      <PageTitle
        title="Food Items"
        description="Manage your restaurant's menu items"
        actions={
          <button className="btn-gold">
            <Plus size={18} />
            Add Food Item
          </button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 gold-focus-ring"
            placeholder="Search food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <select
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 gold-focus-ring"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition-colors ${
              showFeaturedOnly
                ? "bg-gold-DEFAULT text-black"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
          >
            <Filter size={16} />
            Featured Only
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <FoodItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            category={item.category}
            isFeatured={item.isFeatured}
            isAvailable={item.isAvailable}
            imageUrl={item.imageUrl}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleFeatured={handleToggleFeatured}
          />
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No food items found</p>
            <button className="btn-gold">
              <Plus size={18} />
              Add Your First Food Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
