<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold">RentBuy Store</h1>
          </div>
          
          <!-- Navigation Links -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink 
              to="/"
              class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2"
              active-class="border-indigo-500"
            >
              <Home class="w-4 h-4 mr-1" />
              Home
            </NuxtLink>
            <NuxtLink 
              to="/products"
              class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2"
              active-class="border-indigo-500"
            >
              <ShoppingBag class="w-4 h-4 mr-1" />
              Products
            </NuxtLink>
          </div>
        </div>
        
        <!-- Right Side Navigation -->
        <div class="flex items-center">
          <button 
            class="p-2 rounded-md text-gray-700 hover:text-gray-900"
            @click="$emit('toggle-cart')"
          >
            <ShoppingCart class="w-6 h-6" />
            <span class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {{ cartItemsCount }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Home, ShoppingBag, ShoppingCart } from 'lucide-vue-next';
import { useProductStore } from '@/stores/products';
import { computed } from 'vue';

const store = useProductStore();

const cartItemsCount = computed(() => {
  return store.cart.length + store.rentals.length;
});
</script>