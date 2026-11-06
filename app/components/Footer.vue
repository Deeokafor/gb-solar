<template>
  <footer class="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        
        <!-- Brand Info -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-sm bg-amber-500 flex items-center justify-center text-slate-950 font-black">
              <SunIcon class="w-5 h-5 stroke-[2.5]" />
            </div>
            <span class="font-extrabold text-white text-lg tracking-tight">GOODEYBEST <span class="text-amber-400">SOLAR</span></span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">
            West Africa’s premier enterprise supplier of Tier-1 solar panels, pure sine wave hybrid inverters, and high-capacity LiFePO4 battery storage systems.
          </p>
          <div class="flex items-center gap-3 pt-2 text-slate-300 text-xs font-medium">
            <span class="inline-flex items-center gap-1 text-emerald-400">
              <CheckCircleIcon class="w-4 h-4" /> 25-Yr Panel Warranty
            </span>
            <span class="inline-flex items-center gap-1 text-amber-400">
              <ShieldCheckIcon class="w-4 h-4" /> Tier-1 Certified
            </span>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white text-xs font-bold uppercase tracking-wider mb-4">Enterprise Catalog</h4>
          <ul class="space-y-2.5 text-xs">
            <li><NuxtLink to="/products?category=panel" class="hover:text-amber-400 transition-colors">Monocrystalline Panels</NuxtLink></li>
            <li><NuxtLink to="/products?category=inverter" class="hover:text-amber-400 transition-colors">Hybrid Solar Inverters</NuxtLink></li>
            <li><NuxtLink to="/products?category=battery" class="hover:text-amber-400 transition-colors">LiFePO4 Lithium Batteries</NuxtLink></li>
            <li><NuxtLink to="/products?category=accessory" class="hover:text-amber-400 transition-colors">Charge Controllers & Cable Kits</NuxtLink></li>
          </ul>
        </div>

        <!-- Support & Security -->
        <div>
          <h4 class="text-white text-xs font-bold uppercase tracking-wider mb-4">Customer Care</h4>
          <ul class="space-y-2.5 text-xs">
            <li><NuxtLink to="/orders" class="hover:text-amber-400 transition-colors">Track Order History</NuxtLink></li>
            <li><a href="#" @click.prevent="$emit('open-calculator')" class="hover:text-amber-400 transition-colors">Solar Capacity Sizing Guide</a></li>
            <li><span class="text-slate-500">24/7 Technical Dispatch Support</span></li>
          </ul>
        </div>

        <!-- Contact & Location -->
        <div>
          <h4 class="text-white text-xs font-bold uppercase tracking-wider mb-4">Headquarters</h4>
          <div class="space-y-3 text-xs">
            <p class="flex items-start gap-2">
              <MapPinIcon class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Goodeybest Solar Enterprise Tower, Energy District, Lagos, Nigeria</span>
            </p>
            <p class="flex items-center gap-2">
              <PhoneIcon class="w-4 h-4 text-amber-400 shrink-0" />
              <span>+234 (0) 800-GOODEYBEST</span>
            </p>
            <p class="flex items-center gap-2">
              <MailIcon class="w-4 h-4 text-amber-400 shrink-0" />
              <span>orders@goodeybest-solar.com</span>
            </p>
          </div>
        </div>

      </div>

      <!-- Copyright -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {{ new Date().getFullYear() }} Goodeybest Solar Enterprise. Powered by Vue 3 & Nuxt 3.</p>
        <div class="flex items-center gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Sale</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { 
  Sun as SunIcon, 
  CheckCircle as CheckCircleIcon, 
  ShieldCheck as ShieldCheckIcon, 
  MapPin as MapPinIcon, 
  Phone as PhoneIcon, 
  Mail as MailIcon 
} from 'lucide-vue-next'

defineEmits(['open-calculator'])
</script>
