"use client";
import { useState } from "react";
import { Eye, Edit, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface ImageCardProps {
  id: string;
  imageUrl: string;
  caption: string;
  isVisible: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

const ImageCard = ({
  id,
  imageUrl,
  caption,
  isVisible,
  onEdit,
  onDelete,
  onToggleVisibility,
}: ImageCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden group relative transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={caption}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
          height={1080}
          width={1920}
        />

        {/* Visibility indicator */}
        <div
          className={`absolute top-2 right-2 rounded-full p-1 ${
            isVisible ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {isVisible ? (
            <Check size={12} className="text-white" />
          ) : (
            <X size={12} className="text-white" />
          )}
        </div>

        {/* Overlay with actions */}
        <div
          className={`absolute inset-0 bg-black/50 flex flex-col justify-between p-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-end space-x-1">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onToggleVisibility(id)}
              className="h-8 w-8 bg-white/90 hover:bg-white text-gray-700"
              title={isVisible ? "Hide image" : "Show image"}
            >
              <Eye
                size={16}
                className={isVisible ? "text-green-500" : "text-gray-400"}
              />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              onClick={() => onEdit(id)}
              className="h-8 w-8 bg-white/90 hover:bg-white text-gray-700"
            >
              <Edit size={16} />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              onClick={() => onDelete(id)}
              className="h-8 w-8 bg-white/90 hover:bg-white text-red-500"
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <div className="text-white font-medium mt-auto">{caption}</div>
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;
