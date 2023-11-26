<template>
  <SharedContainer
    v-if="!isSmallScreen && !doNotShow"
    :style="`height:${screenHeight * 0.5}px`"
    class="overflow-scroll"
  >
    <!-- <template #header> -->
    <!-- <div class="w-full"> -->
    <div class="sticky top-0 bg-black w-full z-10">
      <UInput
        v-model="search"
        name="q"
        placeholder="Search..."
        icon="i-heroicons-magnifying-glass-20-solid"
        autocomplete="off"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            v-show="search !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="search = ''"
          />
        </template>
      </UInput>
      <!-- </template> -->
    </div>

    <div class="flex flex-col py-3">
      <div className=" pb-4" v-for="(item, index) in markets">
        <div
          class="flex w-full justify-between"
          :class="item.active < 1 && 'opacity-50'"
        >
          <div className="inline-flex gap-x-2">
            <div
              className="  inline-flex align-middle place-items-center"
              v-html="item.image"
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
                <UTooltip :text="item.description" :popper="{ arrow: true }">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </UTooltip>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        <hr
          v-if="index != markets.length - 1"
          className="  border-gray-800  mt-2"
        />
      </div>
    </div>
    <!-- </div> -->
  </SharedContainer>

  <USlideover v-model="modalIsVisible" v-if="isSmallScreen">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <UInput
          v-model="search"
          name="q"
          placeholder="Search..."
          icon="i-heroicons-magnifying-glass-20-solid"
          autocomplete="off"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="search !== ''"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="search = ''"
            />
          </template>
        </UInput>
      </template>
      <div
        class="flex flex-col pt-2 py-20 max-h-screen overflow-scroll cursor-pointer"
      >
        <div
          className="   rounded-md p-2 "
          :class="
            item.real_name == activeChart.real_name ? 'bg-yellow-600 ' : 'bg-'
          "
          v-for="(item, index) in markets"
          @click="handleActiveChart(item)"
        >
          <div
            class="flex w-full justify-between"
            :class="item.active < 1 && 'opacity-50'"
          >
            <div className="inline-flex gap-x-2 ">
              <div
                className="  inline-flex align-middle place-items-center"
                v-html="item.image"
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
                  <UTooltip :text="item.description" :popper="{ arrow: true }">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </UTooltip>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <hr
            v-if="index != markets.length - 1"
            className="  border-gray-800  mt-2"
          />
        </div>
      </div>
      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>
  </USlideover>
</template>

<script setup>
import axios from "axios";
import { watch, defineEmits } from "vue";
const emit = defineEmits("closeModal");
const activeChart = useActiveStockbullMarket();
const handleActiveChart = (newValue) => {
  activeChart.value = newValue;
  emit("closeModal");
};

const renderComponent = ref(true);

const props = defineProps({
  showModal: {
    default: true,
  },
  doNotShow: {
    default: false,
  },
});

const modalIsVisible = ref(false);

watch(
  () => props.showModal,
  (newValue) => {
    modalIsVisible.value = newValue;
  }
);

watch(modalIsVisible, (newValue) => {
  if (newValue == false) {
    emit("closeModal");
  }
});

const search = ref("");

const stockbullMarkets = useStockbullMarkets();

const getStockbullMarkets = () => {
  axios.get("get-markets").then((response) => {
    stockbullMarkets.value = response.data;
  });
};

const markets = computed(() => {
  stockbullMarkets.value.sort((a, b) => {
    return b.active - a.active;
  });

  return stockbullMarkets.value.filter((value) =>
    value.name.toLocaleUpperCase().includes(search.value.toLocaleUpperCase())
  );
});

const isSmallScreen = computed(() => {
  return window.document.documentElement.clientWidth < 768;
});

onMounted(() => {
  getStockbullMarkets();
});
</script>
