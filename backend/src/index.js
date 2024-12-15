import express from "express";
import dotenv from "dotenv"
import mainRouter from "./routes/mainRoutes.js"
import { connectDB } from "./lib/db.js";
dotenv.config();


const app=express();
const PORT=process.env.PORT

app.use("/api/v1",mainRouter)

app.listen(PORT,async()=>{
    await connectDB();
    console.log(`server is running on port ${PORT}`)
})