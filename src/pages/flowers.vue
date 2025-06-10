<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart';

const store = useCartStore()
const { addItem } = store

const listOfFlowers = ref([
  {
    id: "flowers-1",
    name: 'Sunflower',
    description: 'Sunflowers are known for their large, bright yellow petals and tall stems. They symbolize loyalty and adoration.',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Sunflower_sky_backdrop.jpg',
    price: 2.99
  },
  {
    id: "flowers-2",
    name: 'Rose',
    description: 'Roses are classic flowers that come in various colors, each symbolizing different emotions—red for love and passion, white for purity, and yellow for friendship.',
    imgSrc: 'https://img.freepik.com/free-photo/closeup-shot-red-rose-with-dew-top-black_181624-28079.jpg?semt=ais_items_boosted&w=740',
    price: 3.49
  },
  {
    id: "flowers-3",
    name: 'Lily',
    description: 'Lilies are elegant flowers often associated with purity and refined beauty. They come in various types, including Easter lilies and tiger lilies.',
    imgSrc: 'https://www.dutchgrown.com/cdn/shop/products/LilyStarGazer.jpg?v=1668676765',
    price: 4.99
  },
  {
    id: "flowers-4",
    name: 'Lavender',
    description: 'Lavender is renowned for its calming fragrance and purple flowers. It symbolizes tranquility and grace.',
    imgSrc: 'https://fairweathers.co.uk/wp-content/uploads/2015/02/a.-Havana-RL0746-scaled.jpg',
    price: 1.99
  },
  {
    id: "flowers-5",
    name: 'Gumamela',
    description: 'Gumamela, commonly known as hibiscus, features large, colorful blooms that thrive in tropical climates. They often symbolize delicate beauty and fragility.',
    imgSrc: 'https://i.pinimg.com/736x/47/2c/ab/472cab7a673524d7287e6c618503c134.jpg',
    price: 2.49
  }
])

const selectedFlower = ref('None');

function setCurrFlowerSelected(name) {
  selectedFlower.value = name
}

</script>

<template>
  <v-card>
    <v-app-bar color="primary">
      <v-toolbar-title>Flower Selection</v-toolbar-title>
    </v-app-bar>
  </v-card>

  <h4> Selected Flower: {{ selectedFlower }} </h4>

  <div class="menu">
    <v-card v-for="flower in listOfFlowers" :key="flower.name" class="mx-auto" max-width="344" variant="tonal">
      <v-img :src="flower.imgSrc" max-height="300" cover />
      <v-card-title>{{ flower.name }}</v-card-title>
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
