<template>
  <div class="">
    <div class="flex gap-4 flex-col md:flex-row">
      <div class="w-full">
        <SharedContainer class="w-full grid py-4 gap-4 rounded-md">
          <div class="text-center font-semibold">UPDATE PROFILE</div>
          <div class="px-2 pb-5 mx-auto">
            <img class="h-20" :src="userProfile.avatar" alt="" />
          </div>
          <SharedTextInput
            v-model="userProfile.username"
            placeholder="Username"
            label="Username"
            :errors="userProfileFormErrors.username"
          ></SharedTextInput>
          <SharedTextInput
            v-model="userProfile.email"
            placeholder="Email"
            label="Email"
            :errors="userProfileFormErrors.email"
          ></SharedTextInput>
          <SharedTextInput
            v-model="userProfile.phone_number"
            placeholder="Phone Number"
            label="Phone Number"
            :errors="userProfileFormErrors.phone_number"
          ></SharedTextInput>

          <div>
            <UButton
              @click="updateUserProfile()"
              color="yellow"
              class="text-white text-center rounded-md"
            >
              UPDATE PROFILE
            </UButton>
          </div>
        </SharedContainer>
      </div>
      <div class="w-full">
        <SharedContainer class="w-full grid gap-4 rounded-md py-3">
          <div class="text-center font-semibold">UPDATE PASSWORD</div>
          <SharedTextInput
            v-model="userProfile.old_password"
            placeholder="Old Password"
            type="password"
            label="Old Password"
            :errors="passwordErrors.old_password"
          ></SharedTextInput>
          <SharedTextInput
            v-model="userProfile.password"
            type="password"
            placeholder="Password"
            label="Password"
            :errors="passwordErrors.password"
          ></SharedTextInput>
          <SharedTextInput
            v-model="userProfile.password_confirmation"
            placeholder="Password Confirmation"
            type="password"
            label="Password Confirmation"
            :errors="passwordErrors.password_confirmation"
          ></SharedTextInput>

          <div>
            <UButton
              @click="updatePassword()"
              color="yellow"
              class="text-white text-center rounded-md"
            >
              Change Password
            </UButton>
          </div>
        </SharedContainer>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
const userProfile = ref({});
const userProfileFormErrors = ref({});
const setUserProfile = () => {
  axios.get("/user").then((response) => {
    userProfile.value = response.data;
  });
};

const passwordErrors = ref({});

const passwordsForm = ref({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const updateUserProfile = () => {
  axios
    .post("/update-profile", userProfile.value)
    .then((response) => {
      authenticateUser();
      userProfileFormErrors.value = {};
      toast.add({
        title: "Profile updated successfully.",
        timeout: 3000,
        id: "1",
      });
    })
    .catch((err) => {
      if (err.response.status == 422) {
        userProfileFormErrors.value = err.response.data.errors;
      }
    });
};

const updatePassword = () => {
  axios
    .post("/auth/change-password", userProfile.value)
    .then((response) => {
      toast.add({
        title: "Password changed successfully.",
        timeout: 3000,
        id: "1",
      });
    })
    .catch((err) => {
      if (err.response.status == 422) {
        passwordErrors.value = err.response.data;
      }
    });
};

onMounted(() => {
  setUserProfile();
});

definePageMeta({
  layout: "account",
});
</script>
