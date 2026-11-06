<template>
  <div class="py-16 sm:py-24 bg-slate-50 min-h-screen">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="mb-10">
        <NuxtLink to="/products" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-3">
          <ArrowLeftIcon class="w-4 h-4" />
          <span>Back to Equipment Catalog</span>
        </NuxtLink>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Checkout & Dispatch Request</h1>
        <p class="text-sm text-slate-500 mt-2">Review order specs, enter delivery address, and place order</p>
      </div>

      <div v-if="cartStore.items.length === 0" class="bg-white p-12 lg:p-16 rounded-sm border border-slate-200 text-center space-y-4">
        <div class="w-16 h-16 rounded-sm bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <ShoppingCartIcon class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-bold text-slate-900">Your cart is empty</h3>
        <p class="text-xs text-slate-500">Please add solar panels, inverters, or battery equipment before checking out.</p>
        <NuxtLink to="/products" class="inline-block solar-btn-accent text-xs py-3 px-6 font-bold">
          Browse Solar Products
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        <!-- Left: Form -->
        <div class="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 rounded-sm border border-slate-200 shadow-sm space-y-8">
          
          <!-- Shipping Form -->
          <form @submit.prevent="handleCheckout" class="space-y-6">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
              1. Delivery & Contact Details
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5">Full Receiver Name *</label>
                <input 
                  v-model="shippingAddress.full_name" 
                  type="text" 
                  required 
                  placeholder="e.g. Engr. Divine Okafor" 
                  class="w-full px-4 py-3 rounded-sm border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:bg-white bg-slate-50"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5">Email Receipt Destination *</label>
                <input 
                  v-model="shippingAddress.email" 
                  type="email" 
                  required 
                  placeholder="e.g. divine@example.com" 
                  class="w-full px-4 py-3 rounded-sm border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:bg-white bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">Destination Address / Installation Site *</label>
              <input 
                v-model="shippingAddress.address" 
                type="text" 
                required 
                placeholder="e.g. Plot 14, Commercial Solar Way, Victoria Island" 
                class="w-full px-4 py-3 rounded-sm border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:bg-white bg-slate-50"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5">City / Region *</label>
                <input 
                  v-model="shippingAddress.city" 
                  type="text" 
                  required 
                  placeholder="e.g. Ikeja" 
                  class="w-full px-4 py-3 rounded-sm border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:bg-white bg-slate-50"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5">State / Country *</label>
                <input 
                  v-model="shippingAddress.state" 
                  type="text" 
                  required 
                  placeholder="e.g. Lagos, Nigeria" 
                  class="w-full px-4 py-3 rounded-sm border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:bg-white bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">Dispatch Phone Number *</label>
              <input 
                v-model="shippingAddress.phone" 
                type="tel" 
                required 
                placeholder="e.g. +234 801 234 5678" 
                class="w-full px-4 py-3 rounded-sm border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:bg-white bg-slate-50"
              />
            </div>

            <!-- Payment Settlement Section -->
            <div class="pt-4 space-y-4">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
                2. Order Settlement
              </h3>
              <div class="p-4 rounded-sm bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between">
                <div class="flex items-center gap-2 text-slate-900 font-semibold">
                  <CreditCardIcon class="w-5 h-5 text-amber-600" />
                  <span>Enterprise Purchase Order / Instant Settlement</span>
                </div>
                <span class="font-bold text-emerald-700 uppercase text-[10px] bg-emerald-100 px-2 py-0.5 rounded-sm">Verified</span>
              </div>
            </div>

            <button 
              type="submit" 
              :disabled="isProcessing"
              class="w-full solar-btn-accent py-4 font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mt-8 disabled:opacity-50"
            >
              <Loader2Icon v-if="isProcessing" class="w-5 h-5 animate-spin" />
              <span v-else>Confirm & Place Solar Order (${{ cartStore.grandTotal.toFixed(2) }})</span>
            </button>

            <p class="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-2">
              <ShieldCheckIcon class="w-4 h-4 text-amber-500" />
              <span>Instant order confirmation and receipt dispatch.</span>
            </p>
          </form>

        </div>

        <!-- Right: Order Summary Sidebar -->
        <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
          <h3 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-4">
            Equipment Summary ({{ cartStore.totalItems }} items)
          </h3>

          <div class="space-y-4 max-h-80 overflow-y-auto divide-y divide-slate-100">
            <div v-for="item in cartStore.items" :key="item.product.id" class="pt-3 first:pt-0 flex gap-3">
              <img :src="item.product.image_url" :alt="item.product.name" class="w-14 h-14 object-cover rounded-sm border border-slate-200 bg-slate-50 shrink-0" />
              <div class="flex-1">
                <h4 class="font-bold text-slate-900 text-xs line-clamp-1">{{ item.product.name }}</h4>
                <div class="text-[11px] text-slate-400">Qty: {{ item.quantity }} × ${{ item.product.price.toFixed(2) }}</div>
                <div class="font-black text-slate-900 text-xs mt-0.5">${{ (item.product.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>
          </div>

          <!-- Total Calculation -->
          <div class="pt-4 border-t border-slate-200 space-y-2.5 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>Items Subtotal</span>
              <span class="font-bold text-slate-900">${{ cartStore.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>Freight & Delivery</span>
              <span v-if="cartStore.shippingFee === 0" class="font-bold text-emerald-600">FREE</span>
              <span v-else class="font-bold text-slate-900">${{ cartStore.shippingFee.toFixed(2) }}</span>
            </div>
            <div class="pt-4 border-t border-slate-200 flex justify-between items-center text-sm font-black">
              <span>Total Payable</span>
              <span class="text-2xl text-amber-600">${{ cartStore.grandTotal.toFixed(2) }}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowLeft as ArrowLeftIcon, 
  ShoppingCart as ShoppingCartIcon, 
  CreditCard as CreditCardIcon, 
  ShieldCheck as ShieldCheckIcon,
  Loader2 as Loader2Icon
} from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const router = useRouter()

const isProcessing = ref(false)

const shippingAddress = reactive({
  full_name: '',
  email: '',
  address: '',
  city: 'Lagos',
  state: 'Lagos, Nigeria',
  phone: ''
})

const handleCheckout = async () => {
  isProcessing.value = true

  try {
    const orderId = 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase()
    const newOrder = {
      id: orderId,
      created_at: new Date().toISOString(),
      total_amount: cartStore.grandTotal,
      status: 'Paid',
      shipping_address: { ...shippingAddress },
      items: cartStore.items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
        product: { ...item.product }
      }))
    }

    // Save order in local storage for order history persistence
    if (import.meta.client) {
      const existing = JSON.parse(localStorage.getItem('goodeybest_local_orders') || '[]')
      existing.unshift(newOrder)
      localStorage.setItem('goodeybest_local_orders', JSON.stringify(existing))
      sessionStorage.setItem('latest_order_result', JSON.stringify({
        orderId,
        totalAmount: cartStore.grandTotal,
        emailResult: { status: 'dispatched' },
        items: [...cartStore.items],
        shippingAddress: { ...shippingAddress }
      }))
    }

    // Clear cart state
    cartStore.clearCart()

    router.push('/confirmation')
  } catch (err: any) {
    alert('Checkout Error: ' + (err.message || 'Failed to place order'))
  } finally {
    isProcessing.value = false
  }
}
</script>
