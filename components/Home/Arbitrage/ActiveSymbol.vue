<template>
  <SharedContainer class="w-full" v-if="activeSymbolData.symbol">
    <div class="justify-between flex w-full">
      <div class="inline-flex">
        <span>
          {{ activeSymbolData.symbol }}
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
      <div>{{ activeSymbolData.price }}</div>
      <div
        :class="
          activeSymbolData.change < 0 ? 'text-red-500' : ' text-green-500'
        "
      >
        {{ activeSymbolData.changePercentage }}
      </div>
    </div>
  </SharedContainer>
</template>
<script setup>
import { ref } from "vue";
let data = useActiveTradingViewSymbol();

const activeSymbolData = ref(data);
</script>
