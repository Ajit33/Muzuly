import { UserButton } from "@clerk/clerk-react"
import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className="flex items-center gap-8 mb-8">
         <Link to="/" className="text-lg font-bold rounded-xl px-8 py-2 bg-emerald-500 text-white">
          Muzuly
         </Link>
         <div>
            <h1 className="text-3xl font-bold">Hello Admin</h1>
            <p className="text-zinc-400 mt-1">Manage your music catalog</p>
         </div>
      </div>
      <UserButton />
    </div>
  )
}

export default Header
