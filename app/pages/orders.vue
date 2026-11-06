<template>
  <div class="py-16 sm:py-24 bg-slate-50 min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Order History & Tracking</h1>
          <p class="text-sm text-slate-500 mt-2">
            View your placed solar equipment dispatch requests and order receipts.
          </p>
        </div>
      </div>

      <!-- Empty Orders State -->
      <div v-if="ordersList.length === 0" class="bg-white p-12 lg:p-16 rounded-sm border border-slate-200 text-center space-y-4">
        <div class="w-16 h-16 rounded-sm bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <PackageXIcon class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-bold text-slate-900">No Previous Solar Orders Found</h3>
        <p class="text-xs text-slate-500">You haven't placed any equipment orders yet.</p>
        <NuxtLink to="/products" class="inline-block solar-btn-accent text-xs py-3 px-6 font-bold">
          Explore Solar Equipment Catalog
        </NuxtLink>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div 
          v-for="order in ordersList" 
          :key="order.id" 
          class="bg-white rounded-sm border border-slate-200/90 shadow-sm overflow-hidden hover:border-slate-300 transition-colors"
        >
          <!-- Order Header Bar -->
          <div class="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-sm bg-amber-500 text-slate-950 font-black flex items-center justify-center">
                <BoxIcon class="w-5 h-5" />
              </div>
              <div>
                <span class="font-bold text-sm block">Order #{{ order.id }}</span>
                <span class="text-slate-400 text-[11px]">{{ formatDate(order.created_at) }}</span>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span class="px-3 py-1 rounded-sm text-[11px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {{ order.status || 'Paid' }}
              </span>
              <span class="text-lg font-black text-amber-400">${{ Number(order.total_amount).toFixed(2) }}</span>
            </div>
          </div>

          <!-- Order Content Body -->
          <div class="p-6 lg:p-8 space-y-6">
            
            <!-- Address details -->
            <div v-if="order.shipping_address" class="text-xs text-slate-600 bg-slate-50 p-4 rounded-sm border border-slate-100">
              <span class="font-bold text-slate-900 block mb-1">Freight Destination:</span>
              <span><strong>{{ order.shipping_address.full_name }}</strong> ({{ order.shipping_address.email }}) — {{ order.shipping_address.address }}, {{ order.shipping_address.city }}, {{ order.shipping_address.state }} (Ph: {{ order.shipping_address.phone }})</span>
            </div>

            <!-- Itemized Products -->
            <div class="space-y-4 divide-y divide-slate-100">
              <div 
                v-for="item in (order.items || [])" 
                :key="item.id || item.product_id"
                class="pt-4 first:pt-0 flex items-center justify-between text-xs"
              >
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 shrink-0">
                    <SunIcon class="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 text-sm">
                      {{ item.product?.name || item.name || 'Goodeybest Solar Module' }}
                    </h4>
                    <span class="text-slate-400 text-xs">
                      Qty: {{ item.quantity }} × ${{ Number(item.unit_price || item.price || 0).toFixed(2) }}
                    </span>
                  </div>
                </div>

                <span class="font-black text-slate-900 text-sm">
                  ${{ (Number(item.unit_price || item.price || 0) * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  PackageX as PackageXIcon, 
  Box as BoxIcon,
  Sun as SunIcon 
} from 'lucide-vue-next'

const ordersList = ref<any[]>([])

onMounted(() => {
  if (import.meta.client) {
    const stored = localStorage.getItem('goodeybest_local_orders')
    if (stored) {
      try {
        ordersList.value = JSON.parse(stored)
      } catch (e) {
        ordersList.value = []
      }
    }
  }
})

const formatDate = (isoStr: string) => {
  if (!isoStr) return 'Recently Placed'
  return new Date(isoStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
