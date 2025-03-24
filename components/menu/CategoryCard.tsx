
import { Edit, Trash2, MoreVertical, MoveVertical } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  isActive: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CategoryCard = ({
  id,
  name,
  description,
  itemCount,
  isActive,
  onEdit,
  onDelete
}: CategoryCardProps) => {
  return (
    <div className="dashboard-card group">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium line-clamp-1">{name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors">
              <MoveVertical size={18} className="cursor-move" />
            </button>
            <div className="relative ml-1">
              <button className="p-2 rounded-full text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-600">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                isActive
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(id)}
              className="p-2 rounded-full text-gray-500 hover:text-amber-500 hover:bg-amber-50 transition-colors"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
