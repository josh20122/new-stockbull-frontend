<template>
  <div>
    <div
      className="absolute rounded-md  top-14 right-28 "
      @click="isOpen = true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        v-if="botStatus"
        fill="currentColor"
        className=" w-20 h-20 fill-white "
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        v-else
        fill="currentColor"
        className=" w-20 h-20 fill-white "
        viewBox="0 0 16 16"
      >
        <path
          d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
        />
      </svg>
    </div>
    <div>
      <div>
        <UModal v-model="isOpen">
          <UCard
            :ui="{
              ring: '',
              divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            }"
          >
            <h3 className="pb-3 font-semibold text-center">STOP BOT</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 96 96"
              fill="none"
              class="h-10 mx-auto"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M88 48c0 22.091-17.909 40-40 40S8 70.091 8 48 25.909 8 48 8s40 17.909 40 40z"
                fill="url(#paint0_linear)"
              ></path>
              <path
                d="M48 19c16.016 0 29 12.984 29 29S64.016 77 48 77 19 64.016 19 48s12.984-29 29-29z"
                fill="url(#paint1_linear)"
              ></path>
              <path
                d="M45 66h6v-6h-6v6zM51 54V30h-6v24h6z"
                fill="#14151A"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="8"
                  y1="48"
                  x2="102.5"
                  y2="48"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F0B90B" stop-opacity="0"></stop>
                  <stop offset="1" stop-color="#F0B90B"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="77"
                  y1="48"
                  x2="19"
                  y2="48"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F0B90B"></stop>
                  <stop offset="1" stop-color="#F8D33A"></stop>
                </linearGradient>
              </defs>
            </svg>
            <p className="py-4 text-xs text-center">
              Are you sure you want to stop this bot?
            </p>
            <div className="flex justify-between gap-x-2">
              <UButton label="Back" color="red" @click="isOpen = false" />

              <UButton label="Stop Bot" @click="handleStopBot()" />
            </div>
          </UCard>
        </UModal>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
const toast = useToast();
const isOpen = ref(false);
const botStatus = ref(false);
const setBotStatus = () => {
  axios.post("/bot-status").then((response) => {
    botStatus.value = response.data;
  });
};

const handleChangeBotStatus = () => {
  if (botStatus.value) {
    isOpen.value = true;
  } else {
    hadleResumeBot();
  }
};

const hadleResumeBot = () => {
  axios
    .post("/resume-bot")
    .then((response) => {
      toast.add({ title: "Bot resumed successfully" });
      setBotStatus();
    })
    .catch((err) => {
      toast.add({ title: err.response.data, color: "red" });
    });
};

const handleStopBot = () => {
  axios
    .post("/stop-bot")
    .then((response) => {
      toast.add({ title: "Bot stopped successfully" });
      setBotStatus();
    })
    .catch((err) => {
      toast.add({ title: err.response.data, color: "red" });
    });

  isOpen.value = false;
};

onMounted(() => {
  setBotStatus();
});
</script>
