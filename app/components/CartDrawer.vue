<template>
  <div v-if="cartStore.isCartOpen" class="fixed inset-0 z-50 overflow-hidden">
    <!-- Backdrop -->
    <div @click="cartStore.toggleCart(false)" class="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"></div>

    <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
      <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        <!-- Header -->
        <div class="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div class="flex items-center gap-2">
            <ShoppingCartIcon class="w-5 h-5 text-amber-400" />
            <h2 class="font-bold text-lg">Solar Equipment Cart</h2>
            <span class="text-xs bg-slate-800 text-amber-300 font-bold px-2 py-0.5 rounded-sm">
              {{ cartStore.totalItems }} Items
            </span>
          </div>
          <button @click="cartStore.toggleCart(false)" class="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <XIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Cart Items List -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-100">
          <div v-if="cartStore.items.length === 0" class="text-center py-16 space-y-4">
            <div class="w-16 h-16 rounded-sm bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <ShoppingBagIcon class="w-8 h-8" />
            </div>
            <p class="text-slate-500 font-medium text-sm">Your solar equipment cart is empty.</p>
            <NuxtLink 
              to="/products" 
              @click="cartStore.toggleCart(false)"
              class="inline-block solar-btn-primary text-xs py-2.5 px-5"
            >
              Browse Products Catalog
            </NuxtLink>
          </div>

          <div v-for="item in cartStore.items" :key="item.product.id" class="pt-4 first:pt-0 flex gap-4">
            <img :src="item.product.image_url" :alt="item.product.name" class="w-20 h-20 object-cover rounded-sm border border-slate-200 bg-slate-50 shrink-0" />
            
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-2">
                  <h4 class="font-bold text-slate-900 text-xs line-clamp-2">{{ item.product.name }}</h4>
                  <button @click="cartStore.removeFromCart(item.product.id)" class="text-slate-400 hover:text-rose-500 transition-colors">
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
                <span class="text-[11px] text-slate-400 font-medium capitalize">{{ item.product.category }}</span>
              </div>

              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center border border-slate-200 rounded-sm bg-slate-50">
                  <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)" class="px-2 py-0.5 text-xs font-bold text-slate-600">-</button>
                  <span class="px-2.5 text-xs font-bold text-slate-900">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)" class="px-2 py-0.5 text-xs font-bold text-slate-600">+</button>
                </div>
                <span class="font-black text-slate-900 text-sm">${{ (item.product.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Footer -->
        <div v-if="cartStore.items.length > 0" class="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
          <div class="space-y-1.5 text-xs text-slate-600">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span class="font-bold text-slate-900">${{ cartStore.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Enterprise Freight & Logistics</span>
              <span v-if="cartStore.shippingFee === 0" class="font-bold text-emerald-600 uppercase">FREE (Over $1k)</span>
              <span v-else class="font-bold text-slate-900">${{ cartStore.shippingFee.toFixed(2) }}</span>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-200 flex justify-between items-center">
            <span class="font-extrabold text-slate-900 text-base">Total Due</span>
            <span class="font-black text-amber-600 text-2xl">${{ cartStore.grandTotal.toFixed(2) }}</span>
          </div>

          <NuxtLink
            to="/checkout"
            @click="cartStore.toggleCart(false)"
            class="w-full solar-btn-accent py-3 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>Proceed to Checkout</span>
            <ArrowRightIcon class="w-4 h-4" />
          </NuxtLink>

          <button @click="cartStore.clearCart()" class="w-full text-center text-xs text-slate-400 hover:text-rose-500 pt-1">
            Clear Entire Cart
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ShoppingCart as ShoppingCartIcon, 
  X as XIcon, 
  ShoppingBag as ShoppingBagIcon, 
  Trash as TrashIcon, 
  ArrowRight as ArrowRightIcon 
} from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>
