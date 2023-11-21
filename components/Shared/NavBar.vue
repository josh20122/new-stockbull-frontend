<template>
  <SharedContainer class="w-full">
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
          <span class="text-blue-600">STOck</span>
          <span class="text-green-500">Bull</span>
          <span class="text-yellow-600">_CA</span>
        </div>
      </div>
      <div class="flex gap-2">
        <NuxtLink to="/"> Home </NuxtLink>
        <NuxtLink to="/account"> Account </NuxtLink>
        <div class="text-sm">Log in/Sign Up</div>
      </div>
    </div>
  </SharedContainer>
</template>
<script setup></script>
