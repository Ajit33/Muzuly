import { Message } from "../model/messageModel.js"
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

export const getMessages=async(req,res,next)=>{
   try {
      const myId=req.auth.userId;
      const{userId}=req.params;
      const messages=await Message.find({
        $or:[
         {senderId:userId,receiverId:myId},
         {senderId:myId,receiverId:userId}
        ] 
      }).sort({createdAt:1})
      res.status(200).json(messages)
   } catch (error) {
      next(error)
   }
}