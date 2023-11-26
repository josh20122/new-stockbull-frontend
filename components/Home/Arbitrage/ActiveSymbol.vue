<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex gap-2">
      <SharedContainer
        class="w-full flex flex-col cursor-pointer select-none"
        @click="setActiveMarket('A')"
        :class="activeMarket == 'A' ? 'bg-yellow-700 text-white' : ''"
      >
        <div>Market A</div>
        <div>Binance Market</div>
      </SharedContainer>
      <SharedContainer
        @click="setActiveMarket('B')"
        :class="activeMarket == 'B' ? 'bg-yellow-700 text-white' : ''"
        class="w-full flex flex-col cursor-pointer select-none"
      >
        <div>Market B</div>
        <div>Stockbull Market</div>
      </SharedContainer>
      <SharedContainer
        :class="activeMarket == 'C' ? 'bg-yellow-700 text-white' : ''"
        @click="setActiveMarket('C')"
        class="w-full flex flex-col cursor-pointer select-none"
      >
        <div>Market C</div>
        <div>Stockbull Stocks</div>
      </SharedContainer>
    </div>
    <SharedContainer class="w-full">
      <!-- <div>kshcfnskldhcldnlk</div> -->
      <div
        class="justify-between flex w-full cursor-pointer"
        @click="marketsModal = !marketsModal"
      >
        <div class="inline-flex">
          <span>
            {{
              activeMarket == "C" ? activeChart.name : activeSymbolData.symbol
            }}
          </span>
          <span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="fill-yellow-600"
              viewBox="0 0 16 16"
            >
              <path
                d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
              />
            </svg>
          </span>
        </div>
        <div>{{ activeMarket == "C" ? "" : activeSymbolData.price }}</div>
        <div
          :class="
            activeSymbolData.change < 0 ? 'text-red-500' : ' text-green-500'
          "
        >
          {{ activeMarket == "C" ? "" : activeSymbolData.changePercentage }}
        </div>
      </div>
    </SharedContainer>
    <HomeArbitrageMarkets
      :showModal="marketsModal"
      v-if="activeMarket != 'C'"
      :doNotShow="true"
      @closeModal="marketsModal = false"
    ></HomeArbitrageMarkets>

    <HomeStockbullMarkets
      :showModal="marketsModal"
      v-if="activeMarket == 'C'"
      :doNotShow="true"
      @closeModal="marketsModal = false"
    ></HomeStockbullMarkets>
  </div>
  <!-- drawer init and toggle -->
</template>
<script setup>
import { ref } from "vue";
let activeSymbolData = useActiveTradingViewSymbol();
const marketsModal = ref(false);
const activeMarket = useMarkets();
const activeChart = useActiveStockbullMarket();

const setActiveMarket = (value) => {
  console.log(value);
  activeMarket.value = value;
};
const isSmallScreen = () => {
  return window.innerWidth < 768;
};
</script>
