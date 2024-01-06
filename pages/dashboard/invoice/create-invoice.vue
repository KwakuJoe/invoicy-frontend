<template>
    <div class="flex flex-col w-full">
        <!-- header -->
        <div class="flex flex-col ">
            <h4 class="text-2xl font-medium">New Invoice</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Create new invoice for clients</p>
        </div>

        <!-- forms -->
        <UForm :schema="schema" :state="state" @submit="onSubmit">

            <div class="flex flex-row w-full gap-x-3 mt-5">


                <!-- select client $ delievry amount -->
                <div class="basis-1/3 ">
                    <h4 class="text-base font-medium">Select Client </h4>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Can't find client, create new client</p>

                    <!-- select client field -->
                    <USelectMenu class="mt-4 h-11" searchable searchable-placeholder="Search a client..." size="md"
                        v-model="selectedClient" :options="clients">
                        <template #leading>
                            <!-- <UAvatar :alt="Benjamin Canac" size="sm" /> -->
                            <UAvatar :alt="selectedClient.label" size="2xs" class="mr-1" />
                        </template>
                    </USelectMenu>
                    <!-- selected amoun -->
                    <div class="flex items-center space-x-4 p-4 bg-slate-50 mt-2">
                        <div class="bg-black h-10 w-10 rounded-full flex flex-row items-center justify-center">
                            <p class="text-white font-semibold text-lg">J</p>
                        </div>
                        <div class="flex flex-col justify-between">
                            <h1 class="text-sm font-semibold ">{{ selectedClient.label }} </h1>
                            <p class="text-xs">{{ selectedClient.email }}</p>
                        </div>
                    </div>

                    <h4 class="text-base font-medium mt-4">Delivery amout </h4>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Leave it 0.00, if amount is not required</p>

                    <!-- deievery amount -->
                    <UFormGroup label="Enter Delivery amount" class="mt-6" name="phone">
                        <UInput size="md" class="w-full" v-model="state.delivery_amount" type="number" />
                    </UFormGroup>


                    <h4 class="text-base font-medium mt-5">Additional Information </h4>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">You can add Additional information to the
                        invoice. Field is optional</p>

                    <!-- Additional Info -->
                    <UFormGroup label="Enter Additional info" class="mt-6" name="additional_information">
                        <UTextarea color="white" variant="outline" v-model="state.additional_information"
                            placeholder="Enter any relevant information" />
                    </UFormGroup>

                </div>

                <!-- select items -->
                <div class="basis-1/3 ">
                    <h4 class="text-base font-medium">Select Items / Products </h4>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Select one or more item to create invoice</p>

                    <!-- select client field -->
                    <USelectMenu class="mt-4 h-11" @change="addProduct" placeholder="Select products" multiple searchable
                        searchable-placeholder="Search a product..." size="md" v-model="selectedProducts"
                        :options="products">
                    </USelectMenu>
                    <!-- selected products -->
                    <div v-for="product in selectedProducts" :key="product.id"
                        class="flex items-center  space-x-4 p-4 bg-slate-50 mt-2">

                        <div class="bg-black h-10 w-10 rounded-md flex flex-row items-center justify-center">
                            <Icon name="system-uicons:cube" color="white" />
                        </div>
                        <div class="flex flex-col justify-between flex-1">
                            <h1 class="text-sm font-semibold ">{{ product.label }} </h1>
                            <p class="text-xs">{{ product.price }}</p>
                        </div>
                        <!-- amount -->
                        <UInput size="md" class="w-16" v-model="product.quantity" @input="updateQuantity(product)"
                            type="number" />

                    </div>

                </div>
                <div class="basis-1/3">
                    <h4 class="text-base font-medium">Invoice Overview</h4>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Overview of your draft invoice</p>


                    <div class="flex flex-col gap-y-1 my-3">
                        <hr class="mt-1">

                        <!-- list of items -->
                        <div v-for="product in selectedProducts" :key="product.id" :total.sync="product.total"
                            class="flex justify-between items-center mt-1">
                            <p class="basis-2/3 text-sm font-medium">{{ product.label }}</p>
                            <div class="basis-1/3  flex gap-x-2  justify-end">
                                <p class="text-xs">{{ product.quantity }} *</p>
                                <p class="text-xs">${{ product.price }} | </p>
                                <p class="text-xs font-medium text-blue-500">${{ product.total }}</p>
                            </div>
                        </div>

                        <hr class="mt-4">

                        <!-- sub total -->
                        <flex class="flex flex-row justify-between">
                            <p class="text-xs text-gray-600">Subtotal</p>
                            <p class="text-xs font-medium">$1200.00</p>
                        </flex>

                        <!-- delivery -->
                        <flex class="flex flex-row justify-between">
                            <p class="text-xs text-gray-600">Delivery</p>
                            <p class="text-xs font-medium">${{ state.delivery_amount }}.00</p>
                        </flex>
                        <!-- delivery -->
                        <flex class="flex flex-row justify-between">
                            <p class="text-xs text-gray-600">Total amount</p>
                            <UButton @click="calculateTotalAmount()" label="reveal" />
                            <p class="text-xs font-medium">${{ totalAmount }}</p>
                        </flex>
                    </div>

                    <hr>

                </div>
            </div>

        </UForm>



    </div>
</template>


<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import * as yup from 'yup';
import type { FormSubmitEvent } from '#ui/types'
import type { SelectedProduct } from '~/types/types';
// form config
const schema = yup.object().shape({
    delivery_amount: yup.number().required('Delivery amount is required is required'),
    additional_information: yup.string().required('Additional Information is required is required'),
});

type Schema = InferType<typeof schema>

const state = reactive({
    delivery_amount: 0,
    additional_information: undefined
});


// on sumbit
async function onSubmit(event: FormSubmitEvent<Schema>) {

}

// clients
const clients = [
    {
        id: 1,
        label: 'benjamincanac',
        email: 'benjamincanac@gmail.com'
    },
    {
        id: 2,
        label: 'Tesla',
        email: 'tesla@gmail.com'
    }
]
const selectedClient = ref(clients[0])

// products
const products = [
    {
        id: 1,
        label: 'HP Laptop XP 2.0Fs',
        product_id: 1,
        quantity: 1,
        price: 7440,
        total: 0
    },
    {
        id: 1,
        label: 'Wireless Mouse HP-Cordlss v.2',
        product_id: 1,
        quantity: 1,
        price: 7440,
        total: 0
    },
]



const selectedProducts = ref<SelectedProduct[]>([])

const totalAmount = ref(0);

const selectedProductId= ref(null);

const addProduct = (): void => {
      if (selectedProductId.value !== null) {
        const product = products.find(p => p.id === selectedProductId.value);
        if (product && !selectedProducts.value.some(p => p.id.toString() === product.id.toString())) {
            selectedProducts.value.push({ ...product, id:selectedProductId.value, quantity: 1, total: product.price });

          calculateTotalAmount();
        }
      }
    }

    const updateQuantity = (product: SelectedProduct): void => {
      product.total = product.price * product.quantity;
      calculateTotalAmount();
    };


const calculateTotalAmount = () => {
      totalAmount.value = selectedProducts.value.reduce((acc, product) => acc + product.total, 0);
    };

watch(selectedProducts, calculateTotalAmount, { deep: true });


definePageMeta({
    layout: 'dashboard',
    middleware: ["auth"],

})
</script>
<style></style>