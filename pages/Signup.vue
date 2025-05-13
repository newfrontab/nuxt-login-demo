<template>
  <div class="wrapper-signup">
    <provet-card class="container-signup">
      <h1 class="header-signup">Sign Up</h1>

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

        <provet-input
          label="Confirm password"
          required
          expand
          :class="{ disabled: !state.password.value || isSubmitting }"
          :type="showPassword ? 'text' : 'password'"
          :error="
            state.confirmPassword.touched && state.password.value
              ? state.confirmPassword.errors[0]
              : null
          "
          @input="
            (e: InputEvent) =>
              (state.confirmPassword.value = (
                e.target as HTMLInputElement
              ).value)
          "
        />

        <provet-checkbox
          type="checkbox"
          label="Receive occasional product updates and announcements"
          @change="
            (e: Event) =>
              (receiveUpdates = (e.target as HTMLInputElement).checked)
          "
        />

        <div class="container-submit">
          <provet-button
            class="button-submit"
            type="submit"
            variant="primary"
            :loading="isSubmitting"
          >
            Sign Up
          </provet-button>
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
const receiveUpdates = ref(false);
const isSubmitting = ref(false);
const validateOnInput = ref(false);

const { signup, error: authError } = useAuth();

const { state, isValid, validateForm } = useValidation({
  rules: {
    email: [required, email],
    password: [required, password],
    confirmPassword: [sameAs("password")],
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
    // TODO: Implement signup logic
    await signup(state.email.value, state.password.value);
    // Navigate to success page
    navigateTo("/success");
  } catch (error) {
    console.error("Signup failed:", error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.header-signup {
  text-align: center;
}

.wrapper-signup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.container-signup {
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
