import { Router } from "express";
import { authCallback } from "../controller/authController.js";
const route=Router()
route.post("/callback",authCallback)
export default route