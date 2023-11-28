<template>
  <SharedContainer class="w-full text-[10px]">
    <div class="font-semibold pb-4 text-xs" v-if="title">Trade History</div>
    <div class="flex px-2 border-y py-1 border-gray-600 justify-between">
      <div>Price</div>
      <div>Quantity</div>
      <div>Time</div>
    </div>
    <div class="flex flex-col">
      <div class="flex px-2 py-1 justify-between" v-for="(item, index) in tradeHistory" :key="index">
        <div :class="item.m ? 'text-green-500' : 'text-red-500'">
          ${{ parseFloat(item.p).toLocaleString() }}
        </div>
        <div>{{ parseFloat(item.q) }}</div>
        <div>
          {{
            new Date(item.T).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          }}
        </div>
      </div>
    </div>
  </SharedContainer>
</template>
<script setup>
import { ref } from "vue";
const tradeHistory = ref([]);
const props = defineProps({
  title: {
    default: true,
  },
});


onMounted(() => {
  const symbol = "btcusdt";
  const depthLevels = 5;
  const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@trade`;

  const ws = new WebSocket(wsUrl);
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    tradeHistory.value.unshift(data);

    tradeHistory.value = tradeHistory.value.slice(0, 10);
  };
});
</script>
