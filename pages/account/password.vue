<template>
    <div>


        <!-- Password update forms -->
        <div class="flex flex-row mt-5">
            <!-- Register forms -->
            <UForm :schema="schema" :state="state" class="space-y-4 lg:w-3/5" @submit="onSubmit">

                <div>
                    <h4 class="text-2xl font-medium">Password</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Updated your password</p>
                </div>

                <UFormGroup label="Password" name="password">
                    <UInput size="md" class="w-full" autocomplete="on" v-model="state.password" type="password" />
                </UFormGroup>

                <UFormGroup label="Confirm Password" name="password_confirmation">
                    <UInput size="md" class="w-full" autocomplete="on" v-model="state.password_confirmation"
                        type="password" />
                </UFormGroup>
                <hr />


                <UButton block :loading="mapStore.is_updatePasword_loading" class="h-10" type="submit">Update password</UButton>
            </UForm>
        </div>

        <!-- enable notification -->
        <UNotifications />

    </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import * as yup from 'yup';
import {type User} from '~/types/types'
import {useAuthStore} from '~/stores/useAuthStore'

// instance of store
const mapStore = useAuthStore();
// form config
const schema = yup.object().shape({
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});

type Schema = InferType<typeof schema>

const state = reactive({
    password: undefined,
    password_confirmation: undefined
});


async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data.password)

    const userCookie = useCookie<User | null>('userCookie');

   await  mapStore.updatePassword(event.data.password, userCookie.value?.email?.toString()!)

    console.log('password updated')
}

 // auth middleware
 definePageMeta({
    middleware:["auth"],
    layout:'account'
}); 
</script>
<style></style>