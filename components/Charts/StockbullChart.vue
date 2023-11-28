<template>
  <!-- <div id="chart"> -->
  <SharedContainer
    id="stockbullChart"
    class="w-full h-full relative"
    :padding="false"
  >
    <VueApexCharts
      class="h-full w-full"
      v-if="!processing"
      :options="chartData.options"
      :series="[
        { data: chartData.series[0].data }, // series1
        {
          data: Array(chartData.series[0].data.length).fill(profitLine),
        },
      ]"
      type="area"
      :height="screenHeight - 20"
    ></VueApexCharts>

    <HomeStockbullStopBot></HomeStockbullStopBot>
  </SharedContainer>
  <div class="absolute top-20 w-full flex justify-center" v-if="processing">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="fill-yellow-600 animate-spin"
      viewBox="0 0 16 16"
    >
      <path
        d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
      />
      <path
        fill-rule="evenodd"
        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
      />
    </svg>
  </div>
</template>

<script setup>
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { ref, watch } from "vue";
import axios from "axios";
import { getItem } from "@utils/localStorage";
import VueApexCharts from "vue3-apexcharts";

const runtimeConfig = useRuntimeConfig();
const firstMessage = ref(true);
const processing = ref(true);
const profitLine = ref(50);
const initialData = []; // Initial data
const initialCategories = [];
const isSmallScreen = () => {
  return window.innerWidth < 768;
};

const screenHeight = ref(0);
const setScreenHeight = () => {
  var stockbullChartElement = document.getElementById("stockbullChart");

  screenHeight.value = stockbullChartElement.offsetHeight;
};

const activeChart = useActiveStockbullMarket();

const minutes = ref(7);

let chartData = ref({
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
      // height: 350,
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

const echo = new Echo(runtimeConfig.public.pusher);
onUnmounted(() => {
  echo.leaveChannel("chart-data");
});

onMounted(() => {
  setScreenHeight();
  window.Pusher = Pusher;

  echo.channel("chart-data").listen(".data", async (pusherData) => {
    let data = pusherData[activeChart.value.real_name];
    // console.log(data);

    let profitLineColor = data.chart.value < data.profitLine ? "red" : "green";
    let previousChartData = chartData.value;

    // console.log(firstMessage.value);
    if (firstMessage.value) {
      firstMessage.value = false;
      processing.value = true;
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
                  ...previousChartData.options.annotations.yaxis[0].label,
                  text: ` ${parseFloat(newSeriesData[0]).toFixed(3)}`,
                },
              },
            ],
          },
        },
      };

      processing.value = false;
    } else {
      let newSeriesData = previousChartData.series[0].data.slice(0, 60 * 7); // Limit to 30 records

      let previousCategoriesData =
        previousChartData.options.xaxis.categories.slice(0, 60 * 7);

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
                  ...previousChartData.options.annotations.yaxis[0].label,
                  text: ` ${parseFloat(newSeriesData[0]).toFixed(3)}`,
                },
              },
            ],
          },
        },
      };
    }
  });
});
</script>
