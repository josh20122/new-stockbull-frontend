<template>
  <div
    class="w-full gap-x-2 flex-row gap-y-2 grid grid-cols-2 md:grid-cols-1"
    v-if="!isAuthenticated"
  >
    <NuxtLink to="/auth/login">
      <button
        class="btn btn-sm uppercase w-full rounded-sm hover:bg-yellow-500 hover:text-sky-900 bg-yellow-500 font-medium text-xs text-slate-900"
      >
        LOGIN
      </button>
    </NuxtLink>
    <NuxtLink to="/auth/register">
      <button
        class="btn btn-sm w-full hover:outline-yellow-500 hover:border-yellow-500 hover:bg-transparent uppercase rounded-sm outline-yellow-500 bg-transparent border-yellow-500 text-yellow-500 font-medium text-xs"
      >
        SIGN UP
      </button>
    </NuxtLink>
  </div>
</template>
<script setup>
const isAuthenticated = useAuthenticated();
</script>
