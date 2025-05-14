<template>
  <div class="wrapper-signin">
    <div class="container-signin">
      <provet-card>
        <h1 class="header-signin">Sign in</h1>

        <form
          class="container-form"
          :class="{ disabled: isSubmittingEmail || isSubmittingGoogle }"
          @submit.prevent="handleSubmit"
        >
          <div v-if="invalidCredentials" class="container-error">
            Wrong email or password, please try again
          </div>

          <provet-input
            type="email"
            label="Email"
            required
            expand
            :error="state.email.errors[0]"
            @input="
              (e: InputEvent) => {
                state.email.value = (e.target as HTMLInputElement).value;
                invalidCredentials = false;
              }
            "
          />

          <PasswordWithVisibilityToggle
            :value="state.password.value"
            :error="state.password.errors[0]"
            @input="
              (e: InputEvent) => {
                state.password.value = (e.target as HTMLInputElement).value;
                invalidCredentials = false;
              }
            "
          />

          <provet-button
            class="button-submit"
            expand
            type="submit"
            variant="primary"
            :loading="isSubmittingEmail"
          >
            Sign in
          </provet-button>

          <div class="container-link">
            Don't have an email account?
            <NuxtLink to="/signup"> Sign up </NuxtLink>
          </div>

          <provet-button
            class="button-google"
            expand
            type="button"
            variant="secondary"
            :loading="isSubmittingGoogle"
            @click="handleGoogleSignIn"
          >
            <div class="button-google-content">
              <img :src="googleIcon" alt="Google" class="button-google-icon" />
              <span class="button-google-text"> Sign in with Google </span>
            </div>
          </provet-button>
        </form>
      </provet-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useValidation } from "@/composables/useValidation";
import { required, email } from "@/utils/validation";
import { useAuthStore } from "@/stores/auth";
import googleIcon from "@/assets/icons/google.svg";

const isSubmittingEmail = ref(false);
const isSubmittingGoogle = ref(false);
const validateOnInput = ref(false);
const invalidCredentials = ref(false);

const auth = useAuthStore();

const { state, isValid, validateForm } = useValidation({
  rules: {
    email: [required, email],
    password: [required],
  },
  validateOnInput: validateOnInput.value,
});

async function handleSubmit() {
  validateForm();
  if (!isValid.value) {
    return;
  }
  isSubmittingEmail.value = true;
  try {
    await auth.signIn(state.email.value, state.password.value);
    navigateTo("/");
  } catch (error) {
    console.error("Signin failed:", error);
    if (JSON.stringify(error).includes("auth/invalid-credential")) {
      invalidCredentials.value = true;
    }
  } finally {
    isSubmittingEmail.value = false;
  }
}

async function handleGoogleSignIn() {
  isSubmittingGoogle.value = true;
  try {
    await auth.signInWithGoogle();
    navigateTo("/");
  } catch (error) {
    console.error("Google sign-in failed:", error);
  } finally {
    isSubmittingGoogle.value = false;
  }
}
</script>

<style scoped lang="scss">
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
  gap: 1rem;
  padding: 1rem;
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

.button-google {
  margin-top: var(--n-space-m);
  &-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  &-icon {
    width: var(--n-size-icon-l);
    height: var(--n-size-icon-l);
  }
  &-text {
    font-weight: 600; // Aware of "var(--n-font-weight-heading)", but naming is too opinionated.
  }
}

.container-error {
  color: var(--n-color-text-error);
  font-size: var(--n-font-size-s);
}
</style>
