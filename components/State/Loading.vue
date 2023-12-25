
<template>
    <!-- loading state -->
    <div  class="flex flex-col items-center w-full gap-y-2"> 
        <UButton :loading="props.pending" variant="ghost" label="Loading"/>
    </div>

</template>
<script setup lang="ts">
 //  props  & Emit
 const props = defineProps<{
    pending: boolean,
  }>()

</script>
<style>
    
</style>