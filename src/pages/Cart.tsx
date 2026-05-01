import React from 'react';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore, selectCartTotal } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function Cart() {
  const cartItems = useCartStore(state => state.cartItems);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const cartTotal = useCartStore(selectCartTotal);
  const navigate = useNavigate();

  const shipping = 50;
  const total = cartTotal + shipping;

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="w-8 h-8 text-[#F37A20] fill-[#F37A20]/20" />
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-6 gap-4 sm:gap-6 hover:bg-gray-50/50 transition-colors">
                    <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 text-5xl shadow-sm">
                      {item.image}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
                      <p className="text-[#F37A20] font-bold text-lg">৳ {item.price}</p>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 mt-4 sm:mt-0 border-t border-gray-100 sm:border-none pt-4 sm:pt-0">
                      <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-gray-600 font-bold transition-all">-</button>
                        <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-gray-600 font-bold transition-all">+</button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <p className="text-sm text-gray-500 mb-1">Total</p>
                        <p className="font-bold text-gray-900 text-lg">৳ {item.price * item.quantity}</p>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium text-gray-900">৳ {cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="font-medium text-gray-900">৳ {shipping}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-medium text-green-600">৳ 0</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-[#F37A20]">৳ {total}</span>
                </div>
                <p className="text-xs text-right text-gray-500 mt-1">VAT included, where applicable</p>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#F37A20] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d96a18] transition-colors flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(243,122,32,0.39)]"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="mt-4 text-center">
                 <Link to="/" className="text-sm font-medium text-[#F37A20] hover:underline">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F37A20] px-8 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#d96a18] transition-colors">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
