<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar @toggle-cart="showCart = !showCart" />
    
    <div class="flex">
      <SideBar
        @filter-category="filterByCategory"
        @filter-price="filterByPrice"
        @filter-type="filterByType"
      />
      
      <main class="flex-1 p-6">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </main>
      
      <!-- Cart Sidebar -->
      <div 
        v-if="showCart"
        class="fixed right-0 top-0 w-96 h-full bg-white shadow-lg transform transition-transform z-50"
      >
        <div class="h-full flex flex-col">
          <div class="p-4 border-b flex justify-between items-center">
            <h2 class="text-lg font-semibold">Your Cart</h2>
            <button @click="showCart = false">
              <X class="w-6 h-6" />
            </button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-4">
            <!-- Purchase Items -->
            <div v-if="store.cart.length > 0" class="mb-6">
              <h3 class="font-medium mb-3">Items to Purchase</h3>
              <div v-for="item in store.cart" :key="item.id" class="flex items-center mb-4">
                <component :is="getProductIcon(item)" class="w-12 h-12 mr-4" />
                <div class="flex-1">
                  <h4 class="font-medium">{{ item.name }}</h4>
                  <p class="text-sm text-gray-500">${{ item.price }} × {{ item.quantity }}</p>
                </div>
                <button @click="store.removeFromCart(item.id)">
                  <Trash2 class="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
            
            <!-- Rental Items -->
            <div v-if="store.rentals.length > 0">
              <h3 class="font-medium mb-3">Rental Items</h3>
              <div v-for="item in store.rentals" :key="item.id" class="flex items-center mb-4">
                <component :is="getProductIcon(item)" class="w-12 h-12 mr-4" />
                <div class="flex-1">
                  <h4 class="font-medium">{{ item.name }}</h4>
                  <p class="text-sm text-gray-500">
                    ${{ item.rentalPrice }} × {{ item.duration }} {{ item.rentalPeriod }}(s)
                  </p>
                </div>
                <button @click="store.removeFromRentals(item.id)">
                  <Trash2 class="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
          
          <div class="p-4 border-t">
            <div class="mb-4">
              <div class="flex justify-between mb-2">
                <span>Purchase Subtotal:</span>
                <span>${{ store.cartTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Rental Subtotal:</span>
                <span>${{ store.rentalsTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-bold">
                <span>Total:</span>
                <span>${{ (store.cartTotal + store.rentalsTotal).toFixed(2) }}</span>
              </div>
            </div>
            <button 
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              @click="checkout"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { X, Trash2, Camera, Bike, Laptop } from 'lucide-vue-next';
import { useProductStore } from '@/stores/products';

const store = useProductStore();
const showCart = ref(false);

// Filters
const categoryFilter = ref('');
const priceFilter = ref(2000);
const typeFilters = ref({ buy: true, rent: true });

// Initialize store
store.initializeStore();

const filteredProducts = computed(() => {
  return store.products.filter(product => {
    // Category filter
    if (categoryFilter.value && product.category !== categoryFilter.value) {
      return false;
    }
    
    // Price filter
    if (product.price > priceFilter.value) {
      return false;
    }
    
    // Type filter
    const showBuyable = typeFilters.value.buy && product.type.includes('buy');
    const showRentable = typeFilters.value.rent && product.type.includes('rent');
    return showBuyable || showRentable;
  });
});

const getProductIcon = (product) => {
  switch (product.image) {
    case 'camera':
      return Camera;
    case 'bike':
      return Bike;
    case 'laptop':
      return Laptop;
    default:
      return Camera;
  }
};

// Filter methods
const filterByCategory = (category) => {
  categoryFilter.value = category;
};

const filterByPrice = (price) => {
  priceFilter.value = price;
};

const filterByType = (filters) => {
  typeFilters.value = filters;
};

const checkout = () => {
  // Implement checkout logic here
  alert('Checkout functionality would be implemented here');
};
</script>