<template>
  <div class="flex w-full h-fit">
    <SharedContainer class="rounded-md w-full max-w-[400px]">
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
          placeholder="Enter deposit phone number"
        ></SharedTextInput>
        <div>
          <UButton
            @click="updatePassword()"
            color="yellow"
            block
            class="text-white text-center rounded-md"
          >
            Change Password
          </UButton>
        </div>
      </div>
    </SharedContainer>
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
  }, 1000);
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
      modalIsOpen.value = false;
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
