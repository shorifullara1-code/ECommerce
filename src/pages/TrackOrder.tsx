import React, { useState } from 'react';
import { Package, Search, CheckCircle2, Clock, Truck, Home } from 'lucide-react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) setSearched(true);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#F37A20]/10 text-[#F37A20] rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-500">Enter your order ID to see the current status of your delivery.</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g., ORD-7291"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-5 pr-12 py-4 text-base focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20] transition-colors"
              required
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#F37A20] text-white rounded-md hover:bg-[#d96a18] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {searched && (
          <div className="border-t border-gray-100 pt-8 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-bold text-gray-900 text-lg">{orderId.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Expected Delivery</p>
                <p className="font-bold text-[#F37A20] text-lg">Tomorrow, by 8:00 PM</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-8 relative">
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 border-4 border-white relative z-10 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 whitespace-nowrap" />
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-900">Order Confirmed</h4>
                    <p className="text-sm text-gray-500">Oct 24, 2026 - 10:30 AM</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#F37A20]/10 text-[#F37A20] flex items-center justify-center shrink-0 border-4 border-white relative z-10 shadow-sm animate-pulse">
                    <Package className="w-5 h-5 whitespace-nowrap" />
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-900">Processing</h4>
                    <p className="text-sm text-gray-500">Your items are being packed.</p>
                  </div>
                </div>

                <div className="flex gap-4 opacity-50">
                  <div className="w-11 h-11 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 border-4 border-white relative z-10">
                    <Truck className="w-5 h-5 whitespace-nowrap" />
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-900">Out for Delivery</h4>
                    <p className="text-sm text-gray-500">Pending</p>
                  </div>
                </div>

                <div className="flex gap-4 opacity-50">
                  <div className="w-11 h-11 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 border-4 border-white relative z-10">
                    <Home className="w-5 h-5 whitespace-nowrap" />
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-gray-900">Delivered</h4>
                    <p className="text-sm text-gray-500">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
