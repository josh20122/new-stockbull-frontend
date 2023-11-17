<template>
  <div class="bg-slate-950 text-xs h-screen w-screen">
    <HomeStakeSynthetics></HomeStakeSynthetics>
    <!-- <TextInput
      v-model="testdata"
      label="test"
      :errors="['helo', 'there']"
      ></TextInput> -->
  </div>
</template>
<script setup>
import { ref } from "vue";

const testdata = ref("");
watch(testdata, (newval, oldval) => {
  console.log(newval);
});
</script>
