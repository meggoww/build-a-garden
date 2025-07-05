<template>
  <v-app>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          to="/cart"
          prepend-icon="mdi-cart"
          subtitle="View items"
          title="My Cart"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item to="/" prepend-icon="mdi-home-circle">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/flowers" prepend-icon="mdi-flower">
          <v-list-item-title>Flowers</v-list-item-title>
        </v-list-item>
        <v-list-item to="/trees" prepend-icon="mdi-tree">
          <v-list-item-title>Trees</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
onMounted(async () => {
  await productsStore.fetchProducts();
  await productsStore.fetchAllDiscounts();
});
</script>
