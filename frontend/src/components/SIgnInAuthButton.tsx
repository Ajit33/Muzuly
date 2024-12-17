import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button"


const SIgnInAuthButton = () => {
const {signIn,isLoaded}=useSignIn()
const signInWithGoogle=()=>{
   signIn?.authenticateWithRedirect({
    strategy:"oauth_google",
    redirectUrl:"/sso-callback",
    redirectUrlComplete:"/auth-callback"
   }) 
}
if(!isLoaded){
    return null
}
  return (
    <Button onClick={signInWithGoogle} variant={"secondary"}  className=" w-full text-white bg-slate-500  border-zinc-200 h-11">
      Continue with google
    </Button>
  )
}

export default SIgnInAuthButton
