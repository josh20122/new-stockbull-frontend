<template>
  <div>
    <UModal v-model="modalIsOpen" class="flex w-fit">
      <slot></slot>
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
    if (newval == true) {
      modalIsOpen.value = true;
    }
  }
);

watch(modalIsOpen, (newval) => {
  if (newval == false) {
    emit("close");
  }
});
</script>
