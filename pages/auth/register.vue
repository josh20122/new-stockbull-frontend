<template>
  <SharedNavBar></SharedNavBar>
  <div class="flex w-full h-screen place-items-center px-2 bg-black">
    <SharedContainer class="w-full mx-auto rounded-md md:max-w-[500px]">
      <div class="text-center">REGISTER FOR FREE</div>

      <div class="inline-flex w-full gap-2 flex-col">
        <SharedTextInput
          class="w-full"
          placeholder="Username"
          v-model="form.username"
          :errors="formErrors.username"
        ></SharedTextInput>
        <SharedTextInput
          v-model="form.email"
          placeholder="Email"
          :errors="formErrors.email"
        ></SharedTextInput>
        <SharedTextInput
          v-model="form.phone_number"
          placeholder="Phone Number"
          :errors="formErrors.phone_number"
        ></SharedTextInput>
        <div>
          <select
            id="countries"
            v-model="form.country"
            class="input-sm border text-[10px] w-full border-gray-600 bg-transparent placeholder:text-[12px] text-white shadow-inner shadow-gray-900 rounded-sm focus:outline-none focus:border-indigo-500"
          >
            <option v-for="(item, index) in countries" :value="item.id">
              {{ item.name }}
            </option>
            <!-- <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option> -->
          </select>

          <div v-if="formErrors.country" class="text-[10px] text-red-600">
            <div
              v-for="(error, index) in formErrors.country"
              v-text="error"
              :key="index"
            ></div>
          </div>
        </div>
        <SharedTextInput
          v-model="form.password"
          :errors="formErrors.password"
          placeholder="Password"
        ></SharedTextInput>
        <SharedTextInput
          v-model="form.password_confirmation"
          placeholder="Confirm password"
          :errors="formErrors.password_confirmation"
        ></SharedTextInput>
        <div class="pt-4 w-full">
          <button
            @click="submitForm()"
            class="btn btn-secondary text-white btn-sm w-full"
          >
            Register
          </button>
        </div>
      </div>
    </SharedContainer>
  </div>
</template>
<script setup>
import axios from "axios";

const form = ref({
  username: "",
  email: "",
  phone_number: "",
  country: "",
  password: "",
  password_confirmation: "",
});

const formErrors = ref({});

const { data: countries } = await useFetch(
  "https://stockbullsecure.com/api/get-countries"
);

const submitForm = () => {
  axios
    .post("/register", form.value)
    .then((response) => {
      navigateTo("/");
    })
    .catch((err) => {
      formErrors.value = err.response.data.errors;
    });
};
</script>
