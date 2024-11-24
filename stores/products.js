import { defineStore } from "pinia";
import products from "@/data/products.json";

export const useProductStore = defineStore("products", {
	state: () => ({
		products: [],
		cart: [],
		rentals: [],
	}),

	getters: {
		getProducts: (state) => state.products,
		getCart: (state) => state.cart,
		getRentals: (state) => state.rentals,

		cartTotal: (state) => {
			return state.cart.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);
		},

		rentalsTotal: (state) => {
			return state.rentals.reduce(
				(total, item) => total + item.rentalPrice * item.duration,
				0
			);
		},
	},

	actions: {
		initializeStore() {
			this.products = products.products;
		},

		addToCart(product, quantity = 1) {
			const existingItem = this.cart.find((item) => item.id === product.id);
			if (existingItem) {
				existingItem.quantity += quantity;
			} else {
				this.cart.push({ ...product, quantity });
			}
		},

		addToRentals(product, duration = 1) {
			const rentalItem = {
				...product,
				duration,
				totalPrice: product.rentalPrice * duration,
			};
			this.rentals.push(rentalItem);
		},

		removeFromCart(productId) {
			const index = this.cart.findIndex((item) => item.id === productId);
			if (index > -1) {
				this.cart.splice(index, 1);
			}
		},

		removeFromRentals(productId) {
			const index = this.rentals.findIndex((item) => item.id === productId);
			if (index > -1) {
				this.rentals.splice(index, 1);
			}
		},

		clearCart() {
			this.cart = [];
		},

		clearRentals() {
			this.rentals = [];
		},
	},
});
