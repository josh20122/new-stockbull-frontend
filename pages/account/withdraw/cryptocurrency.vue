<template>
  <div class="flex place-items-center justify-center w-full pt-6 h-full">
    <SharedContainer class="rounded-md w-full">
      <div class="text-center pb-5">WITHDRAW CRYPTOCURRENCY</div>
      <div class="flex flex-col gap-y-2">
        <SharedTextInput
          class="  "
          label="Amount to deposit"
          v-model="form.amount"
          :errors="formErrors.amount"
          placeholder=" Enter amount in USD"
        ></SharedTextInput>
        <SharedTextInput
          class="  "
          label="Amount to wallet"
          v-model="form.wallet"
          :errors="formErrors.wallet"
          placeholder=" Enter wallet address"
        ></SharedTextInput>

        <div class="pt-6">
          <UButton
            @click="submitForm()"
            color="yellow"
            block
            class="text-white text-center rounded-md uppercase"
          >
            withdraw
          </UButton>
        </div>
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
    .post("/withdraw", form.value)
    .then((response) => {
      // Open a new tab with the specified link
      //   window.open(response.data, "_blank");
    })
    .catch((err) => {
      formErrors.value = err.response.data;
    });
};

const formErrors = ref({});

const form = ref({
  amount: 0,
  wallet: "",
  isAgent: false,
  agent: null,
  submit: false,
  phone: null,
});
</script>
