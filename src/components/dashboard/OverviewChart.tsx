
import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 5000, orders: 32 },
  { name: 'Thu', sales: 2780, orders: 21 },
  { name: 'Fri', sales: 6890, orders: 45 },
  { name: 'Sat', sales: 8390, orders: 52 },
  { name: 'Sun', sales: 7090, orders: 49 },
];

type ChartDataKey = 'sales' | 'orders';

const OverviewChart = () => {
  const [activeDataKey, setActiveDataKey] = useState<ChartDataKey>('sales');

  return (
    <div className="dashboard-card p-6 h-[400px]">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-medium">Weekly Overview</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveDataKey('sales')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeDataKey === 'sales'
                ? 'bg-gold-DEFAULT text-black'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            Sales
          </button>
          <button
            onClick={() => setActiveDataKey('orders')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeDataKey === 'orders'
                ? 'bg-gold-DEFAULT text-black'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            Orders
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0A0A0A" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0A0A0A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fill: '#666' }} />
          <YAxis tick={{ fill: '#666' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #D4AF37',
              borderRadius: '4px',
            }}
          />
          {activeDataKey === 'sales' && (
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#D4AF37"
              fillOpacity={1}
              fill="url(#colorSales)"
              animationDuration={1000}
            />
          )}
          {activeDataKey === 'orders' && (
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#0A0A0A"
              fillOpacity={1}
              fill="url(#colorOrders)"
              animationDuration={1000}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
