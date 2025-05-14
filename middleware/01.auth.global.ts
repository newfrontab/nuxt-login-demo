import { useAuth } from "@/composables/useAuth";

export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth();
  // TODO - attempt to login with existing credentials

  const unAuthorizedRoutes = ["/signup", "/signin", "/success"];
  if (!user.value && !unAuthorizedRoutes.includes(to.path)) {
    return navigateTo("/signin");
  } 
});
