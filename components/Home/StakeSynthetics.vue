<template>
  <SharedContainer>
    <div class="inline-flex flex-col gap-y-10 w-full">
      <div class="inline-flex flex-col gap-y-1">
        <SharedTextInput
          label="Stake"
          v-model="stake"
          placeholder="Enter your stake amount"
        ></SharedTextInput>

        <SharedTextInput
          label="Target"
          v-model="target"
          placeholder="Enter your stake amount"
          hint="stake * (2.5 - 3.5)"
        ></SharedTextInput>

        <SharedTextInput
          label="Frequency"
          placeholder="Enter your stake amount"
          :model-value="activeStockbullSymbol.name"
          readonly="true"
        ></SharedTextInput>
        <SharedStakeButtons
          class="pt-2"
          @stake="activateStake()"
          :settings="stakeButtonsConfigs"
        ></SharedStakeButtons>
      </div>
    </div>
  </SharedContainer>
</template>

<script setup>
import axios from "axios";
import { ref, watch } from "vue";
const isAuthenticated = useAuthenticated();
const stake = ref(10);
const target = ref(10 * 3);
const activeMarket = useMarkets();
const activeStockbullSymbol = useActiveStockbullMarket();
const activeAccount = useActiveAccount();
const toast = useToast();
const activateStake = () => {
  let url =
    activeAccount.value.type === "demo" ? "/invest-demo" : "/invest-live";

  axios
    .post(url, {
      stake: stake.value,
      stakeAndTarget: target.value,
    })
    .then((response) => {
      toast.add({ title: "🐂 Bot Activated Successfully" });
    });
};

const stakeButtonsConfigs = computed(() => {
  let buy = false;
  let sell = false;
  let sellLabel = null;
  let buyLabel = null;

  if (activeMarket.value == "A") {
    sell = false;
  }

  if (activeMarket.value == "C") {
    buyLabel = "P USD200.00";
    sellLabel = "L USD200.00";
  }

  return {
    buy: buy,
    sell: sell,
    sellLabel: sellLabel,
    buyLabel: "STAKE",
    stake: true,
  };
});

watch(stake, (newval, oldval) => {
  target.value = newval * 3;
});
</script>
