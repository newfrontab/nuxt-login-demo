// stores/auth.ts
import { ref } from "vue";
import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  /**
   * State
   * ------------------------ */

  const appUser = ref<User | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const { $auth } = useNuxtApp();

  /**
   * Listeners
   * ------------------------ */

  if (import.meta.client) {
    // Listen for auth state changes and keep appUser in sync
    onAuthStateChanged($auth, (user) => {
      appUser.value = user;
      navigateTo("/");
    });
  }

  /**
   * Actions
   * ------------------------ */

  async function signup(email: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $auth,
        email,
        password,
      );
      appUser.value = userCredential.user;
      return userCredential.user;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function signIn(email: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      const userCredential = await signInWithEmailAndPassword(
        $auth,
        email,
        password,
      );
      appUser.value = userCredential.user;
      return userCredential.user;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function signInWithGoogle() {
    loading.value = true;
    error.value = null;
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup($auth, provider);
      appUser.value = result.user;
      return result.user;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function signOutUser() {
    loading.value = true;
    error.value = null;
    try {
      await signOut($auth);
      appUser.value = null;
      navigateTo("/signin");
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function setUser(user: User) {
    appUser.value = user;
  }

  /**
   * Exports
   * ------------------------ */

  return {
    appUser,
    error,
    loading,
    signup,
    signIn,
    signInWithGoogle,
    signOutUser,
    setUser,
  };
});
