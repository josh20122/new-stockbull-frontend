<template>
  <SharedContainer>
    <div class="inline-flex flex-col gap-y-10 w-full">
      <div class="inline-flex flex-col gap-y-1">
        <div
          class="flex gap-x-4 text-xs border-b pb-1 select-none border-gray-500"
        >
          <div
            class="cursor-pointer"
            @click="buy = true"
            :class="buy ? ' text-yellow-500' : ''"
          >
            Buy
          </div>
          <div
            class="cursor-pointer"
            @click="buy = false"
            :class="!buy ? ' text-yellow-500' : ''"
          >
            Sell
          </div>
        </div>
        <label for="" class="text-xs">Symbol</label>
        <USelect
          id="countries"
          :options="symbols"
          option-attribute="symbol"
          value-attribute="symbol"
          v-model="form.symbol"
        />
        <!-- <option v-for="(item, index) in symbols" :value="item.s">
            {{ item.s }}
          </option> -->

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
    </div>
  </SharedContainer>
</template>

<script setup>
import { ref, watch } from "vue";
let activeSymbolData = useActiveTradingViewSymbol();
const props = defineProps({
  buy: {
    default: true,
  },
});
const form = ref({
  symbol: activeSymbolData.value.symbol,
});
const buy = ref(props.buy);

const symbols = useSymbols();
const stake = ref(10);
const target = ref(10 * 3);
watch(stake, (newval, oldval) => {
  target.value = newval * 3;
});
</script>
