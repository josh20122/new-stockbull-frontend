<template>
  <div class="flex flex-col justify-center w-full h-screen place-items-center px-2 bg-white">
    <div class="pb-5 text-black text-3xl flex gap-x-3 font-mono font-semibold">
      <img class="h-8" src="/logo.png" alt="" /> STOCKBULL
    </div>
    <SharedContainer class="w-full mx-auto rounded-sm md:max-w-[500px] bg-[#e9f1fe] border border-gray-400 px-6 py-16">
      <div class="grid w-full gap-3 flex-col">
        <div class=" text-center font-semibold text-gray-900  uppercase">Reset Password</div>

        <div className="text-sm text-start pb-2 text-gray-900">
          <!-- <div className="text-green-600 text-xs text-center"> -->
          We have sent a password reset code in your email, {{ email }}
          check your email inbox or your spam folder
          <!-- </div> -->
        </div>
        <AuthLineTextInput v-model="form.resetCode" :errors="formErrors.resetCode" @keyup.enter="submitForm()"
          label="Password reset code" placeholder=""></AuthLineTextInput>
        <AuthLineTextInput v-model="form.password" :errors="formErrors.password" @keyup.enter="submitForm()"
          label="New Password" placeholder=""></AuthLineTextInput>
        <AuthLineTextInput v-model="form.password_confirmation" :errors="formErrors.password_confirmation"
          @keyup.enter="submitForm()" label="Confirm password" placeholder=""></AuthLineTextInput>

      </div>
      <div class=" text-end text-blue-600 text-sm pt-3">

      </div>
      <div class="pt-4 flex justify-center rounded-sm w-full">
        <UButton color="yellow" block variant="solid" class="text-white rounded-xs" @click="submitForm()">
          Reset Password
        </UButton>
      </div>
      <!-- <div class="text-center text-xs pt-4 text-gray-800">
        <div>
          Already have an account?
          <span class="text-blue-500">
            <NuxtLink to="/auth/forgotpassword"> Change Email </NuxtLink>
          </span>
        </div>
      </div> -->
    </SharedContainer>
  </div>
  <SharedSocials></SharedSocials>
</template>
<script setup>
import axios from 'axios';

definePageMeta({
  middleware: "guest",
});

const email = localStorage.getItem('email')

const form = ref({
  resetCode: "",
  password: "",
  password_confirmation: "",
})
const formErrors = ref({

});

const submitForm = () => {
  navigateTo('/auth/reset-password')
  axios
    .post("/auth/set-password-reset-code", form.value)
    .then((response) => {
      navigateTo('/auth/login')
    })
    .catch((err) => {

      if (err.response.status == 422) {
        formErrors.value = err.response.data
      }
    });
}
</script>
