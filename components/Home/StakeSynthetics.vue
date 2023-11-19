<template>
  <SharedContainer>
    <div class="inline-flex flex-col gap-y-10 w-full">
      <div class="inline-flex flex-col gap-y-1">
        <SharedTextInput
          label="Stake"
          v-model="stake"
          placeholder="Enter your stake amount"
        ></SharedTextInput>

        <SharedTextInput
          label="Stake"
          v-model="target"
          placeholder="Enter your stake amount"
          hint="hello there"
        ></SharedTextInput>

        <SharedTextInput
          label="Frequency"
          placeholder="Enter your stake amount"
          :model-value="'3600f'"
          readonly="true"
        ></SharedTextInput>
        <button
          class="btn btn-sm uppercase rounded-sm hover:bg-yellow-500 hover:text-sky-900 bg-yellow-500 font-medium text-xs text-slate-900"
        >
          Stake
        </button>
      </div>

      <AuthGuestButtons class="hidden md:block"></AuthGuestButtons>
    </div>
  </SharedContainer>
</template>

<script setup>
import { ref, watch } from "vue";

const stake = ref(10);
const target = ref(10 * 3);
watch(stake, (newval, oldval) => {
  target.value = newval * 3;
});
</script>
