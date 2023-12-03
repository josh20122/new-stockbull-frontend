<template>
    <UModal v-model="modalIsOpen" class="flex w-fit" :overlay="false" prevent-close>
        <UNotifications />
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class=" text-center">
                    SHIFT MARKET
                </div>
            </template>

            <div class=" ">
                <div class="flex flex-col gap-y-2">
                    <div>

                        <label class=" text-sm" for="">From</label>
                        <USelect label="From" name="sssssss" id="countries" :options="Charts" option-attribute="name"
                            value-attribute="value" v-model="form.from" :disabled="true" />
                        <!-- <div>

                            <div v-if="errors" class="text-[10px] text-red-600">
                                <div v-for="(error, index) in errors" v-text="error" :key="index"></div>
                            </div>
                        </div> -->

                    </div>
                    <div>

                        <label class=" text-sm" for="">To</label>
                        <USelect id="countries" :options="Charts" option-attribute="name" value-attribute="value"
                            v-model="form.to" />
                    </div>
                </div>
                <div class=" text-sm pt-5">
                    <div class=" pb-4">
                        Are you sure you want to shift from {{ chartAttributes[form.from] }} market to {{
                            chartAttributes[form.to] }} market
                        now? Note
                        the
                        following:
                    </div>
                    <ol class=" flex flex-col gap-y-2 pl-2">
                        <li>
                            1. All the data in {{ chartAttributes[form.from] }} market will be deleted.
                        </li>
                        <li>

                            2. All the data will be shifted to {{ chartAttributes[form.to] }} market.
                        </li>
                        <li>

                            3. No more profits accumulation from {{ chartAttributes[form.from] }} markets will be added.
                        </li>
                        <li>

                            4. You will start earning from (get the new market) market.
                        </li>
                        <li>

                            5. You will need at least 20% of your total stake, which is {{ botHistory.stake * 0.2 }} more as
                            the
                            transfer
                            fee of the following market. This fee must be in your account balance.
                        </li>
                    </ol>
                </div>
            </div>

            <template #footer>
                <div class=" flex gap-x-3  w-full justify-start ">
                    <UButton @click="modalIsOpen = false" color="red" variant="solid">CANCEL</UButton>
                    <UButton @click="submitForm()" variant="solid">CONFIRM SHIFT</UButton>
                </div>
                <!-- <Placeholder class="h-8" /> -->
            </template>
        </UCard>

    </UModal>
</template>

<script setup>
import axios from 'axios';
import { toDisplayString } from 'vue';
import { defineProps, defineEmits, watch } from 'vue';

const modalIsOpen = ref(false);

const props = defineProps({
    showModal: {}
})
const emit = defineEmits('closeModal');
const chartAttributes = {
    november: 'Stockbull (1F)',
    september: 'Stockbull (5F)',
    synthetic: 'Stockbull (15F)'
}

const submitForm = () => {
    axios.post('/shift-chart', form.value).then(response => {
        handleNotification(`You have successfully shifted from ${chartAttributes[form.value.from]} to ${chartAttributes[form.value.to]}.`)
    }).catch(err => {

        if (err.response.status == 433) {
            // console.log(err.response)
            handleNotification(err.response.data, 'red')
        }
        console.log(err.response);
    })
}

const botHistory = useBotDetails();

const activestockbullChart = useActiveStockbullMarket();

const formErrors = ref({})

const form = ref({
    to: 'november',
    from: activestockbullChart.value.real_name,
});

watch(modalIsOpen, (newValue) => {
    if (newValue == false) {
        emit('closeModal')
    }
})

watch(() => props.showModal, (newValue) => {
    // console.log('chanhed');
    modalIsOpen.value = newValue
})

const toast = useToast()
watch(() => activestockbullChart.value.name, (newValue) => {
    form.value.from == newValue
})

const handleNotification = (content, color) => {
    toast.add({ title: content, color: color })
}

const Charts = [
    { name: 'Stockbull (1F)', value: 'november' },
    { name: 'Stockbull (5F)', value: 'september' },
    { name: 'Stockbull (15F)', value: 'synthetic' }
]

</script>