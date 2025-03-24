
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
}

const StatCard = ({ title, value, icon, trend, isLoading = false }: StatCardProps) => {
  return (
    <div className="stat-card group">
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-2 bg-amber-100 rounded w-1/2"></div>
          <div className="h-8 bg-amber-100 rounded w-3/4"></div>
          <div className="h-2 bg-amber-100 rounded w-1/4"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="p-2 rounded-full bg-amber-50 text-amber-500 group-hover:animate-pulse-gold">
              {icon}
            </div>
          </div>
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          </div>
          {trend && (
            <div className={`flex items-center text-sm ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="inline-flex items-center mr-1">
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500">vs last month</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StatCard;
