<template>
  <div class="flex h-fit">
    <SharedContainer class="rounded-md w-full">
      <div class="text-center pb-5">WITHDRAW FROM AGENT</div>
      <div class="flex flex-col gap-y-2">
        <SharedTextInput
          class="  "
          label="Amount to withdraw"
          v-model="form.amount"
          :errors="formErrors.amount"
          placeholder=" Enter amount in USD"
        ></SharedTextInput>
        <SharedTextInput
          class="  "
          label="Phone number"
          v-model="form.phone"
          :errors="formErrors.phone"
          placeholder=" Enter phone number"
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

    <div>
      <USlideover v-model="modalIsOpen" prevent-close>
        <UCard
          class="flex flex-col flex-1 relative"
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
                Withdrawal Summary
              </h3>
              <div class="invisible"></div>
            </div>
          </template>

          <div
            className="inline-flex flex-col w-full py-8 text-gray-200 gap-y-4"
          >
            <div>
              <div className="w-full text-center">
                <div className="text-xl text-gray-500 ">Confirm withdrawal</div>
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
                  withdraw to
                  <span class="uppercase">
                    {{ confirmationText.method }}
                  </span>
                </div>

                <div className="text-2xl ">
                  {{ parseFloat(form.amount).toFixed(2).toLocaleString() }}USD
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="grid justify-between grid-cols-2 ">
                <div>Money arrives</div>
                <div className=" justify-self-end">Instant</div>

                <div>Phone number</div>
                <div className=" justify-self-end">{{ form.phone }}</div>
                <hr className="col-span-2 mt-2 " />
              </div>

              <div className="grid justify-between grid-cols-2 ">
                <div>Amount to Withdrawal</div>
                <div className=" justify-self-end">
                  {{
                    parseFloat(confirmationText.amount)
                      .toFixed(2)
                      .toLocaleString()
                  }}USD
                </div>
              </div>
              <div className="grid justify-between grid-cols-2 ">
                <div>
                  Fee
                  <span className="text-[9px]">
                    {{ confirmationText.fee_text }}
                  </span>
                </div>
                <div className=" justify-self-end">
                  {{
                    parseFloat(confirmationText.fee)
                      .toFixed(2)
                      .toLocaleString()
                  }}USD
                </div>
                <hr className="col-span-2 mt-2 " />
              </div>
              <div className="grid justify-between grid-cols-2 ">
                <div>Total Receivable</div>

                <div className=" justify-self-end">
                  {{
                    parseFloat(confirmationText.total_receivable)
                      .toFixed(2)
                      .toLocaleString()
                  }}USD
                </div>
              </div>
              <div className="grid justify-between grid-cols-2 ">
                <div>After conversion</div>
                <div className=" justify-self-end">
                  {{ confirmationText.conversion }}
                </div>
              </div>
            </div>
            <div className=" text-[9px]">
              Conversion to gateway currency is necessary because our agent does
              not support USD. If the withdraw delays for more than 2 Hours
              please contact our
              <a
                href="https://t.me/STockBull_AI"
                className="text-blue-500 underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                customer support.
              </a>
            </div>
            <UButton
              block
              class="uppercase bottom-3"
              @click="confirmWithdrawal()"
            >
              Confirm withdrawal
            </UButton>
          </div>
        </UCard>
      </USlideover>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const modalIsOpen = ref(false);
definePageMeta({
  layout: "account",
});
const toast = useToast();

const route = useRoute();
const confirmationText = ref({});
const submitForm = () => {
  axios
    .post("/withdraw", form.value)
    .then((response) => {
      if (form.value.submit) {
        toast.add({
          title: "Your withdrawal request has been sent successfully.",
          timeout: 3000,
          id: "withdraw",
        });

        navigateTo("/account");
        modalIsOpen.value = false;
      } else {
        formErrors.value = {};
        confirmationText.value = response.data;
        modalIsOpen.value = true;
      }
    })
    .catch((err) => {
      formErrors.value = err.response.data;
    });
};

const confirmWithdrawal = () => {
  form.value = {
    ...form.value,
    submit: true,
  };

  submitForm();
};

const formErrors = ref({});

const form = ref({
  amount: 0,
  wallet: "",
  isAgent: true,
  agent: route.params.id,
  submit: false,
  phone: null,
});
</script>
