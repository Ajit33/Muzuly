import { useMusicStore } from "@/stores/useMusicStore"
import { useRef, useState } from "react";
import { Dialog, DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus, Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";


const AddSongDialog = () => {
  const{albums}=useMusicStore();
  const[songDialogOpen,setSongDialogOpen]=useState(false);
  const [isLoading,setIsloading]=useState(false);
  const [newSongs,setNewSongs]=useState({
    title:"",
    artist:"",
    album:"",
    duration:"0"
  })
 	const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
		audio: null,
		image: null,
	});
  const audioInputRef=useRef<HTMLInputElement>(null);
  const imageInputRef=useRef<HTMLInputElement>(null);

  const handelSubmit=async()=>{
    setIsloading(true)
    try {
      if(!files.audio || !files.image){
        return toast.error("Please upload both audio and image files")
      }
      const formData= new FormData()
      formData.append("title",newSongs.title);
      formData.append("artist",newSongs.artist);
      formData.append("duration",newSongs.duration);
      if(newSongs.album && newSongs.album !=="none"){
        formData.append("albumId",newSongs.album)
      }
      formData.append("audioFile",files.audio);
      formData.append("imageFile",files.image);
      await axiosInstance.post("/admin/addsongs",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      setNewSongs({
				title: "",
				artist: "",
				album: "",
				duration: "0",
			});

			setFiles({
				audio: null,
				image: null,
			});
			toast.success("Song added successfully");
		} catch (error: any) {
			toast.error("Failed to add song: " + error.message);
		} finally {
			setIsloading(false);
		}
  }
  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
        <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
                 <Plus className="mr-2 h-4 w-4" />
                 Add Song
            </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
           <DialogHeader>
             <DialogTitle>Add New Song</DialogTitle> 
           <DialogDescription>Add a new song to your music library</DialogDescription>
           </DialogHeader>
           <div className="space-y-4 py-4">
            <input className="hidden" type="file" accept="audio/*" ref={audioInputRef} onChange={(e)=>setFiles((prev)=>({...prev,audio:e.target.files![0]}))} />
            <input className="hidden" type="file" accept="image/*" ref={imageInputRef} onChange={(e)=>setFiles((prev)=>({...prev,image:e.target.files![0]}))} />
            {/* image upload */}
            <div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
						onClick={() => imageInputRef.current?.click()}
					>
						<div className='text-center'>
							{files.image ? (
								<div className='space-y-2'>
									<div className='text-sm text-emerald-500'>Image selected:</div>
									<div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
								</div>
							) : (
								<>
									<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
										<Upload className='h-6 w-6 text-zinc-400' />
									</div>
									<div className='text-sm text-zinc-400 mb-2'>Upload artwork</div>
									<Button variant='outline' size='sm' className='text-xs'>
										Choose File
									</Button>
								</>
							)}
						</div>
					</div>
          {/* Audio upload */}
					<div className='space-y-2'>
						<label className='text-sm font-medium text-white'>Audio File</label>
						<div className='flex items-center gap-2'>
							<Button variant='outline' onClick={() => audioInputRef.current?.click()} className='w-full'>
								{files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
							</Button>
						</div>
					</div>

					{/* other fields */}
					<div className='space-y-2'>
						<label className='text-sm font-medium text-white'>Title</label>
						<Input
							value={newSongs.title}
							onChange={(e) => setNewSongs({ ...newSongs, title: e.target.value })}
							className='bg-zinc-800 border-zinc-700 text-white'
						/>
					</div>
          <div className='space-y-2'>
						<label className='text-sm font-medium text-white'>Artist</label>
						<Input
							value={newSongs.artist}
							onChange={(e) => setNewSongs({ ...newSongs, artist: e.target.value })}
							className='bg-zinc-800 border-zinc-700 text-white'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-white'>Duration (seconds)</label>
						<Input
							type='number'
							min='0'
							value={newSongs.duration}
							onChange={(e) => setNewSongs({ ...newSongs, duration: e.target.value ||"0" })}
							className='bg-zinc-800 border-zinc-700 text-white'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium text-white'>Album (Optional)</label>
						<Select
							value={newSongs.album}
							onValueChange={(value) => setNewSongs({ ...newSongs, album: value })}
						>
							<SelectTrigger className='bg-zinc-800 border-zinc-700 text-white'>
								<SelectValue placeholder='Select album' />
							</SelectTrigger>
							<SelectContent className='bg-zinc-800 border-zinc-700'>
								<SelectItem value='none'>No Album (Single)</SelectItem>
								{albums.map((album) => (
									<SelectItem key={album._id} value={album._id}>
										{album.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
        <DialogFooter>
					<Button variant='outline' onClick={() => setSongDialogOpen(false)} disabled={isLoading}>
						Cancel
					</Button>
					<Button onClick={handelSubmit} disabled={isLoading}>
						{isLoading ? "Uploading..." : "Add Song"}
					</Button>
				</DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default AddSongDialog
