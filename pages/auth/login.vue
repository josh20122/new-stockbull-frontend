<template>
  <SharedNavBar></SharedNavBar>
  <div class="flex w-full h-screen place-items-center px-2 bg-black">
    <SharedContainer class="w-full mx-auto rounded-md md:max-w-[500px]">
      <div class="text-center">LOGIN</div>
      <div class="inline-flex w-full gap-2 flex-col">
        <SharedTextInput
          v-model="form.email"
          :errors="formErrors.email"
          placeholder="Email"
        ></SharedTextInput>

        <SharedTextInput
          v-model="form.password"
          placeholder="Password"
          type="password"
          :errors="formErrors.password"
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
import { setAxiosConfigurations } from "~/.utils/axiosConfigurations";
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
      setItem("token", response.data);
      setAxiosConfigurations();
      navigateTo("/");
    })
    .catch((err) => {
      formErrors.value = err.response.data;
    });
};
</script>
