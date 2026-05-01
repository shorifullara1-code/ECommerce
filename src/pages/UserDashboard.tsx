import React from 'react';
import { User, Package, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function UserDashboard() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const orders = [
    { id: 'ORD-7291', date: 'Oct 24, 2026', total: 1850, status: 'Processing' },
    { id: 'ORD-7023', date: 'Oct 12, 2026', total: 650, status: 'Delivered' },
  ];

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#F37A20]/10 text-[#F37A20] rounded-full flex items-center justify-center font-bold text-lg">
                S
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Shopper</h3>
                <p className="text-sm text-gray-500">shopper@example.com</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-[#F37A20]/10 text-[#F37A20] font-medium">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5" />
                  My Orders
                </div>
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  Profile Details
                </div>
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  Account Settings
                </div>
              </a>
            </nav>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#F37A20]" />
              Order History
            </h2>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-100 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order Placed: {order.date}</p>
                        <p className="font-bold text-gray-900 text-lg">{order.id}</p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                          <p className="font-bold text-[#F37A20]">৳ {order.total}</p>
                        </div>
                        
                        <div className="text-left py-1 px-3 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                          {order.status}
                        </div>
                        
                        <Link to="/track-order" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#F37A20] transition-colors">
                          Track <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-6">Looks like you haven't made your first purchase.</p>
                <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F37A20] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#d96a18] transition-colors">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
