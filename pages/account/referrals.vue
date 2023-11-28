<template>
    <SharedContainer class="text-sm font-mediumn w-full flex flex-col gap-y-4 rounded-sm px-2 py-4">
        <div class="flex w-full justify-between">
            <div>Total referral bonus</div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor"
                class="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
        </div>
        <div class="  text-yellow-600 place-self-end justify-self-end">

            {{ referrals.total }}
        </div>
    </SharedContainer>
    <SharedContainer class=" mt-3">

        <div class="flex flex-col gap-y-3  max-h-screen overflow-y-scroll">

            <div v-for="(item, index) in referrals.referrals" :key="index" class="px-2 ">
                <div class="p-2 text-white justify-end  rounded-md  grid grid-cols-3   font-semibold bg-gray-800">
                    <div class=""> {{ item.user.username }} </div>
                    <div>

                        <div class=" w-fit rounded-md px-2 text-sm py-1 uppercase bg-yellow-600 text-white">

                            <a target="_blank">
                                {{ item.user.phone }}
                            </a>
                        </div>
                    </div>
                    <div class=" justify-self-end ">
                        <SharedButton v-if="item.completed"
                            class=" rounded-md px-2 text-sm py-1 uppercase bg-green-600 text-white">
                            Completed
                        </SharedButton>
                        <SharedButton v-else class=" rounded-md px-2 text-sm py-1 uppercase bg-red-600 text-white">
                            pending
                        </SharedButton>
                    </div>
                </div>
            </div>
        </div>
    </SharedContainer>
</template>
<script setup>
import axios from 'axios';

const referrals = ref({})
onMounted(() => {
    axios
        .get("/referrals")
        .then((response) => {
            referrals.value = response.data
        })
        .catch((error) => { });
})

definePageMeta({
    layout: 'account'
})
</script>