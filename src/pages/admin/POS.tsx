import React, { useState } from 'react';
import { Search, ShoppingCart, Printer, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function POS() {
  const [cart, setCart] = useState<any[]>([]);
  
  const products = [
    { id: 1, name: 'Premium Sundarban Natural Honey', price: 550, sku: 'HON-001' },
    { id: 2, name: 'Authentic Saudi Medjool Dates 1kg', price: 1450, sku: 'DAT-002' },
    { id: 3, name: 'Pure Cow Ghee 1L', price: 1200, sku: 'GHE-001' },
  ];

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handlePrint = () => {
    toast.success('Printing receipt...');
    setCart([]);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      {/* Product List */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search products by name or SKU..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" />
          </div>
        </div>
        <div className="flex-1 p-4 grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {products.map(product => (
            <button key={product.id} onClick={() => addToCart(product)} className="text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-colors">
              <div className="text-xs text-gray-500 mb-1">{product.sku}</div>
              <div className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</div>
              <div className="text-[#F37A20] font-bold">৳ {product.price}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart/Checkout */}
      <div className="w-full md:w-96 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#F37A20]" />
            Current Order
          </h2>
          {cart.length > 0 && (
            <button onClick={() => setCart([])} className="text-sm text-red-500 hover:text-red-700">Clear</button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingCart className="w-12 h-12 mb-2 opacity-50" />
              <p>Order is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.qty} x ৳ {item.price}</div>
                </div>
                <div className="font-bold text-gray-900">৳ {item.qty * item.price}</div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center mb-4 text-lg font-bold">
            <span className="text-gray-900">Total</span>
            <span className="text-[#F37A20]">৳ {total}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={handlePrint}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-black transition-colors"
          >
            <Printer className="w-5 h-5" />
            Print Receipt & Complete
          </button>
        </div>
      </div>
    </div>
  );
}
