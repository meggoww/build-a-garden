import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),
  getters: {
    getAllFlowerProducts: (state) => {
      return state.products.filter(product => product.category === 'flower');
    },
    getAllTreeProducts: (state) => {
      return state.products.filter(product => product.category === 'tree');
    }
  },
  actions: {
    async fetchProducts() {
      const response = await axios.get("http://localhost:8000/api/products");
      console.log(response);
      this.products = response.data;
    }
  },
});
