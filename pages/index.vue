<template>
  <div class="bg-[#000000] text-white">
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
            <HomeArbitrageMarkets
              :showModal="false"
              v-if="activeMarket != 'C'"
              @closeModal="binanceMarketsModal = false"
              class="pb-2"
            ></HomeArbitrageMarkets>

            <HomeStockbullMarkets
              v-if="activeMarket == 'C'"
              :showModal="binanceMarketsModal"
              class="pb-2"
            ></HomeStockbullMarkets>

            <ClientOnly>
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
                <ChartsStockbullChart
                  v-if="activeMarket == 'C' && chartView"
                ></ChartsStockbullChart>

                <HomeStockbullBotHistory
                  v-if="activeMarket == 'C' && !chartView"
                ></HomeStockbullBotHistory>
                <ChartsTradingViewWidget
                  v-if="
                    chartView && (activeMarket == 'B' || activeMarket == 'A')
                  "
                ></ChartsTradingViewWidget>
                <HomeArbitrageTradeHistory
                  :title="false"
                  v-if="isSmallScreen && !chartView && activeMarket != 'C'"
                  class="basis-2/4"
                ></HomeArbitrageTradeHistory>
              </SharedContainer>
            </ClientOnly>
            <!-- </div> -->
          </div>
          <div class="flex gap-2 flex-col md:flex-row">
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
            <SharedContainer :padding="false" v-if="!isSmallScreen">
              <HomeStakeSynthetics
                v-if="activeMarket == 'C'"
                @cancel="showStakeModal = false"
              ></HomeStakeSynthetics>
              <HomeStakeBinanceMarket
                v-if="activeMarket == 'A'"
                @cancel="showStakeModal = false"
              ></HomeStakeBinanceMarket>
              <HomeStakeStockbullMarket
                v-if="activeMarket == 'B'"
                @cancel="showStakeModal = false"
              ></HomeStakeStockbullMarket>
              <div class="px-2 pt-4">
                <AuthGuestButtons class="hidden md:block"></AuthGuestButtons>
              </div>
            </SharedContainer>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed bottom-0 py-2 border-t z-50 border-gray-500 w-full px-2 bg-black"
      v-if="isSmallScreen"
    >
      <AuthGuestButtons v-if="!isAuthenticated"></AuthGuestButtons>
      <!-- <SharedModal
        :showModal="showStakeModal"
        @close="showArbitrageStakeModal = false"
      >
        <div class="inline-flex flex-col gap-y-10 w-full">
          <HomeStakeSynthetics
            v-if="activeMarket == 'C'"
            @cancel="showStakeModal = false"
          ></HomeStakeSynthetics>
          <HomeStakeBinanceMarket
            v-if="activeMarket == 'A'"
            @cancel="showStakeModal = false"
          ></HomeStakeBinanceMarket>
          <HomeStakeStockbullMarket
            v-if="activeMarket == 'B'"
            @cancel="showStakeModal = false"
          ></HomeStakeStockbullMarket>

          <AuthGuestButtons class="hidden md:block"></AuthGuestButtons>
        </div>
      </SharedModal> -->
      <div class="w-full" v-if="isAuthenticated">
        <button
          @click="showStakeModal = true"
          v-if="activeMarket == 'C'"
          class="btn btn-sm uppercase w-full rounded-sm hover:bg-yellow-500 hover:text-sky-900 bg-yellow-500 font-medium text-xs text-slate-900"
        >
          Stake
        </button>

        <button
          @click="showStakeModal = true"
          v-else-if="activeMarket == 'A'"
          class="btn btn-sm uppercase w-full rounded-sm hover:bg-yellow-500 hover:text-sky-900 bg-yellow-500 font-medium text-xs text-slate-900"
        >
          BUY
        </button>
        <div class="flex w-full gap-2" v-if="activeMarket == 'B'">
          <div class="w-full">
            <button
              @click="showStakeModal = true"
              class="btn btn-sm uppercase w-full rounded-sm hover:bg-yellow-500 hover:text-sky-900 bg-yellow-500 font-medium text-xs text-slate-900"
            >
              BUY
            </button>
          </div>
          <div class="w-full">
            <button
              @click="showStakeModal = true"
              class="btn btn-sm w-full hover:outline-yellow-500 hover:border-yellow-500 hover:bg-transparent uppercase rounded-sm outline-yellow-500 bg-transparent border-yellow-500 text-yellow-500 font-medium text-xs"
            >
              SELL
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const activeMarket = useMarkets();
const binanceMarketsModal = ref(true);
const symbol = useTradingviewSymbol();
const showStakeModal = ref(false);
const chartView = ref(true);
const isAuthenticated = useAuthenticated();
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
const showStockbullChart = computed(() => {
  if (activeMarket == "C" && chartView) {
    return true;
  } else {
    return false;
  }
});

onMounted(() => {
  setScreenHeight();
});
watch(testdata, (newval, oldval) => {
  console.log(newval);
});
</script>
