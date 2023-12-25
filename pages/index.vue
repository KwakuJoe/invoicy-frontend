<template>
    <UContainer>
        <section class="banner w-full">
        <!-- star with text -->
        <div class="flex flex-row w-full justify-center ">
            <div class="flex flex-row gap-x-2 items-center  w-fit bg-gray-50 dark:bg-gray-900 px-3 py-1 rounded-full">
                <Icon name="mdi:star-four-points-outline"  />
                <p class="font-medium">Introducing more flexibility</p>
             </div>
        </div>

        <!-- header & sub text & btn -->
        <div class="flex flex-col justify-center items-center w-full gap-y-4 mt-5">
            <h1 class="lg:text-6xl text-4xl font-bold text-gray-800 dark:text-white text-center">Invoicing For High Performance</h1>
            <p class="text-center lg:w-3/5 text-gray-600 dark:text-gray-400"> A new, streamline approach to invoicing is transform how high performance teams manage their financial transactions, enhancing both effeciency and accuracy</p>
            <div class="flex flex-row gap-x-2">
                <UButton color="primary" to="/auth/register">Start for free</UButton>
                <UButton color="primary" variant="ghost">Talk to sales</UButton>

            </div>
        </div>

        <!-- image -->
        <NuxtImg loading="lazy" class=" mt-10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 max-h-screen w-full"  src="../public/assets/temp-banner-img.png" />

        <!-- logos -->
        <div class="flex">
        
        </div>
        </section>
    </UContainer>

</template>
<script setup lang="ts">

    // auth middleware
    definePageMeta({
        middleware:["auth"]
    });

    
</script>
<style>

</style>