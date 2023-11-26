<template>
  <div class="flex w-full h-fit">
    <SharedContainer class="rounded-md w-full">
      <div class="text-center pb-5">Deposit</div>
      <div class="flex flex-col gap-y-6">
        <SharedTextInput
          class="  "
          v-model="form.amount"
          :errors="formErrors.amount"
          placeholder="Enter amount in USD"
        ></SharedTextInput>

        <SharedTextInput
          class="  "
          v-model="form.phone"
          :errors="formErrors.phone"
          :placeholder="` Enter deposit ${
            user.country.name == 'Kenya' ? 'name' : 'phone number'
          } `"
        ></SharedTextInput>
        <div>
          <UButton
            @click="submitForm()"
            color="yellow"
            block
            class="text-white text-center rounded-md"
          >
            DEPOSIT
          </UButton>
        </div>
      </div>
    </SharedContainer>

    <div>
      <USlideover v-model="modalIsOpen" prevent-close>
        <UCard
          class="flex flex-col flex-1 h-screen overflow-y-scroll"
          :ui="{
            body: { base: 'flex-1' },
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-arrow-left"
                class="-my-1"
                @click="modalIsOpen = false"
              />
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white uppercase"
              >
                Deposit Summary
              </h3>
              <div class="invisible"></div>
            </div>
          </template>

          <div>
            <div className="w-full text-center">
              <div className="text-xl text-gray-500 ">Confirm deposit</div>
              <button className=" bg-black p-2 rounded-full mt-3  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
              </button>
              <div className="pt-4">
                Deposit using Agent
                <span class="uppercase">
                  <!-- {{ confirmationText.method }} -->
                </span>
              </div>

              <div className="text-2xl ">
                <!-- {{ parseFloat(form.amount).toFixed(2).toLocaleString() }} -->

                {{ form.amount.toLocaleString() }}USD
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-3 pt-4">
            <div className="grid justify-between grid-cols-2 ">
              <div>Deposit Confirmation</div>
              <div className=" justify-self-end">Instant</div>

              <div>
                Your deposit
                {{ user.country.name == "Kenya" ? "name" : "phone number" }}
              </div>
              <div className=" justify-self-end">{{ form.phone }}</div>
              <hr className="col-span-2 mt-2 " />
            </div>

            <div className="grid justify-between grid-cols-2 ">
              <div>Amount to deposit</div>
              <div className=" justify-self-end">
                {{ form.amount.toLocaleString() }}USD
              </div>

              <div>Amount after conversion</div>
              <div className=" justify-self-end">
                {{
                  paymentMethod.amount.toLocaleString() + paymentMethod.currency
                }}
              </div>
              <hr className="col-span-2 mt-2 " />
            </div>
            <div className="grid justify-between grid-cols-2 ">
              <div class="font-semibold">Other Instructions</div>
              <div className=" justify-self-end"></div>
              <!-- <hr className="col-span-2 mt-2 " /> -->
            </div>
            <div
              class="prose prose:text-white prose-yellow prose-strong:text-white prose-p:text-white text-sm prose-a:text-blue-400 text-center list-disc select-text"
              v-html="paymentMethod.content"
            ></div>
          </div>

          <template #footer>
            <Placeholder class="h-8" />
          </template>
        </UCard>
      </USlideover>
    </div>
  </div>
</template>
<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
import axios from "axios";
const route = useRoute();
route.params.id;
const form = ref({
  amount: "",
  phone: "",
  agentId: route.params.id,
});

const user = useUser();
const paymentMethod = ref({});
const modalIsOpen = ref(false);
const formErrors = ref({});
definePageMeta({
  layout: "account",
});

let interval;
const startInterval = () => {
  interval = setInterval(() => {
    confirmTransaction();
    console.log("Interval running...");
  }, 5000);
};

watch(modalIsOpen, (newValue) => {
  if (!newValue) {
    // Clear the interval when newValue becomes false
    clearInterval(interval);
    console.log("Interval cleared.");
  } else {
    startInterval();
  }
});

const confirmTransaction = () => {
  axios
    .post("/confirm-agent-deposit")
    .then((response) => {
      if (response.data == true) {
        modalIsOpen.value = false;
      }
    })
    .catch((err) => {});
};

const submitForm = () => {
  axios
    .post("/deposit-agent-message", form.value)
    .then((response) => {
      paymentMethod.value = response.data;

      modalIsOpen.value = true;
    })
    .catch((err) => {
      formErrors.value = err.response.data;
    });
};
</script>
