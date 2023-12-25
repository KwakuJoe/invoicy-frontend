<template>
    <UPopover>
      <!-- <UButton color="white" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" /> -->
      <UAvatar :alt="user?.organisation!" size="sm" />
    
      <template #panel>
        <!-- Content -->

        <UVerticalNavigation :links="links" />
          <hr />
        <UButton class=" border-0" @click="logout"  icon="i-heroicons-arrow-left-on-rectangle" variant="link" color="white" label="logout"/>
      </template>
  </UPopover>
</template>
<script setup lang="ts">
  import {useAuthStore} from '~/stores/useAuthStore'
  import { type User} from '~/types/types'

  const authStore = useAuthStore();

    const user = ref<User | null>(null)
    const userCookie = useCookie<User | null>('userCookie')
    const tokenCookie = useCookie<string | null>('tokenCookie')
    user.value = userCookie.value

    function logout(){
      userCookie.value = null,
      tokenCookie.value = null,
      navigateTo('/auth/login');
    }


    


  // links
  const links = [{
  label: `${user.value?.organisation}`,
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/739984?v=4'
  },
  // to:`/profile/${myUsername.value}`
}]



</script>
<style lang="">
  
</style>