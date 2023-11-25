<template>
  <AccountHomeBalance></AccountHomeBalance>
</template>
<script setup>
definePageMeta({
  layout: "account",
  middleware: "auth",
});
</script>
