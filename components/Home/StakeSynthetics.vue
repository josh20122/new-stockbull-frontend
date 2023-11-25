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
          label="Target"
          v-model="target"
          placeholder="Enter your stake amount"
          hint="stake * (2.5 - 3.5)"
        ></SharedTextInput>

        <SharedTextInput
          label="Frequency"
          placeholder="Enter your stake amount"
          :model-value="'15f'"
          readonly="true"
        ></SharedTextInput>
        <button
          class="btn btn-sm uppercase rounded-sm hover:bg-yellow-500 hover:text-sky-900 bg-yellow-500 font-medium text-xs text-slate-900"
        >
          Stake
        </button>

        <button
          @click="$emit('cancel')"
          class="btn btn-sm w-full hover:outline-red-500 hover:border-red-500 hover:bg-transparent uppercase rounded-sm outline-red-500 bg-transparent border-red-500 text-red-500 font-medium text-xs"
        >
          CANCEL
        </button>
      </div>
    </div>
  </SharedContainer>
</template>

<script setup>
import { ref, watch } from "vue";
const isAuthenticated = useAuthenticated();
const stake = ref(10);
const target = ref(10 * 3);
watch(stake, (newval, oldval) => {
  target.value = newval * 3;
});
</script>
