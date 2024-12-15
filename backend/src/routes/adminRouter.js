import { Router } from "express";
import { createSong } from "../controller/adminController.js";
import { IsAdmin, protectedRoute } from "../middleware/authMiddleware.js";
const route=Router()
route.get("/",protectedRoute,IsAdmin,createSong)
export default route