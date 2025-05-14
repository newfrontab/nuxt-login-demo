import { useNuxtApp } from "#app";
import { onAuthStateChanged } from "firebase/auth";

export function waitForAuthInit() {
  const { $auth } = useNuxtApp();
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged($auth, () => {
      unsubscribe();
      resolve(true);
    });
  });
}
