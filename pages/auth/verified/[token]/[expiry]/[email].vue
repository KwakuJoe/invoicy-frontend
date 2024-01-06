<template>
    <div class="flex  justify-center h-screen mt-5">
        <div class="bg-white rounded-lg ">
            <div class="mb-4 flex flex-col items-center">
                <Icon name="material-symbols:shield-person" class="text-green-600 text-center text-8xl" />
                <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Email Verified</h2>
                <p class="mt-2 text-center text-sm text-gray-600">Your email has been successfully verified!</p>
            </div>
            <div class="mt-6 flex justify-center w-full space-x-3">
                <UButton to="/dashboard" label="Go to dashboard" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
  const authStore = useAuthStore();

// onMounted(() => {
//     authStore.verifyEmail(
//         'eyJpdiI6ImVCWVpMUEdOY0lCRmJUVENpem1jU3c9PSIsInZhbHVlIjoiL0E5VW9ERDhKWktyQ2UvVm5wM01Odz09IiwibWFjIjoiNjMzNWE4YzZjMTBiYmI1MzE5NzQ0NmFkMzA4YTJmYzM0Y2RlNjk5MjNmY2RlMDMyNzRkNjJkZDIyMDVjY2E5OSIsInRhZyI6IiJ9',
//         '1704391315',
//         'kwakuampah2@gmail.com'
//     )
// })

definePageMeta({
  middleware:["email-link-verification"]
})
</script>
<style lang="">
    
</style>