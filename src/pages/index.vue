<template>
  <div class="full-bg">
  <v-container class="logo-container" max-width="900">
    <div>
      <v-img class="mb-4" height="150" src="@/assets/logo2.png" />

      <div class="mb-8 text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">Build-A-Garden</h1>
      </div>
    </div>
  </v-container>
  </div>
</template>

<script setup>
</script>

<style>
.logo-container {
  background-color: white;
  color: #5D4037; /* Garden brown for text */
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.full-bg {
  min-height: 100vh;
  background-color: #AEC8A4; /* Primary garden green */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}
</style>
