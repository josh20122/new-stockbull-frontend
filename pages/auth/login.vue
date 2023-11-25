<template>
  <div
    class="flex flex-col justify-center w-full h-screen place-items-center px-2 bg-white"
  >
    <div class="pb-5 text-black text-3xl flex gap-x-3 font-mono font-semibold">
      <img class="h-8" src="/logo.png" alt="" /> STOCKBULL
    </div>
    <SharedContainer
      class="w-full mx-auto rounded-sm md:max-w-[500px] bg-[#e9f1fe] border border-gray-400 px-6 py-16"
    >
      <div class="grid w-full gap-3 flex-col">
        <AuthLineTextInput
          v-model="form.email"
          :errors="formErrors.email"
          @keyup.enter="submitForm()"
          label="Email"
          placeholder=""
        ></AuthLineTextInput>

        <AuthLineTextInput
          v-model="form.password"
          placeholder=""
          label="Password"
          @keyup.enter="submitForm()"
          type="password"
          :errors="formErrors.password"
        ></AuthLineTextInput>
      </div>
      <div class="pt-4 flex justify-center rounded-sm w-full">
        <UButton
          color="yellow"
          block
          variant="solid"
          class="text-white rounded-xs"
          @click="submitForm()"
        >
          Sign In
        </UButton>
      </div>
      <div class="text-center text-xs pt-4 text-gray-800">
        <div>
          Already have an account?
          <span class="text-blue-500">
            <NuxtLink to="/auth/register"> Sign Up </NuxtLink>
          </span>
        </div>
      </div>
    </SharedContainer>
  </div>
</template>
<script setup>
import axios from "axios";
import { login, setAxiosConfigurations } from "~/.utils/axiosConfigurations";
import { getItem, setItem } from "~/.utils/localStorage";
const form = ref({
  email: "",
  password: "",
});

const formErrors = ref({});

const submitForm = () => {
  axios
    .post("/login", form.value)
    .then((response) => {
      login(response.data);
      navigateTo("/");
    })
    .catch((err) => {
      formErrors.value = err.response.data;
    });
};

definePageMeta({
  middleware: "guest",
});
</script>
