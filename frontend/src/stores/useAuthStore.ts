import { axiosInstance } from "@/lib/axios"

import {create} from "zustand"


interface AuthStore{
    isLoading:boolean,
    isAdmin:boolean
    error:string | null,
    checkAdmin:()=>Promise<void>
    reset:()=>void
}
export const useAuthStore=create<AuthStore>((set)=>({
   isLoading:false,
   error:null,
   isAdmin:false,
   checkAdmin:async()=>{
    try {
        set({isLoading:true})
        const response= await axiosInstance.get("/admin/checkadmin")
        set({isAdmin:response.data.admin})
    } catch (error:any) {
        set({isAdmin:false,error:error.response.data.message})
    }
    finally{
        set({isLoading:false})
    }
   },
   reset:()=>{
    set({ isAdmin: false, isLoading: false, error: null });
   }
}))