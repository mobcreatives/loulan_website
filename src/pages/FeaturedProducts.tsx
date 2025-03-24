
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import PageTitle from '../components/ui/PageTitle';
import FoodItemCard from '../components/menu/FoodItemCard';

// Mock data - we're reusing the food items that are featured
const initialFeaturedItems = [
  {
    id: '1',
    name: 'Filet Mignon',
    price: 42.99,
    description: 'Premium cut beef tenderloin, served with roasted vegetables and red wine reduction.',
    category: 'Main Dishes',
    isFeatured: true,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '3',
    name: 'Lobster Bisque',
    price: 16.99,
    description: 'Rich and creamy soup made with fresh lobster, finished with a touch of cognac.',
    category: 'Appetizers',
    isFeatured: true,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1297&q=80',
  },
  {
    id: '6',
    name: 'Seasonal Seafood Platter',
    price: 68.99,
    description: 'Selection of the freshest seafood, including oysters, shrimp, and crab claws.',
    category: 'Specials',
    isFeatured: true,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1071&q=80',
  },
];

const FeaturedProducts = () => {
  const [featuredItems, setFeaturedItems] = useState(initialFeaturedItems);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredItems = featuredItems.filter(item => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleEdit = (id: string) => {
    console.log('Edit featured item:', id);
    // In a real app, this would open an edit modal or navigate to an edit page
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this item from featured products?')) {
      setFeaturedItems(featuredItems.filter(item => item.id !== id));
    }
  };

  const handleToggleFeatured = (id: string) => {
    // In a real app, this would remove the item from featured items
    setFeaturedItems(featuredItems.filter(item => item.id !== id));
  };

  return (
    <DashboardLayout>
      <PageTitle 
        title="Featured Products"
        description="Manage products showcased on your website"
        actions={
          <button className="btn-gold">
            <Plus size={18} />
            Add Featured Product
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
            placeholder="Search featured products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
            <p className="text-gray-500 mb-4">No featured products found</p>
            <button className="btn-gold">
              <Plus size={18} />
              Add Your First Featured Product
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FeaturedProducts;
