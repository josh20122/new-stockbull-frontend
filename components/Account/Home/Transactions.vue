<template>
  <SharedContainer class="rounded-md w-full">
    <div class="pb-6">Recent transaction</div>
    <div
      class="flex flex-col gap-y-2"
      v-for="(item, index) in transactions"
      :key="index"
    >
      <div class="flex justify-between">
        <div class="flex flex-col">
          <div class="text-white flex gap-x-3">
            <div>
              {{ item.type == 1 ? "Deposit" : "Withdrawal" }}
            </div>
            <button
              class="text-[8px] text-white rounded-md text-center px-1"
              :style="' background-color:' + getStatus(item.status).color"
            >
              {{ getStatus(item.status).text }}
            </button>
          </div>
          <div class="text-xs">{{ item.payment_method }}</div>
        </div>
        <div class="flex flex-col">
          <div class="text-white">{{ parseFloat(item.amount) }}USD</div>
          <div class="text-xs text-end">{{ item.created_at }}</div>
        </div>
      </div>
      <hr class="border-gray-500" />
    </div>
  </SharedContainer>
</template>
<script setup>
import axios from "axios";
import { setAxiosConfigurations } from "~/.utils/axiosConfigurations";

const transactions = ref([]);
// const getTransactions = () => {
//   axios.get("/payments").then((response) => {
//     console.log(response.data);
//   });
// };

const getStatus = (status) => {
  let text = "PENDING";
  let color = "red";
  if (status == 1) {
    text = "PENDING";
    color = "yellow";
  } else if (status == 0) {
    text = "FAILED";
    color = "red";
  } else if (status == 2) {
    text = "COMPLETED";
    color = "green";
  }

  return {
    color: color,
    text: text,
  };
};

onMounted(() => {
  setAxiosConfigurations();
  axios.get("/payments").then((response) => {
    transactions.value = response.data;
  });
});
</script>
