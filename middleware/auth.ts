export default defineNuxtRouteMiddleware((to, from) => {
  let isAuthenticated = useAuthenticated();

  if (isAuthenticated.value == false) {
    return navigateTo("/auth/login");
  }
});
