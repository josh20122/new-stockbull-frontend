<template>
  <div class="bg-[#000000]">
    <SharedNavBar></SharedNavBar>
    <div class="text-xs w-screen mt-2 px-2">
      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-8 flex flex-col gap-y-2">
          <div>
            <HomeArbitrageActiveSymbol></HomeArbitrageActiveSymbol>
          </div>
          <div
            class="flex w-full h-full overflow-hidden gap-2 relative"
            :style="`height:${screenHeight * 0.5}px`"
          >
            <HomeArbitrageMarkets class="pb-2"></HomeArbitrageMarkets>
            <!-- <div class="bg-red-400 w-full h-full"> -->
            <ClientOnly>
              <!-- <ChartsStockbullChart class="h-full"></ChartsStockbullChart> -->
              <ChartsTradingViewWidget></ChartsTradingViewWidget>
            </ClientOnly>
            <!-- </div> -->
          </div>
          <div class="flex gap-x-2">
            <HomeYoutubeVideo class="basis-2/4"></HomeYoutubeVideo>

            <HomeArbitrageTradeHistory
              class="basis-2/4"
            ></HomeArbitrageTradeHistory>
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex gap-x-2">
            <HomeArbitrageOrderBook class="basis-2/4"></HomeArbitrageOrderBook>
            <HomeStakeSynthetics class="basis-2/4"></HomeStakeSynthetics>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const symbol = useTradingviewSymbol();

const testdata = ref("");
const screenHeight = ref(0);
const screeWidth = ref(0);
const setScreenHeight = () => {
  screenHeight.value = window.screen.height;
  screeWidth.value = window.screen.width;
};
onMounted(() => {
  setScreenHeight();
});
watch(testdata, (newval, oldval) => {
  console.log(newval);
});
</script>
