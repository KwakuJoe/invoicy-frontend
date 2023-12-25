<script setup lang="ts">
import {useAuthStore} from '~/stores/useAuthStore'
import { type User} from '~/types/types'

const authStore = useAuthStore();

const links = [
{
  label: 'Installation',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: 'Vertical Navigation',
  icon: 'i-heroicons-chart-bar',
  to: '/'
}, {
  label: 'Command Palette',
  icon: 'i-heroicons-command-line',
  to: '/'
}]

  const user = ref<User | null>(null)

      const userCookie = useCookie<User | null>('userCookie');
      user.value = userCookie.value
  
</script>

<template>

    <div class="flex flex-col bg-gray-50 dark:bg-gray-900">
        <!-- profile -->
        <div class="flex items-center space-x-4 p-4">
          <img class="w-10 h-10 object-cover rounded-sm " src="https://via.placeholder.com/150" alt="Profile Image">
          <div>
              <h1 class="text-base font-bold">{{ user?.organisation }}</h1>
              <p class="text-gray-500 text-sm">{{ user?.email }}</p>
          </div>
        </div>

      <!-- Links -->
    <UVerticalNavigation :links="links" />
  </div>
</template>


