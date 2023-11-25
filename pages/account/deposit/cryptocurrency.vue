<template>
  <div class="flex place-items-center justify-center w-full pt-6 h-full">
    <SharedContainer class="rounded-md w-full max-w-[400px]">
      <div class="text-center pb-5">DEPOSIT CRYPTOCURRENCY</div>
      <div class="flex flex-col gap-y-6">
        <SharedTextInput
          class="  "
          label="Amount to deposit"
          v-model="form.amount"
          :errors="formErrors.amount"
          placeholder=" Enter amount in USD"
        ></SharedTextInput>

        <button
          @click="submitForm()"
          class="btn btn-secondary btn-sm text-white"
        >
          Deposit
        </button>
      </div>
    </SharedContainer>
  </div>
</template>

<script setup>
import axios from "axios";

definePageMeta({
  layout: "account",
});

const submitForm = () => {
  axios
    .post("/deposit", form.value)
    .then((response) => {
      // Open a new tab with the specified link
      window.open(response.data, "_blank");
    })
    .catch((err) => {
      formErrors.value = err.response.data;
    });
};

const formErrors = ref({});

const form = ref({
  amount: 0,
});
</script>
