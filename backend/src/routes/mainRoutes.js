import {Router} from "express";
import UserRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import adminRouter from "./adminRouter.js";
import songsRouter from "./songsRouter.js"
import albumRouter from "./albumRoutes.js"
import statsRoute from "./statsRoutes.js"
const route=Router()
route.use("/user",UserRouter)
route.use("/auth",authRouter)
route.use("/admin",adminRouter)
route.use("/songs",songsRouter)
route.use("/album",albumRouter)
route.use("/stats",statsRoute)

export default route