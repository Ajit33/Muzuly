

import { clerkClient } from "@clerk/express";

export const protectedRoute= async(req,res,next)=>{
  if(!req.auth.userId){
   return res.status(401).json({message:"Unauthorized access you have to login for this activity !"})
    
  }
  next()
}

export const IsAdmin=async (req,res,next)=>{
    try {
        const currentUser=await clerkClient.users.getUser(req.auth.userId)
        const isAdmin=process.env.ADMIN_EMAIL=== currentUser.primaryEmailAddress?.emailAddress
        if(!isAdmin){
             return res.status(403).json({
                message:"Unauthorized - hey this can be only done by admin.."
            })
        }
        next()
    } catch (error) {
        
    }
}