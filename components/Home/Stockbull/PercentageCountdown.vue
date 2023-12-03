<template>
    <div>
        <p>Countdown: {{ Math.floor(minutes) }}:{{ seconds }} ({{ countdownPercentage }}%)</p>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';

const props = defineProps(['initialSeconds']);
const totalTimeInSeconds = props.initialSeconds;
const minutes = ref(Math.floor(props.initialSeconds / 60));
const seconds = ref(props.initialSeconds % 60);
const globalCountdown = useStockbullCountdown()
const countdownPercentage = ref(100);
let timer;

const startCountdown = () => {
    timer = setInterval(() => {
        const totalSecondsRemaining = Math.max(minutes.value * 60 + seconds.value, 0);

        if (totalSecondsRemaining > 0) {
            const percentageRemaining = (totalSecondsRemaining / totalTimeInSeconds) * 100;
            countdownPercentage.value = percentageRemaining.toFixed(2);

            if (seconds.value > 0) {
                seconds.value--;
            } else {
                minutes.value = Math.max(minutes.value - 1, 0);
                seconds.value = 59;

                globalCountdown.value = {
                    timer: `${minutes.value}:${seconds}`,
                    percentage: `${100 - countdownPercentage}`
                }
            }
        } else {
            clearInterval(timer);
            countdownPercentage.value = 0;
            // Optional: You can perform an action when the countdown reaches zero.
            // alert('Countdown reached zero!');
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
  