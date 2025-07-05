<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart';
import { useProductsStore } from '@/stores/products';

const cartStore = useCartStore()
const productsStore = useProductsStore()
const { addItem } = cartStore

const listOfTrees = computed(() => productsStore.getAllTreeProducts);

const hasDiscount = (productId) => {
    return productsStore.discounts.some(d => d.product_id === productId);
    return discount ? true : false;
  }

const calculatePriceWithDiscount = (price, discountFraction) => {
    const discountedPrice = price * (1 - discountFraction); // Use fraction directly
    return discountedPrice.toFixed(2); // Return string, formatted nicely
  }


</script>

<template>
  <v-card>
    <v-app-bar color="primary">
      <v-toolbar-title>Tree Selection</v-toolbar-title>
    </v-app-bar>
  </v-card>

  <div class="menu">
    <v-card v-for="tree in listOfTrees" :key="tree.name" class="mx-auto" max-width="344" variant="tonal">
      <v-img :src="tree.image" max-height="300" cover />
      <v-card-title class="title-row">
        <span class="product-name">{{ tree.name }}</span>
        <span
          v-if="hasDiscount(tree.product_id)"
          class="discount-badge">-{{ (productsStore.getProductDiscount(tree.product_id) * 100).toFixed(0) }}%
        </span>
      </v-card-title>


      <div v-if="hasDiscount(tree.product_id)" class="price-info"> 
        <div>
        <div class="original-price-label">
          <strong>Original Price:</strong>
          <s>${{ tree.price.toFixed(2) }}</s>
        </div>
        <div class="discounted-price-label">
          <strong>Discounted Price:</strong>
          <span class="discounted-price">
            ${{ calculatePriceWithDiscount(tree.price, productsStore.getProductDiscount(tree.product_id)) }}
              </span>
            </div>
          </div>
        </div>
      <v-card-subtitle v-else>Price: ${{ tree.price.toFixed(2) }}</v-card-subtitle>
      <v-card-text max-height="300">{{ tree.description }}</v-card-text>
      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:append>
            <div class="justify-self-end">
              <v-btn @click="cartStore.addItem({
                        product_id: tree.product_id,
                        name: tree.name,
                        image: tree.image,
                        price: tree.price
                })"
                color="primary">Add</v-btn>
            </div>
          </template>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  }

  .product-name {
    font-weight: bold;
    font-size: 18px;
    color: #3B3B1A;
  }

  .discount-badge {
    background-color: #C8E6C9;
    color: #2E7D32;
    font-weight: bold;
    font-size: 14px;
    padding: 4px 8px;
    align-items: right;
    border-radius: 6px;
  }

  .original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 14px;
  }

  .discounted-price {
  color: #5D4037;
  font-weight: bold;
  margin-left: 4px;
  }

  .original-price-label s {
  color: #999;
  margin-left: 4px;
  }

  .price-info {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  }

  .original-price-label,
  .discounted-price-label {
    font-size: 14px;
  }

  .v-card {
  background: linear-gradient(to bottom right, #eafaf1, #d4f4dd);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 100, 50, 0.1);
  }

  .v-app-bar {
    background-color: #AEC8A4 !important; /* primary garden green */
    color: white;
  }

  .v-container {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 20px;
  }

  h4 {
    color: #3B3B1A; /* deep natural green */
    font-weight: 500;
  }

.menu {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px;
  padding: 10px;
}
</style>
