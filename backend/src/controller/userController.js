import { User } from "../model/userModel.js"


export const getAllUsers=async(req,res,next)=>{
   try {
    const currentUserId=req.auth.userId
    const users=await User.find({clerkId:{$ne:currentUserId}})
    res.json(users)
   } catch (error) {
    next(error)
   } 
}