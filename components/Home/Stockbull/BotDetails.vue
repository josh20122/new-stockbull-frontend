<template>
    <SharedContainer class=" w-full py-3">
        <div class=" font-semibold pb-4 text-center border-b border-gray-600 mb-4">
            Details
        </div>
        <!-- <hr class=" border "> -->

        <VueApexCharts :options="botDetails.options" :series="botDetails.series" width="300px" height="300px" type="pie">
        </VueApexCharts>

        <div class="flex flex-col gap-y-2">
            <div class="  bg-slate-900 py-3 rounded-md">
                Paid Target: {{ botData.wallets[1].toFixed(4) }}USD
            </div>

            <div class="  bg-slate-900 py-3 rounded-md">
                Remaining Target: {{ botData.wallets[0].toFixed(4) }}USD
            </div>
            <div class="  bg-slate-900 py-3 rounded-md">
                Total Target: {{ (botData.wallets[0] + botData.wallets[1]).toFixed(4) }}USD
            </div>
        </div>
    </SharedContainer>
</template>

<script setup>

import VueApexCharts from "vue3-apexcharts";

const botData = useBotDetails();

onMounted(() => {
    console.log('MOUNTED')
})

const botDetails = ref({
    series: botData.value.wallets,
    options: {
        stroke: {
            width: 0, // Set stroke width to 0 to remove the borders
        },
        chart: {
            type: "pie",
        },
        labels: ["Remaining target", "Paid target"],

        dataLabels: {
            enabled: true, // Set to false to remove pie chart labels
            formatter: function (val, opts) {
                return opts.w.globals.series[opts.seriesIndex]; // Display the data point value
            },
        },
    },
});
</script>