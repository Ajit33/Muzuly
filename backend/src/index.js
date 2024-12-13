import express from "express";
import dotenv from "dotenv"
import mainRouter from "./routes/mainRoutes.js"
dotenv.config();


const app=express();
const PORT=process.env.PORT

app.use("/api/v1",mainRouter)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})