<script setup>
import { onMounted, computed } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const cartItems = cartStore.items;

const productsStore = useProductsStore();
const discounts = productsStore.discounts;

// fetch products on mount
onMounted(async () => {
  if (productsStore.products.length === 0) {
    try {
      await productsStore.fetchProducts();
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }
});

// TODO: implement the getDiscountedPrice function. If there is no discount, return the original price.
const getItemTotal = (price, quantity) => {
  return (price * quantity).toFixed(2);
};
const getDiscountedPrice = (productId, price) => {
  const discount = discounts.find(d => d.product_id === productId);
  return (discount
    ? price - (price * discount.discount_percentage / 100)
    : price).toFixed(2);
};  

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
      <v-row no-gutters class="d-flex align-center justify-center text-center">
        <v-col><h4>Item</h4></v-col>
        <v-col><h4>Image</h4></v-col>
        <v-col><h4>Price</h4></v-col>
        <v-col><h4>Quantity</h4></v-col>
        <v-col><h4>Total</h4></v-col>
        <v-col><h4>Remove</h4></v-col>
      </v-row>

      <!-- display all cart items -->
      <v-sheet
  v-for="[key, item] of cartItems"
  :key="key"
  class="cart-item-box mb-4"
  elevation="1"
>
  <v-row no-gutters>
  <v-col class="d-flex align-center justify-center text-center">
    <h4>{{ item.name }}</h4>
  </v-col>
  <v-col class="d-flex align-center justify-center">
    <v-img
      :src="item.image || 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg'"
      height="100"
      width="100"
    />
  </v-col>
  <v-col class="d-flex align-center justify-center text-center">
    <h4>${{ getDiscountedPrice(item.product_id, item.price) }}</h4>
  </v-col>
  <v-col class="d-flex align-center justify-center text-center">
    <h4>{{ item.quantity }}</h4>
  </v-col>
  <v-col class="d-flex align-center justify-center text-center">
    <h4>
      ${{ getItemTotal(getDiscountedPrice(item.product_id, item.price), item.quantity) }}
    </h4>
  </v-col>
  <v-col class="d-flex align-center justify-center">
    <v-btn
      @click="cartStore.removeItem(key)"
      color="error"
      icon="mdi-delete"
    />
  </v-col>
  </v-row>
</v-sheet>

      <!-- display grand total -->
      <v-row class="justify-end mt-6">
      <v-col cols="12" md="4">
      <div class="grand-total-box">
      <h3>Grand Total: ${{ grandTotal }}</h3>
    </div>
  </v-col>
</v-row>
    </v-container>
  </v-card>
</template>

<style scoped>
.v-card {
  background: linear-gradient(to bottom right, #eafaf1, #d4f4dd); /* light green gradient */
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

.grand-total-box {
  background-color: #f0f9f4; /* soft green-tinted background */
  border: 1px solid #c8e6c9; /* subtle green border */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(76, 175, 80, 0.1); /* soft shadow */
  font-weight: 600;
  color: #3B3B1A; /* rich earthy brown for text */
}

.cart-item-box {
  background-color: #f8fcf9; /* soft garden white/green blend */
  border: 1px solid #dcefe2; /* light green-gray border */
  border-radius: 12px;
  padding: 16px;
  transition: box-shadow 0.2s;
}

.cart-item-box:hover {
  box-shadow: 0px 4px 16px rgba(76, 175, 80, 0.12); /* gentle hover effect */
}

.cart-item-box h4,
.cart-item-box h5,
.cart-item-box p,
.cart-item-box span {
  color: #3B3B1A; /* a rich, earthy brown */
}
.menu {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px;
  padding: 10px;
}
</style>