<template>
    <nav style="border-bottom-width: 5px;"
      class="flex border-b-2 border-b-gray-50 dark:border-b-gray-900 flex-wrap items-center justify-between mx-auto py-2 px-10 sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30"
    >
        <!-- logo -->
      <div class="flex flex-row gap-x-1 items-center">
        <!-- logo -->
        <nuxt-link to="/dashboard">
          <Icon name="basil:invoice-outline" class="text-blue-500 text-center text-4xl" />
        </nuxt-link>
        <p class="font-medium ">Nuxt/Larave Auth</p>
      </div>

      <!-- toggle buttom -->
      <button
      @click="isOpen = true"
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-1 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <!-- links -->
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <div class="flex gap-x-4">
          <!-- is - {{ isAuthenticated }} -->
          
          <div v-if="!isAuthenticated" class="flex gap-x-3">
          <!-- navlinks slots --> 
            <slot></slot>
            <UButton to="/auth/register" label="Start for free" />
            <UButton to="/auth/login" label="Sign in" variant="ghost" />
          </div>

          <!-- avatar drop -->
          <div v-else>
            <AvatarDropDown/>
          </div>
          <!-- user -{{ userCookie?.organisation }}
          token - {{ testtoken }} -->
          <!-- togleg -->
          <!-- <ThemeToggleButton /> -->
        </div>
      </div>
    </nav>


    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <!-- Content -->
        <div class="flex flex-row justify-between">
          <div class="flex flex-col gapy-0 items-center">
            <!-- logo -->
            <h5 class="font-bold text-3xl">XI</h5>
            <p class="text-xs">architects</p>
          </div>
          <UButton label="close" @click="isOpen = false" variant="link" color="white" icon="i-heroicons-x-mark" />
        </div>
      </template>

      <!-- Content -->
      <div class="flex flex-col">
  `      <!-- <UButton color="black" label="Project" @click="scrollToProject()" variant="link" />
        <UButton color="black" label="Workflow" @click="scrollToWorkflow()" variant="link" />
        <UButton color="black" label="Service" @click="scrollToServices()" variant="link" />
        <UButton color="black" label="Team" @click="scrollToTeam()" variant="link" />
        <UButton color="black" label="Blog" @click="scrollToBlog()" variant="link" />` -->

        <button type="button" class="px-4 mx-2 my-3 py-2 bg-black dark:bg-white text-white dark:text-black bg-dark">Contact us</button>

        <!-- togleg -->
        <!-- <ThemeToggleButton /> -->

      </div>

      <template #footer>
        <!-- Content -->
      </template>
    </UCard>
  </USlideover>

</template>
<script setup lang="ts">
  import {useAuthStore} from '~/stores/useAuthStore'
  import type { User } from '~/types/types';

  const authStore = useAuthStore();
    // pop over var
    const isOpen = ref(false)
    const testtoken = ref<string | null>(null)

    const tokenCookie = useCookie<string | null>('tokenCookie')
    const userCookie = useCookie<User | null>('userCookie')
    testtoken.value = tokenCookie.value

    const isAuthenticated =  computed(() => !!userCookie.value)



</script>
<style lang="">

</style>






