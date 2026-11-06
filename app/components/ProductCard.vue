<template>
  <div class="solar-card group flex flex-col justify-between overflow-hidden">
    <div>
      <!-- Product Image & Category Badge -->
      <div class="relative h-56 bg-slate-100 overflow-hidden cursor-pointer" @click="$emit('select', product)">
        <img 
          :src="product.image_url" 
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2.5 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider bg-slate-900/90 text-white backdrop-blur-sm">
            {{ product.category }}
          </span>
        </div>
        <div v-if="product.stock < 10" class="absolute top-3 right-3">
          <span class="px-2.5 py-1 rounded-sm text-[11px] font-bold bg-amber-500 text-slate-950 shadow-md">
            Only {{ product.stock }} Left
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-3">
        <h3 
          @click="$emit('select', product)"
          class="font-bold text-slate-900 text-base line-clamp-2 cursor-pointer hover:text-amber-600 transition-colors"
        >
          {{ product.name }}
        </h3>

        <!-- Key Solar Specs Grid -->
        <div v-if="product.specs" class="mt-3 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-sm border border-slate-100">
          <div v-if="product.specs.wattage" class="flex flex-col">
            <span class="text-slate-400 font-semibold uppercase text-[10px]">Power Rating</span>
            <span class="font-extrabold text-slate-800">{{ product.specs.wattage }}</span>
          </div>
          <div v-if="product.specs.voltage" class="flex flex-col">
            <span class="text-slate-400 font-semibold uppercase text-[10px]">System Voltage</span>
            <span class="font-extrabold text-slate-800">{{ product.specs.voltage }}</span>
          </div>
          <div v-if="product.specs.capacity" class="flex flex-col">
            <span class="text-slate-400 font-semibold uppercase text-[10px]">Capacity</span>
            <span class="font-extrabold text-amber-600">{{ product.specs.capacity }}</span>
          </div>
          <div v-if="product.specs.efficiency" class="flex flex-col">
            <span class="text-slate-400 font-semibold uppercase text-[10px]">Efficiency</span>
            <span class="font-bold text-emerald-600">{{ product.specs.efficiency }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Pricing & Action -->
    <div class="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-100 mt-2">
      <div>
        <span class="text-xs text-slate-400 font-medium block">Price per Unit</span>
        <span class="text-xl font-black text-slate-900">${{ Number(product.price).toFixed(2) }}</span>
      </div>

      <button 
        @click="$emit('add-to-cart', product)"
        class="solar-btn-accent text-xs font-bold py-2.5 px-4 flex items-center gap-1.5 shadow-sm hover:shadow active:scale-95 transition-all"
      >
        <ShoppingCartIcon class="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCart as ShoppingCartIcon } from 'lucide-vue-next'
import type { Product } from '~/composables/useProducts'

defineProps<{
  product: Product
}>()

defineEmits(['select', 'add-to-cart'])
</script>
