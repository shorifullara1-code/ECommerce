import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, User, Heart, ShoppingBag, Menu, ChevronDown, MessageSquare } from 'lucide-react';
import { useCartStore, selectCartCount, selectCartTotal } from '../store/cartStore';
import ChatWidget from './ChatWidget';

export default function StoreLayout() {
  const navigate = useNavigate();
  const cartCount = useCartStore(selectCartCount);
  const cartTotal = useCartStore(selectCartTotal);

  return (
    <div className="min-h-screen bg-[#F7F8F9] font-sans text-gray-800 flex flex-col">
      {/* Top Header */}
      <header className="bg-white py-4 px-4 shadow-sm relative z-20 sticky top-0">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="w-10 h-10 bg-[#F37A20] text-white flex items-center justify-center rounded-lg font-bold text-xl relative overflow-hidden shadow-sm">
               <span className="relative z-10 leading-none">G</span>
               <div className="absolute bottom-0 right-0 w-5 h-5 bg-white/20 rounded-tl-full"></div>
            </div>
            <div className="leading-[1.1]">
              <span className="block font-black text-[17px] text-[#0B2A22] tracking-tight">GHORER</span>
              <span className="block font-black text-[17px] text-[#F37A20] tracking-tight">BAZAR</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl relative hidden md:block">
            <input
              type="text"
              placeholder="Search in..."
              className="w-full bg-[#F3F4F6] border-none rounded-full py-2.5 px-6 pr-12 focus:outline-none focus:ring-1 focus:ring-[#F37A20] transition-shadow text-sm"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 cursor-pointer hover:text-[#F37A20]" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 text-[13px] font-medium text-gray-600">
            <Link to="/track-order" className="flex flex-col items-center gap-1 cursor-pointer hover:text-[#F37A20] transition-colors">
              <MapPin className="w-5 h-5 stroke-[1.5]" />
              <span>Track Order</span>
            </Link>
            <Link to="/login" className="flex flex-col items-center gap-1 cursor-pointer hover:text-[#F37A20] transition-colors">
              <User className="w-5 h-5 stroke-[1.5]" />
              <span>Account</span>
            </Link>
            <Link to="/wishlist" className="flex flex-col items-center gap-1 cursor-pointer hover:text-[#F37A20] transition-colors">
              <Heart className="w-5 h-5 stroke-[1.5]" />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center gap-1 cursor-pointer hover:text-[#F37A20] transition-colors relative">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                <span className="absolute -top-1.5 -right-2 bg-[#F37A20] text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold">{cartCount}</span>
              </div>
              <span>Cart</span>
            </Link>
            <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-[#F37A20] transition-colors">
              <Menu className="w-5 h-5 stroke-[1.5]" />
              <span>More</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-[#0B2A22] text-white hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-4">
          <ul className="flex flex-wrap items-center text-[14px] font-medium">
             {[
               { name: 'Oil & Ghee', hasDropdown: false },
               { name: 'Honey', hasDropdown: true },
               { name: 'Dates', hasDropdown: true },
               { name: 'Spices', hasDropdown: true },
               { name: 'Nuts & Seeds', hasDropdown: true },
               { name: 'Beverage', hasDropdown: true },
               { name: 'Rice', hasDropdown: false },
               { name: 'Flours & Lentils', hasDropdown: true },
             ].map((item, idx) => (
               <li key={idx} className="relative group cursor-pointer">
                  <div className="flex items-center gap-1 hover:bg-white/10 px-4 py-3 transition-colors">
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
                  </div>
                  {/* Fake dropdown just for visual feedback of being interactive */}
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg mt-0 w-48 rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden transform origin-top border border-gray-100">
                      <div className="flex flex-col">
                        <Link to={`/category/${item.name.toLowerCase()}`} className="px-4 py-3 hover:bg-gray-50 hover:text-[#F37A20] text-sm transition-colors border-b border-gray-50">All {item.name}</Link>
                        <Link to={`/category/${item.name.toLowerCase()}/premium`} className="px-4 py-3 hover:bg-gray-50 hover:text-[#F37A20] text-sm transition-colors border-b border-gray-50">Premium Selection</Link>
                        <Link to={`/category/${item.name.toLowerCase()}/organic`} className="px-4 py-3 hover:bg-gray-50 hover:text-[#F37A20] text-sm transition-colors">Organic Certified</Link>
                      </div>
                    </div>
                  )}
               </li>
             ))}
             <li className="cursor-pointer hover:bg-white/10 px-4 py-3 transition-colors">Certified</li>
             <li className="cursor-pointer hover:bg-white/10 px-4 py-3 transition-colors">Pickle</li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Floating Widgets */}

      {/* Floating Cart (Right Side) - Hidden on Mobile */}
      <Link to="/cart" className="fixed right-0 top-[45%] -translate-y-1/2 bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] rounded-l-[10px] z-50 hidden md:flex flex-col items-center overflow-hidden cursor-pointer hover:translate-x-[-4px] transition-transform">
         <div className="bg-[#F37A20] text-white py-3 px-3 flex flex-col items-center gap-1.5 w-[72px]">
            <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
            <span className="text-[12px] font-medium leading-none">{cartCount} Items</span>
         </div>
         <div className="py-2.5 px-2 text-[13px] font-black text-[#F37A20] bg-white w-full text-center">
            ৳{cartTotal}
         </div>
      </Link>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8 pb-24 md:pb-8">
        <div className="max-w-[1400px] mx-auto px-4 text-center text-sm text-gray-500">
           &copy; {new Date().getFullYear()} GHORER BAZAR Clone. All rights reserved. (Demo) | <Link to="/admin/login" className="hover:text-[#F37A20] transition-colors ml-2">Admin Portal</Link>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 flex justify-around items-center h-16 px-2 pb-safe">
        <Link to="/" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#F37A20]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link to="/products" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#F37A20]">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
           <span className="text-[10px] mt-1 font-medium">Categories</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#F37A20] relative">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            <span className="absolute -top-1.5 -right-2 bg-[#F37A20] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>
          </div>
          <span className="text-[10px] mt-1 font-medium">Cart</span>
        </Link>
        <Link to="/login" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#F37A20]">
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] mt-1 font-medium">Account</span>
        </Link>
      </div>

      {/* Embedded Chat Widget */}
      <ChatWidget />
    </div>
  );
}
