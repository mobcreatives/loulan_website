"use client";

import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import CategoryCard from "./_components/category-card";
import { PageTitle } from "@/components";
import { initialCategories } from "./data";

// Mock data
export default function MenuCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id: string) => {
    console.log("Edit category:", id);
    // In a real app, this would open an edit modal or navigate to an edit page
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };
  return (
    <div>
      <PageTitle
        title="Menu Categories"
        description="Manage your restaurant's menu categories"
        actions={
          <button className="btn-gold">
            <Plus size={18} />
            Add Category
          </button>
        }
      />
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 gold-focus-ring"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            itemCount={category.itemCount}
            isActive={category.isActive}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        {filteredCategories.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No categories found</p>
            <button className="btn-gold">
              <Plus size={18} />
              Add Your First Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
