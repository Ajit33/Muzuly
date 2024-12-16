import { Router } from "express";
import { IsAdmin, protectedRoute } from "../middleware/authMiddleware.js";
import { getStats } from "../controller/statsController.js";
const route = Router();
route.get("/", protectedRoute,IsAdmin,getStats);
export default route;
