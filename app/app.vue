<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
    
    <!-- Navbar Navigation -->
    <Navbar 
      @open-calculator="isCalculatorOpen = true" 
    />

    <!-- Main Page Content -->
    <main class="flex-1">
      <NuxtPage @open-calculator="isCalculatorOpen = true" />
    </main>

    <!-- Footer -->
    <Footer 
      @open-calculator="isCalculatorOpen = true" 
    />

    <!-- Global Cart Drawer -->
    <CartDrawer />

    <!-- Solar Load Calculator Modal -->
    <SolarCalculator 
      :is-open="isCalculatorOpen" 
      @close="isCalculatorOpen = false" 
    />

  </div>
</template>

<script setup lang="ts">
const isCalculatorOpen = ref(false)
</script>
