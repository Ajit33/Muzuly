import { Music } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import AddSongDialog from "./AddSongDialog";
import SongsTable from "./SongsTable";


const SongsTabContent = () => {
    return (
		<Card className="bg-zinc-900 text-white">
			<CardHeader>
				<div className='flex items-center justify-between '>
					<div>
						<CardTitle className='flex items-center gap-2'>
							<Music className='size-5 text-emerald-500' />
							Songs Library
						</CardTitle>
						<CardDescription>Manage your music tracks</CardDescription>
					</div>
					<AddSongDialog />
				</div>
			</CardHeader>
			<CardContent >
				<SongsTable />
			</CardContent>
		</Card>
	);
}

export default SongsTabContent
