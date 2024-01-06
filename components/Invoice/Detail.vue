<template>
    <div class="flex flex-col h-screen overflow-scroll">

      <!-- header -->
      <div class="flex justify-between items-center px-4 py-2">
         <div class="flex flex-col">
            <p class="text-sm font-bold">{{ props.invoice?.client_name }}</p>
            <p class="text-xs text-white bg-red-300 px-2 py-1 rounded-md">{{ props.invoice?.status }}</p>
         </div>
         <!-- dropdown -->
         <Icon name="ic:outline-more-horiz"/>
      </div>

      <hr>

      <!-- products & cal -->
      <div class="flex flex-col px-4 py-2 gap-y-4 my-3">

       <p class="text-sm font-medium text-gray-800">Products</p>
         
         <!-- list of product -->
         <div v-for="invoiceItem in props.invoice?.invoice_items" :key="invoiceItem.id" class="flex items-center space-x-4">
               <!-- name -->
                <div class="bg-black h-10 w-10 rounded-md flex flex-row items-center justify-center">
                    <Icon name="system-uicons:cube" color="white" />
                </div>
                <!-- price & qty -->
                <div class="flex-1 flex flex-col ">
                    <h1 class="text-base font-medium ">{{ invoiceItem.product.name }}</h1>
                    <div class="flex flex-row gap-x-2">
                        <!-- Quantity -->
                        <div class="flex flex-row items-center gap-x-1  rounded-full">
                            <p class="text-sm">Quantity :</p>
                            <p class="text-sm font-semibold">{{ invoiceItem.quantity }}</p>
                        </div>
                        <!-- Proice -->
                        <div class="flex flex-row items-center gap-x-1  rounded-full">
                            <p class="text-sm">Price :</p>
                            <p class="text-sm font-semibold">${{ invoiceItem.price }}</p>
                        </div>
                    </div>
                </div>
                <!-- total -->
                <p class="text-sm font-semibold">${{ invoiceItem.total }}</p>
         </div>

         <!-- calcuation -->
         <hr>

         <div class="flex flex-col gap-y-1">
            <!-- sub total -->
            <flex class="flex flex-row justify-between">
               <p class="text-sm">Subtotal</p>
               <p class="text-sm ">${{ invoice?.subt_total }}</p>
            </flex>

            <!-- delivery -->
            <flex class="flex flex-row justify-between">
               <p class="text-sm">Delivery</p>
               <p class="text-sm ">${{ invoice?.delivery_amount }}</p>
            </flex>
            <!-- delivery -->
            <flex class="flex flex-row justify-between">
               <p class="text-sm">Total amount</p>
               <p class="text-sm font-semibold">{{ invoice?.total_amount }}</p>
            </flex>
         </div>

         <hr>

         <p class="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, voluptatem. Praesentium numquam vel aperiam accusantium in accusamus eos, tempore dolores qui asperiores aspernatur? Atque, expedita.</p>

      </div>

      <hr>

      <div class="flex flex-col px-4 py-2 gap-y-4 my-3">
       <p class="text-sm font-medium text-gray-800">Clients Info</p>
       <div v-for="invoiceItem in props.invoice?.invoice_items" :key="invoiceItem.id" class="flex items-center space-x-4">
               <!-- name -->
                <div class="bg-black h-8 w-8 rounded-full flex flex-row items-center justify-center">
                    <p class="text-xs text-white">{{ invoice?.client_name[0] }}</p>
                </div>
                <!-- price & qty -->
                <div class="flex-1 flex flex-col ">
                    <h1 class="text-sm font-medium ">{{ invoice?.client_name }}</h1>
                    <p class="text-xs">{{ invoice?.client_email }}</p>
                </div>
                <!-- total -->
                <Icon name="ic:outline-more-horiz"/>
         </div>
      </div>
    </div> 
</template>
<script setup lang="ts">
import {type Invoices, type Invoice } from '~/types/types'

 //  props  & Emit
 const props = defineProps<{
    invoice: Invoice | null,
  }>()



</script>
<style>
    
</style>