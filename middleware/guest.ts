export default defineNuxtRouteMiddleware((to, from) => {
  let isAuthenticated = useAuthenticated();

  if (isAuthenticated.value == true) {
    return navigateTo("/account");
  }
});
