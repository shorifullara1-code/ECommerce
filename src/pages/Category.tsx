import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Filter } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function Category() {
  const { id } = useParams<{ id: string }>();
  const addToCart = useCartStore(state => state.addToCart);
  const cartItems = useCartStore(state => state.cartItems);
  
  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-[#F37A20] transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="capitalize font-medium text-gray-800">{id}</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-[280px] bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] p-6 h-fit shrink-0">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-800">Filters</h3>
          </div>
          
          <div className="space-y-6">
             <div>
                <h4 className="font-medium text-gray-800 mb-3 text-sm">Price Range</h4>
                <div className="flex items-center gap-2">
                   <input type="number" placeholder="Min" className="w-full bg-gray-50 border border-gray-200 rounded text-sm px-3 py-2 outline-none focus:border-[#F37A20]" />
                   <span className="text-gray-400">-</span>
                   <input type="number" placeholder="Max" className="w-full bg-gray-50 border border-gray-200 rounded text-sm px-3 py-2 outline-none focus:border-[#F37A20]" />
                </div>
             </div>
             
             <div>
                <h4 className="font-medium text-gray-800 mb-3 text-sm">Availability</h4>
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2 cursor-pointer">
                   <input type="checkbox" className="rounded text-[#F37A20] focus:ring-[#F37A20]" defaultChecked />
                   In Stock
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                   <input type="checkbox" className="rounded text-[#F37A20] focus:ring-[#F37A20]" />
                   Out of Stock
                </label>
             </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
             <h1 className="text-2xl font-bold text-gray-800 capitalize">{id}</h1>
             <span className="text-sm text-gray-500">Showing 12 products</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Dummy cards */}
             {[1, 2, 3, 4, 5, 6].map((item) => {
               const price = 200 + item * 50;
               const productId = `cat-${id}-${item}`;
               const inCart = cartItems.some(cItem => cItem.id === productId);
               
               return (
               <div key={item} className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] overflow-hidden relative group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#F37A20]/20 flex flex-col">
                  <div className="aspect-[4/3] bg-[#f9fafb] flex items-center justify-center p-6 pb-0 group-hover:bg-gray-50 transition-colors relative overflow-hidden">
                     <span className="text-6xl drop-shadow-md relative top-4 group-hover:-translate-y-2 transition-transform duration-300 opacity-30">📦</span>
                  </div>
                  <div className="p-4 pt-6 flex flex-col flex-grow">
                     <h3 className="font-semibold text-gray-800 mb-1.5 text-[15px] line-clamp-2 min-h-[44px] group-hover:text-[#F37A20] capitalize">Premium {id} Product {item}</h3>
                     <div className="flex gap-2 items-center mb-5 mt-auto">
                        <span className="text-[#F37A20] font-bold text-lg">৳ {price}</span>
                     </div>
                     {inCart ? (
                       <button className="w-full bg-[#F37A20] border-2 border-[#F37A20] text-white py-2.5 rounded-lg font-bold text-sm tracking-wide z-20 shadow-[0_4px_14px_0_rgba(243,122,32,0.39)] cursor-default">
                          Added to Cart
                       </button>
                     ) : (
                       <button 
                         onClick={() => {
                           addToCart({ id: productId, name: `Premium ${id} Product ${item}`, price, image: '📦' });
                           toast.success(`Premium ${id} Product ${item} added to cart`);
                         }}
                         className="w-full bg-white border-2 border-gray-200 text-gray-700 py-2.5 rounded-lg font-bold text-sm tracking-wide group-hover:bg-[#F37A20] group-hover:border-[#F37A20] group-hover:text-white transition-all z-20 active:scale-95"
                       >
                          Add to Cart
                       </button>
                     )}
                  </div>
               </div>
             )})}
          </div>
        </div>
      </div>
    </div>
  )
}
