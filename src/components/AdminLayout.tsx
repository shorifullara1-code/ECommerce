import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  MessageSquare
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAdminStore } from '../store/adminStore';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, logout } = useAdminStore();

  let navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Live Chat', href: '/admin/chat', icon: MessageSquare },
    { name: 'POS', href: '/admin/pos', icon: ShoppingCart },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Staff', href: '/admin/staff', icon: Users },
    { name: 'Marketing', href: '/admin/marketing', icon: Bell },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  if (role === 'chat_agent') {
    navItems = navItems.filter(item => item.name === 'Live Chat' || item.name === 'Orders');
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  React.useEffect(() => {
    if (!role) {
      navigate('/admin/login');
      return;
    }
    if (role === 'chat_agent' && location.pathname === '/admin') {
      navigate('/admin/chat');
    }
  }, [role, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 w-64 bg-[#0B2A22] text-white transition-transform duration-300 z-50 flex flex-col shadow-2xl lg:shadow-none",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-16 shrink-0 items-center gap-2 px-6 border-b border-white/10 bg-[#08201a]">
          <div className="w-8 h-8 bg-[#F37A20] flex items-center justify-center rounded font-bold text-lg">G</div>
          <span className="font-bold tracking-tight text-lg">Admin Panel</span>
          <button 
            className="ml-auto lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col px-4 py-6 overflow-y-auto">
          <ul className="flex flex-1 flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-[#F37A20] text-white" 
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              Back to Store
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-white/10 hover:text-red-300 transition-colors text-left"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 md:px-8 shadow-sm">
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex flex-1 items-center gap-4">
             <div className="relative w-full max-w-md hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search admin..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20] transition-colors"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">3</span>
             </button>
             <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 cursor-pointer">
                A
             </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
