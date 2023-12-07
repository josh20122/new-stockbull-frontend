<template>
  <SharedContainer>
    <div class="inline-flex flex-col gap-y-10 w-full">
      <div class="inline-flex flex-col gap-y-1">
        <label for="" class="text-xs">Symbol</label>
        <div>
          <USelect id="countries" :options="allowedSymbols" v-model="form.symbol" />
          <div v-if="formErrors.symbol" class="text-[10px] text-red-600">
            <div v-for="(error, index) in formErrors.symbol" v-text="error" :key="index"></div>
          </div>
        </div>
        <!-- {{ symbols.length }} -->
        <SharedTextInput :label="`Amount in ${form.symbol.replace('USDT', '')}`" v-model="form.amount"
          placeholder="Enter amount" hint="USD" :errors="formErrors.amount">
        </SharedTextInput>

        <SharedTextInput label="You will get" placeholder="" :model-value="form.amountInCrypto" readonly="true">
        </SharedTextInput>
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
  amount: 0,
  amountInCrypto: ''
});

const allowedSymbols = [
  "BTCUSDT",
  "BNBUSDT",
  "NEOUSDT",
  "ADAUSDT",
  "XRPUSDT",
  "EOSUSDT",
  "USDCUSDT",
  "LINKUSDT",
  "ONGUSDT",
  "FETUSDT",
  "MATICUSDT",
  "FTMUSDT",
  "ALGOUSDT",
  "DOGEUSDT",
  "FUNUSDT",
  "CVCUSDT",
  "RENUSDT",
  "STXUSDT",
  "ARPAUSDT",
  "FTTUSDT",
  "EURUSDT",
  "SOLUSDT",
  "SCUSDT",
  "SNXUSDT",
  "MKRUSDT",
  "BALUSDT",
  "DOTUSDT",
  "LUNAUSDT",
  "WNXMUSDT",
  "TRBUSDT",
  "FIOUSDT",
  "BELUSDT",
  "UNIUSDT",
  "AVAXUSDT",
  "NEARUSDT",
  "ROSEUSDT",
  "CKBUSDT",
  "SUPERUSDT",
  "BONDUSDT",
  "MLNUSDT",
  "C98USDT",
  "TVKUSDT",
  "ILVUSDT",
  "FRONTUSDT",
  "VGXUSDT",
  "RNDRUSDT",
  "HIGHUSDT",
  "GLMRUSDT",
  "BTTCUSDT",
  "GALUSDT",
  "POLYXUSDT",
  "HFTUSDT",
  "PHBUSDT",
  "AGIXUSDT",
  "GLMUSDT",
  "EDUUSDT",
  "COMBOUSDT",
  "MAVUSDT",
  "FDUSDUSDT",
  "CYBERUSDT",
  "MEMEUSDT",
  "ORDIUSDT",
  "ETHUSDT",
  "ETCUSDT",
  "VETUSDT",
  "ZILUSDT",
  "ZRXUSDT",
  "IOSTUSDT",
  "ATOMUSDT",
  "KEYUSDT",
  "BUSDUSDT",
  "CTXCUSDT",
  "OGNUSDT",
  "CHRUSDT",
  "LRCUSDT",
  "STORJUSDT",
  "BLZUSDT",
  "KMDUSDT",
  "CRVUSDT",
  "OCEANUSDT",
  "PAXGUSDT",
  "SUSHIUSDT",
  "XVSUSDT",
  "AAVEUSDT",
  "FILUSDT",
  "ATMUSDT",
  "TWTUSDT",
  "CAKEUSDT",
  "KLAYUSDT",
  "PHAUSDT",
  "WAXPUSDT",
  "YGGUSDT",
  "POWRUSDT",
  "PYRUSDT",
  "FLUXUSDT",
  "PEOPLEUSDT",
  "JOEUSDT",
  "IMXUSDT",
  "GMTUSDT",
  "APEUSDT",
  "OPUSDT",
  "LUNCUSDT",
  "APTUSDT",
  "HIFIUSDT",
  "SSVUSDT",
  "ARBUSDT",
  "LOOMUSDT",
  "SUIUSDT",
  "PENDLEUSDT",
  "WLDUSDT",
  "TIAUSDT",
  "BEAMXUSDT",
  "TUSDUSDT",
  "DASHUSDT",
  "BCHUSDT",
  "COMPUSDT",
  "DGBUSDT",
  "YFIUSDT",
  "INJUSDT",
  "TLMUSDT",
  "BAKEUSDT",
  "XVGUSDT",
  "RAREUSDT",
  "BNXUSDT",
  "QIUSDT",
  "API3USDT",
  "BSWUSDT",
  "LTCUSDT",
  "TRXUSDT",
  "MTLUSDT",
  "BANDUSDT",
  "RVNUSDT",
  "GHSTUSDT",
  "LAZIOUSDT",
  "SCRTUSDT",
  "REIUSDT",
  "LDOUSDT",
  "GNSUSDT",
  "FLOKIUSDT",
  "KNCUSDT",
  "ZENUSDT",
  "RUNEUSDT",
  "1INCHUSDT",
  "MINAUSDT",
  "RAYUSDT",
  "MBOXUSDT",
  "DYDXUSDT",
  "BICOUSDT",
  "FXSUSDT",
  "VIBUSDT",
  "PIVXUSDT",
  "IOTAUSDT",
  "ONTUSDT",
  "CELRUSDT",
  "NKNUSDT",
  "RLCUSDT",
  "AUDIOUSDT",
  "JUVUSDT",
  "PONDUSDT",
  "LINAUSDT",
  "CFXUSDT",
  "DARUSDT",
  "STGUSDT",
  "USTCUSDT",
  "GASUSDT",
  "PEPEUSDT",
  "MANAUSDT",
  "DIAUSDT",
  "AKROUSDT",
  "FLOWUSDT",
  "GNOUSDT",
  "XECUSDT",
  "CHESSUSDT",
  "AUCTIONUSDT",
  "CREAMUSDT",
  "XLMUSDT",
  "BATUSDT",
  "ENJUSDT",
  "ONEUSDT",
  "SANDUSDT",
  "OXTUSDT",
  "ORNUSDT",
  "REEFUSDT",
  "SLPUSDT",
  "ICPUSDT",
  "MASKUSDT",
  "USDPUSDT",
  "GALAUSDT",
  "JASMYUSDT",
  "SANTOSUSDT",
  "STEEMUSDT",
  "LEVERUSDT",
  "SEIUSDT",
  "ANKRUSDT",
  "BTCUPUSDT",
  "UNFIUSDT",
  "OGUSDT",
  "WOOUSDT",
  "UFTUSDT",
  "HBARUSDT",
  "DREPUSDT",
  "COTIUSDT",
  "ETHDOWNUSDT",
  "AXSUSDT",
  "CELOUSDT",
  "ERNUSDT",
  "KP3RUSDT",
  "KDAUSDT",
  "SNTUSDT",
  "ARKUSDT",
  "XMRUSDT",
  "CHZUSDT",
  "BNTUSDT",
  "STPTUSDT",
  "SFPUSDT",
  "VIDTUSDT",
  "OSMOUSDT",
  "HOOKUSDT",
  "QTUMUSDT",
  "THETAUSDT",
  "ETHUPUSDT",
  "EGLDUSDT",
  "UMAUSDT",
  "BADGERUSDT",
  "FORUSDT",
  "LOKAUSDT",
  "XTZUSDT",
  "ALPACAUSDT",
  "PORTOUSDT",
  "ALPINEUSDT",
  "GMXUSDT",
  "RDNTUSDT",
  "MDTUSDT",
  "NMRUSDT",
  "SHIBUSDT",
  "GTCUSDT",
  "AVAUSDT",
  "ELFUSDT",
  "ASTRUSDT",
  "NTRNUSDT",
  "IOTXUSDT",
  "WINGUSDT",
  "FISUSDT",
  "BARUSDT",
  "RADUSDT",
  "ALCXUSDT",
  "SYNUSDT",
  "AMBUSDT",
  "SXPUSDT",
  "GRTUSDT",
  "QNTUSDT",
  "DUSKUSDT",
  "ARDRUSDT",
  "GBPUSDT",
  "DODOUSDT",
  "BURGERUSDT",
  "SYSUSDT",
  "ARKMUSDT",
  "WAVESUSDT",
  "VTHOUSDT",
  "MDXUSDT",
  "IDUSDT",
  "CTKUSDT",
  "ACHUSDT",
  "FARMUSDT",
  "HIVEUSDT",
  "TRUUSDT",
  "KAVAUSDT",
  "SKLUSDT",
  "ALICEUSDT",
  "GFTUSDT",
  "QUICKUSDT",
  "CLVUSDT",
  "FIDAUSDT",
  "TOMOUSDT",
  "MAGICUSDT",
  "PNTUSDT",
  "SPELLUSDT",
  "CTSIUSDT",
  "AGLDUSDT",
  "MBLUSDT",
  "CITYUSDT",
  "PROMUSDT",
  "DENTUSDT",
  "RIFUSDT",
  "ARUSDT",
  "MOVRUSDT",
  "KSMUSDT",
  "PERPUSDT",
  "REQUSDT",
  "TROYUSDT",
  "POLSUSDT",
  "LQTYUSDT",
  "WRXUSDT",
  "ALPHAUSDT",
  "MOBUSDT",
  "AMPUSDT",
  "PERLUSDT",
  "RSRUSDT",
  "PSGUSDT",
  "COSUSDT",
  "BTSUSDT",
  "DFUSDT",
  "VOXELUSDT",
  "OMGUSDT",
  "BTCDOWNUSDT",
  "STMXUSDT",
  "MULTIUSDT",
  "TKOUSDT",
  "WINUSDT",
  "LTOUSDT",
  "STRAXUSDT",
  "ACAUSDT",
  "EPXUSDT",
  "HOTUSDT",
  "ENSUSDT",
  "NEXOUSDT",
  "DCRUSDT",
  "TUSDT",
  "NULSUSDT",
  "BETAUSDT",
  "ICXUSDT",
  "CVXUSDT",
  "ADXUSDT",
  "PROSUSDT",
  "DATAUSDT",
  "ANTUSDT",
  "FLMUSDT",
  "LPTUSDT",
  "ASRUSDT",
  "JSTUSDT",
  "AERGOUSDT",
  "ZECUSDT",
  "WBTCUSDT",
  "QKCUSDT",
  "FIROUSDT",
  "WANUSDT",
  "DEGOUSDT",
  "IDEXUSDT",
  "WBETHUSDT",
  "LSKUSDT",
  "HARDUSDT",
  "XNOUSDT",
  "OAXUSDT",
  "RPLUSDT",
  "BIFIUSDT",
  "XEMUSDT",
  "WTCUSDT",
  "PLAUSDT",
  "ATAUSDT",
  "IQUSDT",
  "LITUSDT",
  "DOCKUSDT",
  "FORTHUSDT",
  "DEXEUSDT",
  "BNBDOWNUSDT",
  "CVPUSDT",
  "ACMUSDT",
  "SUNUSDT",
  "OOKIUSDT",
  "ASTUSDT",
  "OMUSDT",
  "PUNDIXUSDT",
  "TFUELUSDT",
  "UTKUSDT",
  "IRISUSDT",
];

const toast = useToast();

const emit = defineEmits('cancel')

const symbols = useSymbols();

const formErrors = ref({});
const submitForm = () => {
  axios.post('/stake-arbitrage', form.value).then(response => {
    toast.add({ title: 'Success' });
    emit('cancel');
    setUserArbitrageWallets()
  }).catch(err => {
    if (!err.response.status) {
      return;
    }

    if (err.response.status == 422) {
      formErrors.value = err.response.data
    }
  })
}


watch([() => form.value.symbol, () => form.value.amount], () => {
  if (selectedSymbolData.value) {

    let crypto = selectedSymbolData.value.s.replace('USDT', '');
    form.value.amountInCrypto = form.value.amount / selectedSymbolData.value.c + crypto
  } else {
    form.value.amountInCrypto = 'loading...'
  }
})


const selectedSymbolData = computed(() => {
  return symbols.value.filter((symbol) => symbol.s.includes(form.value.symbol))[0] ?? null
})

const amount = ref(10);
const target = ref(10 * 3);
watch(amount, (newval, oldval) => {
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
