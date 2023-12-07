<template>
    <SharedContainer class=" w-full">
        <div class="  border-b  border-gray-600   font-semibold  py-2 mb-4">Active arbitrage Assets</div>

        <!-- {{ arbitrageWallets }} -->
        <!-- {{ arbitrageWallets }} -->
        <div v-if="arbitrageWallets.length > 0">
            <div class=" flex w-full justify-between   " v-for="(item, index) in items" :key="index">
                <div>
                    {{ index + 1 }}. {{ item.symbol }}
                </div>
                <div class=" inline-flex flex-col">
                    <div>B: {{ item.balance }}BTC</div>
                    <div>L: {{ item.limit }}BTC</div>
                </div>
            </div>
        </div>
        <div v-else class=" text-center ">
            YOU DO NOT HAVE ANY ACTIVE ARBITRAGE ASSETS
        </div>
    </SharedContainer>
</template>
<script setup>
const arbitrageWallets = useUserArbitrageWallet();
// const arbitrageWallets = [];
const symbols = useSymbols();

const items = computed(() => {
    if (symbols.value.length > 0) {
        return arbitrageWallets.value.map((item) => {
            let realtimeSymbol = symbols.value.filter((symbol) => symbol.s.includes(item.symbol))[0];
            // if (realtimeSymbol) {
            return {
                symbol: item.symbol,
                balance: item.stake / realtimeSymbol.c,
                limit: item.profit / realtimeSymbol.c,
            }
            // }
        })
    }

    return []
})
</script>