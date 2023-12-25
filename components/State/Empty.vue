
<template>
    <!-- Empty state -->
    <div class="flex flex-col items-center w-full gap-y-2 mt-10"> 
            <Icon name="basil:invoice-outline" class="text-gray-500 text-center text-7xl" />
            <div  class="flex flex-col items-center gap-y-2">
                <p class="text-3xl font-bold text-center">{{ props.title }}</p>
                <p class="text-gray-500 text-center">{{ props.description }}</p>
            </div>
        </div>

</template>
<script setup lang="ts">
 //  props  & Emit
 const props = defineProps<{
    title: string,
    description: string,
  }>()

</script>
<style>
    
</style>