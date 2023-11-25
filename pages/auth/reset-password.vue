<template>
  <SharedNavBar></SharedNavBar>
  <div class="flex w-full h-screen place-items-center px-2 bg-black">
    <SharedContainer class="w-full mx-auto rounded-md md:max-w-[500px]">
      <div class="text-center">LOGIN</div>
      <div class="inline-flex w-full pag-2 flex-col">
        <SharedTextInput placeholder="Email"></SharedTextInput>

        <SharedTextInput placeholder="Password"></SharedTextInput>
        <div class="pt-4 w-full">
          <button class="btn btn-secondary text-white btn-sm w-full">
            Register
          </button>
        </div>
      </div>
    </SharedContainer>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: "guest",
});
</script>
