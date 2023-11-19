<template>
  <SharedContainer class="w-full h-full">
    <ClientOnly>
      <Chart
        class="h-full w-full bg-transparent"
        :options="chartOptions"
        v-if="renderComponent"
      />
    </ClientOnly>
    <!-- <div class="text-xl mb-10 text-right">{{ symbol }}</div> -->
  </SharedContainer>
</template>

<script setup>
import { Chart, CryptoMarket, Snaps, Screener } from "vue-tradingview-widgets";
import { ref, nextTick, getCurrentInstance } from "vue";
const symbol = useTradingviewSymbol();
const rerenderKey = ref(0);

const renderComponent = ref(true);

const forceRender = async () => {
  // Here, we'll remove MyComponent
  renderComponent.value = false;

  // Then, wait for the change to get flushed to the DOM
  await nextTick();

  // Add MyComponent back in
  renderComponent.value = true;
};

const chartOptions = ref({
  autosize: true,
  symbol: "BINANCE:" + symbol.value,
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

watch(symbol, () => {
  // Force rerender by updating the rerenderKey
  // console.log('hello theee')
  chartOptions.value = {
    autosize: true,
    symbol: symbol.value,
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
  };

  forceRender();
  rerenderKey.value += 1;
});
</script>
