import LeftSideBar from "@/components/LeftSideBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FriendsActivity from "@/components/FriendsActivity";
import { Outlet } from "react-router-dom";
import AudioPlayer from "@/components/AudioPlayer";
import PlaybackController from "@/components/PlaybackController";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
     const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2 "
      >
        <AudioPlayer />
        {/* left side */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSideBar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
        {/* main contnet */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {/* right side */}
        {!isMobile && (
          <>
            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
            <ResizablePanel
              defaultSize={20}
              minSize={0}
              maxSize={25}
              collapsedSize={0}
            >
              <FriendsActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
      <PlaybackController />
    </div>
  );
};

export default MainLayout;
