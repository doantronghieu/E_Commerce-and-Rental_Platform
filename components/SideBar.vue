<template>
  <div class="w-64 h-full bg-white shadow-md">
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-4">Categories</h2>
      <ul class="space-y-2">
        <li 
          v-for="category in categories" 
          :key="category.name"
          class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
          @click="$emit('filter-category', category.name)"
        >
          <component :is="category.icon" class="w-5 h-5" />
          <span>{{ category.label }}</span>
        </li>
      </ul>
    </div>
    
    <div class="p-4 border-t">
      <h2 class="text-lg font-semibold mb-4">Price Range</h2>
      <div class="space-y-2">
        <input 
          type="range" 
          v-model="priceRange" 
          min="0" 
          max="2000" 
          class="w-full"
          @input="$emit('filter-price', priceRange)"
        />
        <div class="flex justify-between">
          <span>$0</span>
          <span>${{ priceRange }}</span>
        </div>
      </div>
    </div>
    
    <div class="p-4 border-t">
      <h2 class="text-lg font-semibold mb-4">Type</h2>
      <div class="space-y-2">
        <label class="flex items-center space-x-2">
          <input 
            type="checkbox" 
            v-model="filters.buy"
            @change="$emit('filter-type', filters)"
          />
          <span>Buy</span>
        </label>
        <label class="flex items-center space-x-2">
          <input 
            type="checkbox" 
            v-model="filters.rent"
            @change="$emit('filter-type', filters)"
          />
          <span>Rent</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Laptop, Bike, Camera } from 'lucide-vue-next';

const categories = [
  { name: 'electronics', label: 'Electronics', icon: Laptop },
  { name: 'sports', label: 'Sports', icon: Bike },
  { name: 'photography', label: 'Photography', icon: Camera }
];

const priceRange = ref(2000);
const filters = ref({
  buy: true,
  rent: true
});
</script>