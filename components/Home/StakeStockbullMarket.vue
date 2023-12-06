<template>
  <SharedContainer>
    <div class="inline-flex flex-col gap-y-10 w-full">
      <div class="inline-flex flex-col gap-y-1">
        <div class="flex gap-x-4 text-xs border-b pb-1 select-none border-gray-500">
          <div class="cursor-pointer" @click="buy = false" :class="!buy ? ' text-yellow-500' : ''">
            Sell
          </div>
          <!-- <div class="cursor-pointer text-gray-300">
            Buy
          </div> -->
        </div>

        <div v-if="wallets.length <= 0" class=" text-xs text-red-600  text-center">You do not have an active asset, please
          buy one in
          Market A.</div>
        <label for="" class="text-xs">Symbol</label>
        <!-- {{ symbols }} -->
        <div>
          <USelect id="symbol" :options="wallets" option-attribute="symbol" value-attribute="symbol"
            v-model="form.symbol" />
          <!-- <div class="flex flex-col"> -->
          <div v-if="formErrors.symbol" class="text-[10px] text-red-600">
            <div v-for="(error, index) in formErrors.symbol" v-text="error" :key="index"></div>
          </div>
        </div>
        <!-- </div> -->

        <SharedTextInput label="Amount to buy" v-model="form.amount" placeholder="Enter your stake amount" hint="USD"
          :errors="formErrors.amount">
        </SharedTextInput>

        <!-- {{ totalAmount }} -->

        <SharedTextInput label="You will get" placeholder="Enter your stake amount" :model-value="totalAmount"
          readonly="true"></SharedTextInput>
        <SharedStakeButtons class="pt-2" @stake="activateStake()" @cancel="emit('cancel')" @buy="submitForm()"
          :settings="stakeButtonsConfigs"></SharedStakeButtons>
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

const arbitrageConstants = useArbitrageConstants()

const emit = defineEmits('cancel')

const form = ref({
  symbol: activeSymbolData.value.symbol,
  amount: null,
  totalProfit: null,
});

const toast = useToast();
const totalAmount = computed(() => {
  return arbitrageConstants.value.cza * form.value.amount + 'USD';
});

const submitForm = () => {
  axios.post('/sell-arbitrage').then(response => {
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

const symbols = useSymbols();
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
