import {create} from "zustand";
import { song } from "@/types";

interface PlayerStore{
  currentSong:song | null,
  isPlaying:boolean,
  queue:song[] ,
  currentIndex:number,
  initializeQueue:(songs:song[])=>void,
  playAlbum:(songs:song[],startIndex:number)=>void,
  setCurrentSong:(song:song | null)=>void,
  togglePlay:()=>void,
  playNext:()=>void,
  playPrevious:()=>void
}
export const usePlayerStore=create<PlayerStore>((set,get)=>({
    currentSong:null,
    isPlaying:false,
    queue:[],
    currentIndex:-1,
    initializeQueue:(songs:song[])=>{
        set({
            queue:songs,
            currentSong:get().currentSong || songs[0],
            currentIndex:get().currentIndex===-1 ?0:get().currentIndex
        })
    },
    playAlbum:(songs:song[],startIndex=0)=>{
        if(songs.length===0){
            return
        }
        const song=songs[startIndex];
        set({
            queue:songs,
            currentSong:song,
            currentIndex:startIndex,
            isPlaying:true
        })
    },
    setCurrentSong:(song:song |null)=>{
        if(!song){
            return
        }
        const songIndex=get().queue.findIndex(s=>s._id===song._id)
        set({currentSong:song,isPlaying:true,currentIndex:songIndex!==-1?songIndex :get().currentIndex})
    },
    togglePlay:()=>{
        const willstartPlaying=!get().isPlaying;
        set({
            isPlaying:willstartPlaying
        })
    },
    playNext:()=>{
        const{currentIndex,queue}=get()
        const nextIndex=currentIndex+1;
        if(nextIndex<queue.length){
            const nextSong=queue[nextIndex]
            set({
                currentSong:nextSong,
                currentIndex:nextIndex,
                isPlaying:true
            })
        }
        else{
            set({isPlaying:false})
        }
    },
    playPrevious:()=>{
       const{currentIndex,queue}=get();
       const prevIndex=currentIndex-1;
       if(prevIndex>=0){
          const prevSong=queue[prevIndex]
          set({isPlaying:true, currentSong:prevSong,currentIndex:prevIndex})
       }
       else{
        set({isPlaying:false})
       }
    }
}))