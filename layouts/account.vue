<template>
  <div class="bg-black min-h-screen h-full w-full">
    <SharedNavBar></SharedNavBar>

    <div class="px-2 pt-8">
      <div
        class="grid md:grid-cols-12 grid-cols-1 justify-between md:px-10 gap-4"
      >
        <AccountHomeNavigation
          class="md:col-span-2 w-fit"
        ></AccountHomeNavigation>
        <div class="md:col-span-7 w-full">
          <slot></slot>
        </div>
        <div class="md:col-span-3 flex w-full justify-center">
          <ClientOnly v-if="showTransactions">
            <AccountHomeTransactions></AccountHomeTransactions>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
  <UNotifications />
  <SharedLiveChat></SharedLiveChat>
</template>
<script setup>
definePageMeta({});
const route = useRoute();
const pathsToShowTransactions = [
  "/account",
  "/account/deposit",
  "/account/profile",
  "/account/settings",
  "/account/withdraw",
];
const showTransactions = computed(() => {
  if (pathsToShowTransactions.includes(route.fullPath)) {
    return true;
  } else {
    return false;
  }
});
</script>
