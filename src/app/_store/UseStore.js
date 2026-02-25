import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      cart: [],
      // دالة إضافة منتج
      addCart: (product) => set((state) => {
        const isExist = state.cart.find((item) => item._id === product._id);
        if (isExist) return state; // إذا كان موجوداً لا تكرره
        return { cart: [...state.cart, product] };
      }),
      // دالة حذف منتج
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item._id !== id)
      })),
      // إفراغ السلة
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart-storage' } // سيتم حفظ السلة في المتصفح تلقائياً
  )
)

export default useStore