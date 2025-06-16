<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart';
import { useProductsStore } from '@/stores/products';

const cartStore = useCartStore()
const productsStore = useProductsStore()
const { addItem } = cartStore

const listOfTrees = productsStore.getAllTreeProducts;

const hasDiscount = (productId) => {
  const discount = productsStore.discounts.find(discount => discount.product_id === productId);
  return discount ? true : false;
}

const calculatePriceWithDiscount = (price, discountPercentage) => {
  const discountedPrice = price - (price * (discountPercentage / 100));
  return discountedPrice.toFixed(2);
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
      <v-card-title>{{ tree.name }}</v-card-title>
      <div v-if="hasDiscount(tree.id)">
        <v-card-subtitle class="text-decoration-line-through">Price: ${{ tree.price.toFixed(2) }}</v-card-subtitle>
        <v-card-subtitle v-if="hasDiscount(tree.id)">Price: ${{ calculatePriceWithDiscount(tree.price,
          productsStore.getProductDiscount(tree.id)) }}</v-card-subtitle>
      </div>
      <v-card-subtitle v-else>Price: ${{ tree.price.toFixed(2) }}</v-card-subtitle>
      <v-card-text max-height="300">{{ tree.description }}</v-card-text>
      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:append>
            <div class="justify-self-end">
              <v-btn @click="addItem(tree)" color="primary">Add</v-btn>
            </div>
          </template>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style>
.menu {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px;
  padding: 10px;
}
</style>
