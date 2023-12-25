<template>
    <UAlert
        :icon=props.icon
        :description=props.message
        :title=props.title
        :color=props.color
    />
</template>
<script setup lang="ts">
    const props = defineProps<{
    icon:string
    color: "red"|"green",
    title:string
    message?: string
    }>()


function close(){
    return 'djd'
}
</script>
<style>
    
</style>