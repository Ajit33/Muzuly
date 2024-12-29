import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import mainRouter from "./routes/mainRoutes.js";
import { connectDB } from "./lib/db.js";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors"
import { createServer } from "http";
import { intializeSocket } from "./lib/socket.js";
import cron from "node-cron"
import fs from "fs"
dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(clerkMiddleware());
const httpServer=createServer(app)
intializeSocket(httpServer)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);
const tempdir=path.join(process.cwd(),"temp")
cron.schedule("0 * * * *",()=>{
 if(fs.existsSync(tempdir)) {
   fs.readdir(tempdir,(err,files)=>{
    if(err){
      console.log("error",err)
      return;
    }
    for(const file of files){
      fs.unlink(path.join(tempdir,file),(err)=> {})
    }
   })
 }
})
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))
app.use("/api/v1", mainRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    if (!req.originalUrl.startsWith("/api")) {
      res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    }
  });
}
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server Error"
          : err.message
    });
});
httpServer.listen(PORT, async () => {
  await connectDB();
  console.log(`server is running on port ${PORT}`);
});


