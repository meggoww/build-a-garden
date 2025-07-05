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
    await productsStore.fetchProducts();
  }
  if (productsStore.discounts.length === 0) {
    await productsStore.fetchAllDiscounts();
  }
});

// TODO: implement the getDiscountedPrice function. If there is no discount, return the original price.
const getItemTotal = (price, quantity) => {
  return (price * quantity).toFixed(2);
};
const getDiscountedPrice = (productId, price) => {
  const discount = productsStore.getProductDiscount(productId);
  return price * (1 - discount); // returns number, not string
};

const hasDiscount = (productId) => {
  return productsStore.getProductDiscount(productId) > 0;
};

// TODO: implement getGrandTotal computed function
const grandTotal = computed(() => {
  let total = 0;
  cartStore.items.forEach((item, productId) => {
    const discounted = getDiscountedPrice(productId, item.price);
    total += discounted * item.quantity;
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
  v-for="[productId, item] of cartItems"
  :key="productId"
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
      <div>
        <div v-if="hasDiscount(productId)">
          <small class="text-grey">
            <s>${{ item.price.toFixed(2) }}</s>
          </small><br />
          <span class="text-brown font-weight-bold">
            ${{ getDiscountedPrice(productId, item.price).toFixed(2) }}
          </span>
        </div>
        <div v-else>
          ${{ item.price.toFixed(2) }}
        </div>
      </div>
    </v-col>

  <v-col class="d-flex align-center justify-center text-center">
    <h4>{{ item.quantity }}</h4>
  </v-col>

  <v-col class="d-flex align-center justify-center text-center">
    <h4>
      ${{ (getDiscountedPrice(productId, item.price) * item.quantity).toFixed(2) }}
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