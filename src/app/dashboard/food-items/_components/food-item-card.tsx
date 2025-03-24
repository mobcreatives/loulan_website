import { Edit, Trash2, MoveVertical, Star } from "lucide-react";
import Image from "next/image";

interface FoodItemCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  isFeatured: boolean;
  isAvailable: boolean;
  imageUrl?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

const FoodItemCard = ({
  id,
  name,
  price,
  description,
  category,
  isFeatured,
  isAvailable,
  imageUrl = "https://via.placeholder.com/150",
  onEdit,
  onDelete,
  onToggleFeatured,
}: FoodItemCardProps) => {
  return (
    <div className="dashboard-card group overflow-hidden">
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
          width={1920}
          height={1080}
        />
        {isFeatured && (
          <div className="absolute top-2 right-2 bg-amber-500/90 text-black px-2 py-1 text-xs font-medium rounded-md flex items-center gap-1">
            <Star size={12} /> Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
          <div className="text-white">
            <p className="font-bold">${price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(id)}
              className="p-1.5 rounded-full bg-white/90 text-gray-700 hover:text-amber-500 transition-colors"
            >
              <Edit size={14} />
            </button>
            <button
              onClick={() => onToggleFeatured(id)}
              className={`p-1.5 rounded-full ${
                isFeatured
                  ? "bg-amber-500/90 text-black"
                  : "bg-white/90 text-gray-700 hover:text-amber-500"
              } transition-colors`}
            >
              <Star size={14} />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-1.5 rounded-full bg-white/90 text-gray-700 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium line-clamp-1">{name}</h3>
            <p className="text-sm text-gray-400 mt-0.5">{category}</p>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {description}
            </p>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors">
              <MoveVertical size={18} className="cursor-move" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                isAvailable
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
