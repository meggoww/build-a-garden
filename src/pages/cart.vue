<script setup>
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { computed } from 'vue';

const cartStore = useCartStore();
const items = cartStore.items;


const productsStore = useProductsStore();
const discounts = productsStore.discounts;

console.log("Cart Items (Map):", cartStore.items);
console.log("Discounts:", discounts);
// TODO: implement the getDiscountedPrice function. If there is no discount, return the original price.
const getDiscountedPrice = (price, productId) => {
  const discount = discounts.find(d => d.product_id === productId);
  console.log("Discount for product ID", productId, ":", discount);

  const discountPercentage = discount ? discount.discount_percentage : 0;
  const discountedPrice = price * (1 - discountPercentage / 100);

  return discountedPrice.toFixed(2);
};

const getItemTotal = (price, quantity) => {
  return (price * quantity).toFixed(2);
};

// TODO: implement getGrandTotal computed function
const grandTotal = computed(() => {
  let total = 0;
  for (const [, item] of cartStore.items) {
    const discountedPrice = getDiscountedPrice(item.price, item.product_id ?? item.id);
    total += discountedPrice * item.quantity;
  }
  return total.toFixed(2);
});

</script>

<template>
  <v-card>
    <v-app-bar color="primary">
      <v-toolbar-title>Your Cart</v-toolbar-title>
    </v-app-bar>
    <v-container>
      <v-row no-gutters>
        <v-col>
          <h4>Item</h4>
        </v-col>
        <v-col>
          <h4>Image</h4>
        </v-col>
        <v-col>
          <h4>Price</h4>
        </v-col>
        <v-col>
          <h4>Quantity</h4>
        </v-col>
        <v-col>
          <h4>Total</h4>
        </v-col>
        <v-col>
          <!-- I added this to align the data-->
        </v-col>
      </v-row>

      <!-- TODO: display all items in the cart store-->
      <v-row v-for="[key, item] of items" :key="key" no-gutters>
        <v-col>
            <h4>{{ item.name }}</h4>
        </v-col>
        <v-col>
            <v-img
            :src="item.image || 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='"
            height="100" width="100" />
        </v-col>
        <v-col>
            <h4>{{ getDiscountedPrice(item.price, item.product_id) }}</h4>
        </v-col>
        <v-col>
            <h4>{{ item.quantity }}</h4>
        </v-col>
        <v-col>
            <h4>{{ getItemTotal(getDiscountedPrice(item.price, item.product_id), item.quantity) }}</h4>
        </v-col>
        <!-- TODO: implement the remove item action in the store/cart.js file-->
        <v-col>
          <v-btn @click="cartStore.removeItem(key)" color="error" icon="mdi-delete"></v-btn>
        </v-col>
      </v-row>

      <!-- TODO: display to grand total
           Hint: use vue's computed function to calculate the grand total
       -->
      <v-row>
        <v-col offset="9">
          <h4>Grand Total: ${{ grandTotal }}</h4>
        </v-col>
      </v-row>
    </v-container>
  </v-card>


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
