<template>
  <SharedContainer class="w-full h-fit rounded-lg">
    <div>
      <div>
        <div class="font-semibold text-md py-2 text-center uppercase">
          settings
        </div>

        <div class="flex gap-y-3 flex-col pt-6">
          <div>
            <div class="inline-flex w-full justify-between">
              <div>Automated withdrawals</div>
              <div>
                <span class="text-sm font-semibold text-blue-600">
                  <input
                    class="toggle toggle-sm disabled:bg-gray-400"
                    type="checkbox"
                    v-model="form.automated_withdrawals"
                    name="automated_withdrawals"
                    :class="
                      form.automated_withdrawals
                        ? 'bg-yellow-600 border-yellow-600'
                        : 'bg-gray-400'
                    "
                  />
                </span>
              </div>
            </div>
            <hr class="border-gray-600 mt-2" />
          </div>
          <div>
            <div class="inline-flex w-full justify-between">
              <div>Minimum automated withdrawal</div>
              <div>
                <div class="relative">
                  USD
                  <input
                    class="border-none focus:outline-none bg-transparent p-1 text-xs h-fit rounded-lg text-right w-16 border"
                    type="text"
                    v-model="form.automated_withdrawal_amount"
                    placeholder="Enter amount"
                    name="automated_withdrawal_amount"
                  />
                </div>
              </div>
            </div>
            <hr class="border-gray-600 mt-2" />
          </div>
          <div>
            <div class="inline-flex w-full justify-between">
              <div>Withdrawal address</div>
              <div>
                <div class="relative">
                  <input
                    class="border-none focus:outline-none bg-transparent p-1 text-xs h-fit rounded-lg text-right w-40 border"
                    type="text"
                    placeholder="Enter wallet/ phone"
                    v-model="form.automated_withdrawals_address"
                    name="automated_withdrawals_address"
                  />
                </div>
              </div>
            </div>
            <hr class="border-gray-600 mt-2" />
          </div>

          <div>
            <div class="inline-flex w-full justify-between">
              <div>Instant referral earnings</div>
              <div>
                <span class="text-sm font-semibold text-blue-600">
                  <input
                    class="toggle toggle-sm disabled:bg-gray-400"
                    type="checkbox"
                    v-model="form.pay_referrals_instantly"
                    name="pay_referrals_instantly"
                    :class="
                      form.pay_referrals_instantly
                        ? 'bg-yellow-600 border-yellow-600'
                        : 'bg-gray-400'
                    "
                  />
                </span>
              </div>
            </div>
            <hr class="border-gray-600 mt-2" />
          </div>
        </div>
      </div>
    </div>
  </SharedContainer>
</template>
<script setup>
import axios from "axios";
definePageMeta({
  layout: "account",
});
const form = ref({});

const getUserSettings = () => {
  axios
    .get("/get-user-settings")
    .then((response) => {
      form.value = response.data;
    })
    .catch((err) => {});
};

const updateUserChanges = () => {
  axios.post("/update-user-settings", form.value).then((response) => {
    console.log("UPDATED");
  });
};

watch(
  [
    form.value.pay_referrals_instantly,
    () => form.value.automated_withdrawals,
    () => form.value.automated_withdrawal_amount,
    () => form.value.automated_withdrawals_address,
  ],
  (newValue) => {
    updateUserChanges();
  },
  true
);

onMounted(() => {
  getUserSettings();
});
</script>
