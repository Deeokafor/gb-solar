<template>
  <div v-if="product" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
    <div class="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
      
      <!-- Header -->
      <div class="relative h-64 bg-slate-100">
        <img :src="product.image_url" :alt="product.name" class="w-full h-full object-cover" />
        <button 
          @click="$emit('close')"
          class="absolute top-4 right-4 w-9 h-9 rounded-sm bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
        >
          <XIcon class="w-5 h-5" />
        </button>
        <span class="absolute bottom-4 left-4 px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-sm shadow">
          {{ product.category }}
        </span>
      </div>

      <!-- Details -->
      <div class="p-6 sm:p-8 lg:p-10 space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">{{ product.name }}</h2>
          <p class="text-sm text-slate-500 mt-1">Enterprise Grade Solar Equipment | Model Ref: {{ product.slug }}</p>
        </div>

        <!-- Specifications Breakdown -->
        <div>
          <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Technical Specifications Sheet</h4>
          <div class="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-sm border border-slate-200/80">
            <div v-for="(val, key) in product.specs" :key="key" class="flex flex-col">
              <span class="text-[11px] font-semibold text-slate-400 capitalize">{{ String(key).replace('_', ' ') }}</span>
              <span class="text-sm font-bold text-slate-800">{{ val }}</span>
            </div>
          </div>
        </div>

        <!-- Warranty & Stock Info -->
        <div class="flex items-center justify-between text-xs text-slate-600 bg-amber-500/10 border border-amber-500/20 p-4 rounded-sm">
          <div class="flex items-center gap-2">
            <ShieldCheckIcon class="w-5 h-5 text-amber-600" />
            <span>Guaranteed Tier-1 Enterprise Factory Warranty Included</span>
          </div>
          <span class="font-bold text-slate-900">{{ product.stock }} Units Available</span>
        </div>

        <!-- Price & Quantity Add to Cart -->
        <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span class="text-xs text-slate-400 block font-medium">Unit Cost</span>
            <span class="text-3xl font-black text-slate-900">${{ Number(product.price).toFixed(2) }}</span>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <div class="flex items-center border border-slate-300 rounded-sm overflow-hidden bg-slate-50">
              <button @click="quantity = Math.max(1, quantity - 1)" class="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold">-</button>
              <span class="px-4 text-sm font-bold text-slate-900">{{ quantity }}</span>
              <button @click="quantity = Math.min(product.stock, quantity + 1)" class="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold">+</button>
            </div>

            <button 
              @click="handleAdd"
              class="solar-btn-accent flex-1 sm:flex-none py-3 px-6 text-sm font-bold flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon class="w-4 h-4" />
              <span>Add {{ quantity }} to Order</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X as XIcon, ShieldCheck as ShieldCheckIcon, ShoppingCart as ShoppingCartIcon } from 'lucide-vue-next'
import type { Product } from '~/composables/useProducts'

const props = defineProps<{
  product: Product | null
}>()

const emit = defineEmits(['close', 'add-to-cart'])

const quantity = ref(1)

watch(() => props.product, () => {
  quantity.value = 1
})

const handleAdd = () => {
  if (props.product) {
    emit('add-to-cart', props.product, quantity.value)
    emit('close')
  }
}
</script>
