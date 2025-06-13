<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart';
import { useProductsStore } from '@/stores/products';

const cartStore = useCartStore()
const productsStore = useProductsStore()
const { addItem } = cartStore

const listOfTrees = productsStore.getAllTreeProducts;

// const listOfTrees = ref([
//   {
//     id: "trees-1",
//     name: 'Oak',
//     description: 'Oaks are large, sturdy trees known for their strength and longevity. They symbolize endurance and wisdom.',
//     imgSrc: 'https://treefoundation.org/wp-content/uploads/2021/11/oak-tree.jpg',
//     price: 15.99
//   },
//   {
//     id: "trees-2",
//     name: 'Maple',
//     description: 'Maple trees are famous for their beautiful fall foliage and sweet sap, which is used to make maple syrup.',
//     imgSrc: 'https://www.featuretreesballarat.com.au/cdn/shop/files/J347-10.jpg?v=1711897611&width=416',
//     price: 12.99
//   },
//   {
//     id: "trees-3",
//     name: 'Pine',
//     description: 'Pines are evergreen conifers with needle-like leaves. They are often associated with resilience and peace.',
//     imgSrc: 'https://www.dawsoncreek.ca/en/parks-recreation/resources/Photos/Trees/Black-Pine_CDC-2024-11-06-(1)-copy.jpg',
//     price: 10.99
//   },
//   {
//     id: "trees-4",
//     name: 'Cherry Blossom',
//     description: 'Cherry blossom trees are celebrated for their stunning pink and white flowers that bloom in spring, symbolizing renewal and beauty.',
//     imgSrc: 'https://hips.hearstapps.com/hmg-prod/images/cherry-blossom-facts-1578344148.jpg?crop=0.665xw:1.00xh;0.168xw,0&resize=1200:*',
//     price: 18.99
//   },
//   {
//     id: "trees-5",
//     name: 'Baobab',
//     description: 'Baobabs are iconic African trees with massive trunks and unique shapes, often called the "tree of life" for their ability to store water.',
//     imgSrc: 'https://m.media-amazon.com/images/I/61RglOXuR9L.jpg',
//     price: 20.99
//   }
// ])

</script>

<template>
  <v-card>
    <v-app-bar color="primary">
      <v-toolbar-title>Tree Selection</v-toolbar-title>
    </v-app-bar>
  </v-card>

  <div class="menu">
    <v-card v-for="tree in listOfTrees" :key="tree.name" class="mx-auto" max-width="344" variant="tonal">
      <v-img :src="tree.imgSrc" max-height="300" cover />
      <v-card-title>{{ tree.name }}</v-card-title>
      <v-card-subtitle>Price: ${{ tree.price.toFixed(2) }}</v-card-subtitle>
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
