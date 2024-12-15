import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  songs:[{
    type:mongoose.Schema.ObjectId,
    ref:"Song"
  }]
},{timestamps:true});

export const Album=mongoose.model("Album",AlbumSchema)
