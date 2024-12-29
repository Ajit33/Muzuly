import {  SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import SIgnInAuthButton from "./SIgnInAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const TopBar = () => {
  const { isAdmin } = useAuthStore();
  return (
    <div className=" w-full flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center text-white">Muzuly</div>
      <div className="flex items-center gap-4">
        {isAdmin && (
        <Link
        to="/admin"
        className={`text-white bg-zinc-800 ${cn(buttonVariants({ variant: "outline" }))}`}
      >
        <LayoutDashboard className="text-4xl mr-2" />
        Admin Dashboard
      </Link>
        )}
        <SignedOut>
          <SIgnInAuthButton  />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
