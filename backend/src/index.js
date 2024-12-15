import express from "express";
import dotenv from "dotenv"
import { clerkMiddleware } from "@clerk/express";
import mainRouter from "./routes/mainRoutes.js"
import { connectDB } from "./lib/db.js";

dotenv.config();
const app=express();
app.use(clerkMiddleware())
const PORT=process.env.PORT
app.use(express.json())
app.use("/api/v1",mainRouter)

app.listen(PORT,async()=>{
    await connectDB();
    console.log(`server is running on port ${PORT}`)
})