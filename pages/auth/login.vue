<template>
    <UContainer>        
        <div class="flex flex-row justify-center w-full gap-x-3 mt-10">
            <div class="lg:w-3/5 w-full px-3  flex flex-row justify-center">
                <!-- Register forms -->
                <UForm :schema="schema" :state="state" class="space-y-4 lg:w-3/5 w-full" @submit="onSubmit">
                    <!-- text -->
                    <div>
                        <h4 class="text-2xl font-medium">Sign in into your account</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Don't have an account? <nuxt-link class="text-blue-400" to="/auth/register">Create an account</nuxt-link> </p>
                    </div>

                    <!-- <p>{{ authStore.token.token }}  dhdh</p> -->

                    <UFormGroup label="Email" name="email">
                        <UInput size="md" class="w-full" v-model="state.email" type="email" />
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput size="md" class="w-full" autocomplete="on" v-model="state.password" type="password" />
                    </UFormGroup>

                    <UFormGroup >
                         <nuxt-link class="text-gray-500 mt-10 font-normal" to="/auth/password/new">Forget password ?</nuxt-link>
                    </UFormGroup>


                    <UButton :loading="is_login_loading" block class="h-10" type="submit">Login</UButton>
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
import type { Login, User, LoginCredentials } from '~/types/types';



// instance of authStore
const authStore = useAuthStore(); 
const { is_login_loading } = storeToRefs(useAuthStore());


// form config
const schema = yup.object().shape({
 email: yup.string().email('Invalid email address').required('Email is required'),
 password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
});

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password:undefined,
});


const userCookie = useCookie<User | null>('userCookie')
const isAuthenticated =  computed(() => !!userCookie.value)

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
//   console.log(event.data)

  // assign values to store form data
  authStore.login_form.email = event.data.email
  authStore.login_form.password = event.data.password


  // hit handle login function
    await authStore.login()
   // get user
    await authStore.getUser();
   // route user


   if (isAuthenticated) {
       navigateTo('/dashboard')
    }

}

// dfines custom layout
// definePageMeta({
//  middleware:["guest"]
// })
</script>
<style>
    
</style>