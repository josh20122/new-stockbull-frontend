<template>
  <SharedContainer>
    <div class="inline-flex flex-col gap-y-10 w-full">
      <div class="inline-flex flex-col gap-y-1">
        <label for="" class="text-xs">Symbol</label>
        <!-- {{ symbols }} -->
        <div>
          <USelect id="countries" :options="symbols" option-attribute="symbol" value-attribute="symbol"
            v-model="form.symbol" />
          <!-- <div class="flex flex-col"> -->
          <div v-if="formErrors.symbol" class="text-[10px] text-red-600">
            <div v-for="(error, index) in formErrors.symbol" v-text="error" :key="index"></div>
          </div>
        </div>
        <!-- </div> -->

        <SharedTextInput label="Amount to buy" v-model="form.stake" placeholder="Enter your stake amount" hint="USD"
          :errors="formErrors.stake">
        </SharedTextInput>

        <SharedTextInput label="You will get" placeholder="Enter your stake amount" :model-value="form.amountInCrypto"
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
import { setUserArbitrageWallets } from "~/.utils/utilities";
let activeSymbolData = useActiveTradingViewSymbol();
const form = ref({
  symbol: activeSymbolData.value.symbol,
  stake: 0,
  amountInCrypto: ''
});

const toast = useToast();

const emit = defineEmits('cancel')

const symbols = useSymbols();

// watch(symbols, () => {
//   console.log('hello there')
// })
const formErrors = ref({});
const submitForm = () => {

  // console.log('stake');
  // return;
  axios.post('/stake-arbitrage', form.value).then(response => {
    console.log(response.data);
    toast.add({ title: 'Success' });
    emit('cancel');
    setUserArbitrageWallets()
  }).catch(err => {
    if (!err.response.status) {
      return;
    }

    if (err.response.status == 422) {
      // console.log(err.response.data)

      formErrors.value = err.response.data
    }
  })
}


watch(() => form.value.stake, () => {
  console.log(activeSymbolData.value);
  let crypto = activeSymbolData.value.symbol.replace('USDT', '');
  form.value.amountInCrypto = form.value.stake / activeSymbolData.value.price + crypto
})



const stake = ref(10);
const target = ref(10 * 3);
watch(stake, (newval, oldval) => {
  target.value = newval * 3;

});

const isSmallScreen = computed(() => {
  return document.documentElement.clientWidth < 768;
});


const stakeButtonsConfigs = computed(() => {
  let buy = true;
  let sell = true;
  let sellLabel = null;
  let buyLabel = null;


  return {
    buy: buy,
    sell: false,
    sellLabel: sellLabel,
    buyLabel: "BUY",
    cancel: isSmallScreen.value,
    stake: false,
  };
});

</script>
