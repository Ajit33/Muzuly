import { axiosInstance } from "@/lib/axios";
import { Album, song } from "@/types";
import {create} from "zustand";


interface MusicStore{
   songs:song[],
   albums:Album[],
   isLoading:Boolean,
   error:string | null,
   fetchAlbums:()=>Promise<void>
}


export const useMusicStore=create<MusicStore>((set)=>({
    albums:[],
    songs:[],
    isLoading:false,
    error:null,

    fetchAlbums:async ()=>{
        set({
            isLoading:true,
            error:null
        })
       try {
         const response=await axiosInstance.get("/album")
         set({albums:response.data,isLoading:false})
         
       } catch (error:any) {
        set({error:error.response.data.message})
       }
    }
}))