import { User } from "../model/userModel.js"


export const authCallback=async(req,res)=>{
    try {
     const {id,firstName,lastName,imageUrl}=req.body
 
     const user=await User.findOne({clerkId:id})
     if(!user){
       await User.create({
         clerkId:id,
         fullName:`${firstName} ${lastName}`,
         imageUrl:imageUrl
       }) 
     }
     res.status(200).json({
       success:true 
     })
    } catch (error) {
     console.log("Errorin auth callback",error);
     res.status(500).json({
         message:"Internal server Error ",error
     })
    }
 }