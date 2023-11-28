<template>
  <div>
    <UModal
      v-model="modalIsOpen"
      class="flex w-fit"
      :overlay="false"
      prevent-close
    >
      <div class="py-4">
        <slot></slot>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import { watch } from "vue";
const props = defineProps(["showModal"]);
const emit = defineEmits("close");
const modalIsOpen = ref(false);

watch(
  () => props.showModal,
  (newval) => {
    modalIsOpen.value = newval;
    console.log(modalIsOpen.value);
  }
);

watch(modalIsOpen, (newval) => {
  if (newval == false) {
    emit("close");
  }
});
</script>
