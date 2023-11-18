<template>
  <SharedContainer class="w-screen">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <caption class="p-5 text-lg font-semibold text-left rtl:text-right">
          Order Book
          <!-- <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Browse a list of Flowbite products designed to help you work and
            play, stay organized, get answers, keep in touch, grow your
            business, and more.
          </p> -->
        </caption>
        <thead class="text-xs text-white capitalize">
          <tr class="grid grid-cols-2 border-t border-b">
            <th class="py-4">
              <div class="justify-between flex w-full px-2">
                <div class="justify-self-start">Volume</div>
                <div class="justify-self-end">Buy Price</div>
              </div>
            </th>
            <th class="py-4 border-l">
              <div class="justify-between flex w-full px-2">
                <div>Sell Price</div>
                <div>Volume</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="grid grid-cols-2" v-for="n in 10" :key="n">
            <th class="px-2 my-1 font-light relative">
              <div class="bg-blue-300 absolute h-full w-full"></div>
              <div class="justify-between flex w-full">
                <div class="justify-self-start text-white">Volume</div>
                <div class="justify-self-end text-green-700">
                  Volume Buy Price
                </div>
              </div>
            </th>
            <th class="px-2 my-1" style="background-color: lightcoral">
              <div class="justify-between flex w-full relative">
                <div class="justify-self-start text-red-600">Volume</div>
                <div class="justify-self-end text-white">Volume Buy Price</div>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </SharedContainer>
</template>
<script setup>
onMounted(() => {
  const symbol = "btcusdt";
  const depthLevels = 10; // You can change this to 10 or 20 based on your preference

  // Construct the WebSocket URL
  const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@depth${depthLevels}`;

  // Create a WebSocket connection
  const ws = new WebSocket(wsUrl);

  // WebSocket onopen event

  // WebSocket onmessage event
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Process the data as needed
  };
});
</script>
