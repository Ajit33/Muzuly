

export interface song{
  _id:string,
  title:string,
  artist:string,
  albumId:string |null ,
  imageurl:string,
  audioUrl:string,
  duration: number,
  createdAt:Date,
  updatedAt:Date
}

export interface Album{
    _id:string,
    title:string,
    artist:string,
    imageUrl:string,
    releaseYear:number,
    songs:song[]
}