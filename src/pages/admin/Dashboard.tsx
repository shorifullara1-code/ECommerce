import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight, HeadphonesIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const salesData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 2100 },
  { name: 'Mar', total: 1800 },
  { name: 'Apr', total: 2400 },
  { name: 'May', total: 2800 },
  { name: 'Jun', total: 3200 },
];

const trafficData = [
  { name: 'Mon', visits: 400 },
  { name: 'Tue', visits: 300 },
  { name: 'Wed', visits: 550 },
  { name: 'Thu', visits: 450 },
  { name: 'Fri', visits: 700 },
  { name: 'Sat', visits: 800 },
  { name: 'Sun', visits: 600 },
];

export default function Dashboard() {
  const [agentStats, setAgentStats] = useState<{name: string, count: number, id: string}[]>([]);

  useEffect(() => {
    async function fetchAgentStats() {
      try {
        const { data, error } = await supabase
           .from('chat_messages')
           .select('sender_name, sender_id, session_id')
           .eq('is_admin', true);
           
        if (error) {
           console.error("Error fetching agent stats", error);
           return;
        }
        
        // Process data to count unique session_id per sender_id
        const agentMap = new Map<string, {name: string, sessions: Set<string>}>();
        
        (data || []).forEach(msg => {
           if (!agentMap.has(msg.sender_id)) {
               agentMap.set(msg.sender_id, { name: msg.sender_name, sessions: new Set() });
           }
           agentMap.get(msg.sender_id)!.sessions.add(msg.session_id);
        });
        
        const stats = Array.from(agentMap.entries()).map(([id, info]) => ({
            id,
            name: info.name,
            count: info.sessions.size
        })).sort((a, b) => b.count - a.count);
        
        setAgentStats(stats);
      } catch (err) {
        console.error("Failed to fetch agent stats", err);
      }
    }
    
    fetchAgentStats();
  }, []);

  const stats = [
    { name: 'Total Revenue', value: '৳ 425,000', change: '+12.5%', trend: 'up', icon: DollarSign },
    { name: 'Orders', value: '1,245', change: '+8.2%', trend: 'up', icon: ShoppingBag },
    { name: 'Active Customers', value: '8,549', change: '-2.1%', trend: 'down', icon: Users },
    { name: 'Abandoned Carts', value: '142', change: '+15.3%', trend: 'down', icon: ShoppingBag },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your store's performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">{stat.name}</div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <stat.icon className="h-5 w-5 text-gray-700" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <span className={`text-xs font-medium flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
            <p className="text-sm text-gray-500">Monthly revenue for the current year</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(value) => `৳${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`৳${value}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#F37A20" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900">Weekly Traffic</h3>
            <p className="text-sm text-gray-500">Number of visitors over the last 7 days</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                   cursor={{ fill: '#f3f4f6' }}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="visits" fill="#0B2A22" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-red-50 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-red-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Low Stock Alerts
              </h3>
              <p className="text-sm text-red-700">Products that need immediate restocking</p>
            </div>
            <button className="text-sm bg-white text-red-700 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 font-medium">Generate Report</button>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-gray-100">
              <li className="flex items-center justify-between p-4 px-6 hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">Organic Cold Pressed Mustard Oil</p>
                  <p className="text-sm text-gray-500">SKU: OIL-005</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex px-2py-1 rounded bg-red-100 text-red-700 text-xs font-bold px-2 py-1">0 in stock</span>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 px-6 hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">Pure Cow Ghee 1L</p>
                  <p className="text-sm text-gray-500">SKU: GHE-001</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex px-2py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1">8 in stock</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Top Selling Products
              </h3>
              <p className="text-sm text-gray-500">Best performers by volume</p>
            </div>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-gray-100">
              <li className="flex items-center justify-between p-4 px-6 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center text-xl">🍯</div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Premium Sundarban Honey</p>
                    <p className="text-xs text-gray-500">432 units sold</p>
                  </div>
                </div>
                <div className="text-right font-bold text-gray-900">৳ 237,600</div>
              </li>
              <li className="flex items-center justify-between p-4 px-6 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-amber-100 flex items-center justify-center text-xl">🧆</div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Saudi Medjool Dates</p>
                    <p className="text-xs text-gray-500">315 units sold</p>
                  </div>
                </div>
                <div className="text-right font-bold text-gray-900">৳ 456,750</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
             <div>
                <h3 className="font-semibold text-gray-900">Recent Orders</h3>
                <p className="text-sm text-gray-500">Latest transactions from your store</p>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-3 font-semibold">Order ID</th>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  { id: 'ORD-7291', name: 'Rahim Uddin', date: 'Oct 24, 2026', amount: '৳ 1,250', status: 'Completed', color: 'bg-green-100 text-green-700' },
                  { id: 'ORD-7290', name: 'Fatema Begum', date: 'Oct 24, 2026', amount: '৳ 3,420', status: 'Processing', color: 'bg-blue-100 text-blue-700' },
                  { id: 'ORD-7289', name: 'Karim Ali', date: 'Oct 23, 2026', amount: '৳ 850', status: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
                  { id: 'ORD-7288', name: 'Salma Akter', date: 'Oct 23, 2026', amount: '৳ 5,100', status: 'Completed', color: 'bg-green-100 text-green-700' },
                  { id: 'ORD-7287', name: 'Jalal Ahmed', date: 'Oct 22, 2026', amount: '৳ 1,120', status: 'Cancelled', color: 'bg-red-100 text-red-700' },
                ].map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4">{order.name}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${order.color}`}>
                          {order.status}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agent Performance Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
             <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <HeadphonesIcon className="w-5 h-5 text-[#F37A20]" />
                  Agent Chat Performance
                </h3>
                <p className="text-sm text-gray-500">Number of unique customers assisted per agent</p>
             </div>
          </div>
          <div className="overflow-y-auto max-h-[350px]">
            {agentStats.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {agentStats.map((agent) => (
                   <li key={agent.id} className="flex items-center justify-between p-4 px-6 hover:bg-gray-50">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-[#fcead8] flex items-center justify-center text-[#F37A20] font-bold">
                         {agent.name.charAt(0).toUpperCase()}
                       </div>
                       <div>
                         <p className="font-medium text-gray-900 text-sm">{agent.name}</p>
                         <p className="text-xs text-gray-500">Support Agent</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <p className="font-bold text-gray-900 text-lg">{agent.count}</p>
                       <p className="text-xs text-gray-500">Customers Assisted</p>
                     </div>
                   </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-48 text-sm text-gray-500">
                No chat data available yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
