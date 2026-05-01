import React, { useState } from 'react';
import { Search, Filter, Eye, Download, Printer, CheckSquare, Square, X, Ban } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Orders() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [viewedOrder, setViewedOrder] = useState<any | null>(null);

  const [orders, setOrders] = useState([
    { id: 'ORD-7291', name: 'Rahim Uddin', date: 'Oct 24, 2026', items: 3, amount: '৳ 1,250', status: 'Completed', payment: 'Paid', email: 'rahim@example.com', address: '123 Dhaka Street, Dhaka', phone: '+880 1711-223344' },
    { id: 'ORD-7290', name: 'Fatema Begum', date: 'Oct 24, 2026', items: 1, amount: '৳ 3,420', status: 'Processing', payment: 'Paid', email: 'fatema@example.com', address: '456 Gulshan Ave, Dhaka', phone: '+880 1822-334455' },
    { id: 'ORD-7289', name: 'Karim Ali', date: 'Oct 23, 2026', items: 5, amount: '৳ 850', status: 'Pending', payment: 'Unpaid', email: 'karim@example.com', address: '789 Dhanmondi, Dhaka', phone: '+880 1933-445566' },
    { id: 'ORD-7288', name: 'Salma Akter', date: 'Oct 23, 2026', items: 2, amount: '৳ 5,100', status: 'Completed', payment: 'Paid', email: 'salma@example.com', address: '101 Banani, Dhaka', phone: '+880 1644-556677' },
    { id: 'ORD-7287', name: 'Jalal Ahmed', date: 'Oct 22, 2026', items: 1, amount: '৳ 1,120', status: 'Cancelled', payment: 'Refunded', email: 'jalal@example.com', address: '202 Sylhet Road, Sylhet', phone: '+880 1555-667788' },
  ]);

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(o => o.id));
    }
  };

  const handleSelect = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(prev => prev.filter(orderId => orderId !== id));
    } else {
      setSelectedOrders(prev => [...prev, id]);
    }
  };

  const handleBulkStatusUpdate = (status: string) => {
    if (selectedOrders.length === 0) return;
    setOrders(prev => prev.map(o => selectedOrders.includes(o.id) ? { ...o, status } : o));
    toast.success(`Updated ${selectedOrders.length} orders to ${status}`);
    setSelectedOrders([]);
  };

  const handlePrintLabels = () => {
    if (selectedOrders.length === 0) return;
    toast.success(`Generating PDF labels for ${selectedOrders.length} orders...`);
  };

  const handleCancelOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
    if (viewedOrder && viewedOrder.id === id) {
      setViewedOrder((prev: any) => ({ ...prev, status: 'Cancelled' }));
    }
    toast.success(`Order ${id} has been cancelled.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track customer orders, process invoices and labels.</p>
        </div>
        <div className="flex gap-2">
          {selectedOrders.length > 0 && (
             <div className="flex items-center gap-2 mr-2 border-r border-gray-200 pr-4">
                <span className="text-sm font-medium text-gray-700">{selectedOrders.length} selected</span>
                <select 
                  className="rounded border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:border-[#F37A20] focus:outline-none"
                  onChange={(e) => handleBulkStatusUpdate(e.target.value)}
                  value=""
                >
                  <option value="" disabled>Update Status</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button onClick={handlePrintLabels} className="p-1.5 text-gray-500 hover:text-gray-900 border border-gray-300 rounded" title="Print Labels">
                   <Printer className="w-4 h-4" />
                </button>
             </div>
          )}
          <button className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
         <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
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

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-center w-12">
                  <button onClick={handleSelectAll} className="text-gray-400 hover:text-[#F37A20]">
                    {selectedOrders.length === orders.length ? <CheckSquare className="w-5 h-5 text-[#F37A20]" /> : <Square className="w-5 h-5" />}
                  </button>
                </th>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleSelect(order.id)} className="text-gray-400 hover:text-[#F37A20]">
                      {selectedOrders.includes(order.id) ? <CheckSquare className="w-5 h-5 text-[#F37A20]" /> : <Square className="w-5 h-5" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">{order.name}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4">{order.items}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        order.payment === 'Paid' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                        order.payment === 'Unpaid' ? 'bg-red-50 text-red-700 ring-red-600/10' :
                        'bg-gray-50 text-gray-600 ring-gray-500/10'
                     }`}>
                        {order.payment}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-700'
                     }`}>
                        {order.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                     <button onClick={() => setViewedOrder(order)} className="text-gray-400 hover:text-[#F37A20] p-1 rounded-md transition-colors" title="View Details">
                        <Eye className="h-5 w-5" />
                     </button>
                     {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                       <button onClick={() => handleCancelOrder(order.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors" title="Cancel Order">
                         <Ban className="h-4 w-4" />
                       </button>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50" onClick={() => setViewedOrder(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500">{viewedOrder.id}</p>
              </div>
              <button onClick={() => setViewedOrder(null)} className="text-gray-400 hover:text-gray-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  viewedOrder.status === 'Completed' || viewedOrder.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  viewedOrder.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                  viewedOrder.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-700'
                }`}>
                  Status: {viewedOrder.status}
                </span>

                {viewedOrder.status !== 'Cancelled' && viewedOrder.status !== 'Delivered' && (
                  <button onClick={() => handleCancelOrder(viewedOrder.id)} className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-red-200 flex items-center gap-2">
                    <Ban className="w-4 h-4" /> Cancel Order
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Info</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium text-gray-700">Name:</span> {viewedOrder.name}</p>
                    <p><span className="font-medium text-gray-700">Email:</span> {viewedOrder.email}</p>
                    <p><span className="font-medium text-gray-700">Phone:</span> {viewedOrder.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Info</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium text-gray-700">Date:</span> {viewedOrder.date}</p>
                    <p><span className="font-medium text-gray-700">Total Items:</span> {viewedOrder.items}</p>
                    <p><span className="font-medium text-gray-700">Amount:</span> {viewedOrder.amount}</p>
                    <p><span className="font-medium text-gray-700">Payment:</span> {viewedOrder.payment}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-gray-600">
                  {viewedOrder.address || 'Address not provided'}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex items-center justify-end bg-gray-50">
               <button onClick={() => setViewedOrder(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
