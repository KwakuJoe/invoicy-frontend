<template>
  <div  class="flex flex-col items-center w-full gap-y-2">
    <Icon
      name="mdi:server-network-off"
      class="text-gray-500 text-center text-4xl"
    />
    <p class="text-xl text-center">Something went wrong !</p>
    <p class="text-gray-500 text-center">{{ props.error }}</p>
    <UButton label="refresh" @click="emit('refresh')" />
  </div>
</template>
<script setup lang="ts">

 //  props  & Emit
 const props = defineProps<{
    error: any,
  }>()

const emit = defineEmits(['refresh'])
</script>
<style lang=""></style>
