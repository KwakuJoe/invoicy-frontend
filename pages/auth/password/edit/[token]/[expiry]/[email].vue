<template>
    <UContainer>        
        <div class="flex flex-row justify-center w-full gap-x-3 mt-10">
            <div class="lg:w-3/5 w-full flex flex-row justify-center">
                <!-- Register forms -->
                <UForm :schema="schema" :state="state" class="space-y-4 lg:w-3/5 w-full" @submit="onSubmit">
                    <!-- text -->
                    <div>
                        <h4 class="text-2xl font-medium">Update Password</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Set up your new password</p>
                    </div>

                    <!-- <p>{{ authStore.token.token }}  dhdh</p> -->

                        <!-- <UFormGroup label="Email" name="email">
                            <UInput size="md" class="w-full" v-model="state.email" type="email" />
                        </UFormGroup> -->

                    <UFormGroup label="Password" name="password">
                        <UInput size="md" class="w-full" autocomplete="on" v-model="state.password" type="password" />
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput size="md" class="w-full" autocomplete="on" v-model="state.password_confirmation" type="password" />
                    </UFormGroup>


                    <UButton :loading="is_updatePasword_loading" block class="h-10" type="submit">Login</UButton>
                </UForm>

            </div>
            <div class="hidden lg:flex  flex-col justify-between items-center gap-y-3">
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
import {useAuthStore} from '~/stores/useAuthStore'
import type { FormSubmitEvent } from '#ui/types'
// instance of authStore
const authStore = useAuthStore(); 
const { is_updatePasword_loading } = storeToRefs(useAuthStore());


// form config
const schema = yup.object().shape({
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});

type Schema = InferType<typeof schema>

const state = reactive({
    password: undefined,
    password_confirmation:undefined,
});

const route = useRoute();




async function onSubmit (event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    console.log(event.data)

    await authStore.updatedPassword(event.data.password.toString(), route.params.email.toString())

    console.log('password updated')
}

// dfines custom layout
definePageMeta({
 middleware:["password-link-verification"]
})
</script>
<style>
    
</style>