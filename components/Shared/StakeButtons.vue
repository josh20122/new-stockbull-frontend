<template>
  <div class="w-full gap-x-2 flex-row gap-y-4 flex md:flex-col">
    <div v-if="settings.buy" class="w-full">
      <UButton
        color="yellow"
        block
        class="text-white w-full text-center rounded-xs"
      >
        {{ settings.buyLabel ?? "BUY" }}
      </UButton>
    </div>
    <div v-if="settings.sell" class="w-full">
      <UButton
        color="yellow"
        block
        variant="outline"
        class="text-white w-full text-center rounded-xs"
      >
        {{ settings.sellLabel ?? "SELL" }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["settings"]);
const emit = defineEmits("buy", "sell");
</script>
