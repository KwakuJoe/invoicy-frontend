<template>
    <!-- <UContainer> -->

        <!-- Navbar -->
        <Navbar/>

        <div class="flex h-screen">
        <!-- Navigation sidebar on the left -->
        <DashboardNav />


        <!-- Main content on the right -->
        <div class="flex-1 p-4">
            <slot/>
            
        </div>
    </div>
    <!-- </UContainer> -->

</template>
<script setup lang="ts">

</script>
<style>
    
</style>