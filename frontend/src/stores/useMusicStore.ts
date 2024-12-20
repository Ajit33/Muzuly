import { axiosInstance } from "@/lib/axios";
import { Album, song } from "@/types";
import {create} from "zustand";


interface MusicStore{
   songs:song[],
   albums:Album[],
   isLoading:Boolean,
   error:string | null,
   currentAlbum:Album |null
   fetchAlbums:()=>Promise<void>
   fetchAlbumById:(albumId:string)=>Promise<void>
}


export const useMusicStore=create<MusicStore>((set)=>({
    albums:[],
    songs:[],
    isLoading:false,
    error:null,
    currentAlbum:null,

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
    },
    fetchAlbumById:async(albumId:string)=>{
        set({
            isLoading:true,
            error:null 
        })
        try {
            const response= await axiosInstance.get(`/album/${albumId}`);
            set({currentAlbum:response.data})
        } catch (error:any) {
            set({error:error.response.data.message})    
        }
        finally{
            set({isLoading:false})
        }
    }
}))