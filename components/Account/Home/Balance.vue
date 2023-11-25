<template>
  <div class="font-semibold text-3xl gap-3 md:flex hidden">
    HI,
    <span class="uppercase"> {{ user.username }} </span>
  </div>
  <div class="flex gap-2 py-2 flex-col md:flex-row w-full">
    <SharedContainer
      class="flex gap-2 flex-col rounded-md w-full h-fit"
      v-for="(item, index) in accounts.accounts"
    >
      <div>{{ item.name }}</div>
      <div>{{ item.amount }}</div>
    </SharedContainer>
  </div>
</template>
<script setup>
import axios from "axios";
import { setAxiosConfigurations } from "~/.utils/axiosConfigurations";

const accounts = ref([]);

const user = useUser();
onMounted(() => {
  // setAxiosConfigurations();
  axios.get("/account-details").then((response) => {
    console.log(response.data);
    accounts.value = response.data;
  });
});
</script>
