<template>
    <div class="w-full">
        <!-- header -->
        <div class="flex flex-row justify-between items-center bg-gray-50 px-2 py-1 rounded-sm my-2">
            <p class="text-sm font-medium text-gray-500 ">INVOICE</p>
            <p class="text-sm font-medium text-gray-500">ACTIONS</p>
        </div>

        <!-- loading state -->
        <StateLoading v-if="pending" :pending="pending" />

        <!-- error state -->
        <StateError v-else-if="error" :error="error" @refresh="emit('refresh')" />

        <!-- empty state -->
        <StateEmpty v-else-if="props.data?.data.data.length === 0" :title="'No incoice created yet'" :description="'dkk'"/>

        <!-- table row -->
        <div v-else class="flex flex-row items-center" v-for="invoice in props.data?.data.data" :key="invoice.id" >
            <!-- profile -->
            <div class="flex items-center space-x-4 p-4">
                <div class="bg-black h-10 w-10 rounded-sm flex flex-row items-center justify-center">
                    <p class="text-white font-semibold text-lg">{{ invoice.client_name[0] }}</p>
                </div>
                <div class="flex flex-col justify-between gap-y-1">
                    <h1 class="text-sm font-bold ">{{ invoice.client_name }}</h1>
                    <div class="flex flex-row gap-x-2">
                        <!-- paid status -->
                        <div class="flex flex-row items-center gap-x-1 bg-green-100 px-1.5 py-0.5 rounded-full">
                            <div class="h-1 w-1 rounded-full bg-green-500"></div>
                            <p style="font-size: 10px;" class="text-green-500 font-semibold">PAID</p>
                        </div>

                        <!-- date -->
                        <div class="flex flex-row items-center gap-x-1 px-1.5 py-0.5 rounded-full">
                            <Icon name="material-symbols:calendar-clock"  />
                            <p style="font-size: 10px;" class="text-gray-600  font-semibold">{{ useTimeAgo(invoice.created_at).value }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- total amount & delivery -->
            <div class="flex flex-row flex-1  justify-center">
                <div class="flex flex-col">
                    <p class="text-gray-600  text-sm font-medium">$ {{ invoice.total_amount }}</p>
                    <p class="text-gray-600  text-xs">Delivery ${{ invoice.delivery_amount }}</p>
                </div>
            </div>

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

                <UButton label="View"  @click="isSliderOpen = true" size="xs" variant="ghost" color="gray">
                    <template #leading>
                        <UIcon name="i-heroicons-eye" />
                    </template>
                </UButton>

                <USlideover v-model="isSliderOpen">
                    <InvoiceDetail :invoice="invoice" />
                    
                </USlideover>

            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import {type Invoices} from '~/types/types'
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