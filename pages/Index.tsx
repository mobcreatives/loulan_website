
import { DollarSign, ShoppingBag, Users, Calendar } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import PageTitle from '../components/ui/PageTitle';
import StatCard from '../components/dashboard/StatCard';
import OverviewChart from '../components/dashboard/OverviewChart';

const Index = () => {
  return (
    <DashboardLayout>
      <PageTitle 
        title="Dashboard"
        description="Welcome to the Golden Bistro Admin Dashboard"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value="$15,890"
          icon={<DollarSign size={20} />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard 
          title="Orders" 
          value="243"
          icon={<ShoppingBag size={20} />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard 
          title="Customers" 
          value="345"
          icon={<Users size={20} />}
          trend={{ value: 3.7, isPositive: true }}
        />
        <StatCard 
          title="Reservations" 
          value="45"
          icon={<Calendar size={20} />}
          trend={{ value: 2.1, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OverviewChart />
        </div>
        <div className="dashboard-card p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {index === 0 && "New reservation for 4 people"}
                    {index === 1 && "Menu item 'Beef Wellington' updated"}
                    {index === 2 && "New review: 5-star rating"}
                    {index === 3 && "New contact form submission"}
                    {index === 4 && "Category 'Desserts' added"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {index === 0 && "10 minutes ago"}
                    {index === 1 && "2 hours ago"}
                    {index === 2 && "5 hours ago"}
                    {index === 3 && "Yesterday at 4:30 PM"}
                    {index === 4 && "2 days ago"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
