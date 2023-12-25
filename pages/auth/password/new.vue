<template>
    <UContainer>        



        <div class="flex  flex-row justify-center  w-full gap-x-3  mt-10">
            <div class="lg:w-3/5 flex flex-row justify-center">
                <!-- Register forms -->
                <UForm :schema="schema" :state="state" class="space-y-4 lg:w-3/5" @submit="onSubmit">   
                    
                    <!-- text -->
                    
                    <!-- <Notification color="red" message ="this is a message" title ="error" icon ="i-heroicons-check-circle
" /> -->
                    <div>
                        <h4 class="text-2xl font-medium">Reset your password</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Enter your email to recieve recovery link?</p>
                    </div>

                    <UFormGroup label="Email" name="email">
                        <UInput size="md" class="w-full" v-model="state.email" type="email" />
                    </UFormGroup>


                    <UButton block :loading="authStore.is_forgetPasword_loading" class="h-10" type="submit">Reset password</UButton>
                </UForm>

            </div>
            <div class=" hidden lg:flex flex-col justify-between items-center gap-y-3">
                <div class="h-full border-l border-gray-200"></div>
                <Icon class="text-blue-600" size="100" name="uil:invoice"  />
                
                <div class="h-full border-l border-gray-200"></div>
            </div>
        </div>

        <!-- enable notification -->
        <UNotifications />
        
    </UContainer>
</template>
<script setup lang="ts">
 
import { object, string, type InferType } from 'yup'
import * as yup from 'yup';
import type { FormSubmitEvent } from '#ui/types'
import {useAuthStore} from '~/stores/useAuthStore'

const authStore = useAuthStore();

const schema = yup.object().shape({
 email: yup.string().email('Invalid email address').required('Email is required'),
});

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
});

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data.email)

  authStore.forgetPasword(event.data.email.toString())

}


</script>
<style >
    
</style>