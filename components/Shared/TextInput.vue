<template>
  <div class="inline-flex flex-col">
    <label class="first-letter:capitalize text-[11px] text-gray-300" :for="id">
      {{ label }}
    </label>
    <UInput
      :id="id"
      :value="modelValue"
      :type="type ?? 'text'"
      @input="($event) => emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :readonly="readonly"
    />
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
