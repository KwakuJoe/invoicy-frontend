import type { Login, User, LoginCredentials, RegisterCredentials, Token} from '~/types/types';
import axios from 'axios';

export const useAuthStore = defineStore('authStore', () => {

    // user credentials
    const login_form = ref<LoginCredentials>({
        email:null,
        password:null
    });

    // register credentials
    const register_form = ref<RegisterCredentials>({
        organisation:null,
        phone:null,
        email:null,
        password:null,
        password_confirmation:null
    });

    // authenticate user & token

    
    const userCookie = useCookie<User | null>('userCookie')
    const tokenCookie = useCookie<string | null>('tokenCookie')


    // loading states
    const is_login_loading = ref<boolean>(false)
    const is_signup_loading = ref<boolean>(false)
    const is_forgetPasword_loading = ref<boolean>(false)
    const is_updatePasword_loading = ref<boolean>(false)

    // runtime confug
    const runTimeConfig = useRuntimeConfig()
    const baseUrl:String =  runTimeConfig.public.baseUrl

    
    // log in a user
    async function login(){

        // user data to login
        try {
            
            is_login_loading.value = true;

            let formData = new FormData();
            formData.append("email", login_form.value.email!);
            formData.append("password", login_form.value.password!);
            

    
             // header
            let headers ={
                // 'Content-Type': 'multipart/form-data',
                'Accept': "application/json",
            }
            
            const res = await axios.post(
                `${baseUrl}/api/auth/login`,
                formData,
                {
                    headers:headers
                }
            )
                

            if(res.data.status === 'success'){

                    // cookie intsance
                    const tokenCookie = useCookie<string | null>('tokenCookie')
                    tokenCookie.value = res.data.token.token

                    // assign token to our store token
                    // token.value = res.data.token

                    console.log('token - ' + tokenCookie.value);

                    const toast = useToast()
                    console.log(res.data)
                    toast.add({
                    id: 'login_success',
                    title: 'Authenticated Successful',
                    description: `${res.data.message}`,
                    color:'green'
                    })

                    is_login_loading.value = false;

                }else{

                    console.log(res.data)

                    const toast = useToast()
                    toast.add({
                        id: 'login_failed',
                        title: 'Authenticated Failed',
                        description: `${res.data.message}`,
                        color:'red'
                    })
                    
                    is_login_loading.value = false;

                }

        } catch (error:any) {

            is_login_loading.value = false

            console.log(error);
            const toast = useToast()
            toast.add({
              id: 'login_failed',
              title: 'Authenticated Failed',
              description: `${error}`,
              color:'red'
            })

        };
        
    }
    // get a user
    async function getUser(){

        try {

            const tokenCookie = useCookie<string | null>('tokenCookie')
            
            // header
            let headers ={
                "Accept": "application/json",
                'Authorization': `Bearer ${tokenCookie.value}`
            }
            
            const res = await axios.get(`${baseUrl}/api/auth/user`, {
                headers: headers
              })

            console.log(res.data);

            // user cookie intsance
            const userCookie = useCookie<User | null>('userCookie')
            userCookie.value = res.data
            console.log('user - ' + userCookie.value?.organisation);

        } catch (error) {

            console.log(error);

        };
        
    
    }
    // create a user
    async function signup(){

            try{
                // make loadin true
                is_signup_loading.value = true;
  
                // user data to register
                let formData = new FormData();
                formData.append("organisation", register_form.value.organisation!);
                formData.append("email", register_form.value.email!);
                formData.append("phone", register_form.value.phone!);
                formData.append("password", register_form.value.password!);
                formData.append("password_confirmation", register_form.value.password_confirmation!);
                
                // header
                let headers ={
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
  
                const res =  await axios.post(
                      `${baseUrl}/api/auth/register`,
                      formData,
                      {
                          headers: headers
                      }
                  )
  
                  if(res.data.status === 'success'){

                     console.log(res.data)

                        // assign token to our store token
                        // token.value = res.data.token.token

                    // cookie intsance
                    const tokenCookie = useCookie<string | null>('tokenCookie')
                    tokenCookie.value = res.data.token.token

                    // assign token to our store token
                    // token.value = res.data.token

                    console.log('token - ' + tokenCookie.value);

                      const toast = useToast()
                      toast.add({
                        id: 'register_success',
                        title: 'Successfully created an account, check your gmail to verify your account',
                        description: `${res.data.message}`,
                        color:"green"
  
                      });
                
                      is_signup_loading.value = false;

                  }else {

                    console.log(res.data)

                    const toast = useToast()
                    toast.add({
                        id: 'login_failed',
                        title: 'Failed to create account',
                        description: `${res.data.message}`,
                        color:'red'
                    })
                    
                    is_signup_loading.value = false;

                  }
              
  
            }catch(error:any){
  
                is_signup_loading.value = false;
  
                console.log(error);

                const toast = useToast()
                toast.add({
                    id: 'register_failed',
                    title: 'Oops! Failed to register user! ',
                    description: `${error.response.data.message}`,
                    
                })        
      }

    }
    // send email Verificatio
    async function forgetPasword(email:string) {

        try {

            is_forgetPasword_loading.value = true

            let headers ={
                "Content-Type": "application/json",
                "Accept": "application/json",
            }

            let formData = new FormData();
            formData.append("email", email!);

            const res = await axios.post( 'https://invoicy-backend.fly.dev/api/auth/forget-password',
            formData,
            {
                headers: headers
            })

            if(res.data.status === 'success'){
                console.log(res.data)
                const toast = useToast()
                toast.add({
                  id: 'forget_password_success',
                  title: 'Password Reset link set successfully',
                  description: `${res.data.message}`,
                  color:"green"

                })
                is_forgetPasword_loading.value = false
            }

        } catch (error:any) {
            
            is_forgetPasword_loading.value = false

            console.log(error)
            const toast = useToast()
            toast.add({
              id: 'forget_password_failed ',
              title: 'Failed to send Password reset link',
              description: `${error.response.data.message}`,
              color:"red"

            });
        }
    }

    async function resetPassword(token:string, expiry:string, email:string){

        try {

            
            // header
            let headers ={
                "Accept": "application/json",
                'Authorization': `Bearer ${tokenCookie.value}`
            }
            
            const res = await axios.get(`http://127.0.0.1:8000/api/auth/reset-password/${token}/${expiry}/${email}/`, {
                headers: headers
              })

              if(res.status === 200){

                return 200;

              }else{

                return res.status;

              }

            console.log(res.data);

            res.data


        } catch (error:any) {
  
            console.error('Error verifying token:', error);
            return error.response ? error.response.status : 500; 

        };
        
    
    }


    async function updatedPassword(password:string, email:string){

        try {
            
            is_updatePasword_loading.value = true;

            // formsata
            let formData = new FormData();
            formData.append("password", password!);
            formData.append("email", email!);

            // header
            let headers ={
                "Content-Type": "application/json",
                "Accept": "application/json",
            }

            const res =  await axios.post(
                `http://127.0.0.1:8000/api/auth/update-password`,
                formData,
                {
                    headers: headers
                }
            )

            if(res.data.status === 'success'){
                console.log(res.data)

                const toast = useToast()
                toast.add({
                id: 'password_update_success',
                title: 'Successfully created an account, check your gmail to verify your account',
                description: `${res.data.message}`,
                color:"green"
                });

                is_updatePasword_loading.value = false;
                
                // 


            }else{

                const toast = useToast()
                toast.add({
                id: 'password_update_failed',
                title: 'Failed to updated passsword',
                description: `${res.data.message}`,
                color:"red"
                });

                console.log(res.data)
                is_updatePasword_loading.value = false;


            }


        } catch (error:any) {

            is_updatePasword_loading.value = false;

            console.log(error)

            if(error.response.data.message){

                const toast = useToast()
                toast.add({
                id: 'password_update_failed.',
                title: 'Failed to updated passsword',
                description: `${error.response.data.message}`,
                color:"red"
                });

                console.log(error.response.data.message)
                is_updatePasword_loading.value = false;

            }

                const toast = useToast()
                toast.add({
                id: 'password_update_failed.',
                title: 'Failed to updated passsword',
                description: `${error.message}`,
                color:"red"
                });



        }
        
    }



    return {
        login,
        is_login_loading,
        login_form,
        signup,
        register_form,
        is_signup_loading,
        getUser,
        userCookie,
        tokenCookie,
        baseUrl,
        is_forgetPasword_loading,
        forgetPasword,
        resetPassword,
        updatedPassword,
        is_updatePasword_loading

    };

 
  },
//  {
//     // persist:{
//     //     // paths:['user', 'token', 'isAuthenticated']
//     // }
//   }
  
  );

  