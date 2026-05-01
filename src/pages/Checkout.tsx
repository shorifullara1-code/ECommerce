import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore, selectCartTotal } from '../store/cartStore';
import { CheckCircle2, Package, MapPin, Truck, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Checkout() {
  const cartItems = useCartStore(state => state.cartItems);
  const clearCart = useCartStore(state => state.clearCart);
  const cartTotal = useCartStore(selectCartTotal);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    zone: ''
  });

  const shipping = formData.city === 'Dhaka' ? 60 : 120;
  const total = cartTotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    // In a real app, make API call here
    setIsSuccess(true);
    clearCart();
    toast.success('Order placed successfully!');
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto w-full px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8 text-lg">Thank you for your order. We've received it and will string processing it right away.</p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left max-w-sm mx-auto">
             <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Order tracking ID:</span>
                <span className="font-bold text-gray-900">ORD-{Math.floor(1000 + Math.random() * 9000)}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-gray-500">Expected delivery:</span>
                <span className="font-bold text-[#F37A20]">2-3 Business Days</span>
             </div>
          </div>

          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F37A20] px-8 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#d96a18] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto w-full px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout Unavailable</h1>
          <p className="text-gray-500 mb-8">Your cart is empty. Add some products before proceeding to checkout.</p>
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F37A20] px-8 py-3.5 text-base font-bold text-white shadow-md hover:bg-[#d96a18] transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 py-8">
      <Link to="/cart" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#F37A20] mb-6">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Cart
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#F37A20]" />
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20] transition-colors"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="e.g. 017XXXXXXXX"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20] transition-colors"
                  >
                    <option value="Dhaka">Inside Dhaka</option>
                    <option value="Outside Dhaka">Outside Dhaka</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Area/Zone</label>
                  <input
                    required
                    name="zone"
                    value={formData.zone}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. Mirpur 10"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20] transition-colors"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Detailed Address</label>
                  <textarea
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House no, Road no, exact location..."
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20] transition-colors resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#F37A20]" />
                Payment Method
              </h2>
              <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between cursor-pointer ring-1 ring-green-500">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-[5px] border-green-500 bg-white"></div>
                  <span className="font-medium text-green-900">Cash on Delivery</span>
                </div>
                <span className="text-green-700 text-sm font-medium">Pay when received</span>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-2xl shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug mb-1">{item.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                      <span className="text-sm font-bold text-gray-900">৳{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium text-gray-900">৳ {cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping ({formData.city})</span>
                <span className="font-medium text-gray-900">৳ {shipping}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-[#F37A20]">৳ {total}</span>
              </div>
              <p className="text-xs text-right text-gray-500 mt-1">Payable amount</p>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              className="w-full bg-[#0B2A22] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#113a2f] transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              Confirm Order
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
