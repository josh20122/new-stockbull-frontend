<template>
  <!-- <div class=""></div> -->
  <div>
    <div
      className="flex-col flex  gap-y-2 relative  max-h-[400px]  overflow-y-scroll py-4"
    >
      <!-- {{ botHistory.activities }} -->
      <div
        v-for="(item, index) in botHistory.activities"
        :key="index"
        :style="'color:' + (item.type == 0 ? 'red' : 'green')"
        className="inline-flex flex-col w-full px-2 py-3 font-medium rounded-md bg-slate-900 gap-y-3"
      >
        <div className="flex justify-between">
          <span className=" text-[10px] "> {{ item.timeText }} </span>
          <span className=" text-[10px] ">
            {{ item.type == 0 ? "LOSS: " : "PROFIT: " + "+" }}
            {{ item.amount }}
          </span>
        </div>
        <div className="w-full h-1 rounded-md overscroll-none bg-slate-900 ">
          <div
            :style="`background-color: ` + (item.type == 0 ? 'red' : 'green')"
            class="w-[100%] rounded-md h-full"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";

const botHistory = useStockbullBotHistory();

const setBotHistory = () => {
  axios.get("/bot-activity").then((response) => {
    botHistory.value = response.data;
  });
};

onMounted(() => {
  setBotHistory();
});
</script>
