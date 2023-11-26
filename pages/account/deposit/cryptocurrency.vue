<template>
  <div class="h-fit">
    <SharedContainer class="rounded-md w-full">
      <div class="text-center pb-5">DEPOSIT CRYPTOCURRENCY</div>
      <div class="flex flex-col gap-y-6">
        <SharedTextInput
          class="  "
          label="Amount to deposit"
          v-model="form.amount"
          :errors="formErrors.amount"
          placeholder=" Enter amount in USD"
        ></SharedTextInput>

        <div>
          <UButton
            @click="submitForm()"
            color="yellow"
            block
            class="text-white text-center rounded-md"
          >
            Deposit
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
