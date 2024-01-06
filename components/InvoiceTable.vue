<template>
    <div class="w-full">
 

        <!-- loading state -->
        <StateLoading v-if="pending" :pending="pending" />

        <!-- error state -->
        <StateError v-else-if="error" :error="error" @refresh="emit('refresh')" />

        <!-- empty state -->
        <StateEmpty v-else-if="props.data?.data.data.length === 0" :title="'No incoice created yet'" :description="'Click on the Create invoice button above'" />

        <!-- table row -->
 
        <!-- table -->

        <div v-else  class="relative overflow-x-auto  sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <!-- header -->
                <div class="flex flex-row justify-between items-center bg-gray-50 px-8 py-1">
                    <p class="text-sm font-medium text-gray-500 ">INVOICE</p>
                    <p class="text-sm font-medium text-gray-500">ACTIONS</p>
                </div>
                <tbody>
                    <tr v-for="invoice in props.data?.data.data" :key="invoice.id"
                        class="bg-white border-b flex justify-between items-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <!-- client&more -->
                        <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div class="bg-black h-10 w-10 rounded-sm flex flex-row items-center justify-center">
                                <p class="text-white font-semibold text-lg">{{ invoice.client_name[0] }}</p>
                            </div>
                            <div class="ps-3">
                                <div class="text-base font-semibold">{{ invoice.client_name }}</div>
                                <div class="flex gap-x-2">
                                    <p class="font-semibold text-green-700">{{ invoice.status }}</p>
                                    <p>|</p>
                                    <p class=" font-normal text-sm">{{ useTimeAgo(invoice.created_at).value }}</p>
                                </div>
                            </div>
                        </td>
                        <!-- total $ deliver -->
                        <td class="px-6 py-4">
                            <div class="flex flex-col">
                                <p class="font-semibold text-black">${{ invoice.total_amount }}</p>
                                <p class=" text-sm text-black">Delivery ${{ invoice.delivery_amount }}</p>

                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <!-- actions -->
                            <div class="flex flex-row flex-1  justify-end">
                                <UButton label="Edit" size="xs" variant="ghost" color="gray">
                                    <template #leading>
                                        <UIcon name="i-heroicons-pencil" />
                                    </template>
                                </UButton>

                                <UButton label="Delete" size="xs" variant="ghost" color="gray">
                                    <template #leading>
                                        <UIcon name="i-heroicons-trash" />
                                    </template>
                                </UButton>

                                <UButton label="View" @click="isSliderOpen = true" size="xs" variant="ghost" color="gray">
                                    <template #leading>
                                        <UIcon name="i-heroicons-eye" />
                                    </template>
                                </UButton>

                                <USlideover v-model="isSliderOpen">
                                    <InvoiceDetail :invoice="invoice" />
                                </USlideover>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>
</template>
<script setup lang="ts">
import { type Invoices } from '~/types/types'
import { useTimeAgo } from '@vueuse/core'

//  props  & Emit
const props = defineProps<{
    data: Invoices | null,
    error: any,
    pending: boolean
}>()

const emit = defineEmits(['refresh'])

const isSliderOpen = ref(false)


</script>
<style lang="">
    
</style>