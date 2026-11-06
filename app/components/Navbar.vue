<template>
  <header class="sticky top-0 z-40 bg-slate-900/95 text-white backdrop-blur-md border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-sm bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <SunIcon class="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div class="flex items-center gap-1.5 font-extrabold text-xl tracking-tight">
              <span>GOODEYBEST</span>
              <span class="text-amber-400">SOLAR</span>
            </div>
            <div class="text-[10px] tracking-widest text-slate-400 font-semibold uppercase">Enterprise Energy Store</div>
          </div>
        </NuxtLink>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink to="/" class="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors" active-class="text-amber-400 font-semibold">
            Home
          </NuxtLink>
          <NuxtLink to="/products" class="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors" active-class="text-amber-400 font-semibold">
            Products Catalog
          </NuxtLink>
          <button @click="$emit('open-calculator')" class="flex items-center gap-1.5 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors bg-amber-500/10 px-3.5 py-1.5 rounded-sm border border-amber-500/20">
            <CalculatorIcon class="w-4 h-4 text-amber-400" />
            <span>Solar Sizing Calculator</span>
          </button>
          <NuxtLink to="/orders" class="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors" active-class="text-amber-400 font-semibold">
            Order History
          </NuxtLink>
        </nav>

        <!-- Right Action Buttons -->
        <div class="flex items-center gap-4">
          <!-- Cart Drawer Button -->
          <button 
            @click="cartStore.toggleCart(true)"
            class="relative flex items-center justify-center p-2.5 rounded-sm bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
            aria-label="Shopping Cart"
          >
            <ShoppingCartIcon class="w-5 h-5" />
            <span 
              v-if="cartStore.totalItems > 0"
              class="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-sm flex items-center justify-center shadow-md"
            >
              {{ cartStore.totalItems }}
            </span>
          </button>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { 
  Sun as SunIcon, 
  ShoppingCart as ShoppingCartIcon, 
  Calculator as CalculatorIcon 
} from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

defineEmits(['open-calculator'])

const cartStore = useCartStore()
</script>
