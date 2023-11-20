<template>
  <div class="flex flex-col gap-4">
    <NuxtLink to="/account/deposit/cryptocurrency">
      <SharedContainer class="rounded-md w-full">
        <div class="flex place-items-center gap-x-2 w-full">
          <img class="h-8 rounded-full" src="/usdt-logo.jpg" alt="" />
          <div class="flex place-items-center w-full justify-between">
            <div class="flex flex-col">
              <div class="font-semibold">Cryptocurrency</div>
              <div class="text-sm text-green-600">Instant</div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      </SharedContainer>
    </NuxtLink>

    <NuxtLink
      :to="'/account/deposit/agent/' + item.id"
      v-for="(item, index) in paymentAgents"
      :key="index"
    >
      <SharedContainer class="rounded-md w-full">
        <div class="flex place-items-center gap-x-2 w-full">
          <img class="h-8 w-8 rounded-full" :src="item.image" alt="" />
          <div class="flex place-items-center w-full justify-between">
            <div class="flex flex-col">
              <div class="font-semibold">{{ item.name }}</div>
              <div class="text-sm text-green-600">Instant</div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      </SharedContainer>
    </NuxtLink>
  </div>
</template>
<script setup>
import axios from "axios";
import { setAxiosConfigurations } from "~/.utils/axiosConfigurations";
definePageMeta({
  layout: "account",
});
const paymentAgents = ref([]);
const env = useRuntimeConfig();

const fetchPaymentAgents = () => {
  axios
    .get("/get-payment-agents")
    .then((response) => {
      // console.log(response.data);
      paymentAgents.value = response.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

onMounted(() => {
  setAxiosConfigurations();
  fetchPaymentAgents();
});
</script>
