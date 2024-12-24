import { axiosInstance } from "@/lib/axios";
import { Album, song, Stats } from "@/types";
import {create} from "zustand";
import {toast} from "react-hot-toast"

interface MusicStore{
   songs:song[],
   stats:Stats,
   albums:Album[],
   isLoading:boolean,
   isSongsLoading:boolean,
   isStatsLoading:boolean,
   error:string | null,
   currentAlbum:Album |null,
   fetchAlbums:()=>Promise<void>,
   fetchAlbumById:(albumId:string)=>Promise<void>,
   trendingSongs:song[],
   madeForYouSongs:song[],
   featuredSongs:song[]
   fetchTrendingSongs:()=>Promise<void>
   fetchFeaturedSongs:()=>Promise<void>
   fetchMadeForYouSongs:()=>Promise<void>
   fetchStats:()=>Promise<void>
   fetchSongs:()=>Promise<void>
   deleteSong:(songId:string)=>Promise<void>
   deleteAlbum:(albumId:string)=>Promise<void>
}


export const useMusicStore=create<MusicStore>((set)=>({
    albums:[],
    songs:[],
    isLoading:false,
    error:null,
    currentAlbum:null,
    featuredSongs:[],
    trendingSongs:[],
    madeForYouSongs:[],
    isSongsLoading:false,
    isStatsLoading:false,
    stats:{
        totalSongs:0,
        totalAlbums:0,
        totalUsers:0,
        totalArtists:0
    },
 fetchFeaturedSongs:async ()=>{
    set({ isLoading: true, error: null });
    try {
        const response=await axiosInstance.get("/songs/featuredSongs")
        set({ featuredSongs: response.data });
    } catch (error:any) {
        set({ error: error.response.data.message });
    }
    finally {
        set({ isLoading: false });
    }
 },
 fetchMadeForYouSongs:async ()=>{
    set({ isLoading: true, error: null });
    try {
        const response=await axiosInstance.get("/songs/madeForYouSongs")
        set({madeForYouSongs:response.data})
    } catch (error:any) {
        set({ error: error.response.data.message });
    }
    finally {
        set({ isLoading: false });
    }
 },
 fetchTrendingSongs:async()=>{
    set({ isLoading: true, error: null });
    try {
        const response=await axiosInstance.get("/songs/trendingSongs")

    set({trendingSongs:response.data})
    } catch (error:any) {
        set({ error: error.response.data.message });
    }
    finally {
        set({ isLoading: false });
    }
 },

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
    },
    fetchSongs:async()=>{
        set({isSongsLoading:true,error:null})
      try {
        const response= await axiosInstance.get("/songs");
        set({songs:response.data})
      } catch (error:any) {
        set({error:error.response.data.message})
      }
      finally{
        set({isSongsLoading:false})
      }
    },
    fetchStats:async()=>{
      set({isStatsLoading:true,error:null})
      try {
        const response= await axiosInstance.get("/stats");
        set({stats:response.data})
      } catch (error:any) {
        set({error:error.response.data.message}) 
      }
      finally{
        set({isStatsLoading:false})
      }
    },
    deleteSong:async(songId)=>{
        set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/deleteSong/${songId}`);

			set((state) => ({
				songs: state.songs.filter((song) => song._id !== songId),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.log("Error in deleteSong", error);
			toast.error("Error deleting song");
		} finally {
			set({ isLoading: false });
		}  
    },
    deleteAlbum:async(albumId)=>{
      set({isLoading:true,error:null})
      try {
        await axiosInstance(`/admin/deleteAlbum/${albumId}`)
        set((state)=>({
          albums:state.albums.filter((album)=>album._id !== albumId)
        }))
        toast.success("Album deleted successfully");
      } catch (error:any) {
        console.log("Error in deleteAlbum", error);
        toast.error("Error deleting Album"); 
      }
      finally{
        set({isLoading:false})
      }
    }
}))