<template>

    <div class="flex flex-col">
        <!-- Links -->
        <UVerticalNavigation :links="links" />
  </div>
</template>
<script setup lang="ts">
import {useAuthStore} from '~/stores/useAuthStore'
import { type User} from '~/types/types'

const authStore = useAuthStore();

const links = [
{
  label: 'Profile',
  icon: 'i-heroicons-user',
  to: '/account/profile'
}, {
  label: 'Password',
  icon: 'i-heroicons-shield-check',
  to: '/account/password'
}, 
]

  const user = ref<User | null>(null)

      const userCookie = useCookie<User | null>('userCookie');
      user.value = userCookie.value
  
</script>
<style>
    
</style>