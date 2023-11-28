<template>
  <UPopover mode="hover">
    <UButton
      color="white"
      label="Open"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    >
      <div class="text-xs text-start">
        <div>Stockbull Live</div>
        <div>26,000USD</div>
      </div>
    </UButton>

    <template #panel>
      <div class="p-4">eeeeeeeeeee</div>
    </template>
  </UPopover>
</template>

<script setup>
import axios from "axios";

const accounts = ref([]);

const setAccounts = () => {};
</script>
