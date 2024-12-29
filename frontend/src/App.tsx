

import './App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AuthCallback from './pages/auth-callback/AuthCallback'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from './Layout/MainLayout'
import Chat from './pages/Chat'
import Album from './pages/Album'
import Admin from './pages/Admin'
import { Toaster } from 'react-hot-toast'
import NotFound from './components/NotFound'

function App() {
  return(
   <>
   <Routes>
     
     <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
     <Route path='/auth-callback' element={<AuthCallback />} />
     <Route path='/admin' element={<Admin />} />
     <Route element={<MainLayout />}>
     <Route path='/' element={<Home />} />
     <Route path='/chat' element={<Chat />} />
     <Route path='/album/:albumId' element={<Album />} />
     <Route path="*" element={<NotFound />} />
     </Route>
   </Routes>
   <Toaster />
   </>
  )
}
  

export default App
