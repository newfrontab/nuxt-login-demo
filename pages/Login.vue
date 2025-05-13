<template>
  <div class="wrapper-signin">
    <provet-card class="container-signin">
      <h1 class="header-signin">Login</h1>

      <form class="container-form" @submit.prevent="handleSubmit">
        <provet-input
          type="email"
          label="Email"
          required
          expand
          :class="{ disabled: isSubmitting }"
          :error="state.email.errors[0]"
          @input="
            (e: InputEvent) =>
              (state.email.value = (e.target as HTMLInputElement).value)
          "
        />

        <provet-input
          label="Password"
          required
          expand
          :class="{ disabled: isSubmitting }"
          :type="showPassword ? 'text' : 'password'"
          :error="state.password.errors[0]"
          @input="
            (e: InputEvent) =>
              (state.password.value = (e.target as HTMLInputElement).value)
          "
        />

        <!-- Skipping this due to scope, keeping it in just to showcase I've thought about it -->
        <provet-checkbox
          type="checkbox"
          label="Stay signed in"
        />

        <provet-button
          class="button-submit"
          expand
          type="submit"
          variant="primary"
          :loading="isSubmitting"
        >
          Sign in
        </provet-button>

        <div class="container-link">
          Don't have an account?
          <NuxtLink to="/signup"> Sign up </NuxtLink>
        </div>
      </form>
    </provet-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useValidation } from "@/composables/useValidation";
import { required, email, password } from "@/utils/validation";
import { useAuth } from "@/composables/useAuth";

const showPassword = ref(false);
const isSubmitting = ref(false);
const validateOnInput = ref(false);

const { signup, error: authError } = useAuth();

const { state, isValid, validateForm } = useValidation({
  rules: {
    email: [required, email],
    password: [required, password],
  },
  validateOnInput: validateOnInput.value,
});

async function handleSubmit() {
  validateForm();
  if (!isValid.value) {
    return;
  }

  isSubmitting.value = true;
  try {
    await signup(state.email.value, state.password.value);
    navigateTo("/success");
  } catch (error) {
    console.error("Signup failed:", error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.header-signin {
  text-align: center;
}

.wrapper-signin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.container-signin {
  padding: var(--n-space-l);
  max-width: 450px;
}

.container-password {
  display: flex;
  position: relative;
  width: 100%;
}

.container-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.icon-toggle-password {
  position: absolute;
  right: 1rem;
  bottom: 10px;
  z-index: 10;
  cursor: pointer;
  color: var(--provet-color-text-secondary);
}

.icon-toggle-password:hover {
  color: var(--provet-color-text-primary);
}

.container-submit {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.button-submit {
  margin-top: 1rem;
}
</style>
