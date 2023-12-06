<template>
  <SharedContainer v-if="!isSmallScreen && !doNotShow" :style="`height:${screenHeight * 0.5}px`" class="overflow-scroll">
    <div>
      <div class="sticky top-0 bg-[#121318] w-full">
        <UInput v-model="search" name="search" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid"
          autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }">
          <template #trailing>
            <UButton v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
              @click="search = ''" />
          </template>
        </UInput>
      </div>

      <div class="pt-2">
        <div class="py-1 px-1 w-full grid grid-cols-2 text-white hover:cursor-pointer"
          :class="activeKey == index ? 'bg-yellow-600 rounded-md' : ''" @click="setActiveKey(index, symbol)"
          v-for="(symbol, index) in menuSymbols">
          <div class="flex gap-2">
            <div>{{ symbol.symbol }}</div>
          </div>
          <div class="justify-self-end">
            {{ parseFloat(symbol.price * getActiveConstant).toFixed(3) }}USD
          </div>
          <div class="justify-self-end col-span-2" :class="symbol.change < 0 ? 'text-red-600' : 'text-green-600'">
            {{ symbol.changePercentage }}
          </div>
        </div>
      </div>
    </div>
  </SharedContainer>

  <USlideover v-model="modalIsOpen" v-if="isSmallScreen">
    <UCard class="flex flex-col flex-1" :ui="{
      body: { base: 'flex-1' },
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }">
      <template #header>
        <UInput v-model="search" name="q" placeholder="Search..." icon="i-heroicons-magnifying-glass-20-solid"
          autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }">
          <template #trailing>
            <UButton v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
              @click="search = ''" />
          </template>
        </UInput>
        <div class="flex pt-2 gap-x-3">
          <div :class="buy || activeMarket == 'A' ? 'bg-yellow-700' : ''" @click="buy = true"
            class="px-2 cursor-pointer bg-black w-fit text-white rounded-md">
            Buy
          </div>

          <div @click="buy = false" v-if="activeMarket == 'B'"
            class="px-2 cursor-pointer bg-black rounded-md text-white w-fit" :class="!buy ? 'bg-yellow-700' : ''">
            Sell
          </div>
        </div>
      </template>

      <div class="pt-2 py-20 max-h-screen overflow-scroll">
        <div class="py-1 px-1 w-full grid grid-cols-2 text-white hover:cursor-pointer"
          :class="activeKey == index ? 'bg-yellow-600 rounded-md' : ''" @click="setActiveKey(index, symbol)"
          v-for="(symbol, index) in menuSymbols">
          <div class="flex gap-2">
            <div>{{ symbol.symbol }}</div>
          </div>
          <div class="justify-self-end">
            {{ parseFloat(symbol.price * getActiveConstant).toFixed(3) }}USD
          </div>
          <div class="justify-self-end col-span-2" :class="symbol.change < 0 ? 'text-red-600' : 'text-green-600'">
            {{ symbol.changePercentage }}
          </div>
        </div>
      </div>
    </UCard>
  </USlideover>
  <!-- {{ showModal }} -->
</template>
<script setup>
import axios from "axios";
import { reactive, computed, watch, defineEmits } from "vue";
import { setAxiosConfigurations } from "~/.utils/axiosConfigurations";
const emit = defineEmits("closeModal");
const props = defineProps({
  showModal: {
    default: true,
  },
  doNotShow: {
    default: false,
  },
});

const arbitrageConstants = useArbitrageConstants()

const modalIsOpen = ref(props.showModal);

watch(
  () => props.showModal,
  (newValue) => {
    modalIsOpen.value = newValue;
  }
);

watch(modalIsOpen, (newValue) => {
  if (newValue == false) {
    emit("closeModal");
  }
});

const constant = ref({
  cza: 1,
  cza2: 1,
});

const setTheValues = computed(() => {
  props.showModal.valueOf;
});

const handleArbitrageConstants = () => {
  setAxiosConfigurations();
  axios.get("/arbitrage-settings").then((response) => {
    arbitrageConstants.value = response.data;
  });
};

const getActiveConstant = computed(() => {
  // return 1;
  if (activeMarket.value == "B") {
    if (buy.value) {
      return arbitrageConstants.value.cza2;
    } else {
      return arbitrageConstants.value.cza;
    }
  } else {
    return 1;
  }
});

const activeMarket = useMarkets();

const buy = ref(true);

let allSymbols = useSymbols();
const symbols = reactive({ data: [] });
const isSmallScreen = computed(() => {
  return window.document.documentElement.clientWidth < 768;
});

const activeKey = ref(10);
let activeSymbolData = useActiveTradingViewSymbol();
let tradingViewSymbol = useTradingviewSymbol();
const setActiveKey = (key, item) => {
  activeKey.value = key;
  activeSymbolData.value = item;
  tradingViewSymbol.value = item.symbol;
  props.showModal = false;
};

const search = ref("");
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
const screenHeight = ref(0);
const setScreenHeight = () => {
  screenHeight.value = window.screen.height;
};

const menuSymbols = computed(() => {
  const filteredSymbols = symbols.data.filter((item) =>
    allowedSymbols.includes(item.s)
  );

  allSymbols.value = filteredSymbols
    .map((item) => {
      return {
        symbol: item.s,
        price: parseFloat(item.c),
        changePercentage: parseFloat(item.P).toLocaleString() + "%",
        change: item.P,
      };
    })
    .filter((symbol) => symbol.symbol.includes(search.value.toUpperCase()))
    .slice()
    .sort((a, b) => {
      const symbolA = a.symbol.toUpperCase(); // Convert to uppercase for case-insensitive sorting
      const symbolB = b.symbol.toUpperCase();

      if (symbolA < symbolB) {
        return -1;
      }
      if (symbolA > symbolB) {
        return 1;
      }
      1;
      return 0;
    });

  return allSymbols.value;
});

onMounted(() => {
  handleArbitrageConstants();
  setScreenHeight();

  const binanceSocket = new WebSocket(
    "wss://stream.binance.com:9443/ws/!ticker@arr"
  );

  binanceSocket.onmessage = function (event) {
    let socketData = JSON.parse(event.data);
    socketData.forEach((element) => {
      const index = symbols.data.findIndex((obj) => obj.s === element.s);

      if (index !== -1) {
        symbols.data[index] = element;
      } else {
        symbols.data.push(element);
      }
    });
  };
});
</script>
