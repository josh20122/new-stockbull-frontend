<template>
  <div
    class="bg-[#121318] rounded-xs w-fit"
    :class="props.padding ? 'p-2' : 'p-0'"
  >
    <slot> </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  padding: {
    default: true,
  },
});
</script>
