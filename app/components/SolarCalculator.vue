<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
    <div class="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
      
      <!-- Header -->
      <div class="p-6 bg-slate-900 text-white flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-sm bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <CalculatorIcon class="w-6 h-6" />
          </div>
          <div>
            <h3 class="font-extrabold text-lg">Solar Load & Sizing Calculator</h3>
            <p class="text-xs text-slate-400">Estimate your daily energy needs and build a custom solar package</p>
          </div>
        </div>
        <button @click="$emit('close')" class="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800">
          <XIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Form & Calculation -->
      <div class="p-6 sm:p-8 space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1.5">Property Type</label>
            <select v-model="propertyType" class="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-sm font-semibold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500">
              <option value="residential_small">Small Home / Apartment (2-3 Bedroom)</option>
              <option value="residential_large">Large Residence / Villa (4-6 Bedroom)</option>
              <option value="commercial">Commercial Office / Enterprise Facility</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1.5">Estimated Heavy Appliances</label>
            <div class="flex items-center gap-4 text-xs font-semibold">
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" v-model="hasAirCon" class="rounded-sm text-amber-500 focus:ring-amber-400" />
                <span>Air Conditioners</span>
              </label>
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" v-model="hasPump" class="rounded-sm text-amber-500 focus:ring-amber-400" />
                <span>Water Pump</span>
              </label>
            </div>
          </div>

        </div>

        <!-- Calculated Requirements -->
        <div class="bg-slate-900 text-white p-6 rounded-sm space-y-4">
          <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider">Recommended Solar Architecture</h4>
          
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-slate-800/80 p-3 rounded-sm border border-slate-700">
              <span class="text-[10px] text-slate-400 uppercase font-bold block">Solar Array</span>
              <span class="text-lg font-black text-amber-400">{{ calculatedPanelsQty }}x 550W Panels</span>
              <span class="text-[11px] text-slate-400 block mt-0.5">({{ (calculatedPanelsQty * 550 / 1000).toFixed(1) }}kW Total)</span>
            </div>

            <div class="bg-slate-800/80 p-3 rounded-sm border border-slate-700">
              <span class="text-[10px] text-slate-400 uppercase font-bold block">Inverter Rating</span>
              <span class="text-lg font-black text-white">{{ recommendedInverter?.specs?.wattage || '5.5kW' }}</span>
              <span class="text-[11px] text-slate-400 block mt-0.5">Pure Sine Wave</span>
            </div>

            <div class="bg-slate-800/80 p-3 rounded-sm border border-slate-700">
              <span class="text-[10px] text-slate-400 uppercase font-bold block">Battery Bank</span>
              <span class="text-lg font-black text-emerald-400">{{ recommendedBattery?.specs?.capacity || '5.12kWh' }}</span>
              <span class="text-[11px] text-slate-400 block mt-0.5">LiFePO4 Storage</span>
            </div>
          </div>

          <div class="pt-2 flex items-center justify-between text-xs text-slate-300">
            <span>Estimated Package Price: <strong class="text-amber-400 text-base ml-1">${{ totalPackagePrice.toFixed(2) }}</strong></span>
            <button 
              @click="addAllToCart" 
              class="solar-btn-accent text-xs font-bold py-2 px-4 flex items-center gap-1.5 shadow"
            >
              <ShoppingCartIcon class="w-4 h-4" />
              <span>Add Package to Cart</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calculator as CalculatorIcon, X as XIcon, ShoppingCart as ShoppingCartIcon } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useProducts } from '~/composables/useProducts'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
const cartStore = useCartStore()
const { products } = useProducts()

const propertyType = ref('residential_small')
const hasAirCon = ref(true)
const hasPump = ref(false)

const calculatedPanelsQty = computed(() => {
  let qty = 6
  if (propertyType.value === 'residential_large') qty = 12
  if (propertyType.value === 'commercial') qty = 24
  if (hasAirCon.value) qty += 4
  if (hasPump.value) qty += 2
  return qty
})

const recommendedInverter = computed(() => {
  if (calculatedPanelsQty.value > 15) {
    return products.find(p => p.id === '44444444-4444-4444-4444-444444444444') || products[2]
  }
  return products.find(p => p.id === '33333333-3333-3333-3333-333333333333') || products[2]
})

const recommendedBattery = computed(() => {
  if (calculatedPanelsQty.value > 15) {
    return products.find(p => p.id === '66666666-6666-6666-6666-666666666666') || products[4]
  }
  return products.find(p => p.id === '55555555-5555-5555-5555-555555555555') || products[4]
})

const totalPackagePrice = computed(() => {
  const panelPrice = (products[0]?.price || 0) * calculatedPanelsQty.value
  return panelPrice + (recommendedInverter.value?.price || 0) + (recommendedBattery.value?.price || 0)
})

const addAllToCart = () => {
  if (products[0]) {
    cartStore.addToCart(products[0], calculatedPanelsQty.value)
  }
  if (recommendedInverter.value) cartStore.addToCart(recommendedInverter.value, 1)
  if (recommendedBattery.value) cartStore.addToCart(recommendedBattery.value, 1)
  cartStore.toggleCart(true)
  emit('close')
}
</script>
