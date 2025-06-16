<script setup>
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';

// TODO: implement the getDiscountedPrice function. If there is no discount, return the original price.

// TODO: implement getGrandTotal computed function

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

      <!-- TODO: display all items in the cart store-->
      <v-row no-gutters>
        <v-col>
          Item 1
        </v-col>
        <v-col>
          <v-img
            src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
            height="100" width="100"></v-img>
        </v-col>
        <v-col>
          $99.99
        </v-col>
        <v-col>
          1
        </v-col>
        <v-col>
          99.99
        </v-col>
        <!-- TODO: implement the remove item action in the store/cart.js file-->
        <v-col>
          <v-btn @click="store.removeItem(key)" color="error" icon="mdi-delete"></v-btn>
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
