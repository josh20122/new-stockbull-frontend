<template>
  <div class="bg-[#000000] text-white">
    <SharedNavBar></SharedNavBar>
    <div class="text-xs w-screen mt-2 px-2">
      <div class="grid grid-cols-12 gap-2">
        <div class="md:col-span-8 col-span-12 flex flex-col gap-y-2">
          <div>
            <HomeArbitrageActiveSymbol></HomeArbitrageActiveSymbol>
          </div>
          <div class="flex w-full h-full overflow-hidden gap-2 relative" :style="`height:${screenHeight * 0.5}px`">
            <HomeArbitrageMarkets :showModal="false" v-if="activeMarket != 'C'" @closeModal="binanceMarketsModal = false"
              class="pb-2"></HomeArbitrageMarkets>

            <HomeStockbullMarkets v-if="activeMarket == 'C'" :showModal="binanceMarketsModal" class="pb-2">
            </HomeStockbullMarkets>

            <ClientOnly>
              <SharedContainer class="w-full" :padding="isSmallScreen">
                <div class="flex gap-x-4 border-b border-gray-500 pb-2" v-if="activeMarket == 'C'">
                  <div @click="chartView = true" class="cursor-pointer"
                    :class="chartView ? 'text-yellow-600' : 'text-white'">
                    Chart
                  </div>
                  <div @click="chartView = false" class="cursor-pointer"
                    :class="!chartView ? 'text-yellow-600' : 'text-white'">
                    History
                  </div>
                </div>
                <ChartsStockbullChart v-if="activeMarket == 'C' && chartView && renderStockbullChart
                  "></ChartsStockbullChart>

                <HomeStockbullBotHistory v-if="activeMarket == 'C' && !chartView && rerenderBotHistory">
                </HomeStockbullBotHistory>
                <ChartsTradingViewWidget v-if="chartView && (activeMarket == 'B' || activeMarket == 'A')
                  "></ChartsTradingViewWidget>
                <HomeArbitrageTradeHistory :title="false" v-if="isSmallScreen && !chartView && activeMarket != 'C'"
                  class="basis-2/4"></HomeArbitrageTradeHistory>
              </SharedContainer>
            </ClientOnly>
            <!-- </div> -->
          </div>
          <div class="flex gap-2 flex-col md:flex-row">
            <HomeArbitrageOrderBook v-if="isSmallScreen && activeMarket != 'C'" class=""></HomeArbitrageOrderBook>
            <HomeStockbullBotDetails v-if="activeMarket == 'C' && rerenderBotHistory"></HomeStockbullBotDetails>
            <HomeYoutubeVideo class="md:basis-2/4"></HomeYoutubeVideo>

            <HomeArbitrageTradeHistory v-if="!isSmallScreen" class="basis-2/4"></HomeArbitrageTradeHistory>
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex gap-x-2">
            <HomeArbitrageOrderBook v-if="!isSmallScreen" class="basis-2/4"></HomeArbitrageOrderBook>
            <SharedContainer :padding="false" v-if="!isSmallScreen">
              <HomeStakeSynthetics v-if="activeMarket == 'C'" @cancel="showStakeModal = false"></HomeStakeSynthetics>
              <HomeStakeBinanceMarket v-if="activeMarket == 'A'" @cancel="showStakeModal = false">
              </HomeStakeBinanceMarket>
              <HomeStakeStockbullMarket v-if="activeMarket == 'B'" @cancel="showStakeModal = false">
              </HomeStakeStockbullMarket>
              <div class="px-2 pt-4">
                <AuthGuestButtons class="hidden md:block"></AuthGuestButtons>
              </div>
            </SharedContainer>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 py-2 border-t z-50 border-gray-500 w-full px-2 bg-black" v-if="isSmallScreen">
      <SharedModal :show-modal="stakeModal" @close="stakeModal = false">
        <HomeStakeSynthetics v-if="activeMarket == 'C'" class="w-full" @cancel="stakeModal = false"></HomeStakeSynthetics>
        <HomeStakeBinanceMarket v-if="activeMarket == 'A'" class="w-full" @cancel="showStakeModal = false">
        </HomeStakeBinanceMarket>
        <HomeStakeStockbullMarket class="w-full" v-if="activeMarket == 'B'" @cancel="showStakeModal = false">
        </HomeStakeStockbullMarket>
      </SharedModal>

      <AuthGuestButtons v-if="!isAuthenticated"></AuthGuestButtons>

      <SharedStakeButtons v-if="isAuthenticated" @stake="handleStake()" :settings="stakeButtonsConfigs">
      </SharedStakeButtons>
    </div>
    <UNotifications />
    <SharedLiveChat></SharedLiveChat>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { setAxiosConfigurations } from "~/.utils/axiosConfigurations";
import { setStockbullBotDetails } from "~/.utils/utilities";
const activeMarket = useMarkets();
const binanceMarketsModal = ref(true);
const symbol = useTradingviewSymbol();
const showStakeModal = ref(false);
const chartView = ref(true);
const isAuthenticated = useAuthenticated();
const testdata = ref("");
const screenHeight = ref(0);
const screeWidth = ref(0);
const stockbullProfits = useStockbullProfits();
const stakeModal = ref(false);

const handleStake = () => {
  stakeModal.value = true;
};

const setScreenHeight = () => {
  screenHeight.value = document.documentElement.clientHeight;
  screeWidth.value = document.documentElement.clientWidth;
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

const stakeButtonsConfigs = computed(() => {
  let buy = false;
  let sell = false;

  let sellLabel = null;
  let buyLabel = null;
  let stake = false;

  if (activeMarket.value == "A") {
    sell = false;
  }

  if (activeMarket.value == "C") {
    buyLabel = "P: " + stockbullProfits.value.profit;
    stake = true;
    sellLabel = "L: " + stockbullProfits.value.profit;
    let buy = true;
    let sell = true;
  }

  return {
    buy: buy,
    sell: sell,
    stake: stake,
    sellLabel: sellLabel,
    buyLabel: buyLabel,
  };
});

const activeStockbullChart = useActiveStockbullMarket();

watch(
  () => activeStockbullChart.value.real_name,
  () => {
    setAxiosConfigurations();
    rerenderStockbullChart();
    setStockbullBotDetails()
  }
);

const renderStockbullChart = ref(true);

const rerenderStockbullChart = async () => {
  renderStockbullChart.value = false;

  await nextTick();

  renderStockbullChart.value = true;
};

onMounted(() => {
  setScreenHeight();
});
watch(testdata, (newval, oldval) => { });

const botData = useBotDetails();
const rerenderBotHistory = ref(true)
const handleRerenderBotHistory = async () => {

  rerenderBotHistory.value = false;

  await nextTick();

  rerenderBotHistory.value = true;
}

watch(() => botData.value.wallets, (newval) => {
  console.log('planning rerender')
  handleRerenderBotHistory()
})

</script>
