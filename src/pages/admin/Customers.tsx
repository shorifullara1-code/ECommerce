import React from 'react';
import { Search, Filter, MoreHorizontal, Users, UserCheck, TrendingUp } from 'lucide-react';

export default function Customers() {
  const customers = [
    { id: 'C-001', name: 'Rahim Uddin', email: 'rahim@example.com', phone: '+880 1711-223344', orders: 12, spent: '৳ 14,500', status: 'Active', joined: 'Oct 10, 2026' },
    { id: 'C-002', name: 'Fatema Begum', email: 'fatema@example.com', phone: '+880 1822-334455', orders: 5, spent: '৳ 6,200', status: 'Active', joined: 'Oct 12, 2026' },
    { id: 'C-003', name: 'Karim Ali', email: 'karim@example.com', phone: '+880 1933-445566', orders: 1, spent: '৳ 850', status: 'Inactive', joined: 'Oct 15, 2026' },
    { id: 'C-004', name: 'Salma Akter', email: 'salma@example.com', phone: '+880 1644-556677', orders: 24, spent: '৳ 32,100', status: 'Active', joined: 'Oct 20, 2026' },
    { id: 'C-005', name: 'Jalal Ahmed', email: 'jalal@example.com', phone: '+880 1555-667788', orders: 0, spent: '৳ 0', status: 'Inactive', joined: 'Oct 24, 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your store's customer database.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Registered Users</p>
            <p className="text-2xl font-bold text-gray-900">8,549</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Customers (30d)</p>
            <p className="text-2xl font-bold text-gray-900">3,142</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
          <div className="p-3 bg-[#F37A20]/10 text-[#F37A20] rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">New Signups (This Week)</p>
            <p className="text-2xl font-bold text-gray-900">124</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
         <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20] transition-colors"
            />
         </div>
         <div className="flex gap-2 w-full sm:w-auto">
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex-1 sm:flex-none justify-center">
               <Filter className="h-4 w-4" />
               Status
            </button>
         </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
                <th className="px-6 py-4 font-semibold">Orders</th>
                <th className="px-6 py-4 font-semibold">Total Spent</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-[#113a2f] flex items-center justify-center font-medium text-white border border-[#0B2A22]">
                           {customer.name.charAt(0)}
                        </div>
                        <div>
                           <div className="font-medium text-gray-900">{customer.name}</div>
                           <div className="text-gray-400 text-xs">{customer.email}</div>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4 text-gray-500">{customer.joined}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{customer.orders}</td>
                  <td className="px-6 py-4">{customer.spent}</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                     }`}>
                        {customer.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <button className="text-gray-400 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="h-5 w-5" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
