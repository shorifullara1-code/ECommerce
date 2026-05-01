import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function Home() {
  const addToCart = useCartStore(state => state.addToCart);
  const cartItems = useCartStore(state => state.cartItems);

  const products = [
    { id: 1, name: 'Premium Sundarban Natural Honey', price: 550, oldPrice: '৳ 650', image: '🍯', badge: 'Offered Items', badgeColor: 'bg-red-500' },
    { id: 2, name: 'Authentic Saudi Medjool Dates 1kg', price: 1450, oldPrice: null, image: '🧆', badge: '🔥 Best Selling', badgeColor: 'bg-[#F37A20]' },
    { id: 3, name: 'Pure Cow Ghee 1L', price: 1200, oldPrice: '৳ 1,300', image: '🧈' },
    { id: 4, name: 'Premium Chinigura Rice (Polao) 5kg', price: 750, oldPrice: null, image: '🌾' }
  ];

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 py-8 relative z-10 space-y-12">
      {/* Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Banner (Left) */}
        <div className="lg:col-span-8 relative rounded-xl overflow-hidden shadow-sm group bg-gradient-to-r from-[#fae8d8] to-[#f4e2ce] min-h-[340px] flex items-center cursor-pointer">
           {/* Abstract light shapes */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
           
           <div className="absolute inset-0 px-12 py-8 flex items-center w-full">
              {/* Left side graphics (Cart & Products placeholder) */}
              <div className="w-[45%] flex justify-center items-end h-full relative">
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[120px] drop-shadow-xl z-20">🛒</div>
                  <div className="absolute bottom-20 left-1/4 text-6xl drop-shadow-md z-10 rotate-[-15deg]">📦</div>
                  <div className="absolute bottom-24 right-1/4 text-5xl drop-shadow-md z-10 rotate-[10deg]">🥫</div>
              </div>
              
              {/* Right side text */}
              <div className="w-[55%] text-center pl-8 pt-4">
                 <p className="text-xl font-bold text-gray-800 mb-2">Offer of the big market!</p>
                 {/* Large price text */}
                 <div className="flex items-start justify-center gap-2 mb-2">
                     <span className="text-6xl font-black text-[#333] tracking-tighter">৳</span>
                     <span className="text-8xl font-black text-[#333] tracking-tighter">6,000</span>
                 </div>
                 <p className="text-2xl font-bold text-gray-800 mb-4">You get a free item on orders above</p>
                 
                 <div className="inline-block relative">
                   <div className="bg-red-600 text-white font-black text-2xl px-6 py-2 rounded-md shadow-lg transform -skew-x-12 relative z-10">
                      <span className="inline-block transform skew-x-12">ABSOLUTELY FREE!</span>
                   </div>
                 </div>
              </div>
           </div>

           {/* Carousel Arrows */}
           <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-[#F37A20] bg-transparent opacity-50 hover:bg-white/50 hover:opacity-100 transition-all z-20">
              <ChevronLeft className="w-6 h-6" />
           </button>
           <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-[#F37A20] bg-transparent opacity-50 hover:bg-white/50 hover:opacity-100 transition-all z-20">
              <ChevronRight className="w-6 h-6" />
           </button>

           {/* Dots */}
           <div className="absolute bottom-5 left-1/2 -translate-y-1/2 flex gap-2 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F37A20]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
           </div>
        </div>

        {/* Secondary Banner (Right) */}
         <div className="lg:col-span-4 rounded-xl overflow-hidden shadow-sm relative bg-[#f1efe8] min-h-[340px] flex items-center cursor-pointer">
             {/* Light overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
             
             <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="self-end text-right z-10">
                   <p className="text-lg font-bold text-gray-700 leading-tight">1 Kg Premium Ghee</p>
                   <p className="text-2xl font-black text-[#5c3e29] leading-tight mt-1">Get special</p>
                   <p className="text-[2.5rem] font-black text-[#7a5332] leading-none mt-1 uppercase tracking-tighter">100৳ OFF!</p>
                </div>
                
                {/* Decorative food base */}
                 <div className="absolute bottom-0 w-full left-0 h-2/5 origin-bottom bg-gradient-to-t from-black/10 to-transparent flex justify-center items-end px-4">
                    {/* Product Placeholder graphic */}
                    <div className="relative mb-6">
                      <div className="w-36 h-48 bg-[#fffcf5] border-2 border-gray-200 rounded-lg shadow-xl flex flex-col items-center justify-center relative z-20 mx-auto">
                         <span className="font-bold text-[#F37A20] text-2xl">ঘি</span>
                         <span className="text-xs text-gray-500 mt-1">Premium Quality</span>
                      </div>
                      {/* Fake bowl plates */}
                      <div className="absolute -left-12 bottom-0 w-24 h-16 bg-white rounded-full shadow-lg z-10 flex items-center justify-center border border-gray-100">
                         <span className="text-3xl">🍲</span>
                      </div>
                      <div className="absolute -right-12 bottom-0 w-24 h-16 bg-white rounded-full shadow-lg z-10 flex items-center justify-center border border-gray-100">
                         <span className="text-3xl">🥘</span>
                      </div>
                    </div>
                 </div>
             </div>
         </div>
      </div>

      {/* Featured Categories */}
      <section className="relative pt-4">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-semibold text-[#1F2937] text-center w-full">Featured Categories</h2>
        </div>

        <div className="relative group px-12">
            <button className="absolute left-0 top-[40%] -translate-y-1/2 w-[34px] h-[34px] bg-[#F37A20] rounded-full flex items-center justify-center text-white hover:bg-[#d96a18] transition-colors shadow-md z-10">
                <ChevronLeft className="w-5 h-5 mr-0.5" />
            </button>

            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth relative">
               {[
                 { name: 'Organic', icon: '🧺', items: ['🥥', '🍾'], link: '/category/organic' },
                 { name: 'Honey', icon: '🍯', items: ['🥄'], link: '/category/honey' },
                 { name: 'Dates', icon: '🧆', items: [], link: '/category/dates' },
                 { name: 'Spices', icon: '🌶️', items: ['🧂'], link: '/category/spices' },
                 { name: 'Nuts & Seeds', icon: '🥜', items: ['🌰'], link: '/category/nuts' },
                 { name: 'Beverage', icon: '🫖', items: ['🍵'], link: '/category/beverage' },
                 { name: 'Rice', icon: '🌾', items: ['🍚'], link: '/category/rice' },
                 { name: 'Flours & Lentils', icon: '🫘', items: ['🥖'], link: '/category/flours' },
               ].map((cat, idx) => (
                  <Link to={cat.link} key={idx} className="flex flex-col items-center flex-shrink-0 w-36 snap-center cursor-pointer group/item text-inherit no-underline">
                     <div className="w-[120px] h-[120px] bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-50 flex items-center justify-center mb-5 group-hover/item:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 transform group-hover/item:-translate-y-1 relative group-hover/item:border-[#F37A20]/30">
                        <span className="text-6xl drop-shadow-sm z-10 relative left-2 transition-transform duration-300 group-hover/item:scale-110">{cat.icon}</span>
                        {cat.items[0] && <span className="text-4xl absolute bottom-3 left-4 opacity-70 rotate-[-15deg] transition-transform duration-300 group-hover/item:-rotate-[25deg]">{cat.items[0]}</span>}
                        {cat.items[1] && <span className="text-3xl absolute top-3 right-4 opacity-50 rotate-[20deg] transition-transform duration-300 group-hover/item:rotate-[30deg]">{cat.items[1]}</span>}
                     </div>
                     <span className="text-[15px] font-medium text-gray-700 group-hover/item:text-[#F37A20] transition-colors">{cat.name}</span>
                  </Link>
               ))}
            </div>

            <button className="absolute right-0 top-[40%] -translate-y-1/2 w-[34px] h-[34px] bg-[#F37A20] rounded-full flex items-center justify-center text-white hover:bg-[#d96a18] transition-colors shadow-md z-10">
                <ChevronRight className="w-5 h-5 ml-0.5" />
            </button>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="pt-4">
         <h2 className="text-2xl font-semibold text-center text-[#1F2937] mb-8">Top Selling Products</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const inCart = cartItems.some(item => item.id === product.id);
              
              return (
                <div key={product.id} className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] overflow-hidden relative group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#F37A20]/20 flex flex-col">
                  <Link to={`/product/${product.id}`} className="block absolute inset-0 z-10"></Link>
                  {product.badge && (
                    <div className={`absolute top-4 left-4 ${product.badgeColor} text-white text-[11px] font-bold px-2.5 py-1 rounded-sm z-20 uppercase tracking-wider ${product.badgeColor === 'bg-[#F37A20]' ? 'border-[3px] border-white ml-2 mt-2 -left-2 -top-2 scale-[1.05] shadow-sm transform-gpu group-hover:rotate-[-2deg] transition-transform' : ''}`}>
                      {product.badge}
                    </div>
                  )}
                  <div className="aspect-[4/3] bg-[#f9fafb] flex items-center justify-center p-6 pb-0 group-hover:bg-gray-50 transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-8xl drop-shadow-md relative top-4 group-hover:-translate-y-2 transition-transform duration-300">{product.image}</span>
                  </div>
                  <div className="p-4 pt-6 flex flex-col flex-grow">
                     <h3 className="font-semibold text-gray-800 mb-1.5 text-[15px] line-clamp-2 min-h-[44px] group-hover:text-[#F37A20] transition-colors">{product.name}</h3>
                     <div className="flex gap-2 items-center mb-5 mt-auto">
                        <span className="text-[#F37A20] font-bold text-lg">৳ {product.price}</span>
                        {product.oldPrice && <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span>}
                     </div>
                     {inCart ? (
                       <button className="w-full bg-[#F37A20] border-2 border-[#F37A20] text-white py-2.5 rounded-lg font-bold text-sm tracking-wide z-20 shadow-[0_4px_14px_0_rgba(243,122,32,0.39)] cursor-default">
                         Added to Cart
                       </button>
                     ) : (
                       <button onClick={(e) => handleAddToCart(e, product)} className="w-full bg-white border-2 border-gray-200 text-gray-700 py-2.5 rounded-lg font-bold text-sm tracking-wide group-hover:bg-[#F37A20] group-hover:border-[#F37A20] group-hover:text-white transition-all z-20 active:scale-95">
                         Buy Now
                       </button>
                     )}
                  </div>
                </div>
              );
            })}
         </div>
      </section>
    </div>
  );
}
