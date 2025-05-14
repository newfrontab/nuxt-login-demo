<template>
  <div class="wrapper-home">
    <provet-card class="container-home">
      <h1 class="header-home">You're now inside the application.</h1>
      <p class="text-home">
        Try out some of the other sign in flows by signing out.
      </p>
      <div class="container-buttons">
        <provet-button expand variant="primary" @click="handleSignOut">
          Sign out
        </provet-button>
      </div>
    </provet-card>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

async function handleSignOut() {
  await authStore.signOutUser();
}
</script>

<style scoped lang="scss">
.wrapper-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.container-home {
  padding: var(--n-space-l);
  max-width: 450px;
  text-align: center;
}

.header-home {
  margin-bottom: var(--n-space-m);
}

.text-home {
  margin-bottom: var(--n-space-l);
}

.container-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--n-space-m);
}
</style>
