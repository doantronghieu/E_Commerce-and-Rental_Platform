<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <div class="relative">
      <component :is="getProductIcon" class="w-full h-48 object-cover mb-4" />
      <span 
        v-if="product.type.includes('rent')"
        class="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
      >
        Rentable
      </span>
    </div>
    
    <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
    <p class="text-gray-600 mb-4">{{ product.description }}</p>
    
    <div class="flex justify-between items-center mb-4">
      <div>
        <p class="text-lg font-bold">${{ product.price }}</p>
        <p v-if="product.type.includes('rent')" class="text-sm text-gray-500">
          Rent: ${{ product.rentalPrice }}/{{ product.rentalPeriod }}
        </p>
      </div>
      <span class="text-sm text-gray-500">
        Stock: {{ product.stock }}
      </span>
    </div>
    
    <div class="space-y-2">
      <button 
        v-if="product.type.includes('buy')"
        @click="addToCart"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
      >
        <ShoppingCart class="w-4 h-4 mr-2" />
        Add to Cart
      </button>
      
      <button 
        v-if="product.type.includes('rent')"
        @click="showRentalModal = true"
        class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center justify-center"
      >
        <Calendar class="w-4 h-4 mr-2" />
        Rent Now
      </button>
    </div>
    
    <!-- Rental Modal -->
    <div v-if="showRentalModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-96">
        <h4 class="text-lg font-semibold mb-4">Rent {{ product.name }}</h4>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Duration ({{ product.rentalPeriod }}s)
          </label>
          <input 
            type="number" 
            v-model="rentalDuration" 
            min="1" 
            class="w-full border rounded-md p-2"
          />
        </div>
        <div class="flex justify-between items-center mb-4">
          <span>Total: ${{ (product.rentalPrice * rentalDuration).toFixed(2) }}</span>
        </div>
        <div class="flex space-x-2">
          <button 
            @click="addToRentals"
            class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Confirm
          </button>
          <button 
            @click="showRentalModal = false"
            class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ShoppingCart, Calendar, Camera, Bike, Laptop } from 'lucide-vue-next';
import { useProductStore } from '@/stores/products';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const store = useProductStore();
const showRentalModal = ref(false);
const rentalDuration = ref(1);

const getProductIcon = computed(() => {
  switch (props.product.image) {
    case 'camera':
      return Camera;
    case 'bike':
      return Bike;
    case 'laptop':
      return Laptop;
    default:
      return Camera;
  }
});

const addToCart = () => {
  store.addToCart(props.product);
};

const addToRentals = () => {
  store.addToRentals(props.product, rentalDuration.value);
  showRentalModal.value = false;
  rentalDuration.value = 1;
};
</script>