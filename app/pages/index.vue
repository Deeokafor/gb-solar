<template>
  <div>
    
    <!-- Hero Section -->
    <section class="relative bg-slate-900 text-white overflow-hidden py-24 lg:py-32">
      <!-- Glow Gradients -->
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-sm blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-10 w-72 h-72 bg-amber-600/10 rounded-sm blur-2xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div class="space-y-8 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <ZapIcon class="w-4 h-4 text-amber-400" />
              <span>West Africa’s Trusted Solar Distributorship</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Engineered for <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Uninterrupted</span> Solar Power.
            </h1>

            <p class="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Equip your residence, commercial facility, or industrial site with Tier-1 Monocrystalline panels, High-Efficiency hybrid inverters, and Grade A+ LiFePO4 energy storage.
            </p>

            <div class="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <NuxtLink to="/products" class="w-full sm:w-auto solar-btn-accent py-4 px-8 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20">
                <span>Explore Catalog & Pricing</span>
                <ArrowRightIcon class="w-4 h-4" />
              </NuxtLink>

              <button @click="$emit('open-calculator')" class="w-full sm:w-auto solar-btn-secondary py-4 px-6 font-bold text-sm bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white flex items-center justify-center gap-2 border border-slate-700">
                <CalculatorIcon class="w-4 h-4 text-amber-400" />
                <span>Calculate Solar Sizing</span>
              </button>
            </div>

            <!-- Trust Metrics -->
            <div class="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <span class="text-3xl font-black text-white block">25+ Yrs</span>
                <span class="text-xs text-slate-400 font-medium">Panel Output Warranty</span>
              </div>
              <div>
                <span class="text-3xl font-black text-amber-400 block">6,000+</span>
                <span class="text-xs text-slate-400 font-medium">LiFePO4 Cycle Life</span>
              </div>
              <div>
                <span class="text-3xl font-black text-white block">98.5%</span>
                <span class="text-xs text-slate-400 font-medium">Inverter Efficiency</span>
              </div>
            </div>

          </div>

          <!-- Hero Image & Equipment Preview -->
          <div class="relative">
            <div class="relative rounded-sm overflow-hidden shadow-2xl border border-slate-800 bg-slate-800">
              <img 
                src="https://s.alicdn.com/@sc04/kf/Hb1fa31650d9a49c09ed2b5d7af397e77E.jpg?avif=close&webp=close" 
                alt="Solar Panel Installation"
                class="w-full h-[460px] object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
              
              <!-- Floating Specification Badge -->
              <div class="absolute bottom-6 left-6 right-6 p-5 rounded-sm glass-panel text-slate-900 border border-white/40 shadow-xl flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block">Featured Hardware</span>
                  <span class="font-extrabold text-sm text-slate-900">OEM/ODM LP2100 LIFEPO4 Battery 15KWh 51.2V 280Ah/300Ah 6000 Cycles Support CAN/RS485 Low Voltage Lithium Battery</span>
                </div>
                <NuxtLink to="/products" class="solar-btn-primary py-2.5 px-4 text-xs font-bold">
                  View Specs
                </NuxtLink>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Solar Categories Grid -->
    <section class="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-2">Equipment Directory</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900">Enterprise Clean Energy Categories</h2>
          </div>
          <NuxtLink to="/products" class="text-sm font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1 mt-4 md:mt-0">
            <span>Browse All Equipment</span>
            <ArrowRightIcon class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <NuxtLink to="/products?category=panel" class="solar-card p-8 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div class="w-14 h-14 rounded-sm bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <SunIcon class="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 class="font-bold text-slate-900 text-xl">Solar Panels</h3>
              <p class="text-xs text-slate-500 mt-2 leading-relaxed">High-efficiency 550W & 670W Monocrystalline PERC & TOPCon modules.</p>
            </div>
            <span class="text-xs font-extrabold text-amber-600 flex items-center gap-1 mt-8">Explore Panels →</span>
          </NuxtLink>

          <NuxtLink to="/products?category=inverter" class="solar-card p-8 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div class="w-14 h-14 rounded-sm bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <CpuIcon class="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 class="font-bold text-slate-900 text-xl">Hybrid Inverters</h3>
              <p class="text-xs text-slate-500 mt-2 leading-relaxed">Pure sine wave 5.5kW & 10kW smart hybrid grid-tied inverters.</p>
            </div>
            <span class="text-xs font-extrabold text-amber-600 flex items-center gap-1 mt-8">Explore Inverters →</span>
          </NuxtLink>

          <NuxtLink to="/products?category=battery" class="solar-card p-8 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div class="w-14 h-14 rounded-sm bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <BatteryChargingIcon class="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 class="font-bold text-slate-900 text-xl">Lithium Storage</h3>
              <p class="text-xs text-slate-500 mt-2 leading-relaxed">Grade A+ 5.12kWh & 10.24kWh LiFePO4 high-discharge battery banks.</p>
            </div>
            <span class="text-xs font-extrabold text-amber-600 flex items-center gap-1 mt-8">Explore Storage →</span>
          </NuxtLink>

          <NuxtLink to="/products?category=accessory" class="solar-card p-8 flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div class="w-14 h-14 rounded-sm bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <SlidersIcon class="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 class="font-bold text-slate-900 text-xl">Controllers & Kits</h3>
              <p class="text-xs text-slate-500 mt-2 leading-relaxed">100A MPPT charge controllers, UV-rated 6mm² cables, and MC4 connectors.</p>
            </div>
            <span class="text-xs font-extrabold text-amber-600 flex items-center gap-1 mt-8">Explore Accessories →</span>
          </NuxtLink>

        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-20 lg:py-28 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex items-center justify-between mb-12">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-2">Top Sellers</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900">Featured High-Capacity Equipment</h2>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product"
            @select="selectedProduct = $event"
            @add-to-cart="cartStore.addToCart($event, 1)"
          />
        </div>

      </div>
    </section>

    <!-- Modal for Selected Product Details -->
    <ProductModal 
      :product="selectedProduct" 
      @close="selectedProduct = null" 
      @add-to-cart="cartStore.addToCart($event.product, $event.quantity)"
    />

  </div>
</template>

<script setup lang="ts">
import { 
  Zap as ZapIcon, 
  ArrowRight as ArrowRightIcon, 
  Calculator as CalculatorIcon, 
  Sun as SunIcon, 
  Cpu as CpuIcon, 
  BatteryCharging as BatteryChargingIcon, 
  Sliders as SlidersIcon 
} from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useProducts, type Product } from '~/composables/useProducts'

defineEmits(['open-calculator'])

const cartStore = useCartStore()
const { getProducts } = useProducts()

const selectedProduct = ref<Product | null>(null)
const featuredProducts = computed(() => getProducts().slice(0, 4))
</script>
