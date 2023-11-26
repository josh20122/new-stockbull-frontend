<template>
  <div
    class="fixed z-50 top-8 flex px-2 justify-center"
    @click="handleClickOutside"
    id="modal"
  >
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform  -translate-y-[100%] "
      enter-to-class="opacity-100 translate-y-[0%]"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-[0%]"
      leave-to-class="transform   -translate-y-[100%] "
    >
      <SharedContainer class="w-fit h-fit rounded-md" v-show="props.showModal"
        ><slot></slot
      ></SharedContainer>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps(["showModal"]);
const emits = defineEmits("close");

onMounted(() => {
  window.addEventListener("click", function (e) {
    if (document.getElementById("modal").contains(e.target)) {
    } else {
      if (showModal == true) {
        emits("close");
      }
      // Clicked outside the box
    }
  });
});
</script>
