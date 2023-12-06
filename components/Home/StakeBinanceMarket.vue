<template>
  <SharedContainer>
    <div class="inline-flex flex-col gap-y-10 w-full">
      <div class="inline-flex flex-col gap-y-1">
        <label for="" class="text-xs">Symbol</label>
        <!-- {{ symbols }} -->
        <USelect id="countries" :options="symbols" option-attribute="symbol" value-attribute="symbol"
          v-model="form.symbol" />

        <SharedTextInput label="Amount to buy" v-model="target" placeholder="Enter your stake amount" hint="USD">
        </SharedTextInput>

        <SharedTextInput label="You will get" hint="Please note that amount may change during the purchase"
          placeholder="Enter your stake amount" :model-value="'15f'" readonly="true"></SharedTextInput>
        <SharedStakeButtons class="pt-2" @stake="activateStake()" @cancel="emit('cancel')"
          :settings="stakeButtonsConfigs"></SharedStakeButtons>
      </div>
    </div>
  </SharedContainer>
</template>

<script setup>
import { ref, watch } from "vue";
let activeSymbolData = useActiveTradingViewSymbol();
const form = ref({
  symbol: activeSymbolData.value.symbol,
});

const emit = defineEmits('cancel')

const symbols = useSymbols();
const stake = ref(10);
const target = ref(10 * 3);
watch(stake, (newval, oldval) => {
  target.value = newval * 3;
});

const isSmallScreen = computed(() => {
  return document.documentElement.clientWidth < 768;
});




const stakeButtonsConfigs = computed(() => {
  let buy = true;
  let sell = true;
  let sellLabel = null;
  let buyLabel = null;


  return {
    buy: buy,
    sell: false,
    sellLabel: sellLabel,
    buyLabel: "STAKE",
    cancel: isSmallScreen.value,
    stake: false,
  };
});

</script>
