import { axiosInstance } from "@/lib/axios";
import { Message, User } from "@/types";
import {io} from "socket.io-client"
import{create} from "zustand"

interface chatStore{
    users:User[];
    socket:any
    isConnected:boolean,
    onlineUsers:Set<string>
    userActivities:Map<string,string>
    messages:Message[]
    selectedUser:User |null
    fetchusers:()=>Promise<void>
    fetchMessages: (userId: string) => Promise<void>;
    initSocket:(userId:string)=>void
    disconnectSocket:()=>void
    sendMessage:(receiverId:string,senderId:string,content:string)=>void
    isLoading:boolean
    error :string | null
    setSelectedUser:(user:User|null)=>void

}
const baseUrl="http://localhost:5000"
const socket=io(baseUrl,{
  autoConnect:false,
  withCredentials:true
})
export const useChatStore=create<chatStore>((set,get)=>({
  users:[],
  isLoading:false,
  error:null,
  socket:socket,
  isConnected:false,
  onlineUsers:new Set(),
  userActivities:new Map(),
  selectedUser:null,
  messages:[],
  setSelectedUser:(user)=>set({selectedUser:user}),
  fetchusers:async()=>{
    set({isLoading:true,error:null})
  try {
    const response= await axiosInstance.get("/users")
    set({users:response.data})

  } catch (error:any) {
    set({error:error.response.data.message})
  }
  finally{
    set({isLoading:false})
  }
  },

  initSocket: (userId) => {
		if (!get().isConnected) {
			socket.auth = { userId };
			socket.connect();

			socket.emit("user_connected", userId);

			socket.on("users_online", (users: string[]) => {
				set({ onlineUsers: new Set(users) });
			});

			socket.on("activities", (activities: [string, string][]) => {
				set({ userActivities: new Map(activities) });
			});

			socket.on("user_connected", (userId: string) => {
				set((state) => ({
					onlineUsers: new Set([...state.onlineUsers, userId]),
				}));
			});

			socket.on("user_disconnected", (userId: string) => {
				set((state) => {
					const newOnlineUsers = new Set(state.onlineUsers);
					newOnlineUsers.delete(userId);
					return { onlineUsers: newOnlineUsers };
				});
			});

			socket.on("receive_message", (message: Message) => {
				set((state) => ({
					messages: [...state.messages, message],
				}));
			});

			socket.on("message_sent", (message: Message) => {
				set((state) => ({
					messages: [...state.messages, message],
				}));
			});
			socket.on("update_activity", ({ userId, activity }) => {
				set((state) => {
					const newActivities = new Map(state.userActivities);
					newActivities.set(userId, activity);
					return { userActivities: newActivities };
				});
			});

			set({ isConnected: true });
		}
	},

	disconnectSocket: () => {
		if (get().isConnected) {
			socket.disconnect();
			set({ isConnected: false });
		}
	},

	sendMessage: async (receiverId, senderId, content) => {
		const socket = get().socket;
		if (!socket) return;

		socket.emit("send_message", { receiverId, senderId, content });
	},
	fetchMessages: async (userId: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/users/messages/${userId}`);
			set({ messages: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));