<template>
  <div class="wrapper-success">
    <provet-card class="container-success">
      <h1 class="n-typescale-2xl header-success">Signup successful 🥳</h1>

      <p class="text-success">
        You can now sign in to your account. Enjoy your time!
      </p>

      <NuxtLink to="/login">
        <provet-button
          expand
          class="button-submit"
          type="button"
          variant="primary"
        >
          Sign in
        </provet-button>
      </NuxtLink>
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
  position: relative;
  z-index: 10;
  max-width: 400px;
  text-align: center;
}

.header-success {
  margin-bottom: 0 !important;
  text-align: center;
}

.text-success {
  margin-top: var(--n-space-l);
  margin-bottom: var(--n-space-xl) !important;
}
</style>
