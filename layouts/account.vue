<template>
    <!-- Navbar -->
    <Navbar/>

    <UContainer>

        <div class="flex gap-x-10 w-full justify-center  py-5">
            <div class="flex w-5/6 lg:flex-row flex-col">
                <!-- Navigation sidebar on the left -->
                <div class="flex lg:basis-1/5 basis-full">
                    <AccountNav/>
                </div>
                <!-- Main content on the right -->
                <div class="flex-1">
                    <slot/>
                    
                </div>

            </div>

        </div>
    </UContainer>

</template>
<script setup lang="ts">


</script>
<style>
    
</style>