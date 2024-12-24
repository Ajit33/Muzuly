import { Song } from "../model/songModel.js";
import { User } from "../model/userModel.js";
import { Album } from "../model/albumModel.js";
export const getStats = async (req, res, next) => {
  try {
		const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
			Song.countDocuments(),
			Album.countDocuments(),
			User.countDocuments(),

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
			totalArtists: uniqueArtists[0]?.count || 0,
		});
	} catch (error) {
		next(error);
	}
};
