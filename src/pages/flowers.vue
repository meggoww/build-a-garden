<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart';
import { useProductsStore } from '@/stores/products';

const cartStore = useCartStore()
const productsStore = useProductsStore()
const { addItem } = cartStore

const listOfFlowers = productsStore.getAllFlowerProducts;

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
      <v-toolbar-title>Flower Selection</v-toolbar-title>
    </v-app-bar>
  </v-card>

  <div class="menu">
    <v-card v-for="flower in listOfFlowers" :key="flower.name" class="mx-auto" max-width="344" variant="tonal">
      <v-img :src="flower.image" max-height="300" cover />
      <v-card-title>{{ flower.name }}</v-card-title>
      <div v-if="hasDiscount(flower.id)">
        <v-card-subtitle class="text-decoration-line-through">Price: ${{ flower.price.toFixed(2) }}</v-card-subtitle>
        <v-card-subtitle v-if="hasDiscount(flower.id)">Price: ${{ calculatePriceWithDiscount(flower.price,
          productsStore.getProductDiscount(flower.id)) }}</v-card-subtitle>
      </div>
      <v-card-subtitle v-else>Price: ${{ flower.price.toFixed(2) }}</v-card-subtitle>
      <v-card-text max-height="300">{{ flower.description }}</v-card-text>
      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:append>
            <div class="justify-self-end">
              <v-btn @click="addItem(flower)" color="primary">Add</v-btn>
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
