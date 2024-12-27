

export interface song{
  _id:string,
  title:string,
  artist:string,
  albumId:string |null ,
  imageUrl:string,
  audioUrl:string,
  duration: number,
  createdAt:string,
  updatedAt:string
}

export interface Album{
    _id:string,
    title:string,
    artist:string,
    imageUrl:string,
    releaseYear:number,
    songs:song[]
}

export interface User{
  _id:string,
  fullName:string,
  imageUrl:string,
  clerkId:string
}
export interface Stats{
  totalSongs:number,
  totalAlbums:number,
  totalUsers:number,
  totalArtists:number
}
export interface Message{
  _id:string,
  senderId:string,
  receiverId:string,
  content:string,
  createdAt:string,
  updattedAt:string
}