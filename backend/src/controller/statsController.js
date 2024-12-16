import { Song } from "../model/songModel.js";
import { User } from "../model/userModel.js";
import { Album } from "../model/albumModel.js";
 export const getStats=async (req, res, next) => {
    try {
      const { totalSongs, totalUsers, totalAlbums, uniqueArtist } =
        await Promise.all([
          Song.countDocuments(),
          User.countDocuments(),
          Album.countDocuments(),
  
          Song.aggregate([
            {
              $unionWith: {
                coll: "albums",
                pipeline: [],
              },
            },
            {
              $group: {
                _id: "$artist",
              },
            },
            {
              $count: "count",
            },
          ]),
        ]);
        res.status(200).json({
          totalAlbums,
          totalSongs,
          totalUsers,
         totalArtist: uniqueArtist[0]?.count ||0
        })
    } catch (error) {
      next(error)
    }
  }