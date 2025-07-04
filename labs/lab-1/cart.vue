<script setup>
import { onMounted, computed } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';

// fetch products on mount
onMounted(() => {
  productsStore.fetchProducts();
});

// TODO: implement the getDiscountedPrice function. If there is no discount, return the original price.
const getDiscountedPrice = (productId, price) => {
  const discount = productsStore.getProductDiscount(productId);
  return discount > 0 ? price * (1 - discount) : price;
};

// convert Map to array for iteration
const cartItems = computed(() => Array.from(cartStore.items.entries()));

// TODO: implement getGrandTotal computed function
const grandTotal = computed(() => {
  let total = 0;
  cartStore.items.forEach((item, productId) => {
    const discountedPrice = getDiscountedPrice(productId, item.price);
    total += discountedPrice * item.quantity;
  });
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
        <v-col><h4>Item</h4></v-col>
        <v-col><h4>Image</h4></v-col>
        <v-col><h4>Price</h4></v-col>
        <v-col><h4>Quantity</h4></v-col>
        <v-col><h4>Total</h4></v-col>
        <v-col><h4>Remove</h4></v-col>
      </v-row>

      <!-- display all cart items -->
      <v-row
        v-for="[productId, item] in cartItems"
        :key="productId"
        no-gutters
      >
        <v-col>
          {{ productsStore.products.find(p => p.id === productId)?.name || 'Unknown' }}
        </v-col>
        <v-col>
          <v-img
            :src="productsStore.products.find(p => p.id === productId)?.imageUrl"
            height="100" width="100"
          ></v-img>
        </v-col>
        <v-col>
          ${{ getDiscountedPrice(productId, item.price).toFixed(2) }}
        </v-col>
        <v-col>
          {{ item.quantity }}
        </v-col>
        <v-col>
          ${{ (getDiscountedPrice(productId, item.price) * item.quantity).toFixed(2) }}
        </v-col>
        <v-col>
          <v-btn
            @click="cartStore.removeItem(productId)"
            color="error"
            icon="mdi-delete"
          ></v-btn>
        </v-col>
      </v-row>

      <!-- display grand total -->
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