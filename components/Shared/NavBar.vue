<template>
  <SharedContainer class="w-full py-4">
    <div class="flex w-full justify-between">
      <div
        class="inline-flex place-items-center font-bold text-lg uppercase gap-x-2"
      >
        <div>
          <span class="text-white">STOck</span>
          <span class="text-white">Bull</span>
          <span class="text-yellow-600"></span>
        </div>
      </div>
      <div class="md:flex gap-2 place-items-center hidden">
        <NuxtLink active-class="text-yellow-600" to="/"> Trade </NuxtLink>
        <NuxtLink active-class="text-yellow-600" to="/account">
          Account
        </NuxtLink>
        <NuxtLink active-class="text-yellow-600" to="/articles">
          Articles
        </NuxtLink>
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

      <UPopover class="md:hidden flex" :popper="{ arrow: true }">
        <UButton color="white" trailing-icon="i-heroicons-bars-4" />

        <template #panel>
          <div class="py-4 px-2 min-w-[200px] flex flex-col gap-y-2">
            <NuxtLink
              active-class=" bg-yellow-600 rounded-md py-1"
              class="pl-2"
              to="/"
              >Trade</NuxtLink
            >
            <NuxtLink class="pl-2" to="/account">Account</NuxtLink>

            <NuxtLink class="pl-2" to="/articles">Articles</NuxtLink>
            <NuxtLink v-if="!isAuthenticated" class="pl-2" to="/auth/login"
              >Log in/Sign up</NuxtLink
            >

            <div class="pl-2">
              <button @click="logout()" class="">Logout</button>
            </div>
          </div>
        </template>
      </UPopover>
    </div>
  </SharedContainer>
  <div></div>
</template>
<script setup>
import { logout } from "~/.utils/axiosConfigurations";

const isAuthenticated = useAuthenticated();
</script>
