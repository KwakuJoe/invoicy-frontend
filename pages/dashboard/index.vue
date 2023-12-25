<template>
    <!-- title text & tabs -->
    <div class="flex flex-row justify-between items-center w-full">
        <div class="flex flex-col ">
            <h4 class="text-2xl font-medium">Invoices</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage all your invoices on this screen </p>
        </div>

        <!-- tabs -->
        <UTabs :items="items" :default-index="2"   />
    </div>

    <!-- Search , Sort etc -->
    <div class="flex items-center w-full my-4 justify-between">
        <!--  -->
        <div class="flex flex-row gap-x-2">
            <USelectMenu  v-model="selected" :options="people" />
            <UInput
                icon="i-heroicons-magnifying-glass-20-solid"
                size="sm"
                color="white"
                :trailing="false"
                placeholder="Search..."
                model-value=""
                />
        </div>

        <!--  add invoice button-->
        <UButton icon="i-heroicons-plus"  label="Create invoice"/>

    </div>

    <!-- table-->
    <InvoiceTable :data="data" :error="error" :pending="pending" @refresh="refresh"/>

</template>
<script setup lang="ts">
    import {useAuthStore} from '~/stores/useAuthStore'
    import type { Invoices, User} from '~/types/types';
    
    // filter
    const people = ['name', 'cost',]
    const selected = ref(people[0])

    // tabs
    const items = [
        {label: 'Paid'}, 
        {label: 'Draft'}, 
        {label: 'Cancelled'}
    ]

    // instance
    const authStore = useAuthStore();

    // base ur from env in runtime config
    const runTimeConfig = useRuntimeConfig()
    const baseUrl:String =  runTimeConfig.public.baseUrl

    const tokenCookie = useCookie<string | null>('tokenCookie')
    const userCookie = useCookie<User | null>('userCookie')

    // get invoices by user
    const {pending, error, data, refresh} = await useFetch<Invoices>(`${baseUrl}/api/invoices?filter[user_id]=${userCookie.value?.id}`, {
        cache:'default',
        keepalive:true,
        method:"GET",
        headers:{
            "Accept": "application/json",
            'Authorization': `Bearer ${tokenCookie.value}`
        }
                // watch:[isPostChanged],
    });


// dfines custom layout
definePageMeta({
 layout: 'dashboard',
 middleware:["auth"]
})
</script>
<style>

</style>