import { Router } from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { getAllUsers, getMessages } from "../controller/userController.js";
const router=Router();

router.get("/",protectedRoute,getAllUsers)
router.get("/messages/:userId",protectedRoute,getMessages)
export default router