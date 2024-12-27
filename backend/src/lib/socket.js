import {Server} from "socket.io";
import { Message } from "../model/messageModel.js";


export const intializeSocket=(server)=>{
  const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
  });
  const userSocket=new Map();
  const userActivities=new Map();
  io.on("connection",(socket)=>{
    socket.on("user_connected",(userId)=>{
        userSocket.set(userId,socket.id);
        userActivities.set(userId,"Idel");
        io.emit("user_connected",userId)

        socket.emit("users_online",Array.from(userSocket.keys()));
        io.emit("activities",Array.from(userActivities.entries()))
    })
    socket.on("update_activity",({userId,activity})=>{
        userActivities.set(userId,activity);
        io.emit("activity_updated",{userId,activity})
    })
    socket.on("send_message",async(data)=>{
      try {
        const{senderId,receiverId,content}=data
        const message=await Message.create({
            senderId,
            receiverId,
            content
        })
        const receiverSocketId=userSocket.get(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("receive_message",message)
        }
        socket.emit("message_sent",message)
      } catch (error) {
        console.error("message error",error);
        socket.emit("message_error",error.message)
      }  
    })
    socket.on("disconnect",()=>{
        let disconnectedUserid;
        for(const [userId,socketId] of userSocket.entries()){
            if(socketId === socket.id){
                disconnectedUserid=userId
                userSocket.delete(userId)
                userActivities.delete(userId)
                break;
            }
        }
        if(disconnectedUserid){
            io.emit("user_disconnected",disconnectedUserid)
        }
    })
  })
}