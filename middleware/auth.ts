import { storeToRefs } from "pinia";
import {useAuthStore} from '~/stores/useAuthStore'


export default defineNuxtRouteMiddleware((to) => {
   // get token from cookies
    const tokenCookie = useCookie<string | null>('tokenCookie')
    const authStore = useAuthStore();
    
    //check whether there is cookie get user again
    if (tokenCookie.value && tokenCookie !== null) {
      authStore.getUser();
    }
  
    // if token exists and url is /login redirect to homepage
    if (tokenCookie.value && to.path === '/auth/login') {
      return navigateTo('/dashboard');
    }

    // if token exists and url is /login redirect to homepage
    if (tokenCookie.value && to.path === '/auth/register') {
        return navigateTo('/dashbaord');
      }

    
  
    // if token doesn't exist redirect to log in
    if (!tokenCookie.value && to.path !== '/auth/login') {
      abortNavigation();
      return navigateTo('/auth/login')
    }
    
  });