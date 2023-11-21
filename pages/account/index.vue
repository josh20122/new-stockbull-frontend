<template>
  <div
    class="grid md:grid-cols-12 grid-cols-1 justify-between md:px-10 gap-x-4"
  >
    <AccountHomeNavigation class="md:col-span-2 w-fit"></AccountHomeNavigation>
    <AccountHomeBalance class="md:col-span-8 w-full"></AccountHomeBalance>
    <div class="md:col-span-2 flex w-full justify-center">
      <ClientOnly>
        <AccountHomeTransactions></AccountHomeTransactions>
      </ClientOnly>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "account",
});
</script>
