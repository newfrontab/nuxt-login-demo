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

<style scoped lang="scss">
.wrapper-success {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.container-success {
  max-width: 400px;
}

.header-success {
  text-align: center;
}
</style>
