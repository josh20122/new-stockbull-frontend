<template>
  <!-- <div class=""></div> -->

  <!-- {{ botHistory.stake_amount }} -->
  <div v-if="botHistory.stake_amount > 0">
    <div class="w-full flex p-2 justify-end">
      <UButton @click="switchModal = !switchModal" variant="solid"
        >CHANGE MARKET</UButton
      >
    </div>
    <HomeStockbullSwitchChart
      @closeModal="switchModal = false"
      :showModal="switchModal"
    ></HomeStockbullSwitchChart>
    <div>
      <div
        className="flex-col flex  gap-y-2 relative  max-h-[400px]  overflow-y-scroll py-4"
      >
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
  </div>

  <div v-else class="w-full text-center pt-5">
    SORRY, YOU DO NOT HAVE AN ACTIVE BOT IN THIS MARKET
  </div>
</template>
<script setup>
import axios from "axios";
const botHistory = useBotDetails();
const switchModal = ref(false);

watch(switchModal, (newValue) => {
  console.log(newValue);
});
</script>
