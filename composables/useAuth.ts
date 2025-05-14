import { ref } from 'vue';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { useNuxtApp } from '#app';

export const useAuth = () => {
  const { $auth } = useNuxtApp();
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  const signup = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $auth,
        email,
        password
      );
      user.value = userCredential.user;
      return userCredential.user;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const signIn = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const userCredential = await signInWithEmailAndPassword(
        $auth,
        email,
        password
      );
      user.value = userCredential.user;
      return userCredential.user;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;
    try {
      await signOut($auth);
      user.value = null;
    } catch (e: any) {
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    error,
    loading,
    signup,
    signIn,
    logout,
  };
};
