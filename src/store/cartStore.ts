import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      
      addToCart: (newItem) => set((state) => {
        const existing = state.cartItems.find(item => item.id === newItem.id);
        if (existing) {
          return {
            cartItems: state.cartItems.map(item => 
              item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { cartItems: [...state.cartItems, { ...newItem, quantity: 1 }] };
      }),

      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
      })),

      updateQuantity: (id, delta) => set((state) => ({
        cartItems: state.cartItems.map(item => {
          if (item.id === id) {
            const newQuantity = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
      })),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'ecommerce-cart-storage', // name of the item in the storage (must be unique)
    }
  )
);

// Helper selectors for derived state
export const selectCartTotal = (state: CartState) => 
  state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

export const selectCartCount = (state: CartState) => 
  state.cartItems.reduce((count, item) => count + item.quantity, 0);
