import { usePlayerStore } from '@/stores/usePlayerStore'
import  { useEffect, useRef } from 'react'

const AudioPlayer = () => {
  const audioRef=useRef<HTMLAudioElement>(null)
  const prevSongRef=useRef<string | null>(null)
  const {currentSong,isPlaying,playNext}=usePlayerStore()
  // handel play and pause logic here ....
  useEffect(()=>{
    if(isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  },[isPlaying])
  //handel the next song automatically
   useEffect(()=>{
      const audio=audioRef.current;
      const hendelEneded=()=>{
        playNext()
      }

      audio?.addEventListener("ended",hendelEneded)
      return ()=>audio?.removeEventListener("ended",hendelEneded)
   },[playNext])
   //handel song change

   useEffect(()=>{
    if(!audioRef.current || !currentSong) return
    const audio=audioRef.current;
    const isNewsong=prevSongRef.current !== currentSong?.audioUrl
    if(isNewsong ){
      audio.src=currentSong?.audioUrl;
      audio.currentTime=0;
      prevSongRef.current=currentSong?.audioUrl;
      if(isPlaying) audio.play()
    }
   },[currentSong,isPlaying])
  return (
    <audio  ref={audioRef} />
  )
}

export default AudioPlayer
