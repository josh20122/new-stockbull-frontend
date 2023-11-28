<template>
  <div class="flex flex-col w-full gap-y-2">
    <div v-if="settings.stake" class="w-full">
      <UButton
        color="yellow"
        @click="emit('stake')"
        block
        class="text-white w-full text-center rounded-xs"
      >
        {{ settings.stakeLabel ?? "STAKE" }}
      </UButton>
    </div>
    <div class="w-full gap-x-2 flex-row gap-2 flex md:flex-col">
      <div v-if="settings.buy" class="w-full">
        <UButton
          @click="emit('buy')"
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
          @click="emit('sell')"
          variant="outline"
          class="text-white w-full text-center rounded-xs"
        >
          {{ settings.sellLabel ?? "SELL" }}
        </UButton>
      </div>
    </div>
    <div v-if="settings.cancel" class="w-full">
      <UButton
        color="red"
        @click="emit('cancel')"
        variant="outline"
        block
        class="text-white w-full text-center rounded-xs"
      >
        {{ settings.stakeLabel ?? "CANCEL" }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
const props = defineProps(["settings"]);
const emit = defineEmits(["buy", "sell", "stake"]);
</script>
