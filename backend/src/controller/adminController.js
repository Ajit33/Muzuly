import { Album } from "../model/albumModel.js"
import { Song } from "../model/songModel.js"
import cloudinary from "../lib/cloudinary.js"
const uploadToCloudinary=async(file)=>{
    try {
        const result= await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type:"auto"
        })
        return result.secure_url
    } catch (error) {
      console.log("Error while uploading the file to cloudinary",error)  
     throw new Error("Error  uploading to cloudinary")
    }
}
export const createSong= async(req,res,next)=>{
  try {
   if(!req.files || !req.files.audioFile){
     return res.status(400).json({message:"Please upload all files"})
   }
   const{title,artist, albumId,duration}=req.body
   const audioFile=req.files.audioFile
   const imageFile=req.files.imageFile
   const audioUrl= await uploadToCloudinary(audioFile)
   const imageUrl= await uploadToCloudinary(imageFile)
   const song=new Song({
    title,
    artist,
    audioUrl,
    imageUrl,
    duration,
    albumId:albumId || null
   })
   await song.save()
   if(albumId){
    await Album.findByIdAndUpdate(albumId,{
        $push:{songs:song._id}
    })
   }
   res.status(201).json(song)
  } catch (error) {
    console.log("error in creating song",error)
   next(error)
  }
}
export const deleteSong=async(req,res,next)=>{
  try {
    const {id}=req.params
    const song=await Song.findById(id)
    if(song.aulbumId){
        await Album.findByIdAndUpdate(song.aulbumId,{
            $pull:{songs:song._id}
        })
    }
    await Song.findByIdAndDelete(id)
    res.status(200).json({
        message:"song deleted sucessfully"
    })
  } catch (error) {
    console.log("somthing went wrong in deleting the song",error)
    next(error)
  }
}
export const createAlbum=async(req,res,next)=>{
try {
    const{title,artist,releaseYear}=req.body
    const {imageFile}=req.files
    const imageUrl=await uploadToCloudinary(imageFile)
    const album=new Album({
        title,
        artist,
        imageUrl,
        releaseYear
    })
    await album.save()
    res.status(200).json({
        message:"Album created sucessfully",
        album:album
    })
} catch (error) {
    console.log("Somthing went wrong on craete album",error)
    next(error)
}
}
export const deleteAlbum=async(req,res,next)=>{
    try {
    const {id}=req.params
     await Album.findByIdAndDelete(id)
     res.status(200).json({
        message:"Album deleted sucessfully !"
     })
    } catch (error) {
        console.log("Error in delete album",error)
        next(error)
    }
}
export const checkAdmin=async(req,res,next)=>{
    res.status(200).json({
        admin:true
    })
}