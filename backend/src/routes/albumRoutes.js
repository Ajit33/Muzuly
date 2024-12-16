import { Router } from "express";
import {  getAlbumById, getAllAlbum } from "../controller/albumController.js";
const route=Router()
route.get("/",getAllAlbum)
route.get("/:albumId",getAlbumById)
export default route