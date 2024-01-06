<template>

  <!-- profile forms -->
  <div class="flex flex-row mt-5">
    <!-- Register forms -->
    <UForm :schema="schema" :state="state" class="space-y-4 lg:w-3/5" @submit="onSubmit">
      
      <div>
        <h4 class="text-2xl font-medium">Profile</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400">Updated your profile</p>
      </div>

      <!-- <div  class="flex flex-row items-center gap-x-4">
        <div class="flex-1">
          <NuxtImg loading="lazy" height="30" class=" transition delay-150 duration-300 ease-in-out hover:-translate-y-1 max-w-sm  max-h-32"  :src="fullImageUrl" />
        </div>
      </div> -->


      <UFormGroup label="Orgainisation" name="orgainisation">
        <UInput size="md" class="w-full" v-model="state.organisation" type="text" />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput size="md" disabled class="w-full" v-model="state.email" type="email" />
      </UFormGroup>

      <UFormGroup label="Phone" name="phone">
        <UInput size="md" class="w-full" disabled v-model="state.phone" type="text" />
      </UFormGroup>

      <UFormGroup label="Bio" name="bio">
        <UTextarea size="md" class="w-full" v-model="state.bio" type="text" />
      </UFormGroup>

      <UFormGroup label="Address" name="address">
        <UTextarea size="md" class="w-full" v-model="state.address" type="text" />
      </UFormGroup>

      <!-- <hr/> -->
      <!-- <p class="text-sm font-medium">Update logo</p> -->
      <!-- <p class="text-xs">Logo image must be of this format SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->

      <!-- <div class="flex w-full items-center gap-x-4">
        <div class="basis-1/2">
          <label for="dropzone-file" class=" py-2 flex flex-col items-center justify-center  border-2  rounded-lg cursor-pointer">
               <div class="flex flex-col items-center justify-center">
                   <p class="text-sm font-medium "> Upload Logo Image</p>
               </div>
               <input id="dropzone-file" type="file" @change="handleFileUpload" class="hidden">
            </label>
            <p class="text-sm text-red-500" v-if="imageError">{{ imageError }}</p>
        </div>

        <div class="flex-1">
          <nuxt-img v-if="imagePreview" class="max-h-36 " :src="imagePreview" fit="cover"></nuxt-img>
        </div>
      </div> -->

      <hr/>


      <UButton :loading="is_updateUser_loading" block class="h-10" type="submit">Update profile</UButton>
    </UForm>
  </div>

  <!-- verified or note -->
  <div v-if="userCookie?.email_verified_at === null" class="flex items-center gap-x-2 my-5">
    <div class="flex-1">
      <UAlert icon="i-heroicons-exclamation-triangle" color="red" variant="soft" title="Heads Account not activated!"
        description="Click on the activate button to recieve a recieve activate link" on />
    </div>

    <UButton :loading="authStore.is_emailVerification_loading" @click="sendEmailVerification()" label="Activate now" />
  </div>

  <!-- enable notification -->
  <UNotifications />
</template>

<script setup lang="ts">

import { object, string, type InferType } from "yup";
import * as yup from "yup";
import { useAuthStore } from "~/stores/useAuthStore";
import type { FormSubmitEvent } from "#ui/types";
import type {User } from "~/types/types";

// instance of authStore
const authStore = useAuthStore();
const { is_updateUser_loading } = storeToRefs(useAuthStore());

// image valide composables
// const { image, imagePreview, imageError, handleFileUpload } = useImageValidate();

const userCookie = useCookie<User | null>("userCookie");


// form config
const schema = yup.object().shape({
  organisation: yup.string().required("Orginasation name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .max(10, "Phone should not exceed 10 digits"),
  bio: yup.string().required("Bio is required"),
  address: yup.string().required("Address is required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  id:userCookie.value?.id,
  organisation: userCookie.value?.organisation?.toString(),
  email: userCookie.value?.email?.toString(),
  phone: userCookie.value?.phone?.toString(),
  bio: userCookie.value?.bio?.toString(),
  address: userCookie.value?.address?.toString(),
});




async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  // state.avatar = image.value;
  console.log(event.data)

    //  authStore.updateUserPrrofile(state.id!, state.organisation!, state.email!, state.phone!, 
    //  state.bio!, state.address!, image.value as File)

     authStore.updateUserProfile(state.id!, state.organisation!, state.email!, state.phone!, 
     state.bio!, state.address!)

}

// handle sending of verification email
async function sendEmailVerification(){
  await authStore.sendVerificationMail(userCookie.value?.email?.toString()!)
  console.log('sent email verification')
}

 // auth middleware
 definePageMeta({
    middleware:["auth"],
    layout:'account'
});
</script>




