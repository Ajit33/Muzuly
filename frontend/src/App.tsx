
import { SignedIn, SignedOut,  UserButton } from '@clerk/clerk-react'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  return(
    <header>
    <SignedOut>
     <Button>signin</Button>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </header>
  )
}
  

export default App
