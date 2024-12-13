import { Router } from "express";
const router=Router();

router.get("/message",(req,res)=>{
    res.send("hello user")
})

export default router