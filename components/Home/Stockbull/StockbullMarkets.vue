<template>
  <SharedContainer
    v-if="!isSmallScreen"
    :style="`height:${screenHeight * 0.5}px`"
    class="overflow-scroll"
  >
    <div>
      <!-- <div class="sticky top-0 bg-[#121318] w-full">
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
      </div> -->

      <div class="pt-2 overflow-scroll">
        <div className=" ">
          <div>
            <div
              className=" pb-4"
              v-for="(item, index) in stockbullMarkets"
              :key="item"
            >
              <div>
                <div className="inline-flex gap-x-2">
                  <div
                    className="  inline-flex align-middle place-items-center"
                  ></div>
                  <div className="inline-flex text-xs flex-col">
                    <div>{{ item.name }}</div>
                    {{ item.description }}
                  </div>
                </div>
                <div>
                  <div className="inline-flex gap-x-2">
                    <div className="text-green-400 text-[9px]"></div>
                    <div title="{item.description}">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="{1.5}"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="{1.5}"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="  border-gray-800  mt-2" />
            </div>
          </div>
        </div>
        <!-- <div
          class="py-1 px-1 w-full grid grid-cols-2 text-white hover:cursor-pointer"
          :class="activeKey == index ? 'bg-yellow-600 rounded-md' : ''"
          @click="setActiveKey(index, symbol)"
          v-for="(symbol, index) in menuSymbols"
        >
          <div class="flex gap-2">
            <div>{{ symbol.symbol }}</div>
          </div>
          <div class="justify-self-end">{{ symbol.price }}USD</div>
          <div
            class="justify-self-end col-span-2"
            :class="symbol.change < 0 ? 'text-red-600' : 'text-green-600'"
          >
            {{ symbol.changePercentage }}
          </div>
        </div> -->
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
        <div className=" ">
          <div>
            <div className=" pb-4">
              <div>
                <div className="inline-flex gap-x-2">
                  <div
                    className="  inline-flex align-middle place-items-center"
                    v-html="item.image"
                  ></div>
                  <div className="inline-flex text-xs flex-col">
                    <div>{item.name}</div>
                    {item.description}
                  </div>
                </div>
                <div>
                  <div className="inline-flex gap-x-2">
                    <div className="text-green-400 text-[9px]"></div>
                    <div title="{item.description}">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="{1.5}"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="{1.5}"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="  border-gray-800  mt-2" />
            </div>
          </div>
        </div>

        <!-- <div
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
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script setup>
import axios from "axios";
const props = defineProps({
  showModal: {
    default: true,
  },
});

const stockbullMarkets = useStockbullMarkets();

const getStockbullMarkets = () => {
  axios.get("get-markets").then((response) => {
    stockbullMarkets.value = response.data;
  });
};

const isSmallScreen = computed(() => {
  return window.document.documentElement.clientWidth < 768;
});

onMounted(() => {
  getStockbullMarkets();
});
</script>
