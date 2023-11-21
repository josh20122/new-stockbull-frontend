<template>
  <SharedContainer
    v-if="!isSmallScreen"
    :style="`height:${screenHeight * 0.5}px`"
    class="overflow-scroll"
  >
    <div>
      <div class="sticky top-0 bg-[#121318] w-full">
        <div class="relative flex place-items-center">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            v-model="search"
            class="block w-full p-2 ps-10 text-sm rounded-lg focus:ring-0 border border-gray-500 focus:border-gray-500 focus:outline-none bg-transparent"
            placeholder="Search"
            required
          />
          <div class="absolute right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              fill="white"
              class="stroke-2"
              @click="search = ''"
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="pt-2 overflow-scroll">
        <div
          class="py-1 px-1 w-full grid grid-cols-2 text-white hover:cursor-pointer"
          :class="activeKey == index ? 'bg-yellow-600 rounded-md' : ''"
          @click="setActiveKey(index, symbol)"
          v-for="(symbol, index) in menuSymbols"
        >
          <div class="flex gap-2">
            <div>{{ symbol.symbol }}</div>
          </div>
          <div class="justify-self-end">
            {{ parseFloat(symbol.price * getActiveConstant).toFixed(3) }}USD
          </div>
          <div
            class="justify-self-end col-span-2"
            :class="symbol.change < 0 ? 'text-red-600' : 'text-green-600'"
          >
            {{ symbol.changePercentage }}
          </div>
        </div>
      </div>
    </div>
  </SharedContainer>

  <transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="transform  translate-y-[100%] "
    enter-to-class="opacity-100 translate-y-[0%]"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100  translate-y-[0%]"
    leave-to-class="transform   translate-y-[100%] "
    v-if="isSmallScreen"
    :padding="false"
  >
    <div
      class="fixed z-50 bg-[#121318] h-screen w-full flex overflow-y-scroll"
      v-show="props.showModal"
      :style="`height:${screenHeight * 0.5}px`"
    >
      <div class="w-full">
        <div
          class="sticky top-0 bg-[#121318] w-full grid grid-cols-12 content-between items-center"
        >
          <div class="relative flex place-items-center col-span-11">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              v-model="search"
              class="block w-full p-2 ps-10 text-sm rounded-lg focus:ring-0 border border-gray-500 focus:border-gray-500 focus:outline-none bg-transparent"
              placeholder="Search"
              required
            />
            <div class="absolute right-4"></div>
          </div>
          <div class="col-span-1 justify-self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              fill="white"
              class="stroke-2"
              @click="$emit('closeModal')"
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
              />
            </svg>
          </div>
          <div class="p-2 flex gap-x-3">
            <div
              :class="buy || activeMarket == 'A' ? 'bg-yellow-700' : ''"
              @click="buy = true"
              class="px-2 cursor-pointer bg-black w-fit text-white rounded-md"
            >
              Buy
            </div>

            <div
              @click="buy = false"
              v-if="activeMarket == 'B'"
              class="px-2 cursor-pointer bg-black rounded-md text-white w-fit"
              :class="!buy ? 'bg-yellow-700' : ''"
            >
              Sell
            </div>
          </div>
        </div>

        <div class="pt-2">
          <div
            class="py-1 px-1 w-full grid grid-cols-2 text-white hover:cursor-pointer"
            :class="activeKey == index ? 'bg-yellow-600 rounded-md' : ''"
            @click="setActiveKey(index, symbol)"
            v-for="(symbol, index) in menuSymbols"
          >
            <div class="flex gap-2">
              <div>{{ symbol.symbol }}</div>
            </div>
            <div class="justify-self-end">
              {{ parseFloat(symbol.price * getActiveConstant).toFixed(3) }}USD
            </div>
            <div
              class="justify-self-end col-span-2"
              :class="symbol.change < 0 ? 'text-red-600' : 'text-green-600'"
            >
              {{ symbol.changePercentage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import axios from "axios";
import { reactive, computed } from "vue";
import { setAxiosConfigurations } from "~/.utils/axiosConfigurations";
const props = defineProps({
  showModal: {
    default: false,
  },
});

const constant = ref({
  cza: 1,
  cza2: 1,
});

const handleArbitrageConstants = () => {
  setAxiosConfigurations();
  axios
    .get("https://stockbullsecure.com/api/arbitrage-settings")
    .then((response) => {
      constant.value = response.data;
    });
};

const getActiveConstant = computed(() => {
  // return 1;
  if (activeMarket.value == "B") {
    if (buy.value) {
      return constant.value.cza2;
    } else {
      return constant.value.cza;
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

  return filteredSymbols
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

      allSymbols.value = symbols.data;
    });
  };
});
</script>
