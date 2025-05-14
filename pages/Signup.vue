<template>
  <div class="wrapper-signup">
    <div class="container-signup">
      <provet-card>
        <h1 class="header-signup">Sign Up</h1>

        <form
          class="container-form"
          @submit.prevent="handleSubmit"
          :class="{ disabled: isSubmitting }"
        >
          <provet-input
            type="email"
            label="Email"
            required
            expand
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
            :class="{ disabled: !state.password.value }"
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

          <!-- README: Not connected to anything due to scope -->
          <provet-checkbox
            type="checkbox"
            label="I want occasional emails about new features and updates."
          />

          <provet-checkbox
            type="checkbox"
            label="I consent to my data being processed in accordance with the GDPR."
            @change="
              (e: Event) =>
                (dataConsentGranted = (e.target as HTMLInputElement).checked)
            "
          />

          <provet-button
            class="button-submit"
            expand
            type="submit"
            variant="primary"
            :loading="isSubmitting"
            :disabled="!dataConsentGranted"
          >
            Sign Up
          </provet-button>

          <div class="container-link">
            Already registered?
            <NuxtLink to="/signin"> Sign in </NuxtLink>
          </div>
        </form>
      </provet-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useValidation } from "@/composables/useValidation";
import { required, email, password } from "@/utils/validation";
import { useAuthStore } from "@/stores/auth";

const showPassword = ref(false);
const dataConsentGranted = ref(false);
const isSubmitting = ref(false);
const validateOnInput = ref(false);

const auth = useAuthStore();

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
  if (!isValid.value || !dataConsentGranted.value) {
    return;
  }
  isSubmitting.value = true;
  try {
    await auth.signup(state.email.value, state.password.value);
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
  width: 100%;
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
  gap: var(--n-space-m);
  padding: var(--n-space-m);
}

.button-submit {
  margin-top: var(--n-space-m);
}
</style>
