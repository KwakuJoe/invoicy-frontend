<template>
    <UPopover>
      <!-- <UButton color="white" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" /> -->
      <UAvatar :alt="user?.organisation!" size="sm" />
    
      <template #panel>
        <!-- Content -->

        <UVerticalNavigation :links="links" />
          <!-- <hr /> -->
        <!-- <UButton class=" border-0" @click="logout"  icon="i-heroicons-arrow-left-on-rectangle" variant="link" color="white" label="logout"/> -->
      </template>
  </UPopover>
</template>
<script setup lang="ts">
  import {useAuthStore} from '~/stores/useAuthStore'
  import { type User} from '~/types/types'


    const user = ref<User | null>(null)
    const userCookie = useCookie<User | null>('userCookie')
    const tokenCookie = useCookie<string | null>('tokenCookie')
    user.value = userCookie.value

    async function logout(){
      userCookie.value = null,
      tokenCookie.value = null,
      await navigateTo('/auth/login');

      const toast = useToast()
        toast.add({
        id: 'logout_success',
        title: 'Logout successfully',
        description: `You have successfully sign out, see you soon`,
        color:"green"
        });
    }


    


  // links
  const links = [
    {
      label: `${user.value?.organisation}`,
      avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
      },
      to:'/account/profile'
    },
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      onclick:logout
    },
]



</script>
<style lang="">
  
</style>