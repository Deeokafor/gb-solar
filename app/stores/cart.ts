import { defineStore } from 'pinia'
import type { Product } from '~/composables/useSupabase'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const isCartOpen = ref<boolean>(false)

  // Actions
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingIndex = items.value.findIndex(item => item.product.id === product.id)
    if (existingIndex > -1) {
      const newQty = items.value[existingIndex].quantity + quantity
      if (newQty <= product.stock) {
        items.value[existingIndex].quantity = newQty
      } else {
        items.value[existingIndex].quantity = product.stock
      }
    } else {
      items.value.push({
        product: { ...product },
        quantity: Math.min(quantity, product.stock || 99)
      })
    }
  }

  const removeFromCart = (productId: string) => {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const item = items.value.find(i => i.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = Math.min(quantity, item.product.stock || 99)
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const toggleCart = (open?: boolean) => {
    if (open !== undefined) {
      isCartOpen.value = open
    } else {
      isCartOpen.value = !isCartOpen.value
    }
  }

  // Getters
  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0))
  
  // Shipping calculation: Free shipping for orders over $1,000, otherwise flat $45 freight for solar equipment
  const shippingFee = computed(() => {
    if (items.value.length === 0) return 0
    return subtotal.value >= 1000 ? 0 : 45.00
  })

  const grandTotal = computed(() => subtotal.value + shippingFee.value)

  return {
    items,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    totalItems,
    subtotal,
    shippingFee,
    grandTotal
  }
}, {
  persist: true
})
