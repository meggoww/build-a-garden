<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
const products = useProductsStore();

const cartItems = computed(() => Array.from(cart.items.entries()));

function getDiscountedPrice(item) {
  const discount = products.getProductDiscount(item.product_id);
  if (discount > 0) {
    return item.price * (1 - discount / 100);
  }
  return item.price;
}

const grandTotal = computed(() =>
  cartItems.value
    .reduce(
      (total, [_, item]) => total + getDiscountedPrice(item) * item.quantity,
      0
    )
    .toFixed(2)
);
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
      </v-row>

      <v-row v-for="([key, item], index) in cartItems" :key="key" no-gutters>
        <v-col> {{ item.name }} </v-col>
        <v-col>
          <v-img :src="item.image" height="100" width="100" cover></v-img>
        </v-col>
        <v-col> ${{ getDiscountedPrice(item).toFixed(2) }} </v-col>
        <v-col> {{ item.quantity }} </v-col>
        <v-col>
          ${{ (getDiscountedPrice(item) * item.quantity).toFixed(2) }}
        </v-col>
        <v-col>
          <v-btn
            @click="cart.removeItem(key)"
            color="error"
            icon="mdi-delete"
          ></v-btn>
        </v-col>
      </v-row>

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
