<template>
  <SharedContainer>
    <div class="inline-flex flex-col gap-y-10 w-full">
      <div class="inline-flex flex-col gap-y-1">
        <div class="flex gap-x-4 text-xs border-b pb-1 select-none border-gray-500">
          <div class="cursor-pointer" @click="buy = false" :class="!buy ? ' text-yellow-500' : ''">
            Sell
          </div>
        </div>

        <div v-if="wallets.length <= 0" class=" text-xs text-red-600  text-center">You do not have an active asset, please
          buy one in
          Market A.</div>
        <div v-else class=" w-full">

          <label for="" class="text-xs">Symbol</label>
          <!-- {{ wallets }} -->
          <div>
            <USelect id="symbol" :options="wallets" option-attribute="symbol" value-attribute="symbol"
              v-model="form.symbol" />
            <!-- <div class="flex flex-col"> -->
            <div v-if="formErrors.symbol" class="text-[10px] text-red-600">
              <div v-for="(error, index) in formErrors.symbol" v-text="error" :key="index"></div>
            </div>
          </div>
          <div v-if="selectedSymbolRealTimeData">
            <label v-text="`Amount to sell in ${selectedSymbolData.symbol.replace('USDT', '')}`"
              class="first-letter:capitalize text-[11px] text-gray-300" :for="id">
            </label>
            <UInput v-model="form.amount" autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }"
              :placeholder="`Enter amount in ${selectedSymbolData.symbol.replace('USDT', '')}`"
              :hint="`LIMIT: ${selectedSymbolData.profit / selectedSymbolRealTimeData.c + selectedSymbolData.symbol.replace('USDT', '')}`"
              :errors="formErrors.amount">
              <template #trailing>
                <UButton :color="'yellow'" variant="link"
                  @click=" form.amount = selectedSymbolData.profit / selectedSymbolRealTimeData.c" :padded="false"
                  label="ALL">
                </UButton>
              </template>
            </UInput>
            <div v-if="formErrors.amount" class="text-[10px] text-red-600">
              <div v-for="(error, index) in formErrors.amount" v-text="error" :key="index"></div>
            </div>
            <div v-else class=" text-xs text-yellow-500 text-end"
              v-text="`LIMIT: ${selectedSymbolData.profit / selectedSymbolRealTimeData.c + selectedSymbolData.symbol.replace('USDT', '')}`">
            </div>
          </div>

          <SharedTextInput label="You will get" placeholder="Enter your stake amount" :model-value="totalAmount"
            class=" w-full" v-if="selectedSymbolRealTimeData" readonly="true"></SharedTextInput>
          <SharedStakeButtons class="pt-2" @stake="activateStake()" @cancel="emit('cancel')" @buy="submitForm()"
            :settings="stakeButtonsConfigs"></SharedStakeButtons>
        </div>
      </div>
    </div>
  </SharedContainer>
</template>

<script setup>
import axios from "axios";
import { ref, watch } from "vue";
let activeSymbolData = useActiveTradingViewSymbol();
const props = defineProps({
  buy: {
    default: true,
  },
});
const symbols = useSymbols();

const selectedSymbolData = computed(() => {
  return wallets.value.filter((item) => item.symbol == form.value.symbol)[0]
})


const selectedSymbolRealTimeData = computed(() => {
  return symbols.value.filter((symbol) => symbol.s.includes(form.value.symbol))[0] ?? null
})

const arbitrageConstants = useArbitrageConstants()

const emit = defineEmits('cancel')

const form = ref({
  symbol: activeSymbolData.value.symbol,
  amount: null,
  totalProfit: null,
});

const toast = useToast();
const totalAmount = computed(() => {
  // return selectedSymbolRealTimeData.c;
  // return selectedSymbolRealTimeData.value.c; Volume

  if (selectedSymbolRealTimeData.value) {
    return arbitrageConstants.value.cza * form.value.amount * selectedSymbolRealTimeData.value.c + 'USD';
  } else {
    return 'loading...'
  }
});

const submitForm = () => {
  axios.post('/sell-arbitrage', {
    symbol: form.value.symbol,
    amount: form.value.amount * selectedSymbolRealTimeData.c,
  }).then(response => {
    toast.add({ title: 'Success' });
    emit('cancel');
  }).catch(err => {
    if (err.response.status == 422) {
      formErrors.value = err.response.data;
    }
  })
}

const wallets = useUserArbitrageWallet();

const buy = ref(props.buy);

const stake = ref(10);
const target = ref(10 * 3);

watch(stake, (newval, oldval) => {
  target.value = newval * 3;
});

const isSmallScreen = computed(() => {
  return document.documentElement.clientWidth < 768;
});

const formErrors = ref({});


const stakeButtonsConfigs = computed(() => {
  let buy = true;
  let sell = false;
  let sellLabel = null;
  let buyLabel = null;


  return {
    buy: buy,
    sell: sell,
    sellLabel: sellLabel,
    buyLabel: "SELL",
    cancel: isSmallScreen.value,
    stake: false,
  };
});
</script>
