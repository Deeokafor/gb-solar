<template>
  <div class="py-16 sm:py-24 bg-slate-50 min-h-screen">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div v-if="orderSummary" class="bg-white rounded-sm border border-slate-200 shadow-xl overflow-hidden">
        
        <!-- Header Banner -->
        <div class="bg-slate-900 text-white p-10 text-center space-y-4 relative overflow-hidden">
          <div class="w-16 h-16 rounded-sm bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <CheckCircleIcon class="w-10 h-10 stroke-[2.5]" />
          </div>
          <h1 class="text-3xl font-black">Solar Order Confirmed!</h1>
          <p class="text-xs text-slate-400 font-mono">Order Ref: #{{ orderSummary.orderId }}</p>
        </div>

        <div class="p-6 sm:p-8 lg:p-10 space-y-8">
          
          <!-- Email Dispatch Status Card -->
          <div class="p-5 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-2">
            <div class="flex items-center justify-between text-emerald-800 font-bold">
              <span class="flex items-center gap-2">
                <MailIcon class="w-4 h-4 text-emerald-600" />
                <span>Transactional Email Confirmation</span>
              </span>
              <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-sm text-[10px] font-bold">
                Receipt Ready
              </span>
            </div>
            <p class="text-slate-600 leading-relaxed">
              An itemized confirmation receipt has been dispatched to <strong>{{ orderSummary.shippingAddress?.email || 'your email' }}</strong>.
            </p>
          </div>

          <!-- Itemized Equipment List -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Itemized Equipment Summary</h3>
            <div class="bg-slate-50 rounded-sm p-5 border border-slate-200 space-y-4 divide-y divide-slate-200">
              <div v-for="item in orderSummary.items" :key="item.product?.id || item.productId" class="pt-3 first:pt-0 flex justify-between items-center text-xs">
                <div>
                  <span class="font-bold text-slate-900 block text-sm">{{ item.product?.name || 'Solar Equipment' }}</span>
                  <span class="text-slate-500">Qty: {{ item.quantity }} × ${{ (item.product?.price || item.unit_price).toFixed(2) }}</span>
                </div>
                <span class="font-black text-slate-900 text-sm">${{ ((item.product?.price || item.unit_price) * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Total Paid & Address -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div class="p-5 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
              <span class="text-slate-400 uppercase font-bold block mb-1">Freight Destination</span>
              <p class="text-slate-800 font-medium leading-relaxed">
                <strong>{{ orderSummary.shippingAddress?.full_name }}</strong><br/>
                {{ orderSummary.shippingAddress?.address }}<br/>
                {{ orderSummary.shippingAddress?.city }}, {{ orderSummary.shippingAddress?.state }}<br/>
                Phone: {{ orderSummary.shippingAddress?.phone }}
              </p>
            </div>

            <div class="p-5 rounded-sm bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <span class="text-amber-400 uppercase font-bold text-[10px] block">Settled Amount</span>
                <span class="text-3xl font-black text-white">${{ Number(orderSummary.totalAmount).toFixed(2) }}</span>
              </div>
              <span class="text-[11px] text-slate-400 mt-4 block">Order Status: Paid</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/orders" class="solar-btn-accent text-center font-bold text-xs py-3.5 px-6 flex-1">
              View Persistent Order History
            </NuxtLink>
            <NuxtLink to="/products" class="solar-btn-secondary text-center font-bold text-xs py-3.5 px-6 border border-slate-300">
              Back to Catalog
            </NuxtLink>
          </div>

        </div>

      </div>

      <div v-else class="text-center py-24 bg-white rounded-sm border border-slate-200">
        <p class="text-slate-500 text-sm">No recent order payload found in session.</p>
        <NuxtLink to="/products" class="mt-6 inline-block solar-btn-primary text-xs py-3 px-6 font-bold">
          Browse Products Catalog
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle as CheckCircleIcon, Mail as MailIcon } from 'lucide-vue-next'

const orderSummary = ref<any>(null)

onMounted(() => {
  if (import.meta.client) {
    const raw = sessionStorage.getItem('latest_order_result')
    if (raw) {
      try {
        orderSummary.value = JSON.parse(raw)
      } catch (e) {
        console.error(e)
      }
    }
  }
})
</script>
