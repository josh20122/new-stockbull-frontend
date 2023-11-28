<template>
  <UPopover>
    <UButton color="white" label="Open">
      <div class="text-xs text-start">
        <div>{{ activeAccount.name }}</div>
        <div>{{ activeAccount.amount }}</div>
      </div>
    </UButton>

    <template #panel>
      <div class="flex flex-col py-3 gap-y-2 px-2 select-none">
        <div
          v-for="(item, index) in accounts"
          :key="index"
          @click="changeActiveAccount(item)"
          class="text-xs text-start border-red-600 rounded-md pl-2 cursor-pointer py-2 pr-10"
          :class="activeAccount.type == item.type ? 'bg-yellow-600' : ''"
        >
          <div>{{ item.name }}</div>
          <div>{{ item.amount }}</div>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup>
import axios from "axios";
import { setAxiosConfigurations } from "~/.utils/axiosConfigurations";

const accounts = useStockbullAccounts();
const activeAccount = useActiveAccount();
const user = useUser();

const changeActiveAccount = (item) => {
  activeAccount.value = item;
  setAxiosConfigurations();
};

onMounted(() => {
  // setAxiosConfigurations();
});
</script>
