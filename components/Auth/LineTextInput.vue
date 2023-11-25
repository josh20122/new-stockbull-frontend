<template>
  <div class="inline-flex flex-col">
    <div class="relative z-0 w-full group">
      <input
        :id="id"
        :value="modelValue"
        :type="type ?? 'text'"
        class="block py-2.5 px-0 caret-blue-600 w-full text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        @input="($event) => emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :readonly="readonly"
      />
      <label
        for="floating_password"
        class="peer-focus:font-medium absolute text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >{{ label }}
      </label>
    </div>
    <div v-if="errors" class="text-[10px] text-red-600">
      <div v-for="(error, index) in errors" v-text="error" :key="index"></div>
    </div>
    <div
      class="text-right text-[11px] text-yellow-600"
      v-else
      v-text="hint"
    ></div>
  </div>
</template>

<script setup>
defineProps([
  "modelValue",
  "label",
  "id",
  "placeholder",
  "type",
  "errors",
  "readonly",
  "hint",
]);
const emit = defineEmits(["update:modelValue"]);
</script>
