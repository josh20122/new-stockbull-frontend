<template>
    <!-- {{ globalCountdown }} -->
    <div>
        <div>
            <div className="flex-col flex  gap-y-2 relative  max-h-[400px]  overflow-y-scroll py-4">
                <!-- {{ botHistory.activities }} -->
                <div className="inline-flex flex-col w-full px-2 py-3 font-medium rounded-md bg-slate-900 gap-y-3">
                    <div className="flex justify-between">
                        <span className=" text-[10px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                class="fill-yellow-600">
                                <path
                                    d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
                                <path
                                    d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
                            </svg>
                        </span>
                        <span className=" text-[10px] text-yellow-600 ">
                            {{ parseFloat(100 - countdownPercentage).toFixed(2) }}%
                        </span>
                    </div>
                    <div className="w-full h-1 rounded-md overscroll-none bg-slate-900 ">
                        <div :style="` width: ${100 - countdownPercentage}%`" class=" rounded-md bg-yellow-600 h-full">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';
import { handleStockbullNextPayment } from "@utils/utilities"
const nextPayment = useStockbullNextPayment()
const props = nextPayment.value;
const totalTimeInSeconds = nextPayment.value;
const minutes = ref(Math.floor(nextPayment.value / 60));
const seconds = ref(nextPayment.value % 60);
const globalCountdown = useStockbullCountdown()
const countdownPercentage = ref(100);
const activeChart = useActiveStockbullMarket()
let timer;

const startCountdown = () => {
    timer = setInterval(() => {
        const totalSecondsRemaining = Math.max(minutes.value * 60 + seconds.value, 0);

        if (totalSecondsRemaining > 0) {
            const percentageRemaining = (totalSecondsRemaining / totalTimeInSeconds) * 100;
            countdownPercentage.value = percentageRemaining.toFixed(2);

            if (seconds.value > 0) {
                seconds.value--;

                globalCountdown.value = {
                    timer: `${minutes.value}:${seconds.value}`,
                    percentage: `${countdownPercentage.value}`
                }

            } else {
                minutes.value = Math.max(minutes.value - 1, 0);
                seconds.value = 59;

                globalCountdown.value = {
                    timer: `${minutes.value}:${seconds.value}`,
                    percentage: `${countdownPercentage.value}`
                }
            }
        } else {
            clearInterval(timer);
            countdownPercentage.value = 0;
            handleStockbullNextPayment();

        }
    }, 1000);
};

onMounted(() => {
    startCountdown();
});



onBeforeUnmount(() => {
    clearInterval(timer);
});
</script>
  