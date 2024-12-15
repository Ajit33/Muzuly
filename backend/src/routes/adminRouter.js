import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/adminController.js";
import { IsAdmin, protectedRoute } from "../middleware/authMiddleware.js";
const route=Router()
route.use(protectedRoute,IsAdmin)
route.get("/checkadmin",checkAdmin)
route.post("/addsongs",createSong)
route.delete("/deleteSong/:id",deleteSong)
route.post("/createAlbum",createAlbum)
route.delete("/deleteAlbum/:id",deleteAlbum)
export default route