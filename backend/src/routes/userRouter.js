import { Router } from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controller/userController.js";
const router=Router();

router.get("/",protectedRoute,getAllUsers)

export default router