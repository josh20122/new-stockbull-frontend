<template>
  <SharedContainer class="w-full h-screen">
    <ClientOnly>
      <Chart class="h-full w-full" :options="chartOptions" />
    </ClientOnly>
    <div class="text-xl mb-10 text-right">{{ symbol }}</div>
  </SharedContainer>
</template>

<script setup>
import { Chart, CryptoMarket, Snaps, Screener } from "vue-tradingview-widgets";
import { ref } from "vue";
const symbol = useTradingviewSymbol();

const chartOptions = ref({
  autosize: true,
  symbol: useTradingviewSymbol(),
  interval: "D",
  timezone: "Africa/Nairobi",
  theme: "dark",
  style: "1",
  locale: "en",
  enable_publishing: false,
  withdateranges: true,
  hide_side_toolbar: false,
  allow_symbol_change: true,
  show_popup_button: true,
  popup_width: "1000",
  popup_height: "650",
  //   container_id: "tradingview_942b7",
});
</script>
