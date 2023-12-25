import {useAuthStore} from '~/stores/useAuthStore'


export default defineNuxtRouteMiddleware(async (to) => {

    const route = useRoute();
    const authStore = useAuthStore();
    
    const token = route.params.token;
    const expiry = route.params.expiry;
    const email = route.params.email;

    if(token && expiry && email){
       const statusCode = await authStore.resetPassword(token.toString(), expiry.toString(), email.toString())

       if( statusCode === 200){

            return;

       }else{
            return navigateTo(`/error/This link is invalid or expired`)
       }
       
    }else{

        return navigateTo(`/error/This link is invalid or expired`)

    }

    
  });