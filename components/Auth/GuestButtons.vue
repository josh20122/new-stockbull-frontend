<template>
  <div
    class="w-full gap-x-2 flex-row gap-y-4 grid grid-cols-2 md:grid-cols-1"
    v-if="!isAuthenticated"
  >
    <NuxtLink to="/auth/login">
      <UButton
        color="yellow"
        block
        class="text-white w-full text-center rounded-xs"
      >
        LOGIN
      </UButton>
    </NuxtLink>
    <div class="py-1"></div>
    <NuxtLink to="/auth/register">
      <UButton
        color="yellow"
        block
        variant="outline"
        class="text-white rounded-xs"
      >
        SIGN UP
      </UButton>
    </NuxtLink>
  </div>
</template>
<script setup>
const isAuthenticated = useAuthenticated();
</script>
