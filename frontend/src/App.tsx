

import './App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AuthCallback from './pages/auth-callback/AuthCallback'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from './Layout/MainLayout'
import Chat from './pages/Chat'

function App() {
  return(
   <>
   <Routes>
     
     <Route path='/sso-callback' element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
     <Route path='/auth-callback' element={<AuthCallback />} />
     <Route element={<MainLayout />}>
     <Route path='/' element={<Home />} />
     <Route path='/chat' element={<Chat />} />
     </Route>
   </Routes>
   </>
  )
}
  

export default App
