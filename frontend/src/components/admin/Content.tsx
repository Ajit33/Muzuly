import { Album, Music } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import SongsTabContent from "./SongsTabContent";
import AlbumTabContent from "./AlbumTabContent";

const Content = () => {
  return (
    <Tabs defaultValue="songs" className="space-y-6">
      <TabsList className="p-1 bg-zinc-800/50">
        <TabsTrigger value="songs">
          <Music className="mr-2 size-4" />
          songs
        </TabsTrigger>
        <TabsTrigger value="albums">
          <Album className="mr-2 size-4" />
          albums
        </TabsTrigger>
      </TabsList>
      <TabsContent value="songs">
        <SongsTabContent />
      </TabsContent>
      <TabsContent value="albums">
        <AlbumTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default Content;
