import { axiosInstance } from "@/lib/axios";
import { User } from "@/types";
import { error } from "node:console";
import{create} from "zustand"

interface chatStore{
    users:User[];
    fetchusers:()=>Promise<void>
    isLoading:boolean,
    error :string | null

}

export const useChatStore=create<chatStore>((set)=>({
  users:[],
  isLoading:false,
  error:null,
  fetchusers:async()=>{
    set({isLoading:true,error:null})
  try {
    const response= await axiosInstance.get("/users")
    set({users:response.data})

  } catch (error:any) {
    set({error:error.response.data.message})
  }
  finally{
    set({isLoading:false})
  }
  }
}))