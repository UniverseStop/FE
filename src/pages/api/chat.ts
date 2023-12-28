import axios from "axios";
import {instance} from "@/pages/api/instance";

// export const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

// 채팅 룸 리스트
export const getRooms = async (user:string) => {
    const response = await fetch(`chat/rooms/${user}`, {
        next: {
            tags: ['rooms']
        },
        credentials: 'include',
        cache: "no-cache"
    })
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
}