<template>
  <div class="flex flex-col justify-center w-full h-screen place-items-center px-2 bg-white">
    <div class="pb-5 text-black text-3xl flex gap-x-3 font-mono font-semibold">
      <img class="h-8" src="/logo.png" alt="" /> STOCKBULL
    </div>
    <SharedContainer class="w-full mx-auto rounded-sm md:max-w-[500px] bg-[#e9f1fe] border border-gray-400 px-6 py-16">
      <div class="grid md:grid-cols-2 w-full gap-3 flex-col">
        <AuthLineTextInput class="w-full" placeholder="" v-model="form.username" :errors="formErrors.username"
          label="Username" @keyup.enter="submitForm()">
        </AuthLineTextInput>
        <AuthLineTextInput v-model="form.email" @keyup.enter="submitForm()" label="Email" placeholder=""
          :errors="formErrors.email"></AuthLineTextInput>
        <AuthLineTextInput v-model="form.phone_number" @keyup.enter="submitForm()" label="Phone Number" placeholder=""
          :errors="formErrors.phone_number"></AuthLineTextInput>

        <AuthLineTextInput v-model="form.referral_code" @keyup.enter="submitForm()" placeholder="" label="Referral Code "
          :errors="formErrors.referral_code"></AuthLineTextInput>

        <div class="relative z-0 w-full group md:col-span-2">
          <select placeholder="" @keyup.enter="submitForm()" id="countries"
            class="block py-2.5 px-0 caret-blue-600 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            v-model="form.country">
            <option class="bg-" v-for="(item, index) in countries" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <label for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country
          </label>

          <div v-if="formErrors.country" class="text-[10px] text-red-600">
            <div v-for="(error, index) in formErrors.country" v-text="error" :key="index"></div>
          </div>
        </div>
        <AuthLineTextInput v-model="form.password" placeholder="" :errors="formErrors.password"
          @keyup.enter="submitForm()" label="Password"></AuthLineTextInput>
        <AuthLineTextInput v-model="form.password_confirmation" placeholder="" @keyup.enter="submitForm()"
          label="Confirm password" :errors="formErrors.password_confirmation"></AuthLineTextInput>
      </div>
      <div class="flex items-start pt-4">
        <div class="flex content-center items-center place-content-center place-items-center h-5">
          <input id="remember" type="checkbox" value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required />
        </div>
        <label for="remember" class="ms-2 text-xs font-medium text-gray-900">Remember me</label>
      </div>
      <div class="pt-4 flex justify-center rounded-sm w-full">
        <UButton color="yellow" block variant="solid" class="text-white rounded-xs" @click="submitForm()">
          Sign In
        </UButton>
      </div>
      <div class="text-center text-xs text-gray-800 pt-4">
        <div>
          Already have an account?
          <span class="text-blue-500">
            <NuxtLink to="/auth/login"> Sign In </NuxtLink>
          </span>
        </div>
      </div>
    </SharedContainer>
    <SharedSocials></SharedSocials>
  </div>
</template>
<script setup>
import axios from "axios";
import { login } from "~/.utils/axiosConfigurations";
let router = useRoute();
const form = ref({
  username: null,
  email: "",
  phone_number: "",
  referral_code: router.query.ref,
  country: "",
  password: "",
  password_confirmation: "",
});

const formErrors = ref({});

const { data: countries } = await useFetch(
  "https://api.stockbull.live/api/get-countries"
);

const submitForm = () => {
  axios
    .post("/register", form.value)
    .then((response) => {
      login(response.data.token);

      navigateTo("/account");
    })
    .catch((err) => {
      formErrors.value = err.response.data.errors;
    });
};

definePageMeta({
  middleware: "guest",
});
</script>
