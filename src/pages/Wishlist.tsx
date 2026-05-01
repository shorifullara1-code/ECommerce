import React from 'react';
import { Heart, ShoppingBag, Trash2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const addToCart = useCartStore(state => state.addToCart);
  const cartItems = useCartStore(state => state.cartItems);

  const [wishlistItems, setWishlistItems] = React.useState([
    { id: 1, name: 'Premium Sundarban Natural Honey', price: 550, oldPrice: '৳ 650', image: '🍯', inStock: true },
    { id: 2, name: 'Authentic Saudi Medjool Dates 1kg', price: 1450, oldPrice: null, image: '🧆', inStock: true },
    { id: 3, name: 'Pure Cow Ghee 1L', price: 1200, oldPrice: '৳ 1,300', image: '🧈', inStock: false },
  ]);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    toast.success(`${item.name} added to cart`);
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-[#F37A20] fill-[#F37A20]/20" />
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium ml-2">{wishlistItems.length} items</span>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 p-6 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Unit Price</div>
            <div className="col-span-2 text-center">Stock Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {wishlistItems.map((item) => {
              const inCart = cartItems.some(cartItem => cartItem.id === item.id);
              
              return (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-6 items-center hover:bg-gray-50/50 transition-colors">
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 text-4xl shadow-sm">
                    {item.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 sm:hidden">
                      ৳ {item.price} {item.oldPrice && <span className="line-through ml-2 text-gray-400">{item.oldPrice}</span>}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 text-center hidden sm:block">
                  <span className="font-bold text-gray-900 text-lg">৳ {item.price}</span>
                  {item.oldPrice && <div className="text-sm text-gray-400 line-through">{item.oldPrice}</div>}
                </div>

                <div className="col-span-2 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="col-span-2 flex items-center justify-end gap-3 sm:gap-4 mt-4 sm:mt-0">
                  {inCart ? (
                    <button 
                      className="p-2.5 rounded-lg flex items-center justify-center w-full sm:w-auto bg-green-50 text-green-600 border border-green-200 cursor-default"
                      title="Already in Cart"
                    >
                      <CheckCircle2 className="w-5 h-5 sm:mr-0 mr-2" />
                      <span className="sm:hidden font-medium">In Cart</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      className={`p-2.5 rounded-lg transition-colors flex items-center justify-center w-full sm:w-auto ${
                        item.inStock 
                          ? 'bg-[#F37A20] text-white hover:bg-[#d96a18] shadow-sm' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5 sm:mr-0 mr-2" />
                      <span className="sm:hidden font-medium">Add to Cart</span>
                    </button>
                  )}
                  <button onClick={() => removeFromWishlist(item.id)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 sm:border-none">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )})}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Explore more and shortlist some items.</p>
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F37A20] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#d96a18] transition-colors">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
