<template>
  <SharedContainer class="w-full py-4">
    <div class="flex w-full justify-between">
      <div
        class="inline-flex place-items-center font-bold text-lg uppercase gap-x-2"
      >
        <NuxtImg
          src="/logo.jpg"
          format="webp"
          width="20"
          height="20"
          class="rounded-full"
        ></NuxtImg>
        <div>
          <span class="text-white">STOck</span>
          <span class="text-white">Bull</span>
          <span class="text-yellow-600"></span>
        </div>
      </div>
      <div class="flex gap-2 place-items-center">
        <NuxtLink to="/"> Home </NuxtLink>
        <NuxtLink to="/account"> Account </NuxtLink>
        <div v-if="!isAuthenticated">
          <NuxtLink to="/auth/login">Log in</NuxtLink>/<NuxtLink
            to="/auth/register"
          >
            Sign Up</NuxtLink
          >
        </div>
        <div v-else>
          <button @click="logout()" class="">Logout</button>
        </div>
      </div>
    </div>
  </SharedContainer>
</template>
<script setup>
import { logout } from "~/.utils/axiosConfigurations";

const isAuthenticated = useAuthenticated();
</script>
