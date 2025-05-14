<template>
  <div class="wrapper-success">
    <provet-card class="container-success">
      <h1 class="n-typescale-2xl header-success">Signup successful 🥳</h1>

      <p class="text-success">
        You can now sign in to your account. Enjoy your time!
      </p>

      <NuxtLink to="/signin">
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
  </div>
</template>

<script setup lang="ts">
import initConfetti from "~/utils/animateConfetti";
import { onMounted, onUnmounted } from "vue";

let cleanupConfetti: (() => void) | null = null;

onMounted(() => {
  cleanupConfetti = initConfetti();
});
onUnmounted(() => {
  if (cleanupConfetti) {
    cleanupConfetti();
  }
});
</script>

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
  margin-bottom: var(--n-space-l);
  text-align: center;
}

.text-success {
  margin-bottom: var(--n-space-xl);
}
</style>
