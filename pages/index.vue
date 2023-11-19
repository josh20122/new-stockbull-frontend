<template>
  <div class="bg-[#000000]">
    <SharedNavBar></SharedNavBar>
    <div class="text-xs w-screen mt-2 px-2">
      <div class="grid grid-cols-12 gap-2">
        <div class="md:col-span-8 col-span-12 flex flex-col gap-y-2">
          <div>
            <HomeArbitrageActiveSymbol></HomeArbitrageActiveSymbol>
          </div>
          <div
            class="flex w-full h-full overflow-hidden gap-2 relative"
            :style="`height:${screenHeight * 0.5}px`"
          >
            <HomeArbitrageMarkets class="pb-2"></HomeArbitrageMarkets>

            <!-- v-if="!isSmallScreen" -->

            <!-- <div class="bg-red-400 w-full h-full"> -->

            <ClientOnly>
              <!-- <ChartsStockbullChart class="h-full"></ChartsStockbullChart> -->
              <SharedContainer class="w-full" :padding="isSmallScreen">
                <div
                  class="flex gap-x-4 border-b border-gray-500 pb-2"
                  v-if="isSmallScreen"
                >
                  <div
                    @click="chartView = true"
                    class="cursor-pointer"
                    :class="chartView ? 'text-yellow-600' : 'text-white'"
                  >
                    Chart
                  </div>
                  <div
                    @click="chartView = false"
                    class="cursor-pointer"
                    :class="!chartView ? 'text-yellow-600' : 'text-white'"
                  >
                    History
                  </div>
                </div>
                <ChartsTradingViewWidget
                  v-if="chartView"
                ></ChartsTradingViewWidget>
                <HomeArbitrageTradeHistory
                  :title="false"
                  v-if="isSmallScreen && !chartView"
                  class="basis-2/4"
                ></HomeArbitrageTradeHistory>
              </SharedContainer>
            </ClientOnly>
            <!-- </div> -->
          </div>
          <div class="flex gap-2 flex-col md:flex-row">
            <!-- <HomeArbitrageTradeHistory
              v-if="isSmallScreen"
              class="basis-2/4"
            ></HomeArbitrageTradeHistory> -->

            <HomeArbitrageOrderBook
              v-if="isSmallScreen"
              class=""
            ></HomeArbitrageOrderBook>
            <HomeYoutubeVideo class="md:basis-2/4"></HomeYoutubeVideo>

            <HomeArbitrageTradeHistory
              v-if="!isSmallScreen"
              class="basis-2/4"
            ></HomeArbitrageTradeHistory>
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex gap-x-2">
            <HomeArbitrageOrderBook
              v-if="!isSmallScreen"
              class="basis-2/4"
            ></HomeArbitrageOrderBook>
            <HomeStakeSynthetics
              v-if="!isSmallScreen"
              class="basis-2/4"
            ></HomeStakeSynthetics>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-0 py-2 border-t z-50 border-gray-500 w-full px-2 bg-black"
      v-if="isSmallScreen"
    >
      <AuthGuestButtons></AuthGuestButtons>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const symbol = useTradingviewSymbol();
const chartView = ref(true);

const testdata = ref("");
const screenHeight = ref(0);
const screeWidth = ref(0);
const setScreenHeight = () => {
  screenHeight.value = document.documentElement.clientHeight;
  screeWidth.value = document.documentElement.clientWidth;
  console.log(document.documentElement.clientWidth);
};
const isSmallScreen = computed(() => {
  return document.documentElement.clientWidth < 768;
});

onMounted(() => {
  setScreenHeight();
});
watch(testdata, (newval, oldval) => {
  console.log(newval);
});
</script>
