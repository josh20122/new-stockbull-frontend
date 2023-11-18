<template>
    <!-- <div id="chart"> -->
    <VueApexCharts :options="chartData.options" :series="[
        { data: chartData.series[0].data }, // series1
        {
            data: Array(chartData.series[0].data.length).fill(profitLine),
        },
    ]" type="area" height="100%"></VueApexCharts>

    <!-- {{ chartData.options }} -->
    <!-- </div> -->
</template>

<script setup>
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { ref } from 'vue'
import axios from 'axios'
import { getItem } from "@utils/localStorage";
import VueApexCharts from "vue-apexcharts";


console.log(getItem('activeChart'))
const runtimeConfig = useRuntimeConfig();
const firstMessage = ref(true)
const processing = ref(true)
const profitLine = ref(50);
const initialData = []; // Initial data
const initialCategories = [];
const isSmallScreen = () => {
    return window.innerWidth < 768;
};

const minutes = ref(7)

let chartData = ref

    ({
        series: [
            {
                name: "STockBull units",
                data: initialData,
            },
        ],
        options: {
            fill: {
                colors: ["yellow", "transparent", "#9C27B0"],
                type: "gradient",
                gradient: {
                    type: "vertical",
                    shadeIntensity: 0.5,
                },
            },
            tooltip: {
                enabled: true,
                theme: "dark",
                x: {
                    show: true,
                },
                y: {
                    show: true,
                    formatter: (value) => `${parseFloat(value).toFixed(2)}%`,
                },
                custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                    // Customize tooltip content based on the series name
                    if (seriesIndex === 0) {
                        return `<div className="px-4 text-xs py-2 bg-blue-500">Stockbull Index: ${parseFloat(
                            series[seriesIndex][dataPointIndex]
                        ).toFixed(3)}</div>`;
                    }
                    return `<div className="px-4 text-xs bg-green-500 py-2">Profit line: ${parseFloat(
                        series[seriesIndex][dataPointIndex]
                    ).toFixed(3)}</div>`;
                },
            },
            legend: {
                show: false,
            },
            chart: {
                height: 350,
                type: "area",
                animations: {
                    enabled: false,
                    easing: "easeinout",
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150,
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350,
                    },
                },
                toolbar: {
                    show: isSmallScreen ? false : true,
                },
                zoom: {
                    enabled: true,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: "smooth",
                lineCap: "butt",
                colors: ["yellow", "green"],
                width: 1,
                dashArray: 0,
            },
            grid: {
                show: false,
            },
            xaxis: {
                type: "datetime",
                categories: initialCategories,
                zoom: {
                    max: 5, // Set the maximum zoom level for the x-axis
                },
            },
            plotOptions: {
                line: {
                    animations: {
                        enabled: false,
                    },
                },
            },
            yaxis: [
                {
                    opposite: true,
                    labels: {
                        style: {
                            colors: "#FF9800",
                        },
                        formatter: function (value) {
                            return parseFloat(value).toFixed(3);
                        },
                    },
                    // min: 0,
                },
            ],
            annotations: {
                yaxis: [
                    {
                        y: 50,
                        borderColor: "transparent",
                        label: {
                            borderColor: "transparent",
                            style: {
                                color: "#fff",
                                background: "#1111",
                            },
                            text: "PRFIT LINE",
                        },
                    },
                ],
            },
        },
    });

const updateChart = (newTime, oldTime) => {
    const currentDate = newTime ? new Date(newTime) : new Date();
    const previousDate = oldTime ? new Date(oldTime) : new Date();
    const differenceInMilliseconds = Math.abs(currentDate - previousDate);
    const differenceInSeconds = differenceInMilliseconds / 1000;

    if (differenceInSeconds > 4) {
        // debounce(() => {
        firstMessage.value = true;
        // }, 2000);
    } else {
        return;
    }
};

onMounted(() => {

    window.Pusher = Pusher;
    const echo = new Echo(runtimeConfig.public.pusher);

    echo.channel('chart-data').listen('.data', async (pusherData) => {

        let data = pusherData[getItem("activeChart")];

        let profitLineColor =
            data.chart.value < data.profitLine ? "red" : "green";
        let previousChartData = chartData.value




        console.log(firstMessage.value)
        if (firstMessage.value) {
            firstMessage.value = false
            processing.value = true
            let response = await axios.post("/chart-data", {
                timer: minutes.value ?? 7,
            });


            if (response.status == 200) {
                firstMessage.value = false;
            }


            let newSeriesData = response.data.values;
            let previousCategoriesData = response.data.time;
            chartData.value = {
                series: [{ data: newSeriesData }],
                options: {
                    ...previousChartData.options,
                    xaxis: {
                        ...previousChartData.options.xaxis,
                        categories: previousCategoriesData,
                    },
                    stroke: {
                        show: true,
                        curve: "smooth",
                        lineCap: "butt",
                        colors: ["yellow", profitLineColor],
                        width: 1,
                        dashArray: 0,
                    },
                    yaxis: [
                        {
                            opposite: true,
                            labels: {
                                style: {
                                    colors: "#FF9800",
                                },
                                formatter: function (value) {
                                    return value > 100
                                        ? parseFloat(value).toFixed(1)
                                        : parseFloat(value).toFixed(4);
                                },
                            },
                            // min: 0.3 * data.profitLine,
                        },
                    ],
                    annotations: {
                        ...previousChartData.options.annotations,
                        yaxis: [
                            {
                                ...previousChartData.options.annotations.yaxis[0],
                                y: newSeriesData[0],
                                label: {
                                    ...previousChartData.options.annotations.yaxis[0]
                                        .label,
                                    text: ` ${parseFloat(newSeriesData[0]).toFixed(3)}`,
                                },
                            },
                        ],
                    },
                },

            };

            processing.value = false;
        } else {
            let newSeriesData = previousChartData.series[0].data.slice(
                0,
                60 * 7
            ); // Limit to 30 records

            let previousCategoriesData =
                previousChartData.options.xaxis.categories.slice(
                    0,
                    60 * 7
                );

            if (previousCategoriesData.length > 20) {
                updateChart(data.chart.time, previousCategoriesData[0]);
            }

            newSeriesData.unshift(data.chart.value);
            previousCategoriesData.unshift(data.chart.time);

            profitLine.value = data.profitLine;

            chartData.value = {

                series: [{ data: newSeriesData }],
                options: {
                    ...previousChartData.options,
                    xaxis: {
                        ...previousChartData.options.xaxis,
                        categories: previousCategoriesData,
                    },
                    stroke: {
                        show: true,
                        curve: "smooth",
                        lineCap: "butt",
                        colors: ["yellow", profitLineColor],
                        width: 1,
                        dashArray: 0,
                    },
                    yaxis: [
                        {
                            opposite: true,
                            labels: {
                                style: {
                                    colors: "#FF9800",
                                },
                                formatter: function (value) {

                                    return value > 100
                                        ? parseFloat(value).toFixed(1)
                                        : parseFloat(value).toFixed(4);
                                },
                            },
                            // min: 0.3 * data.profitLine,
                        },
                    ],
                    annotations: {
                        ...previousChartData.options.annotations,
                        yaxis: [
                            {
                                ...previousChartData.options.annotations.yaxis[0],
                                y: newSeriesData[0],
                                label: {
                                    ...previousChartData.options.annotations.yaxis[0]
                                        .label,
                                    text: ` ${parseFloat(newSeriesData[0]).toFixed(3)}`,
                                },
                            },
                        ],
                    },
                },
            };

        }

    })


})



</script>