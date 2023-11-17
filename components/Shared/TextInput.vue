<template>
  <div class="inline-flex flex-col gap-y-1">
    <label class="first-letter:capitalize text-[11px] text-gray-300" :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      type="text"
      class="input-sm border text-[10px] border-gray-600 bg-transparent placeholder:text-[12px] text-white shadow-inner shadow-gray-900 rounded-sm focus:outline-none focus:border-indigo-500"
      @input="($event) => emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :readonly="readonly"
    />
    <div v-if="errors" class="text-xs text-red-600">
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
  "errors",
  "readonly",
  "hint",
]);
const emit = defineEmits(["update:modelValue"]);
</script>
