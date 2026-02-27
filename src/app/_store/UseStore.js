// _store/UseStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      cart: [],
      orders: [],

      // إضافة منتج
      addCart: (product) => set((state) => ({ 
        cart: [...state.cart, product] 
      })),

      // إضافة الطلب إلى السجل
      addOrder: (newOrder) => set((state) => ({
        orders: [newOrder, ...state.orders]
      })),

      // --- الدالة الهامة لتفريغ السلة ---
      clearCart: () => set({ cart: [] }), 

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item._id !== id)
      })),
    }),
    { name: 'shopping-storage' }
  )
)

export default useStore;