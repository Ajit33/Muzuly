import FeaturedSection from '@/components/FeaturedSection';
import SectionGrid from '@/components/SectionGrid';
import TopBar from '@/components/TopBar'
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMusicStore } from '@/stores/useMusicStore';
import { usePlayerStore } from '@/stores/usePlayerStore';

import { useEffect } from 'react';


const Home = () => {
  const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();
  useEffect(()=>{
   fetchFeaturedSongs(),
   fetchMadeForYouSongs(),
   fetchTrendingSongs()
  },[fetchFeaturedSongs,fetchMadeForYouSongs,fetchTrendingSongs])

  const {initializeQueue}=usePlayerStore()

  useEffect(()=>{
   if(madeForYouSongs.length>0 && trendingSongs.length>0 && featuredSongs.length>0){
    const allsongs=[...madeForYouSongs,...featuredSongs,...trendingSongs]
    initializeQueue(allsongs)
   }
  },[initializeQueue,trendingSongs,featuredSongs,madeForYouSongs])
  return (
    <main className='w-full rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
      <TopBar />
     <ScrollArea className='h-[calc(100vh-180px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>
            Good Afternoon
          </h1>
          <FeaturedSection />
        </div>
        <div className='space-y-8'>
            <SectionGrid title='Made For You' songs={madeForYouSongs} isLoading={false} />
            <SectionGrid title='Trending' songs={trendingSongs} isLoading={false} />
        </div>
     </ScrollArea>
    </main>
  )
}

export default Home
