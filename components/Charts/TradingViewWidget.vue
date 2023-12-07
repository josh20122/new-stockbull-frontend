<template>
  <SharedContainer class="w-full h-full" :padding="false">
    <ClientOnly>
      <Chart class="h-full w-full bg-transparent" :options="chartOptions" v-if="renderComponent" />
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
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
};

const chartOptions = ref({
  autosize: true,
  symbol: "BINANCE:" + symbol.value,
  interval: "1",
  timezone: "Africa/Nairobi",
  theme: "dark",
  style: "1",
  locale: "en",
  enable_publishing: false,
  withdateranges: true,
  hide_side_toolbar: false,
  allow_symbol_change: false,
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
    allow_symbol_change: false,
    show_popup_button: true,
    popup_width: "1000",
    popup_height: "650",
  };

  forceRender();
  rerenderKey.value += 1;
});
</script>
