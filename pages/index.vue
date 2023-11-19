<template>
  <div class="bg-slate-950 text-xs h-screen w-screen">
    <!-- <HomeStakeSynthetics></HomeStakeSynthetics>eeeeeeeeeeeeccccccccceeeeeeeeeeee -->
    <!-- <ClientOnly>
      <ChartsTradingViewWidget></ChartsTradingViewWidget>
    </ClientOnly> -->

    <!-- <HomeArbitrageMarkets></HomeArbitrageMarkets> -->
    <!-- <HomeArbitrageOrderBook></HomeArbitrageOrderBook> -->
    <HomeArbitrageTradeHistory></HomeArbitrageTradeHistory>
    <!-- <ClientOnly>
      <ChartsStockbullChart></ChartsStockbullChart>
    </ClientOnly> -->

    <!-- 
    <button class="btn btn-primary" @click="symbol = 'BITSTAMP:ETHUSD'">
      Change sumbol
    </button>

    {{ symbol }} -->
  </div>
</template>
<script setup>
import { ref } from "vue";
const symbol = useTradingviewSymbol();

const testdata = ref("");
watch(testdata, (newval, oldval) => {
  console.log(newval);
});
</script>
