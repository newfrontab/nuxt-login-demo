<template>
  <div class="wrapper-success">
    <provet-card class="container-success">
      <h1 class="n-typescale-2xl header-success">Signup successful 🥳</h1>

      <provet-button class="button-submit" type="button" variant="primary">
        Login
      </provet-button>
    </provet-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wrapper-success {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-success {
  max-width: 400px;
}

.header-success {
  text-align: center;
}
</style>
