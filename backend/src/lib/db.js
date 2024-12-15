

import mongoose from "mongoose";


export const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.DATABASE_URL)
      console.log(`Connected to the MONGODB`)
    } catch (error) {
        console.log("somthing went wrong while connecting to the database..")
        process.exit(1)
    }
}