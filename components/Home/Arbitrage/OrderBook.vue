<template>
  <SharedContainer class="w-screen">
    <div class="relative overflow-x-auto w-full">
      <div class=" pl-2 font-semibold pb-4 text-lg"> Order Book</div>
      <div class="grid grid-cols-2  border-gray-500  ">
        <div class=" inline-flex justify-between border-r py-2 border-gray-500 px-2 border-y">
          <div>Volume</div>
          <div>Buy Price</div>
        </div>
        <div class=" inline-flex justify-between px-2 border-y border-gray-500 py-2">
          <div>Sell Price</div>
          <div>Volume</div>
        </div>
      </div>

      <div class="grid grid-cols-2  font-serif ">
        <div class=" flex flex-col gap-y-1 border-r border-gray-500">
          <div class="   h-6  relative  flex    " v-for="(item, index) in orderBook.asks" :key="index">
            <div class="justify-between absolute z-50 flex py-1 w-full px-2">
              <div class="justify-self-start text-white ">

                {{ item.volume }}
              </div>
              <div class="justify-self-end text-green-500 ">
                ${{ item.amount.toLocaleString() }}
              </div>
            </div>
            <div class="  bg-green-600 relative opacity-20 z-10  h-full  w-full">
              <div class=" bg-slate-800 absolute opacity-100 z-20  h-full "
                :style="`width: ${100 - (item.volume * item.amount / 100)}%`">
              </div>
            </div>
          </div>
        </div>


        <div class=" flex flex-col gap-y-1">
          <div class="   h-6  relative  flex " v-for="(item, index) in orderBook.bids" :key="index">
            <div class="justify-between absolute z-50 flex py-1 w-full px-2">
              <div class="justify-self-start text-red-600 "> ${{ item.amount.toLocaleString() }} </div>
              <div class="justify-self-end  text-white ">
                {{ item.volume }}
              </div>
            </div>
            <div class="  bg-red-600 relative opacity-20 z-10  h-full  "
              :style="`width: ${item.volume * item.amount / 100}%`">
            </div>
          </div>
        </div>
      </div>
    </div>
  </SharedContainer>

  <SharedContainer class=" w-full">
    <div class="flex w-full justify-between px-2 border-b pb-2 border-gray-500">
      <div>
        Price
      </div>
      <div>
        Quantity
      </div>
    </div>
    <div class="grid   font-serif ">
      <div class=" flex flex-col gap-y-1 ">
        <div class="   h-6  relative  flex    " v-for="(item, index) in orderBook.asks" :key="index">
          <div class="justify-between absolute z-50 flex py-1 w-full px-2">
            <div class="justify-self-end text-green-500 ">
              ${{ item.amount.toLocaleString() }}
            </div>
            <div class="justify-self-start text-white ">

              {{ item.volume }}
            </div>
          </div>
          <div class="  bg-green-600 relative opacity-20 z-10  h-full  w-full">
            <div class=" bg-slate-800 absolute opacity-100 z-20  h-full "
              :style="`width: ${100 - (item.volume * item.amount / 100)}%`">
            </div>
          </div>
        </div>
      </div>
      <div class=" py-3 border-y border-gray-700 my-2"></div>


      <div class=" flex flex-col gap-y-1">
        <div class="   h-6  relative  flex " v-for="(item, index) in orderBook.bids" :key="index">
          <div class="justify-between absolute z-50 flex py-1 w-full px-2">
            <div class="justify-self-start text-red-600 "> ${{ item.amount.toLocaleString() }} </div>
            <div class="justify-self-end  text-white ">
              {{ item.volume }}
            </div>
          </div>

          <div class="  bg-red-600 relative opacity-20 z-10  h-full  w-full">
            <div class=" bg-slate-800 absolute opacity-100 z-20  h-full "
              :style="`width: ${100 - (item.volume * item.amount / 100)}%`">
            </div>
          </div>
          <!-- <div class="  bg-red-600 relative opacity-20 z-10  h-full  "
            :style="`width: ${item.volume * item.amount / 100}%`">
            {{ }}
          </div> -->
        </div>
      </div>
    </div>

  </SharedContainer>
</template>
<script setup>
const orderBook = reactive({
  bids: [],
  asks: [],
})


onMounted(() => {
  const symbol = "btcusdt";
  const depthLevels = 5;
  const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@depth${depthLevels}`;

  // Create a WebSocket connection
  const ws = new WebSocket(wsUrl);
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    data.bids.forEach(item => {
      orderBook.bids.unshift({ amount: parseFloat(item[0]), volume: parseFloat(item[1]) })
    });

    data.asks.forEach(item => {
      orderBook.asks.unshift({ amount: parseFloat(item[0]), volume: parseFloat(item[1]) })
    });

    orderBook.asks = orderBook.asks.slice(0, 30)
    orderBook.bids = orderBook.bids.slice(0, 30)
    // console.log(data)
  };
});
</script>
