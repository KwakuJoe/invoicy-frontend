import {useAuthStore} from '~/stores/useAuthStore'


export default defineNuxtRouteMiddleware((to) => {
   // get token from cookies
    const tokenCookie = useCookie<string | null>('tokenCookie')  
    // if token doesn't exist redirect to log in
    if (!tokenCookie.value && to.path !== '/auth/login') {
      abortNavigation();
      return navigateTo('/auth/login')
    }
    
  });