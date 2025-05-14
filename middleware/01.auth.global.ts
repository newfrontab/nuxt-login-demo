import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!import.meta.client) {
    return;
  }

  const authStore = useAuthStore();
  const unAuthorizedRoutes = ["/signup", "/signin", "/success"];

  // Wait for Firebase Auth to initialize
  await waitForAuthInit();
  if (!authStore.appUser && !unAuthorizedRoutes.includes(to.path)) {
    return navigateTo("/signin");
  }
});
