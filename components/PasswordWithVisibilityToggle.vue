<template>
  <!--  README: <provet-input /> slot not working correctly. Forced to make a hacky solution. -->
  <div class="container-password" :class="{ 'has-error': error }">
    <provet-input
      label="Password"
      required
      expand
      :type="showPassword ? 'text' : 'password'"
      :error="error"
      :value="value"
      @input="handleInput"
    />
    <provet-button
      class="button-show-password"
      :class="{ 'with-error-margin': error }"
      type="button"
      variant="secondary"
      @click="showPassword = !showPassword"
    >
      <div class="button-content">
        <provet-icon
          :name="showPassword ? 'interface-edit-on' : 'interface-edit-off'"
          size="m"
        />
      </div>
    </provet-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
  error?: string;
}>();

const emit = defineEmits<{
  "update:value": [value: string];
  input: [event: InputEvent];
}>();

const showPassword = ref(false);

function handleInput(e: InputEvent) {
  const value = (e.target as HTMLInputElement).value;
  emit("update:value", value);
  emit("input", e);
}
</script>

<style lang="scss" scoped>
.container-password {
  display: flex;
  position: relative;
  align-items: flex-end;
}

.container-password.has-error {
  align-items: center;
}

.button-show-password.with-error-margin {
  margin-top: 5px;
}

.button-content {
  display: flex;
  align-items: center;
}
</style>
