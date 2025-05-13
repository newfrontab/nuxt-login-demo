<template>
  <div class="wrapper-success">
    <provet-card class="container-success">
      <h1 class="n-typescale-2xl header-success">Signup successful 🥳</h1>

      <div class="">
        <provet-button class="button-submit" type="button" variant="primary">
          Login
        </provet-button>
      </div>
    </provet-card>

    <div class="pyro">
      <div class="before"></div>
      <div class="after"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/assets/css/fireworksAnimation.scss";
</script>

<!-- Import Fireworks animation -->


<style scoped lang="scss">
.wrapper-success {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.container-success {
  max-width: 400px;
  z-index: 10;
  position: relative;
}

.header-success {
  text-align: center;
}
</style>
