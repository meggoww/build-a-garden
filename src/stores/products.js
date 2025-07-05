import { defineStore } from "pinia";
import axios from "axios";
//import { discounts } from "../../data";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    // TODO: Replace with dynamic data from the database
    discounts: [],
  }),
  getters: {
    getAllFlowerProducts: (state) => {
      return state.products.filter(product => product.category === 'flower');
    },
    getAllTreeProducts: (state) => {
      return state.products.filter(product => product.category === 'tree');
    },
  },
  actions: {
    async fetchProducts() {
      const response = await axios.get("http://localhost:8000/api/products");
      this.products = response.data;
    },
    // TODO: Implement fetchAllDiscounts() action
    async fetchAllDiscounts() {
      const response = await axios.get("http://localhost:8000/api/discounts");
      this.discounts = response.data;
    },
    getProductDiscount(productId) {
       const discount = this.discounts.find(discount => discount.product_id === productId);
       return discount ? discount.discount_percentage : 0;
    }
  },
});
