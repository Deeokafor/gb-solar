<template>
  <div class="py-16 sm:py-24 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <div class="mb-12 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Solar Equipment Catalog</h1>
          <p class="text-sm text-slate-500 mt-2">Browse Tier-1 solar panels, pure sine inverters, LiFePO4 batteries, and charge controllers</p>
        </div>

        <button @click="$emit('open-calculator')" class="solar-btn-secondary py-3 px-5 text-xs font-bold flex items-center gap-2 border border-slate-300">
          <CalculatorIcon class="w-4 h-4 text-amber-500" />
          <span>Launch Solar Load Calculator</span>
        </button>
      </div>

      <!-- Filters & Search Bar -->
      <div class="bg-white p-6 rounded-sm shadow-sm border border-slate-200/80 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <!-- Category Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button 
            v-for="cat in categories" 
            :key="cat.value"
            @click="selectedCategory = cat.value"
            class="px-4 py-2.5 rounded-sm text-xs font-bold whitespace-nowrap transition-all"
            :class="selectedCategory === cat.value ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Search & Sort -->
        <div class="flex items-center gap-4 w-full md:w-auto">
          <div class="relative flex-1 md:w-72">
            <SearchIcon class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search specs or names..." 
              class="w-full pl-10 pr-4 py-2.5 rounded-sm border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 focus:bg-white"
            />
            <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
              <XIcon class="w-3.5 h-3.5" />
            </button>
          </div>

          <select v-model="sortBy" class="px-4 py-2.5 rounded-sm border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500">
            <option value="default">Default Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Product Name</option>
          </select>
        </div>

      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length === 0" class="text-center py-24 bg-white rounded-sm border border-slate-200">
        <div class="w-16 h-16 rounded-sm bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <SearchIcon class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-bold text-slate-900">No Equipment Matching Query</h3>
        <p class="text-xs text-slate-500 mt-2">Try clearing your search query or selecting a different equipment category.</p>
        <button @click="resetFilters" class="mt-6 solar-btn-secondary text-xs py-2.5 px-5 font-bold">
          Reset All Filters
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product"
          @select="selectedProduct = $event"
          @add-to-cart="cartStore.addToCart($event, 1)"
        />
      </div>

    </div>

    <!-- Product Spec Sheet Modal -->
    <ProductModal 
      :product="selectedProduct" 
      @close="selectedProduct = null" 
      @add-to-cart="cartStore.addToCart($event.product, $event.quantity)"
    />

  </div>
</template>

<script setup lang="ts">
import { Search as SearchIcon, X as XIcon, Calculator as CalculatorIcon } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useProducts, type Product } from '~/composables/useProducts'

defineEmits(['open-calculator'])

const route = useRoute()
const cartStore = useCartStore()
const { getProducts } = useProducts()

const selectedProduct = ref<Product | null>(null)
const selectedCategory = ref((route.query.category as string) || 'all')
const searchQuery = ref('')
const sortBy = ref('default')

const categories = [
  { label: 'All Equipment', value: 'all' },
  { label: 'Solar Panels', value: 'panel' },
  { label: 'Hybrid Inverters', value: 'inverter' },
  { label: 'LiFePO4 Batteries', value: 'battery' },
  { label: 'Accessories', value: 'accessory' }
]

const filteredProducts = computed(() => {
  let list = getProducts(selectedCategory.value, searchQuery.value)

  if (sortBy.value === 'price-asc') {
    list.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    list.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name))
  }

  return list
})

const resetFilters = () => {
  selectedCategory.value = 'all'
  searchQuery.value = ''
  sortBy.value = 'default'
}

watch(() => route.query.category, (newCat) => {
  if (newCat) selectedCategory.value = newCat as string
})
</script>
