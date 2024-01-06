
<template>
    <UContainer>        
        <div class="flex  flex-row justify-center  w-full gap-x-3 mt-10">
            <div class="lg:w-3/5 w-full px-3 flex flex-row justify-center">
                <!-- Register forms -->
                <UForm :schema="schema" :state="state" class="space-y-4 lg:w-3/5 w-full" @submit="onSubmit">
                    <!-- text -->
                    <div>
                        <h4 class="text-2xl font-medium">Create an account</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Already have an account? <nuxt-link class="text-blue-400" to="/auth/login">Sign in here</nuxt-link> </p>
                    </div>
                    <UFormGroup label="Name / Company" name="organisation">
                        <UInput size="md" class="w-full" v-model="state.organisation" />
                    </UFormGroup>

                    <UFormGroup label="Email" name="email">
                        <UInput size="md" class="w-full" v-model="state.email" type="email" />
                    </UFormGroup>

                    <UFormGroup label="Phone" name="phone">
                        <UInput size="md"  class="w-full" v-model="state.phone" type="phone" />
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput size="md" class="w-full" autocomplete="on" v-model="state.password" type="password" />
                    </UFormGroup>

                    <UFormGroup label="Confirm Password" name="password_confirmation">
                        <UInput size="md" class="w-full" autocomplete="on" v-model="state.password_confirmation" type="password" />
                    </UFormGroup>

                    <UButton :loading="is_signup_loading" block class="h-10" type="submit">Create account</UButton>
                </UForm>

            </div>
            <div class="hidden lg:flex flex-col justify-between items-center gap-y-3">
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
import { object, string, type InferType} from 'yup'
import {type User} from '~/types/types'
import * as yup from 'yup';
import {useAuthStore} from '~/stores/useAuthStore'
import type { FormSubmitEvent } from '#ui/types'

// instance of auth store
const authStore = useAuthStore(); 
const { is_signup_loading } = storeToRefs(useAuthStore());


const schema = yup.object().shape({
 organisation: yup.string().required('Orginasation name is required'),
 email: yup.string().email('Invalid email address').required('Email is required'),
 phone: yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits long').required('Phone number is required'),
 password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
 password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});

type Schema = InferType<typeof schema>

const state = reactive({
  organisation: undefined,
  email: undefined,
  phone:undefined,
  password:undefined,
  password_confirmation:undefined
});

const userCookie = useCookie<User | null>('userCookie')
const isAuthenticated =  computed(() => !!userCookie.value)

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)

  // asign form value to store form values
  authStore.register_form.organisation = event.data.organisation
  authStore.register_form.email = event.data.email
  authStore.register_form.phone = event.data.phone
  authStore.register_form.password = event.data.password
  authStore.register_form.password_confirmation = event.data.password_confirmation

  // hit the signup function
  await authStore.signup();
   // get user
   await authStore.getUser();
   // route user

   if (isAuthenticated) {
      await navigateTo('/dashboard')
    }
  
}

// definePageMeta({
//  middleware:["auth"]
// })
</script>