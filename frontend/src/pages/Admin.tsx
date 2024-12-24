import Content from "@/components/admin/Content";
import Dashboardstats from "@/components/admin/Dashboardstats";
import Header from "@/components/admin/Header";
import { useAuthStore } from "@/stores/useAuthStore"
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";


const Admin = () => {
    const {isAdmin,isLoading}=useAuthStore();

    if(!isAdmin && !isLoading) return <div>Sorry you are not a admin...</div>
  const{fetchAlbums,fetchSongs,fetchStats}=useMusicStore()
  useEffect(()=>{
   fetchAlbums(),
   fetchSongs(),
   fetchStats()
  },[fetchAlbums,fetchSongs,fetchStats])
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
      <Header />
      <Dashboardstats />
      <Content />
    </div>
  )
}

export default Admin
