<template>
  <div
    class="fixed z-50 w-full top-8 flex px-2 justify-center"
    id="modal"
    @click="handleClickOutside"
  >
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform  -translate-y-[100%] "
      enter-to-class="opacity-100 translate-y-[0%]"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-[0%]"
      leave-to-class="transform   -translate-y-[100%] "
    >
      <SharedContainer class="w-fit rounded-md" v-show="showModal"
        ><slot></slot
      ></SharedContainer>
    </Transition>
  </div>
</template>

<script setup>
defineProps(["showModal"]);
const emits = defineEmits("close");

const handleClickOutside = (event) => {
  const container = document.querySelector("#modal"); // adjust the selector based on your container class

  // Check if the clicked element is outside the container
  if (container && !container.contains(event.target)) {
    // Run your function here
    console.log("Clicked outside the container. Run your function.");
    emits("close");
  }
};
</script>
