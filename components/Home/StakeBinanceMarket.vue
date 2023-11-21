<template>
  <SharedContainer>
    <div class="inline-flex flex-col gap-y-10 w-full">
      <div class="inline-flex flex-col gap-y-1">
        <label for="" class="text-xs">Symbol</label>
        <select
          id="countries"
          v-model="form.symbol"
          class="input-sm border text-[10px] w-full border-gray-600 bg-transparent placeholder:text-[12px] text-white shadow-inner shadow-gray-900 rounded-sm focus:outline-none focus:border-indigo-500"
        >
          <option v-for="(item, index) in symbols" :value="item.s">
            {{ item.s }}
          </option>
        </select>

        <SharedTextInput
          label="Amount to buy"
          v-model="target"
          placeholder="Enter your stake amount"
          hint="USD"
        ></SharedTextInput>

        <SharedTextInput
          label="You will get"
          hint="Please note that amount may change during the purchase"
          placeholder="Enter your stake amount"
          :model-value="'15f'"
          readonly="true"
        ></SharedTextInput>
        <button
          class="btn btn-sm uppercase rounded-sm hover:bg-yellow-500 hover:text-sky-900 bg-yellow-500 font-medium text-xs text-slate-900"
        >
          Buy
        </button>

        <button
          @click="$emit('cancel')"
          class="btn btn-sm w-full hover:outline-red-500 hover:border-red-500 hover:bg-transparent uppercase rounded-sm outline-red-500 bg-transparent border-red-500 text-red-500 font-medium text-xs"
        >
          CANCEL
        </button>
      </div>

      <AuthGuestButtons class="hidden md:block"></AuthGuestButtons>
    </div>
  </SharedContainer>
</template>

<script setup>
import { ref, watch } from "vue";
let activeSymbolData = useActiveTradingViewSymbol();
const form = ref({
  symbol: activeSymbolData.value.symbol,
});

const symbols = useSymbols();
const stake = ref(10);
const target = ref(10 * 3);
watch(stake, (newval, oldval) => {
  target.value = newval * 3;
});
</script>