// _store/UseStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      cart: [],
      orders: [],

      // إضافة منتج
  addCart: (product) =>
  set((state) => {
    const existingProduct = state.cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      return {
        cart: state.cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1  } // زيادة الكمية
            : item
        ),
      };
    }
    // إذا المنتج جديد
    return {
      cart: [...state.cart, { ...product, quantity: 1 }],
    };
  }),
      //  ## زياده الكميه عدد 
  increaseQuantity:(id)=>set((state)=>({
    cart: state.cart.map((item)=>
    item._id === id ? {...item,quantity: item.quantity + 1} :item
    )
  })),
        // ##  نقصآن لكميه عدد 
  decreaseQuantity:(id)=>set((state)=>({
  
    cart:state.cart.map((item)=>item._id === id && item.quantity > 1 ? {...item,quantity:item.quantity -1}:item)
  })),

      // إضافة الطلب إلى السجل
      addOrder: (newOrder) => set((state) => ({
        orders: [newOrder, ...state.orders]
      })),
        // ## SEARCH PRODUCT
    searchProduct:"",
    searchProductItem:(search)=>set({searchProduct:search}),

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