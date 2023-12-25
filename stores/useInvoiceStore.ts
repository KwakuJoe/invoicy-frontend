import axios from 'axios';
import {useAuthStore} from '~/stores/useAuthStore'


export const useInvoiceStore = defineStore('invoiceStore', () => {


        // runtime confug
        const runTimeConfig = useRuntimeConfig()
        const baseUrl:String =  runTimeConfig.public.baseUrl
        
        return {
            baseUrl
        }
});
