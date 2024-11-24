<template>
  <div>
    <NavBar @toggle-cart="showCart = !showCart" />
    
    <!-- Hero Section -->
    <section class="relative bg-gray-900 text-white">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Buy or Rent Premium Products
          </h1>
          <p class="mt-6 text-xl max-w-3xl mx-auto">
            Discover our collection of high-quality products available for purchase or rental. 
            From professional equipment to adventure gear, we've got you covered.
          </p>
          <div class="mt-10">
            <NuxtLink 
              to="/products" 
              class="btn btn-primary text-lg px-8 py-3"
            >
              Browse Products
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Categories Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">Popular Categories</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="category in categories" 
            :key="category.name"
            class="card hover:shadow-lg transition-shadow cursor-pointer"
            @click="navigateToCategory(category.name)"
          >
            <div class="flex flex-col items-center">
              <component 
                :is="getIconComponent(category.icon)" 
                class="w-16 h-16 mb-4 text-blue-600"
              />
              <h3 class="text-xl font-semibold mb-2">{{ category.label }}</h3>
              <p class="text-gray-600 text-center">{{ category.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Products Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Featured Products</h2>
          <p class="text-gray-600">Our most popular items for purchase and rental</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink 
            to="/products" 
            class="btn btn-primary inline-flex items-center"
          >
            View All Products
            <ArrowRight class="ml-2 w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- How It Works Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <Search class="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 class="text-xl font-semibold mb-2">Browse Products</h3>
            <p class="text-gray-600">
              Explore our wide selection of products available for purchase or rental
            </p>
          </div>
          <div class="text-center">
            <ShoppingCart class="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 class="text-xl font-semibold mb-2">Choose Your Option</h3>
            <p class="text-gray-600">
              Select whether you want to buy or rent the product
            </p>
          </div>
          <div class="text-center">
            <Clock class="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 class="text-xl font-semibold mb-2">Set Duration</h3>
            <p class="text-gray-600">
              For rentals, choose how long you need the product
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Cart Sidebar -->
    <div 
      v-if="showCart"
      class="fixed right-0 top-0 w-96 h-full bg-white shadow-lg transform transition-transform z-50"
    >
      <!-- Cart content from products.vue -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProductStore } from '@/stores/products';
import { ArrowRight, Search, ShoppingCart, Clock, Camera, Bike, Laptop } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import categoriesData from '@/data/categories.json';

const store = useProductStore();
const router = useRouter();
const showCart = ref(false);

// Initialize store if not already initialized
store.initializeStore();

const categories = computed(() => categoriesData.categories);

// Function to get the icon component based on the icon name
const getIconComponent = (iconName) => {
  const iconMap = {
    laptop: Laptop,
    bike: Bike,
    camera: Camera
  };
  return iconMap[iconName];
};

// Get 3 featured products
const featuredProducts = computed(() => {
  return store.products.slice(0, 3);
});

const navigateToCategory = (category) => {
  router.push({
    path: '/products',
    query: { category }
  });
};
</script>

<style scoped>
.hero-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}
</style>