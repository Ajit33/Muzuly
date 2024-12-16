import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/songController.js";
import { IsAdmin, protectedRoute } from "../middleware/authMiddleware.js";
const route=Router()
route.get("/",protectedRoute,IsAdmin, getAllSongs)
route.get("/featuredSongs",getFeaturedSongs)
route.get("/madeForYouSongs",getMadeForYouSongs)
route.get("/trendingSongs",getTrendingSongs)
export default route